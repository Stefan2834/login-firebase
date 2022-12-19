import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from "../firebase";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate()


    async function signup(email, password) {
        return await createUserWithEmailAndPassword(auth, email, password)
        .then(info => {
            navigate('/')
        }).catch((err) => {
            setError(err);
        });
    }

    async function login (email, password) {
        return await signInWithEmailAndPassword(auth, email, password)
        .then(info => {
            navigate('/')
        }).catch((err) => {
            setError(err)
        });
    }

    async function logOut () {
        return await signOut(auth)
        .catch((err) => {
            setError(err)
        })
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logOut,
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
