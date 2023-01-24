import React, {useState, useRef, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom'

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login,error, setError } = useAuth();
  const [loading, setLoading] =  useState(false);
  const [activeForm, setActiveForm] = useState(false)

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
    <div className={activeForm ? 'container right-panel-active' : 'container'} >
        <div class='sign-up'>
            <form action='#'>
                <h1>Create Account</h1>
                <div class='social-container'>
                    <Link to='#' className='social'><i className='fa-solid fa-facebook' /></Link>
                    <Link to='#' className='social'><i className='fa-solid fa-facebook' /></Link>
                    <Link to='#' className='social'><i className='fa-solid fa-facebook' /></Link>
                </div>
                <p>or use your account</p>
                <input type='text' name='txt' placeholder='Name' required />
                <input type='email' name='txt' placeholder='Email' required />
                <input type='password' name='txt' placeholder='Password' required />
                <button>Sign Up</button>
            </form>
        </div>
        <div class='sign-in'>
            <form action='#'>
                <h1>Connect</h1>
                <div class='social-container'>
                    <Link to='#' className='social'><i className='fa-solid fa-facebook' /></Link>
                    <Link to='#' className='social'><i className='fa-solid fa-facebook' /></Link>
                    <Link to='#' className='social'><i className='fa-solid fa-facebook' /></Link>
                </div>
                <input type='text' name='txt' placeholder='Name' required />
                <input type='email' name='txt' placeholder='Email' required />
                <input type='password' name='txt' placeholder='Password' required />
                <Link to='#'>Forget your pass?</Link>
                <button>Sign in</button>
            </form>
        </div>
        <div className='overlay-container'>
            <div className='overlay'>
                <div className='overlay-left'>
                    <h1>Welcome back</h1>
                    <p>Blalalallaall</p>
                    <button className='signIn' onClick={() => {setActiveForm(false)}}>Sign in</button>
                </div>
                <div className='overlay-right'>
                    <h1>Hello</h1>
                    <p>Blalalallaall</p>
                    <button className='signUp' onClick={() => {setActiveForm(true)}}>Sign up</button>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

