import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import Auth from '@/types/auth';




const initialState: Auth = {
  access_token:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action:PayloadAction<Auth>) => {
      
      state.access_token= action.payload.access_token;
    },
    logOut: (state) => {
      state.access_token= null;
    },
  },
})

export const {setToken,logOut} = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.access_token;

export default authSlice.reducer;