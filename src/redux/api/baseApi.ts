import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";
import { logOut, setUser } from "../features/Auth/AuthSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  // prepareHeaders dia authorization e token ta set korchi. naile to back end e gula atuhoriazation e token ta pabe
  // na
  // prottek req e backend accessToken pathanor jonno
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      // headers.set('authorization', `Bearer ${token}`)
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// this is custom base query. base query api run korar por j return ta pacche sei ta capture korlam
// error hoile seitao dekhte parbo
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let resutl = await baseQuery(args, api, extraOptions);

  if(resutl.error?.status === 404) {
    toast.error(resutl.data?.data?.message)
  }
  if (resutl?.error?.status === 403) {
    toast.error(resutl.data?.data?.message);
  }
  // console.log("res = ", resutl)
  if (resutl.error?.status === 401) {
    // send refreshtoken to generate new accessToken and get it

    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include", // cokkie backend pathanor jonno , cookie theke refresh token backend e jacche
    });

    const data = await res.json();

    // jodi accesstoken na ase tar mane refresh token e expire hoia geche
    // tokhon user k logout kore dite hobe
    // user login korle abr refresh token + accesstoken pabe
    if (data?.data?.accessToken) {
      //api er modde state and dispatch function pabo
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(setUser({ user, token: data.data.accessToken }));

      resutl = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return resutl;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['semester','courses', 'offeredCourse'],
  endpoints: () => ({}),
});
