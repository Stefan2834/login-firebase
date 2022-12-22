import React, {useState, useRef, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom'

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login,error, setError } = useAuth();
  const [loading, setLoading] =  useState(false);

  useEffect(() => {
    setError()
  }, [])
  

  

  async function handleSubmit(e) {
    e.preventDefault()


    try {
        setLoading(true)
        setError()
        await login(emailRef.current.value, passwordRef.current.value)
    } catch {
        setError('Failed to Log in');
    }
    setLoading(false)
  }
  return (

    <>
    <div className='flex justify-center items-center w-screen h-screen'>
        <div className='rounded-lg p-4 flex justify-around flex-col items-center bg-emerald-500'>
            <p className='text-2xl font-medium'>Log in</p>
            <form onSubmit={handleSubmit}
            className="flex justify-around flex-col items-start m-6"
            >
                {error && (
                   <div className='text-lg flex justify-start items-center text-white p-2 w-80 rounded-lg bg-red-500'>{error}</div>
                )}
                <label className='my-2 text-lg'>Email</label>
                <input className='px-2 h-7 w-80 rounded-sm focus:outline-none' type="email" ref={emailRef} required />
                <label className='my-2 text-lg'>Password</label>
                <input className='px-2 h-7 w-80 rounded-sm focus:outline-none' type="password" ref={passwordRef} required />
                <button disabled={loading} className="self-center rounded-md py-1.5 px-3 my-4 bg-blue-600 text-white" type="submit">Log in</button>
            </form>
            <div className='text-center'>
                Need an account?<Link className='text-white' to='/signup'>Sing up</Link>
            </div>
        </div>
    </div>
    </>
    )
}

