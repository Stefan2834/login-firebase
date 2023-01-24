import React, {useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom'
import passSvg from '../svg-icon/key.svg'
import googleSvg from '../svg-icon/google.svg'
import emailSvg from '../svg-icon/email-security.svg'
import checkSvg from '../svg-icon/check.svg'
import eyeTrue from '../svg-icon/eye-check.svg'
import eyeFalse from '../svg-icon/eye-off.svg'

export default function Connect() {
  const signEmailRef = useRef();
  const signPassRef = useRef();
  const signPassConfirmRef = useRef()
  const logEmailRef = useRef()
  const logPassRef = useRef()
  const {
    loginEmail,
    signupEmail,
    loginGoogle,
    error,setError,
    activeForm, setActiveForm
  } = useAuth();
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
            await signupEmail(signEmailRef.current.value, signPassRef.current.value)
        } catch {
            setError(`Failed to Signup`)
        }
    }
  }
  async function handleLogIn(e) {
    e.preventDefault()
    try {
        setLoading(true)
        setError()
        await loginEmail(logEmailRef.current.value, logPassRef.current.value)
    } catch {
        setError('Failed to Login');
    }
    setLoading(false)
  }
  return (

    <div className='acc-main'>
        <div className={activeForm ? 'container right-panel-active' : 'container'} >
            <div class='sign-up'>
                <form className='acc-form' onSubmit={handleSignUp}>
                    <div className='acc-form-title'>Create an account</div>

                    <label class='acc-label'><img className='acc-svg' src={emailSvg} alt='Img' />
                        <input ref={signEmailRef} className='acc-input' type='email' placeholder=' ' required />
                        <span className='place-holder'>Email*</span>
                    </label>
                    <label class='acc-label'><img className='acc-svg' src={passSvg} alt='Img' />
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
                </form>
            </div>
            <div class='sign-in'>
                <form className='acc-form' onSubmit={handleLogIn}>
                <div className='acc-form-title'>Sign In</div>
                    <div>
                        <img src={googleSvg} alt='GoogleImg' className='acc-svg-sign' onClick={() => loginGoogle()} />
                    </div>
                    <div className='acc-form-text'>or use your email</div>

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

