import React, {useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom'
import passSvg from '../svg-icon/key.svg'
import emailSvg from '../svg-icon/email-security.svg'
import checkSvg from '../svg-icon/check.svg'
import eyeTrue from '../svg-icon/eye-check.svg'
import eyeFalse from '../svg-icon/eye-off.svg'
import { useDefault } from '../contexts/DefaultContext';

export default function Connect() {
  const signEmailRef = useRef();
  const signPassRef = useRef();
  const signPassConfirmRef = useRef()
  const logEmailRef = useRef()
  const logPassRef = useRef()
  const {
    server,
    setCurrentUser,
  } = useAuth();
  const {
    error,setError,
    activeForm, setActiveForm
  } = useDefault() 

  const navigate = useNavigate();
  const [loading, setLoading] =  useState(false);
  const [passView, setPassView] = useState([false,false,false]);
  

  async function handleSignUp(e) {
    e.preventDefault()
    if(signPassRef.current.value !== signPassConfirmRef.current.value) {
        setError('Password don\'t match')
    } else {
        try{
            setLoading(true)
            setError()
            const response = await axios.post(`${server}/connect/signUp`, {
                email: signEmailRef.current.value,
                password: signPassRef.current.value,
            });
            if(response.data.user) {
                console.log(response.data.user)
                setCurrentUser(response.data.user)
                navigate('/')
            } else {
                console.log(response.data.message)
                setError(response.data.message)
            }
        } catch (err) {
            setError(`Failed to Signup: ${err}`)
        }
        setLoading(false);
    }
  }
  async function handleLogIn(e) {
    e.preventDefault()
    try {
        setLoading(true)
        setError('Loading...')
        const response = await axios.post(`${server}/connect/login`, {
                email: logEmailRef.current.value,
                password: logPassRef.current.value,
            });
            if(response.data.success === true) {
                console.log(response.data.user.user);
                setCurrentUser(response.data.user.user)
                navigate('/')
                setError()
            } else {
                setError(response.data.message)
            }
    } catch (err) {
        setError(err.message);
        console.error(err.message);
    }
    setLoading(false)
  }
  return (

    <div className='acc-main'>
        <div className={activeForm ? 'container right-panel-active' : 'container'} >
            <div className='sign-up'>
                <form className='acc-form' onSubmit={handleSignUp}>
                    <div className='acc-form-title'>Create an account</div>

                    <label class='acc-label'><img className='acc-svg' src={emailSvg} alt='Img' />
                        <input ref={signEmailRef} className='acc-input' type='email' placeholder=' ' required />
                        <span className='place-holder'>Email*</span>
                    </label>
                    <label className='acc-label'><img className='acc-svg' src={passSvg} alt='Img' />
                        <input ref={signPassRef} className='acc-input' type={passView[0] ? 'text' : 'password'}  placeholder=' ' minLength={6} maxLength={20} required />
                        <span className='place-holder'>Password*</span>
                        <img className='acc-svg-eye' 
                            src={passView[0] ? eyeTrue : eyeFalse} 
                            alt='Img' onClick={() => {setPassView(c => [!c[0],c[1],c[2]])}}
                            />
                    </label>
                    <label class='acc-label'><img className='acc-svg' src={checkSvg} alt='Img' />
                        <input ref={signPassConfirmRef} className='acc-input' type={passView[1] ? 'text' : 'password'}  placeholder=' ' minLength={6} maxLength={20} required />
                        <span className='place-holder'>Confirm Password*</span>
                        <img className='acc-svg-eye' 
                            src={passView[1] ? eyeTrue : eyeFalse} 
                            alt='Img' onClick={() => {setPassView(c => [c[0],!c[1],c[2]])}}
                            />
                    </label>
                    {error && (
                        <div className=' text-red-600'>{error}</div>
                    )}
                    <button disabled={loading} type='submit' className='acc-submit'>Sign Up</button>
                    <div className='acc-submit'><Link to='/main'>Ramai Anonim</Link></div>
                </form>
            </div>
            <div class='sign-in'>
                <form className='acc-form' onSubmit={handleLogIn}>
                <div className='acc-form-title'>Sign In</div>
                    <label class='acc-label'><img className='acc-svg' src={emailSvg} alt='Img' />
                        <input ref={logEmailRef} className='acc-input' type='email' placeholder=' ' required />
                        <span className='place-holder'>Email*</span>
                    </label>
                    <label class='acc-label'><img className='acc-svg' src={passSvg} alt='Img' />
                        <input ref={logPassRef} className='acc-input' type={passView[2] ? 'text' : 'password'}  placeholder=' ' minLength={6} maxLength={20} required />
                        <span className='place-holder'>Password*</span>
                        <img className='acc-svg-eye' 
                            src={passView[2] ? eyeTrue : eyeFalse} 
                            alt='Img' onClick={() => {setPassView(c => [c[0],c[1],!c[2]])}}
                            />
                    </label>
                    <div className='acc-form-text'><Link to='/'>forgot your password?</Link></div>
                    {error && (
                        <div className=' text-red-600'>{error}</div>
                    )}
                    <button disabled={loading} className='acc-submit' type='submit'>Sign In</button>
                </form>
            </div>
            <div className='overlay-container'>
                <div className='overlay'>
                    <div className='overlay-left'>
                        <div className='overlay-title'>Hello Friend!</div>
                        <div className='overlay-text'>Already have an account?</div>
                        <button className='acc-btn' onClick={() => {setActiveForm(false); setError()}}>Sign in</button>
                    </div>
                    <div className='overlay-right'>
                        <div className='overlay-title'>Welcome Back!</div>
                        <div className='overlay-text'>You don't have an account?</div>
                        <button className='acc-btn' onClick={() => {setActiveForm(true); setError()}}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

