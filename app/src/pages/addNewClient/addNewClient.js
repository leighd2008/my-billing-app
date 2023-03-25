import React from "react";
import { useForm } from "react-hook-form";

export default function addNewClientForm () {
  const { register, handleSubmit } = useForm();
    
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div className="centered-view">
      <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
        <div className="header">Add New Client</div>
        {/* <div className="subheader">Login and chat with other people!</div> */}
        <div className="form-container">
          <div className="form-group">
            <label >First Name</label>
            <input
              {...register('first name')}
              className="form-control"
              name="first name"
              />
          </div>
          <div className="form-group">
            <label >Last Name</label>
            <input
              {...register('last name')}
              className="form-control"
              name="last name"
              />
          </div>
          <div className="form-group">
            <label >Street Address</label>
            <input
              {...register('address')}
              className="form-control"
              name="address"
              />
          </div>
          <div className="form-group">
            <label >City</label>
            <input
              {...register('city')}
              className="form-control"
              name="city"
              />
          </div>
          <div className="form-group">
            <label >State</label>
            <input
              {...register('state')}
              className="form-control"
              name="state"
              />
          </div>
          <div className="form-group">
            <label >Zip Code</label>
            <input
              {...register('zip code')}
              className="form-control"
              name="zip code"
              />
          </div>
          <button type="submit" className="btn btn-outline-primary">Add Client</button>
        </div>
      </form>
    </div>
  )
}