import React, {useEffect, useState } from 'react'
import {useAuth} from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import {getDownloadURL, uploadBytes, ref} from 'firebase/storage'
import { storage } from '../firebase';

const Dashboard = () => {
    const {
        currentUser, 
        logOut, 
        setError,
        getDatabase,
        username,
        url,setUrl
    } = useAuth();
    const navigate = useNavigate()
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    
    useEffect(() => {
        setError()
        if(!currentUser) {
            navigate('/signup');
        } else {
            getDatabase()
            getImage()
        }
    }, [])

    async function getImage() {
        const imageRef = ref(storage, "image/" + currentUser.uid + "/")
        getDownloadURL(imageRef)
        .then((url) => {
            setUrl(url)
        })
        .catch((err) => {
            setError(err)
            setUrl('./favicon.ico')
        })
    }




    async function handleImage (e) {
        e.preventDefault()
        const imageRef = ref(storage, "image/" + currentUser.uid + "/")
        uploadBytes(imageRef, image)
        .then(() => {
            getDownloadURL(imageRef)
            .then((url) => {
                setUrl(url);
            })
            .catch((err) => {
                setError(err)
            });
            setImage(null)
        })
        .catch((err) => {
            setError(err)
        });
    };

    async function handleLogout() {
        try {
            setError()
            setUrl()
            await logOut();
            navigate('/login');
        } catch {
            setError('Failed to log out')
        }
    }
    return (
        <>
        {currentUser && (
            <>
            <div className="h-12 z-20 bg-emerald-500 w-screen fixed flex items-center justify-between">
                <div></div>
                <div className='right-0 relative h-12 w-auto flex justify-center items-center'>
                    <form 
                        className='mr-1'
                        onSubmit={handleImage}
                    >
                        <input type="file" onChange={handleChange} 
                            className="w-56"
                        />
                        <input type="submit" 
                            value="Submit"
                            className='bg-red-400 rounded-sm p-1 cursor-pointer'
                        />
                    </form>
                    <div className='mr-4 w-10 h-10'>
                        <img className='bg-cover h-10 w-10 bg-no-repeat rounded-sm' src={url}></img>
                    </div>
                    <div className='mr-4 h-6 text-white w-auto'>{username}</div>
                    <div className='mr-4 h-6 text-white w-auto'>{currentUser.email}</div>
                    <div className='mr-4 cursor-pointer h-6 text-white w-auto' onClick={handleLogout}>Log out</div>
                </div>
            </div>
            {/* <div className="w-screen h-80 flex-col relative top-14 flex items-center justify-start">
                <div className='h-auto w-96 text-white mb-5 bg-emerald-500 p-2'>
                    <span className='text-xl'>Salut </span>  
                    <span className='text-md'>email</span>
                    <div className='text-gray-700 text-lg'>Salut all</div>
                </div>
            </div> */}
            </>
        )}    
        </>
    )
}

export default Dashboard