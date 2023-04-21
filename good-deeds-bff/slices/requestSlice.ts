import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import Request from '@/types/request';





const initialState : {requests:Request[]}  = {
  requests:[]
}


export const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests: (state, action:PayloadAction<Request[]>) => {
      state.requests = action.payload
    },
    removeRequest: (state,action:PayloadAction<Request>) => {
      const requestIndex = state.requests.findIndex((request) => request._id === action.payload._id);
      if (requestIndex !== -1) {
        state.requests.splice(requestIndex,1);
      }
    },
  },
})

export const {setRequests,removeRequest} = requestSlice.actions;

export const selectRequests = (state: RootState) => state.request;

export default requestSlice.reducer;