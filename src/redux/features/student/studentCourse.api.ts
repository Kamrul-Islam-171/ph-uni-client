

import { TQueryParams, TResponseRedux } from "../../../types/global";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const StudentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOfferedCoursed: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          // params.append(args[0].name, args[0].value)
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-course/my-offered-course",
          method: "GET",
          params: params,
        };
      },
      providesTags: ['offeredCourse'],
      transformResponse: (
        response: TResponseRedux<TOfferedCourse[]>
      ) => {
        // backend theke asa data theke only data and meta front end e pathabo
        console.log(response);

        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    enrolCourse: builder.mutation({
      query: (data) => ({
        url: '/enrolled-courses/create-enrolled-course',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['offeredCourse'],
    }),

    getAllEnrolledCourses: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/enrolled-courses/my-enrolled-courses',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['offeredCourse'],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    
  }),

  
});

export const {
  useGetAllOfferedCoursedQuery, useEnrolCourseMutation, useGetAllEnrolledCoursesQuery
} = StudentCourseApi;
