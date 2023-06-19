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
  
    // *************** For Autocomplete ***************
    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')
    
    const suggestions = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
      
    
    const onChange = e => {
      setUserInput(e.currentTarget.value)
      console.log(userInput)
      
      setFilteredSuggestions(suggestions.filter(
        suggestion => 
          suggestion.toLowerCase().startsWith(e.currentTarget.value.toLowerCase())
      ))
        setActiveSuggestion(0)
        setShowSuggestions(true)
    };
    
    
    const onClick = e => {
      setActiveSuggestion(0)
      setFilteredSuggestions([])
      setShowSuggestions(false)
      setUserInput(e.currentTarget.innerText)
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
  const onAddressChanged = e => setAddress(e.target.value)
  const onCityChanged = e => setCity(e.target.value)
  const onUSStateChanged = e => setUSState(e.target.value)
  const onZipChanged = e => setZip(e.target.value)
    
  const onSubmit = async (data) => {
    await dispatch(editClient(data))
    navigate(`/clients`)
  }

  return (
    <React.Fragment>
      <section>
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
                  <label htmlFor="usState" >State (use up and down arrows to highlight and tab to select. clicking won't work and I haven't figured it out yet.</label>
                  <input
                    {...register('usState')}
                    type="text"
                    className="form-control"
                    id="usState"
                    name="usState"
                    placeholder={usState}
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
                    type="number min-length"
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
      </section>
    </React.Fragment>
  )
}