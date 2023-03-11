import React, { createContext, useContext, useEffect, useState } from 'react'
import manPants from '../clothing/man/barbati-pants.jpg'
import manTshirtBlack from '../clothing/man/barbati-shirt.jpg'
import bluza from '../clothing/man/bluza.jpg'
import tricouGalben from '../clothing/man/bluza-galbena.jpg'
import hanoracAlb from '../clothing/man/hanorac-alb.jpg'
import hanoracGalben from '../clothing/man/hanorac-galbne.jpg'
import hanoracNegru from '../clothing/man/hanorac-negru.jpg'
import hanoracRosu from '../clothing/man/hanorac-rosu.jpg'
import tricouAlb from '../clothing/man/tricou-alb.jpg'
import tricouGri from '../clothing/man/tricou-negru.jpg'
import axios from 'axios';

export const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading,setLoading] = useState(false);
    const [det,setDet] = useState({info:'', tel:'', email:'', name:''})
    const server = process.env.REACT_APP_SERVER
    const [filter, setFilter] = useState({
      minPrice:'',
      maxPrice:'',
      size: '',
      sort:''
    })
    const [cart, setCart] = useState([{
      nume:'Pantaloni Negri',
      price:99.99,
      numar:1,
      photo:manPants,
      sex:'man',
      size:'M',
    }])
    const [favorite, setFavorite] = useState([])
    const [product, setProduct] = useState([{
      nume:'Tricou Negru',
      price:29.99,
      photo:manTshirtBlack,
      sex:'man',
      size:['S','M','Xl'],
      type:'man top tricouri',
      id:'0'
    }, {
      nume:'Tricou Albastru',
      price:29.99,
      photo:tricouGri,
      sex:'man',
      size:['S','M','L'],
      type:'man top tricouri',
      id:'1'
    }, {
      nume:'Bluza Dungi',
      price:79.99,
      photo:bluza,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'2'
    }, {
      nume:'Tricou Pac Man',
      price:49.99,
      photo:tricouGalben,
      sex:'man',
      size:['Xs','M','Xl'],
      type:'man top tricouri',
      id:'3'
    }, {
      nume:'Hanorac Alb',
      price:149.99,
      photo:hanoracAlb,
      sex:'woman',
      size:['S','M','Xl'],
      type:'man top bluze',
      id:'4'
    }, {
      nume:'Hanorac Galben',
      price:99.99,
      photo:hanoracGalben,
      sex:'man',
      size:['S','M','Xl'],
      type:'man top bluze',
      id:'5'
    }, {
      nume:'Hanorac Negru',
      price:129.99,
      photo:hanoracNegru,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'6'
    }, {
      nume:'Hanorac Rosu',
      price:89.99,
      photo:hanoracRosu,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'7'
    }, {
      nume:'Tricou Alb',
      price:49.99,
      photo:tricouAlb,
      sex:'man',
      size:['Xs','M','Xl'],
      type:'man top tricouri'  ,
      id:'8'
    }, {
      nume:'Tricou Negru',
      price:29.99,
      photo:manTshirtBlack,
      sex:'man',
      size:['S','M','Xl'],
      type:'man top tricouri',
      id:'0'
    }, {
      nume:'Tricou Albastru',
      price:29.99,
      photo:tricouGri,
      sex:'man',
      size:['S','M','L'],
      type:'man top tricouri',
      id:'1'
    }, {
      nume:'Bluza Dungi',
      price:79.99,
      photo:bluza,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'2'
    }, {
      nume:'Tricou Pac Man',
      price:49.99,
      photo:tricouGalben,
      sex:'man',
      size:['Xs','M','Xl'],
      type:'man top tricouri',
      id:'3'
    }, {
      nume:'Hanorac Alb',
      price:149.99,
      photo:hanoracAlb,
      sex:'woman',
      size:['S','M','Xl'],
      type:'man top bluze',
      id:'4'
    }, {
      nume:'Hanorac Galben',
      price:99.99,
      photo:hanoracGalben,
      sex:'man',
      size:['S','M','Xl'],
      type:'man top bluze',
      id:'5'
    }, {
      nume:'Hanorac Negru',
      price:129.99,
      photo:hanoracNegru,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'6'
    }, {
      nume:'Hanorac Rosu',
      price:89.99,
      photo:hanoracRosu,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'7'
    }, {
      nume:'Tricou Alb',
      price:49.99,
      photo:tricouAlb,
      sex:'man',
      size:['Xs','M','Xl'],
      type:'man top tricouri'  ,
      id:'8'
    }, {
      nume:'Tricou Negru',
      price:29.99,
      photo:manTshirtBlack,
      sex:'man',
      size:['S','M','Xl'],
      type:'man top tricouri',
      id:'0'
    }, {
      nume:'Tricou Albastru',
      price:29.99,
      photo:tricouGri,
      sex:'man',
      size:['S','M','L'],
      type:'man top tricouri',
      id:'1'
    }, {
      nume:'Bluza Dungi',
      price:79.99,
      photo:bluza,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'2'
    }, {
      nume:'Tricou Pac Man',
      price:49.99,
      photo:tricouGalben,
      sex:'man',
      size:['Xs','M','Xl'],
      type:'man top tricouri',
      id:'3'
    }, {
      nume:'Hanorac Alb',
      price:149.99,
      photo:hanoracAlb,
      sex:'woman',
      size:['S','M','Xl'],
      type:'man top bluze',
      id:'4'
    }, {
      nume:'Hanorac Galben',
      price:99.99,
      photo:hanoracGalben,
      sex:'man',
      size:['S','M','Xl'],
      type:'man top bluze',
      id:'5'
    }, {
      nume:'Hanorac Negru',
      price:129.99,
      photo:hanoracNegru,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'6'
    }, {
      nume:'Hanorac Rosu',
      price:89.99,
      photo:hanoracRosu,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'7'
    }, {
      nume:'Tricou Alb',
      price:49.99,
      photo:tricouAlb,
      sex:'man',
      size:['Xs','M','Xl'],
      type:'man top tricouri'  ,
      id:'8'
    }, {
      nume:'Tricou Negru',
      price:29.99,
      photo:manTshirtBlack,
      sex:'man',
      size:['S','M','Xl'],
      type:'man top tricouri',
      id:'0'
    }, {
      nume:'Tricou Albastru',
      price:29.99,
      photo:tricouGri,
      sex:'man',
      size:['S','M','L'],
      type:'man top tricouri',
      id:'1'
    }, {
      nume:'Bluza Dungi',
      price:79.99,
      photo:bluza,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'2'
    }, {
      nume:'Tricou Pac Man',
      price:49.99,
      photo:tricouGalben,
      sex:'man',
      size:['Xs','M','Xl'],
      type:'man top tricouri',
      id:'3'
    }, {
      nume:'Hanorac Alb',
      price:149.99,
      photo:hanoracAlb,
      sex:'woman',
      size:['S','M','Xl'],
      type:'man top bluze',
      id:'4'
    }, {
      nume:'Hanorac Galben',
      price:99.99,
      photo:hanoracGalben,
      sex:'man',
      size:['S','M','Xl'],
      type:'man top bluze',
      id:'5'
    }, {
      nume:'Hanorac Negru',
      price:129.99,
      photo:hanoracNegru,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'6'
    }, {
      nume:'Hanorac Rosu',
      price:89.99,
      photo:hanoracRosu,
      sex:'man',
      size:['S','M','L'],
      type:'man top bluze',
      id:'7'
    }, {
      nume:'Tricou Alb',
      price:49.99,
      photo:tricouAlb,
      sex:'man',
      size:['Xs','M','Xl'],
      type:'man top tricouri'  ,
      id:'8'
    }])
    
    useEffect(() => {
        axios.get(`${server}/connect`)
        .then(user => {setCurrentUser(user.data.user);console.log(user.data.user)})
        .catch(err => console.log(err.error))
        setLoading(false);
    }, []) 

    const value = {
        currentUser,setCurrentUser,
        cart,favorite,setFavorite,
        det,setDet,
        loading, setLoading,
        server,product, setProduct,
        filter,setFilter
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
