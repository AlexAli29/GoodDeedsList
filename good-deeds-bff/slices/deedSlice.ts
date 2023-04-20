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
    removeDeeds: (state) => {
      state.deeds = [];
    },
    addDeed: (state, action:PayloadAction<Deed>)=>{
      debugger
      state.deeds.push(action.payload);
    }
  },
})

export const {setDeeds,removeDeeds, addDeed} = deedSlice.actions;

export const selectDeeds = (state: RootState) => state.deed.deeds;

export default deedSlice.reducer;