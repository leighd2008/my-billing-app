import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const createClient = createAsyncThunk('clients/createClient', 
  async (formData) => {
    return api.createClient(formData)
})

export const editClient = createAsyncThunk('clients/editClient',
  async (data) => {
    return api.editClient(data)
  }
)

export const addPayment = createAsyncThunk('clients/addPayment',
  async (data) => {
    return api.addPayment(data)
  }
)

export const addCharge = createAsyncThunk('clients/addCharge',
  async (data) => {
    return api.addCharge(data)
  }
)

export const deleteCharge = createAsyncThunk('clients/deleteCharge',
  async (data) => {
    console.log(data)
    return api.deleteCharge(data)
  }
)

export const deletePayment = createAsyncThunk('clients/deletePayment',
  async (data) => {
    console.log(data)
    return api.deletePayment(data)
  }
)

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchClients.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.clients = action.payload
      })
      .addCase(fetchClients.rejected, (state, action) =>{
        state.status = 'failed'
        state.error = action.error.message
      })
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.status = 'idle'
    })
    builder.addCase(editClient.fulfilled, (state, action) => {
      state.status = 'idle'
    })
    builder.addCase(addCharge.fulfilled, (state, action) => {
      state.status = 'idle'
    })
    builder.addCase(addPayment.fulfilled, (state, action) => {
      state.status = 'idle'
    })
    builder.addCase(deleteCharge.fulfilled, (state, action) => {
      state.status = 'idle'
    })
    builder.addCase(deletePayment.fulfilled, (state, action) => {
      state.status = 'idle'
    })
  }
})

// export const { clientUpdated } = clientsSlice.actions

export default clientsSlice.reducer

export const selectAllClients = state => state.clients.clients

export const selectClientById = (state, clientId) =>
  state.clients.clients.find(client => client.id === clientId)