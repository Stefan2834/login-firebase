import React, {useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
    const [error,setError] = useState('');
    const {currentUser, logOut} = useAuth();
    const navigate = useNavigate()




    async function handleLogout() {
        try {
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