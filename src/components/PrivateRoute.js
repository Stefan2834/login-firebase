import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Route, useNavigate } from 'react-router-dom';

export default function PrivateRoute({children,...rest}) {
    const {currentUser} = useAuth();
    const navigate = useNavigate()
    console.log(currentUser);
  return (
    <Route {...rest} 
       render={() => currentUser ? (children) : navigate('/')} 
    />
  )
}
