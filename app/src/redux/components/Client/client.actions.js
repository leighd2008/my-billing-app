import * as api from './client.api';
import db from '../../../db/firestore'

export const fetchClients = () => async (dispatch, getState) => {
  const clients = await api.fetchClients();
}

export const createClient = (formData) => dispatch => {
  debugger
  return api
    .createClient(formData)
    .then(_ => dispatch({type: 'CLIENT_CREATE_SUCCESS'}))
  }