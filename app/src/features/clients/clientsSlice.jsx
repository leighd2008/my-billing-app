import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {id: '1', firstName: 'John', lastName: 'Smith', address: '123 This road', city: 'nowhere', usState: 'anywhere', zip: '12345'},
  {id: '2', firstName: 'Jane', lastName: 'Doe', address: '456 That road', city: 'somewhere', usState: 'anyplace', zip: '67891'}
]

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clientAdded: {
      reducer(state, action) {
        state.push(action.payload)
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
      const existingClient = state.find(client => client.id === id)
      if (existingClient) {
        existingClient.firstName = firstName
        existingClient.lastName = lastName
        existingClient.address = address
        existingClient.city = city
        existingClient.usState = usState
        existingClient.zip = zip 
      }
    }
  }
})

export const { clientAdded, clientUpdated } = clientsSlice.actions

export default clientsSlice.reducer