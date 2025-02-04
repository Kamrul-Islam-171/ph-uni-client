import { TAcademicFaculty } from "../../../types/academicManagement.types";
import { TAcademicSemesterType } from "../../../types/academicSemester.types";
import { TQueryParams, TResponse, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const AcademicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          // params.append(args[0].name, args[0].value)
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (
        response: TResponseRedux<TAcademicSemesterType[]>
      ) => {
        // backend theke asa data theke only data and meta front end e pathabo
        console.log(response);

        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllAcademicDepartments: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          // params.append(args[0].name, args[0].value)
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-department",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (
        response: TResponseRedux<TAcademicSemesterType[]>
      ) => {
        // backend theke asa data theke only data and meta front end e pathabo
        console.log(response);

        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAcademicFaculties: builder.query({
      query: () => {
        return { url: '/academic-faculties', method: 'GET' };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "academic-faculty/create-academic-faculty",
        method: "Post",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery
} = AcademicManagementApi;
