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
    const navigate = useNavigate()
    const [username, setUsername] = useState()
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    
        return unsubscribe
    }, [])
    
    async function writeUserData(email,password,username,userId) {
        const reference = ref(db, 'users/' + userId);
        await set(reference, {
            email : email,
            username : username,
            password : password,
        })
    }

    function getDatabase () {
        const nameRef = ref(db, 'users/' + currentUser.uid + '/username')
            onValue(nameRef, (snapshot) => {
                setUsername(snapshot.val());
            })
    }

    

    async function signup(email, password, username) {
        return await createUserWithEmailAndPassword(auth, email, password)
        .then(info => {
            writeUserData(email,password,username,info.user.uid)
            navigate('/')
        }).catch((err) => {
            setError(err.message);
        });
    }

    async function login (email, password) {
        return await signInWithEmailAndPassword(auth, email, password)
        .then(info => {
            navigate('/')
        }).catch((err) => {
            setError(err.message);
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
        getDatabase,
        url,setUrl,
        username
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
