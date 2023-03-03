import React, { createContext, useContext, useState } from 'react'

export const DefaultContext = createContext();

export function useDefault() {
    return useContext(DefaultContext)
}

export default function DefaultProvider({children}) {
    const [activeForm, setActiveForm] = useState(true)
    const [error, setError] = useState('');
    const [url, setUrl] = useState()



    const value = {
        error,setError,
        url,setUrl,
        activeForm, setActiveForm,
    }
  return (
    <DefaultContext.Provider value={value}>
        {children}
    </DefaultContext.Provider>
  )
}
