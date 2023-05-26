import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

import { createClient } from "./clientsSlice";

export default function addNewClientForm () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addNewClientStatus, setAddNewClientStatus] = useState('idle')
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onFirstNameChanged = e => setFirstName(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)
  
  const canSave = [firstName, lastName].every(Boolean) && addNewClientStatus === 'idle'
    
  const onSubmit = async (data) => {
    data.payments = {}
    data.charges = {}
    if (canSave) {
      try {
        setAddNewClientStatus('pending')
        await dispatch(createClient(data))
        navigate('/clients')
      } catch (err){
        console.error('Failed to save the client: ', err)
      } finally {
        setAddNewClientStatus('idle')
      }
    }
  }

  return (
    <section className="section">
      <div className="container">
        <section className="hero is-danger">
          <div className="hero-body">
            <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
              <div className="header">New Client Information</div>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
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
                    />
                </div>
                <button type="submit" className="btn btn-secondary">Add Client</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </section>
  )
}