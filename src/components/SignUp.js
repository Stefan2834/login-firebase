import React, {useEffect, useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom';


export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef()
  const { 
    signup, 
    error, setError,
  } = useAuth();
  const [loading, setLoading] =  useState(false); 

  useEffect(() => {
    setError()
  }, [])


    async function handleSubmit(e) {
        e.preventDefault()
      
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password don\'t match')
        } else {
            try {
                setLoading(true)
                setError();
                await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)
            } catch (err){
                setError('Failed to create an account');
            }
        }
        setLoading(false)

  }
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <div className='rounded-lg p-4 flex justify-around flex-col items-center bg-emerald-500'>
            <p className=' text-2xl font-medium'>Sign up</p>
            <form onSubmit={handleSubmit}
            className="flex justify-around flex-col items-start m-6"
            >
                {error && (
                   <div className='text-lg flex justify-start items-center text-white p-2 w-80 rounded-lg bg-red-500'>{error}</div>
                )}
                <label className='my-2 text-lg'>Username</label>
                <input className='px-2 h-7 w-80 rounded-sm focus:outline-none' type="name" ref={usernameRef} required />
                <label className='my-2 text-lg'>Email</label>
                <input className='px-2 h-7 w-80 rounded-sm focus:outline-none' type="email" ref={emailRef} required />
                <label className='my-2 text-lg'>Password</label>
                <input className='px-2 h-7 w-80 rounded-sm focus:outline-none' type="password" ref={passwordRef} required />
                <label className='my-2 text-lg'>Password Confirmation</label>
                <input className='px-2 h-7 w-80 rounded-sm focus:outline-none' type="password" ref={passwordConfirmRef} required />
                <button disabled={loading} 
                className=" self-center rounded-md py-1.5 px-3 my-4 bg-blue-600 text-white"
                type="submit">Sign up
                </button>
            </form>
            <div className='text-center'>
                Already have an account?<Link className='text-white' to='/login'>Log in</Link>
            </div>
        </div>
    </div>
    )
}
