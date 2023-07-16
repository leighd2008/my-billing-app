import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

import { createClient } from "./clientsSlice";

import Item from "../../components/Item";

export default function addNewClientForm () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addNewClientStatus, setAddNewClientStatus] = useState('idle')
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const states = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
  
  const [value, setValue] = useState('')
  
  const handleStateSelect = e => {
    setValue(e.target.value)
  }
    
  const onFirstNameChanged = e => setFirstName(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)
  
  const canSave = [firstName, lastName].every(Boolean) && addNewClientStatus === 'idle'
  
  const onSubmit = (data) => {
    data.payments = []
    data.charges = []
    data.invoices = []
    if (canSave) {
      try {
        setAddNewClientStatus('pending')
        dispatch(createClient(data))
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
      <div className="centered-view">
        <section className="centered-container">
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
              <div className="header">New Client Information</div>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className="form-control"
                    required={true}
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
                    required={true}
                    id="lastName"
                    name="lastName"
                    onChange={onLastNameChanged}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="form-control"
                    required={true}
                    id="email"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address" >Street Address</label>
                  <input
                    {...register('address')}
                    type="text"
                    className="form-control"
                    required={true}
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
                    required={true}
                    id="city"
                    name="city"
                  />
                </div>
                <div className="form-group plug-inner-addon">
                  <label htmlFor="usState" >State</label>
                  <input
                    {...register('usState')}
                    type="text"
                    className="form-control"
                    id="usState"
                    name="usState"
                    value={value}
                    list='states'
                    autoComplete="on"
                    onChange={handleStateSelect}
                  />
                  <datalist id='states'>
                    {states &&
                      states.length > 0 &&
                      states.map((state, index) => {
                        return <Item item={state} position={index} key={index} />
                      })
                    }
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="zip code" >Zip Code</label>
                  <input
                    {...register('zip')}
                    type="number"
                    className="form-control"
                    required={true}
                    id="zip"
                    name="zip"
                  />
                </div>
                <button type="submit" className="btn">Add Client</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </section>
  )
}