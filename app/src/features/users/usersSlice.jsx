import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from './users.api' 

const initialState = {
  users: [],
  status: 'idle',
  error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await api.fetchUsers();
  return users
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = state.users.concat(action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) =>{
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default usersSlice.reducer

export const selectAllUsers = state => state.users.users

export const selectUserById  = (state, userId) =>
  state.users.users.find(user => user.id === userId)