import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import Request from '@/types/request';





const initialState: Request[] = []


export const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests: (state, action:PayloadAction<Request[]>) => {
      state = action.payload
    },
    removeRequests: (state) => {
      state = [];
    },
  },
})

export const {setRequests,removeRequests} = requestSlice.actions;

export const selectRequests = (state: RootState) => state.deed;

export default requestSlice.reducer;