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
  
  // *************** For Autocomplete ***************
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState('')
  
  const suggestions = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    
  
  const onChange = e => {
    setUserInput(e.target.value)
    console.log(userInput)
    
    setFilteredSuggestions(suggestions.filter(
      suggestion => 
        suggestion.toLowerCase().startsWith(e.target.value.toLowerCase())
    ))
      setActiveSuggestion(0)
      setShowSuggestions(true)
  };
  
  const onClick = e => {
      setActiveSuggestion(0)
      setFilteredSuggestions([])
      setShowSuggestions(false)
      setUserInput(e.target.innerText)
      console.log(userInput)
  };
  
  const onKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion])
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1)
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if(activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  };
    
    let suggestionListComponent;
    
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionListComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    
  // *************** For Autocomplete ***************
    
  const onFirstNameChanged = e => setFirstName(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)
  
  const canSave = [firstName, lastName].every(Boolean) && addNewClientStatus === 'idle'
  
  const onSubmit = async (data) => {
    data.payments = []
    data.charges = []
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
                    // onChange={onEmailChanged}
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
                <div className="form-group">
                  <label htmlFor="usState" >State (use up and down arrows to highlight and either tab or enter to select. clicking won't work and I haven't figured it out yet.</label>
                  <input
                    {...register('usState')}
                    type="text"
                    className="form-control"
                    id="usState"
                    name="usState"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    />
                    {suggestionListComponent}
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