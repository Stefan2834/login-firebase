import React, { createContext, useContext, useEffect, useState } from 'react'
import product1 from '../clothing/barbati-pants.jpg'
import product2 from '../clothing/barbati-shirt.jpg'
import product3 from '../clothing/femei-shoes.jpg'
import product4 from '../clothing/femei-shirt.jpg'
import axios from 'axios';

export const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);
    const server = 'http://localhost:9000';
    const cart = [{
        nume:'Adidasi negri',
        pret:99.99,
        numar:1,
        poza:product1,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product2,
        sex:'woman',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product4,
        sex:'woman',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product4,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product3,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product2,
        sex:'man',
        size:'M',
    }]
    const favorite = [{
        nume:'Adidasi negri',
        pret:99.99,
        numar:1,
        poza:product1,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product2,
        sex:'woman',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product4,
        sex:'woman',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product4,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product3,
        sex:'man',
        size:'M',
      }, {
        nume:'Sosete din bumbac',
        pret:99.99,
        numar:1,
        poza:product2,
        sex:'man',
        size:'M',
    }];
    const [det,setDet] = useState({
      info:'Strada Grivitei Nr 283 Scara 2 Bloc 6 Ap 43',
      tel:'0712345678',
      email:'eu.eu'
    })

    // async function dbAddProfile (userId, name, photo) {
    //   const addProfileRef = ref(db, 'users/' + userId + '/profile/')
    //   const newAddProfileRef = push(addProfileRef)
    //   try {
    //       await set(newAddProfileRef, [name, {}])
    //   } catch (err) {
    //       setError(err)
    //   }
    // }
    // async function dbDeleteProfile (userId,name, photo) {
    //     const deleteProfileRef = ref(db, 'users/' + userId + '/profile/');
    //     const deleteAvatarRef = ref(db, 'users/' + userId + '/avatar/');
    //     if(todos.length === 1 && photos.length === 1) {
    //         setTodos([])
    //         setPhotos([])
    //     }
    //     onValue(deleteProfileRef, (snapshot) => {
    //         snapshot.forEach((childSnapshot) => {
    //             const profileKey = childSnapshot.key;
    //             const profileData = childSnapshot.val();
    //             if(profileData[0] === name) {
    //                 remove(ref(db, 'users/' + userId + '/profile/' + profileKey + '/'))
    //             }
    //         });
    //     }, {
    //         onlyOnce:true
    //     })
    //     navigate('/')
    // }
    // async function dbChangePhoto (userId,photo,currentPhoto) {
    //     const changePhotoRef = ref(db, 'users/' + userId + '/avatar/')
    //     onValue(changePhotoRef, (snapshot) => {
    //         snapshot.forEach((childSnapshot) => {
    //             const avatarKey = childSnapshot.key;
    //             const avatarData = childSnapshot.val();
    //             if(avatarData[0] === currentPhoto[0]) {
    //                 const updates = {};
    //                 updates['users/' + userId + '/avatar/' + avatarKey + '/'] = [photo];
    //                 return update(ref(db), updates)
    //             }
    //         });
    //     }, {
    //         onlyOnce:true
    //     })
    //     navigate('/')
    //     RenderDefault()
    // }
    // async function writeUserData(email,password,userId) {
    //     const reference = ref(db, 'users/' + userId + '/');
    //     await set(reference, {
    //         email : email,
    //         password : password,
    //     })
    // }
    // async function dbFilme () {
    //     const filmeRef = ref(db, 'filme/')
    //     onValue(filmeRef, (snapshot) => {
    //         if(snapshot.val() !== null) {
    //             const sort = Object.values(snapshot.val()).sort(sortFilme)
    //             function sortFilme (a,b) {
    //                 return 0.5 - Math.random()
    //             }
    //             setFilme(sort);
    //         }
    //     })
    // }
    // async function dbList (userId,name) {
    //     const listRef = ref(db, 'users/' + userId + '/profile/')
    //     onValue(listRef, (snapshot) => {
    //         snapshot.forEach((childSnapshot) => {
    //             const profileKey = childSnapshot.key;
    //             const profileData = childSnapshot.val();
    //             if(name === profileData[0]) {
    //                 const profileListRef = ref(db, 'users/' + userId + '/profile/' + profileKey + '/')
    //                 onValue(profileListRef, (snapshot) => {
    //                     if(snapshot.val()[1] != null) {
    //                         dispatch({type:'getDb',payload:{value: snapshot.val()[1]}})
    //                     }
    //                 })
    //             }
    //         });
    //     }, {
    //         onlyOnce:true
    //     })
    // }
    // async function dbUpdateList (userId,name) {
    //     const listRef = ref(db, 'users/' + userId + '/profile/')
    //     onValue(listRef, (snapshot) => {
    //         snapshot.forEach((childSnapshot) => {
    //             const listKey = childSnapshot.key;
    //             const listData = childSnapshot.val();
    //             if(name === listData[0]) {
    //                 const updates = {};
    //                 updates['users/' + userId + '/profile/' + listKey + '/'] = [name,  list];
    //                 update(ref(db), updates)
    //             }
    //         })
    //     }, {
    //         onlyOnce:true
    //     })
    // }

    
    useEffect(() => {
        axios.get(`${server}/connect`)
        .then(user => {setCurrentUser(user.data.user);console.log(user.data.user)})
        .catch(err => console.log(err.error))
        setLoading(false);
    }, []) 

    const value = {
        currentUser,setCurrentUser,
        cart,favorite,
        det,setDet,
        loading, setLoading,
        server,
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
