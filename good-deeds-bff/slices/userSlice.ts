import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import User from '@/types/user'



const initialState: User = {
  _id:null,
  name:null,
  email:null,
  friendsIds:null
}

export const userSlice = createSlice({
  name: 'user',

  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<User>) => {
      state._id = action.payload._id;
      state.email=action.payload.email;
      state.name = action.payload.name;
      state.friendsIds = action.payload.friendsIds;
    },
    removeUser:(state)=>{
      state._id = null;
      state.email= null;
      state.friendsIds = null;
      state.name = null;
    },
    removeFriendId:(state, action:PayloadAction<string>)=>{
      debugger
      const friendIndex = state?.friendsIds?.findIndex((friendId) => friendId === action.payload);
      if (friendIndex !== -1) {
        state?.friendsIds?.splice(friendIndex ?? -1,1);
      };
   
    }    
  },
})

export const {setUser, removeUser, removeFriendId} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectFriendsIds = (state:RootState) => state.user.friendsIds

export default userSlice.reducer;