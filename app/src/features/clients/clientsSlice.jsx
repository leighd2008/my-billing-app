import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import * as api from './clients.api';


const initialState = {
  clients: [],
  status: 'idle',
  error: null
}

export const fetchClients = createAsyncThunk('clients/fetchClients', async() => {
    const clients = await api.fetchClients();
    return clients
})

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clientAdded: {
      reducer(state, action) {
        state.clients.push(action.payload)
      },
      prepare(data) {
        return {
          payload: {
            id: nanoid(),
            ...data
          }
        }
      }
    },
    clientUpdated(state, action) {
      const { id, firstName, lastName, address, city, usState, zip} = action.payload
      const existingClient = state.clients.find(client => client.id === id)
      if (existingClient) {
        existingClient.firstName = firstName
        existingClient.lastName = lastName
        existingClient.address = address
        existingClient.city = city
        existingClient.usState = usState
        existingClient.zip = zip 
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchClients.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.clients = state.clients.concat(action.payload)
      })
      .addCase(fetchClients.rejected, (state, action) =>{
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { clientAdded, clientUpdated } = clientsSlice.actions

export default clientsSlice.reducer

export const selectAllClients = state => state.clients.clients

export const selectClientById = (state, clientId) =>
  state.clients.clients.find(client => client.id === clientId)