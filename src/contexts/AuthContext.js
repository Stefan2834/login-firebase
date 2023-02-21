import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState('');
    const [url, setUrl] = useState()
    const [activeForm, setActiveForm] = useState(true)
    const server = 'http://localhost:9000';

    
    useEffect(() => {
        axios.get(`${server}/connect`)
        .then(user => {setCurrentUser(user.user);console.log(user.user)})
        .catch(err => console.log(err.error))
        setLoading(false);
    }, []) 
    const value = {
        currentUser,setCurrentUser,
        error,setError,
        url,setUrl,
        activeForm, setActiveForm,
        server
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
