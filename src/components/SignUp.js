import React, {useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom';


export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error,setError] = useState();
  const [loading, setLoading] =  useState(false);


  

  async function handleSubmit(e) {
      e.preventDefault()
      
      if(passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError('Password don\'t match')
    }

    try {
        setError('')
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
    } catch (err){
        setError('Failed to create an account');
        console.log(err);
    }
    setLoading(false)
  }
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <div className='rounded-lg p-4 flex justify-around flex-col items-center bg-lime-400'>
            <p className=' text-2xl font-medium'>Sign up</p>
            <form onSubmit={handleSubmit}
            className="flex justify-around flex-col items-start m-6"
            >
                <label className='my-2 text-lg'>Email</label>
                <input className='px-2 h-7 w-80 rounded-sm' type="email" ref={emailRef} required />
                <label className='my-2 text-lg'>Password</label>
                <input className='px-2 h-7 w-80 rounded-sm' type="password" ref={passwordRef} required />
                <label className='my-2 text-lg'>Password Confirmation</label>
                <input className='px-2 h-7 w-80 rounded-sm' type="password" ref={passwordConfirmRef} required />
                <button disabled={loading} 
                className=" self-center rounded-md py-1.5 px-3 my-4 bg-blue-600 text-white"
                type="submit">Sign up
                </button>
            </form>
            <div className='text-center'>
                Already have an accound?<Link className='text-white' to='/login'>Log in</Link>
            </div>
        </div>
    </div>
    )
}
