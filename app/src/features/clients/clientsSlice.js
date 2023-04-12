import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {id: '1', firstName: 'John', lastName: 'Smith', address: '123 This road', city: 'nowhere', state: 'anywhere', zip: '12345'},
  {id: '2', firstName: 'Jane', lastName: 'Doe', address: '456 That road', city: 'somewhere', state: 'anyplace', zip: '67891'}
]

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clientAdded(state, action) {
      state.push(action.payload)
    }
  }
})

export const { clientAdded } = clientsSlice.actions

export default clientsSlice.reducer