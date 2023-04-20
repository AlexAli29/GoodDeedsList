import { logOut, setToken } from "@/slices/authSlice";
import authResponse from "@/types/auth";
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  credentials: "include",
  prepareHeaders: (Headers, { getState }:{ getState: () => any }) => {
    
    const token = getState().auth.access_token;
   
    if (token) {
      Headers.set("authorization", `Bearer ${token}`);
    }

    return Headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status == 401) {
    const refreshResult= await baseQuery("api/auth/refresh", api, extraOptions);

    if (refreshResult.data) {
      
      api.dispatch(setToken(refreshResult.data as authResponse));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({}),
});
