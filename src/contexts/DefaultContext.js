import React, { createContext, useContext, useState } from 'react'

export const DefaultContext = createContext();

export function useDefault() {
    return useContext(DefaultContext)
}

export default function DefaultProvider({children}) {
    const [activeForm, setActiveForm] = useState(true)
    const [error, setError] = useState('');
    const [productLoad, setProductLoad] = useState(8);



    const value = {
        error,setError,
        activeForm, setActiveForm,
        productLoad, setProductLoad
    }
  return (
    <DefaultContext.Provider value={value}>
        {children}
    </DefaultContext.Provider>
  )
}
