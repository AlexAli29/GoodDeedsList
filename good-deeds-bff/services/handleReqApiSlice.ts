import { BaseQueryArg, BaseQueryResult } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { apiSlice } from "./apiSlice";



export const reqHandler = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    getRequests: build.mutation<any,void>({
      query: () => ({
        url: "api/request",
        method: "GET",
      }),
    }),

    addRequest: build.mutation({
      query:(credentials) => ({
        url: "api/request",
        method: "POST",
        body: credentials,
      }),     
    }),

    deleteRequest: build.mutation({
      query:(id) => ({
        url: `api/request/${id}`,
        method: "DELETE",        
      }),     
    }),

    getFriendDeeds: build.mutation({
      query: (id) => ({
        url: `api/deed/friend/${id}`,
        method: "GET",
      }),
    }),

   

    addDeed: build.mutation({
      query:(credentials) => ({
        url: "api/deed",
        method: "POST",
        body: credentials,
      }),     
    }),  

    deleteDeed:build.mutation({
      query:(id) => ({
        url: `api/deed/${id}`,
        method: "DELETE",        
      }),     
    }),  

    getDeeds: build.mutation<any,void>({
      query: () => ({
        url: "api/deed",
        method: "GET",
      }),
    }),

    updateDeed: build.mutation({
      query:(credentials) => ({
        url: "api/deed/",
        method: "PATCH",
        body: credentials,
      }),     
    }), 

    getCurrentUser: build.mutation<any,void>({
      query: () => ({
        url: "api/user/",
        method: "GET",
      }),
    }),

    updateUser: build.mutation({
      query:(credentials) => ({
        url: "api/user",
        method: "PATCH",
        body: credentials,
      }),     
    }), 

    refresh: build.mutation<any,void>({
      query: () => ({
        url: "api/auth/refresh",
        method: "GET",
      }),
    }),

    getFriends: build.mutation<any,void>({
      query: () => ({
        url: "api/user/friends",
        method: "GET",
        
      }),
    }),

    addFriend: build.mutation({
      query: (recipientId) => ({
        url: `api/user/friends/${recipientId}`,
        method: "POST",
        
      }),
    }),
   
    deleteFriend: build.mutation({
      query: (friendToDeleteId) => ({
        url: `api/user/friends/${friendToDeleteId}`,
        method: "DELETE",        
      }),
    }),


    logOut: build.mutation<any,void>({
      query: () => ({
        url: "api/auth/logout",
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
useLogOutMutation,
useDeleteDeedMutation,
useGetRequestsMutation,
useAddRequestMutation,
useDeleteRequestMutation,
useGetFriendDeedsMutation,
useAddFriendMutation,
useDeleteFriendMutation,
useGetFriendsMutation,
useUpdateUserMutation,

} = reqHandler;
