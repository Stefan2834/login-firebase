import React, {useState, useRef} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom'

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error,setError] = useState('');
  const [loading, setLoading] =  useState(false);

  

  async function handleSubmit(e) {
    e.preventDefault()


    try {
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
    } catch {
        setError('Failed to Log in');
    }
  }
  return (

    <>
    <div className='flex justify-center items-center w-screen h-screen'>
        <div className='rounded-lg p-4 flex justify-around flex-col items-center bg-lime-400'>
            <p className='text-2xl font-medium'>Log in</p>
            <form onSubmit={handleSubmit}
            className="flex justify-around flex-col items-start m-6"
            >
                <label className='my-2 text-lg'>Email</label>
                <input className='px-2 h-7 w-80 rounded-sm' type="email" ref={emailRef} required />
                <label className='my-2 text-lg'>Password</label>
                <input className='px-2 h-7 w-80 rounded-sm' type="password" ref={passwordRef} required />
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

