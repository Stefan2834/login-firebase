import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext';
import useLocalStorage from '../CustomHook/useLocalStorage'

export const DefaultContext = createContext();

export function useDefault() {
    return useContext(DefaultContext)
}

export default function DefaultProvider({children}) {
    const [activeForm, setActiveForm] = useState(true)
    const [error, setError] = useState('');
    const [darkTheme, setDarkTheme] = useLocalStorage('dark',false)
    const [productLoad, setProductLoad] = useState(8);
    const {currentUser,favorite, setFavorite,cart, setCart} = useAuth()

    useEffect(() => {
      if(darkTheme) {
        document.documentElement.style.setProperty("--black", '#fff')
        document.documentElement.style.setProperty("--dark-principal", '#fff')
        document.documentElement.style.setProperty("--color", 'black')
        document.documentElement.style.setProperty("--color-second",'#0b0b0b' )
        document.documentElement.style.setProperty("--color-oposite", '#fff')
        document.documentElement.style.setProperty("--color-third", '#1c1c1c')
      } else {
        document.documentElement.style.setProperty("--black", '#0b0b0b')
        document.documentElement.style.setProperty("--dark-principal", '#0b0b0b')
        document.documentElement.style.setProperty("--color", 'white')
        document.documentElement.style.setProperty("--color-second",'#eee' )
        document.documentElement.style.setProperty("--color-oposite", '#0b0b0b')
        document.documentElement.style.setProperty("--color-third", '#ddd')
      }
    }, [darkTheme])
    

    const favAdd = (product) => {
      if(currentUser) {
        setFavorite([...favorite, product])
      } else {
        alert('Nu esti conectat!')
      }
    }

    const favRemove = (product) => {
      setFavorite(favorite.filter(fav => fav.id !== product.id))
    }

    const cartAdd = (product) => {
      if(currentUser) {
        setCart([...cart, product])
      } else {
        alert('Nu esti conectat!')
      }
    }

    const cartRemove = (product) => {
      setCart(cart.filter(cart => cart.id !== product.id))
    }



    const value = {
        error,setError,
        activeForm, setActiveForm,
        productLoad, setProductLoad,
        favAdd, favRemove,
        cartAdd, cartRemove, 
        darkTheme, setDarkTheme
    }
  return (
    <DefaultContext.Provider value={value}>
        {children}
    </DefaultContext.Provider>
  )
}
