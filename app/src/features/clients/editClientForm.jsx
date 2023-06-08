import React, { useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'


import { editClient, selectClientById } from "./clientsSlice";

export const EditClientForm = () => {
  const { clientId } = useParams();
  
  const client = useSelector(state => selectClientById(state, clientId))
    
  const [firstName, setFirstName] = useState(client.firstName)
  const [lastName, setLastName] = useState(client.lastName)
  const [address, setAddress] = useState(client.address)
  const [city, setCity] = useState(client.city)
  const [usState, setUSState] = useState(client.usState)
  const [zip, setZip] = useState(client.zip)
  const [id, setId] = useState(client.id)
  
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onFirstNameChanged = e => setFirstName(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)
  const onAddressChanged = e => setAddress(e.target.value)
  const onCityChanged = e => setCity(e.target.value)
  const onUSStateChanged = e => setUSState(e.target.value)
  const onZipChanged = e => setZip(e.target.value)
    
  const onSubmit = async (data) => {
    await dispatch(editClient(data))
    navigate(`/clients`)
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
          <div className="header">Edit Client</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                {...register('firstName')}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={onFirstNameChanged}
                />
            </div>
            <div className="form-group">
              <label htmlFor="last name" >Last Name</label>
              <input
                {...register('lastName')}
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={onLastNameChanged}
                />
            </div>
            <div className="form-group">
              <label htmlFor="address" >Street Address</label>
              <input
                {...register('address')}
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={address}
                onChange={onAddressChanged}
                />
            </div>
            <div className="form-group">
              <label htmlFor="city" >City</label>
              <input
                {...register('city')}
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={city}
                onChange={onCityChanged}
                />
            </div>
            <div className="form-group">
              <label htmlFor="usState" >State</label>
              <input
                {...register('usState')}
                type="text"
                className="form-control"
                id="usState"
                name="usState"
                value={usState}
                onChange={onUSStateChanged}
                />
            </div>
            <div className="form-group">
              <label htmlFor="zip code" >Zip Code</label>
              <input
                {...register('zip')}
                type="text"
                className="form-control"
                id="zip"
                name="zip"
                value={zip}
                onChange={onZipChanged}
                />
            </div>
            <div className="form-group">
              <label htmlFor="Client Id" >Client Id</label>
              <input
                {...register('id')}
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={id}
                />
            </div>
            <button type="submit" className="btn">Edit Client</button>
          </div>
        </form>
      </div>
    </div>
  )
}