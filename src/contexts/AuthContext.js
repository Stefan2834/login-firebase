import { 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from "../firebase";
import { useNavigate } from 'react-router-dom';
// import { db } from '../firebase';
// import { ref, set, onValue } from 'firebase/database';


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
    const provider = new GoogleAuthProvider()
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    
        return unsubscribe
    }, []) 
    async function signupEmail(email, password) {
        return await createUserWithEmailAndPassword(auth, email, password)
        .then(info => {
            navigate('/')
        }).catch((err) => {
            setError(err.code);
        });
    }
    async function loginEmail (email, password) {
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
    async function loginGoogle () {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(credential);
            setUrl(result.user.photoURL)
            navigate('/')
        }).catch((error) => {
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential)
        });
        }
    

    const value = {
        currentUser,
        signupEmail,
        loginEmail,
        loginGoogle,
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
