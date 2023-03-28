import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from '../../redux/components/Client/client.actions'

export default function addNewClientForm () {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
    
  const onSubmit = data => {
    dispatch(createClient(data));
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
          <div className="header">Add New Client</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="first name">First Name</label>
              <input
                {...register('first name')}
                type="text"
                className="form-control"
                id="first name"
                name="first name"
                />
            </div>
            <div className="form-group">
              <label htmlFor="last name" >Last Name</label>
              <input
                {...register('last name')}
                type="text"
                className="form-control"
                id="last name"
                name="last name"
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
              <label htmlFor="state" >State</label>
              <input
                {...register('state')}
                type="text"
                className="form-control"
                id="state"
                name="state"
                />
            </div>
            <div className="form-group">
              <label htmlFor="zip code" >Zip Code</label>
              <input
                {...register('zip code')}
                type="text"
                className="form-control"
                id="zip code"
                name="zip code"
                />
            </div>
            <button type="submit" className="btn btn-outline-primary">Add Client</button>
          </div>
        </form>
      </div>
    </div>
  )
}