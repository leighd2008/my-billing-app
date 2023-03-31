import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {id: '1', name: 'John Smith', address: '123 This road', city: 'nowhere', state: 'anywhere', zip: '12345'},
  {id: '2', name: 'Jane Doe', address: '456 That road', city: 'somewhere', state: 'anyplace', zip: '67891'}
]

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {}
})

export default clientsSlice.reducer