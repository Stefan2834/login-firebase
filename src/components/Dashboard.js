import React, {useEffect}  from 'react'
import {useAuth} from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
// import {getDownloadURL, uploadBytes, ref} from 'firebase/storage'
// import { storage } from '../firebase';


const Dashboard = () => {
    const {
        currentUser, setCurrentUser,
        server,
        setError,
        url,setUrl,
        setActiveForm
    } = useAuth();
    const navigate = useNavigate()
    // const [image, setImage] = useState(null)
    // const handleChange = (e) => {
    //     if(e.target.files[0]) {
    //         setImage(e.target.files[0])
    //     }
    // }
    
    useEffect(() => {
        setError()
        if(!currentUser) {
            setActiveForm(true);
        } else {
            // getImage()
        }
    }, [])

    // async function getImage() {
    //     const imageRef = ref(storage, "image/" + currentUser.uid + "/")
    //     getDownloadURL(imageRef)
    //     .then((url) => {
    //         setUrl(url)
    //     })
    //     .catch((err) => {
    //         setError(err)
    //         setUrl('./favicon.ico')
    //     })
    // }




    // async function handleImage (e) {
    //     e.preventDefault()
    //     const imageRef = ref(storage, "image/" + currentUser.uid + "/")
    //     uploadBytes(imageRef, image)
    //     .then(() => {
    //         getDownloadURL(imageRef)
    //         .then((url) => {
    //             setUrl(url);
    //         })
    //         .catch((err) => {
    //             setError(err)
    //         });
    //         setImage(null)
    //     })
    //     .catch((err) => {
    //         setError(err)
    //     });
    // };

    async function handleLogout() {
        try {
            setError()
            setUrl()
            setActiveForm(false)
            const response = await axios.post(`${server}/connect/logout`)
            console.log(response.data);
            if(response.data.success) {
                navigate('/connect');
                setCurrentUser()
            }
        } catch {
            setError('Failed to log out')
        }
    }
    return (
        <>
          Tuci
        </>
    )
}

export default Dashboard