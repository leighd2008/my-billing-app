import * as api from '../../../features/clients/clients.api';
import db from '../../../db/firestore'

export const fetchClients = () => async (dispatch, getState) => {
  const clients = await api.fetchClients();
  return clients
}

export const createClient = (formData) => dispatch => {
  return api
    .createClient(formData)
    .then(_ => dispatch({type: 'CLIENT_CREATE_SUCCESS'}))
  }