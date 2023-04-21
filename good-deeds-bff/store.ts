import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './services/apiSlice';
import userReducer from '@/slices/userSlice';
import authReducer from '@/slices/authSlice';
import deedReducer from '@/slices/deedSlice';
import requestReducer from '@/slices/requestSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth:authReducer,
    deed:deedReducer,
    request:requestReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;