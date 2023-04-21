import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import Deed from '@/types/deed';





const initialState:{deeds:Deed[]} = {
  deeds:[]
}


export const deedSlice = createSlice({
  name: 'deeds',
  initialState,
  reducers: {
    setDeeds: (state, action:PayloadAction<Deed[]>) => {
      state.deeds = action.payload
    },
    removeDeed: (state,action:PayloadAction<Deed>) => {
      const deedIndex = state.deeds.findIndex((deed) => deed._id === action.payload._id);
      if (deedIndex !== -1) {
        state.deeds.splice(deedIndex,1);
      }
    },
    addDeed: (state, action:PayloadAction<Deed>)=>{
      
      state.deeds.push(...state.deeds,action.payload);
    },
    updateDeed:(state, action:PayloadAction<Deed>)=>{
      const deedIndex = state.deeds.findIndex((deed) => deed._id === action.payload._id);
      if (deedIndex !== -1) {
        state.deeds[deedIndex] = action.payload;
      }
    }
  },
})

export const {setDeeds,removeDeed, addDeed,updateDeed} = deedSlice.actions;

export const selectDeeds = (state: RootState) => state.deed.deeds;

export default deedSlice.reducer;