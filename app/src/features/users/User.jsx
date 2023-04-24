import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from './usersSlice'

export const User = ({ userId }) => {
  const user = useSelector(state => 
    selectUserById(state, userId)
  )
  
  return <span>You are logged in as {user ? user.name : 'Unknown user'}</span>
}