import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

import { nanoid } from "@reduxjs/toolkit";
// import { createClient } from '../../redux/components/Clients/clients.actions'
import { clientAdded } from "./clientsSlice";

export default function addNewClientForm () {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  const onSubmit = (data) => {
    // dispatch(createClient(data));
    console.log(data)
    dispatch(clientAdded({...data})
    )
    navigate('/clients')
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
          <div className="header">Add New Client</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                {...register('firstName')}
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
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
            <button type="submit" className="btn btn-outline-primary">Add Client</button>
          </div>
        </form>
      </div>
    </div>
  )
}