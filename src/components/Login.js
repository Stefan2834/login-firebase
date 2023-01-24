import React, {useState, useRef, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom'
import passSvg from '../svg-icon/key.svg'
import googleSvg from '../svg-icon/google.svg'
import emailSvg from '../svg-icon/email-security.svg'
import meSvg from '../svg-icon/me.svg'
import checkSvg from '../svg-icon/check.svg'
import eyeTrue from '../svg-icon/eye-check.svg'
import eyeFalse from '../svg-icon/eye-off.svg'

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login,error, setError } = useAuth();
  const [loading, setLoading] =  useState(false);
  const [activeForm, setActiveForm] = useState(true)
  const [passView, setPassView] = useState([false,false,false]);
  const nameRef = useRef()

  
  
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

    <div className='acc-main'>
        <div className={activeForm ? 'container right-panel-active' : 'container'} >
            <div class='sign-up'>
                <form className='acc-form'>
                    <div className='acc-form-title'>Create an account</div>
                    <div className='acc-svg-sign'>
                        <img src={googleSvg} alt='GoogleImg' />
                    </div>
                    <div className='acc-form-text'>or use your email</div>

                    <label class='acc-label'><img className='acc-svg' src={meSvg} alt='Img' />
                        <input ref={nameRef} className='acc-input' type='text'  placeholder=' ' required minLength={5} maxLength={16}/>
                        <span className='place-holder'>Name*</span>
                    </label>
                    <label class='acc-label'><img className='acc-svg' src={emailSvg} alt='Img' />
                        <input className='acc-input' type='email' placeholder=' ' required />
                        <span className='place-holder'>Email*</span>
                    </label>
                    <label class='acc-label'><img className='acc-svg' src={passSvg} alt='Img' />
                        <input className='acc-input' type={passView[0] ? 'text' : 'password'}  placeholder=' ' minLength={6} maxLength={20} required />
                        <span className='place-holder'>Password*</span>
                        <img className='acc-svg-eye' 
                            src={passView[0] ? eyeTrue : eyeFalse} 
                            alt='Img' onClick={() => {setPassView(c => [!c[0],c[1],c[2]])}}
                            />
                    </label>
                    <label class='acc-label'><img className='acc-svg' src={checkSvg} alt='Img' />
                        <input className='acc-input' type={passView[1] ? 'text' : 'password'}  placeholder=' ' minLength={6} maxLength={20} required />
                        <span className='place-holder'>Confirm Password*</span>
                        <img className='acc-svg-eye' 
                            src={passView[1] ? eyeTrue : eyeFalse} 
                            alt='Img' onClick={() => {setPassView(c => [c[0],!c[1],c[2]])}}
                            />
                    </label>
                    <input type='submit' className='acc-submit' value='Sign Up' />
                </form>
            </div>
            <div class='sign-in'>
                <form className='acc-form'>
                <div className='acc-form-title'>Sign In</div>
                    <label class='acc-label'><img className='acc-svg' src={emailSvg} alt='Img' />
                        <input className='acc-input' type='email' placeholder=' ' required />
                        <span className='place-holder'>Email*</span>
                    </label>
                    <label class='acc-label'><img className='acc-svg' src={passSvg} alt='Img' />
                        <input className='acc-input' type={passView[2] ? 'text' : 'password'}  placeholder=' ' minLength={6} maxLength={20} required />
                        <span className='place-holder'>Password*</span>
                        <img className='acc-svg-eye' 
                            src={passView[2] ? eyeTrue : eyeFalse} 
                            alt='Img' onClick={() => {setPassView(c => [c[0],c[1],!c[2]])}}
                            />
                    </label>
                    <div className='acc-form-text'><Link to='/'>forgot your password?</Link></div>
                    <input type='submit' className='acc-submit' value='Sign In' />
                </form>
            </div>
            <div className='overlay-container'>
                <div className='overlay'>
                    <div className='overlay-left'>
                        <div className='overlay-title'>Hello Friend!</div>
                        <div className='overlay-text'>Already have an account?</div>
                        <button className='acc-btn' onClick={() => {setActiveForm(false)}}>Sign in</button>
                    </div>
                    <div className='overlay-right'>
                        <div className='overlay-title'>Welcome Back!</div>
                        <div className='overlay-text'>You don't have an account?</div>
                        <button className='acc-btn' onClick={() => {setActiveForm(true)}}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

