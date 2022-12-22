import React, {useEffect, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import { db } from '../firebase';
import { ref, onValue} from 'firebase/database';

const Dashboard = () => {
    const {
        currentUser, 
        logOut, 
        error, setError,
    } = useAuth();
    const navigate = useNavigate()
    const [username, setUsername] = useState();
    const [background, setBackground] = useState();
    const [proba, setProba] = useState([]);

    function getDatabase () {
        const nameRef = ref(db, 'users/' + currentUser.uid + '/username')
            onValue(nameRef, (snapshot) => {
                setUsername(snapshot.val());
            })
        const photoRef = ref(db, 'users/' + currentUser.uid + '/backgroundImage')
            onValue(photoRef, (snapshot) => {
                if(snapshot.val() === null) {
                    setBackground('./favicon.ico');
                } else {
                    setBackground(snapshot.val());
                }
    })}
    
    useEffect(() => {
        setError()
        if(!currentUser) {
            navigate('/signup');
            getDatabase()
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
            <div className="h-12  bg-emerald-500 w-screen fixed flex items-center justify-between">
                <div className="">
                    
                </div>
                <div className='right-0 relative h-12 w-auto flex justify-center items-center'>
                    <div className='mr-4 w-10 h-10'>
                        <img className='bg-cover bg-no-repeat' src={background}></img>
                    </div>
                    <div className='mr-4 h-6 text-white w-auto'>{username}</div>
                    <div className='mr-4 h-6 text-white w-auto'>{currentUser.email}</div>
                    <div className='mr-4 cursor-pointer h-6 text-white w-auto' onClick={handleLogout}>Log out</div>
                </div>
            </div>
        )}    
        </>
    )
}

export default Dashboard