import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from "../firebase";
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, set, onValue } from 'firebase/database';


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
    const navigate = useNavigate()
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    
        return unsubscribe
    }, [])
    
    async function writeUserData(email,password,userId) {
        const reference = ref(db, 'users/' + userId);
        await set(reference, {
            email : email,
            password : password,
        })
    }
    async function signup(email, password) {
        return await createUserWithEmailAndPassword(auth, email, password)
        .then(info => {
            writeUserData(email,password,info.user.uid)
            navigate('/')
        }).catch((err) => {
            setError(err.code);
        });
    }

    async function login (email, password) {
        return await signInWithEmailAndPassword(auth, email, password)
        .then(info => {
            navigate('/')
        }).catch((err) => {
            setError(err.code);
        });
    }

    async function logOut () {
        return await signOut(auth)
        .catch((err) => {
            setError(err)
        })
    }
    

    const value = {
        currentUser,
        signup,
        login,
        logOut,
        error,setError,
        url,setUrl,
        activeForm, setActiveForm,
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
