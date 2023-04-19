import React from "react";
import { useSelector } from "react-redux";

export const User = ({ userId }) => {
  const user = useSelector(state => 
    state.users.find(user => user.id === userId)
  )
  
  return <span>You are logged in as {user ? user.name : 'Unknown user'}</span>
}