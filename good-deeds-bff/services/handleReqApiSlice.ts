import { apiSlice } from "./apiSlice";
import ErrorResponse from "@/types/errorResponse";
import User from "@/types/user";
import Auth from "@/types/auth";



export const reqHandler = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    addDeed: build.mutation({
      query:(credentials) => ({
        url: "api/deed",
        method: "POST",
        body: credentials,
      }),     
    }),  

    updateDeed: build.mutation({
      query:(credentials) => ({
        url: "api/deed",
        method: "PATH",
        body: credentials,
      }),     
    }), 

    getCurrentUser: build.mutation<any,void>({
      query: () => ({
        url: "api/user/",
        method: "GET",
      }),
    }),

    refresh: build.mutation<any,void>({
      query: () => ({
        url: "api/auth/refresh",
        method: "GET",
      }),
    }),

    getDeeds: build.mutation<any,void>({
      query: () => ({
        url: "api/deed",
        method: "GET",
      }),
    }),

    register: build.mutation({
      query:(credentials) => ({
        url: "api/auth/register",
        method: "POST",
        body: credentials,
      }),     
    }),       

    login: build.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),   

  }),
});

export const {
useRegisterMutation,
useGetCurrentUserMutation,
useLoginMutation,
useGetDeedsMutation,
useRefreshMutation,
useAddDeedMutation,
useUpdateDeedMutation,

} = reqHandler;
