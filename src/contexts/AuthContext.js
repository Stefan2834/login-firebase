import React, { createContext, useContext, useEffect, useState } from 'react'
import product1 from '../clothing/barbati-pants.jpg'
import product2 from '../clothing/barbati-shirt.jpg'
import product3 from '../clothing/femei-shoes.jpg'
import product4 from '../clothing/femei-shirt.jpg'
import axios from 'axios';

export const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading,setLoading] = useState(false);
    const [det,setDet] = useState({info:'', tel:'', email:''})
    const server = 'http://localhost:9000';
    const cart = [{
        nume:'Adidasi negri',
        pret:99.99,
        numar:1,
        poza:product1,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product2,
        sex:'woman',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product4,
        sex:'woman',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product4,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product3,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product2,
        sex:'man',
        size:'M',
    }]
    const favorite = [{
        nume:'Adidasi negri',
        pret:99.99,
        numar:1,
        poza:product1,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product2,
        sex:'woman',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product4,
        sex:'woman',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product4,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product3,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product2,
        sex:'man',
        size:'M',
    }];

    
    useEffect(() => {
        axios.get(`${server}/connect`)
        .then(user => {setCurrentUser(user.data.user);console.log(user.data.user)})
        .catch(err => console.log(err.error))
        setLoading(false);
    }, []) 

    const value = {
        currentUser,setCurrentUser,
        cart,favorite,
        det,setDet,
        loading, setLoading,
        server,
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
