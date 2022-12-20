import React, {useEffect} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
    const {currentUser, logOut, error, setError} = useAuth();
    const navigate = useNavigate()


    useEffect(() => {
        setError()
        if(!currentUser) {
            navigate('/signup');
        }
    }, [])



    async function handleLogout() {
        try {
            setError()
            await logOut();
            navigate('/login');
        } catch {
            setError('Failed to log out')
        }
    }
    return (
        <>
        {currentUser && (
        <div className='flex justify-center items-center w-screen h-screen'>
            <div className='rounded-lg p-4 flex justify-around flex-col items-center bg-lime-400'>
                <p className='text-2xl font-medium'>Profile</p>
                <p className=' text-base mt-2'>Email: {currentUser.email}</p>
                {error && (
                   <div className='mt-2 text-lg flex justify-start items-center text-white p-2 rounded-lg bg-red-500'>{error}</div>
                )}
                <div className='text-center flex justify-around flex-col items-start m-6'>
                  <button className='text-white' onClick={() => {handleLogout()}}>Log out</button>
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default Dashboard