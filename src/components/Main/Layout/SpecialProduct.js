import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export default function SpecialProduct() {
    const { idPath } = useParams()
    const { product } = useAuth()

    const specialClothing = product.find(item => item.id === idPath);

    return (
    <div className='special'>
    {specialClothing ? (
      <div className='cloth-photo'>
        {specialClothing.nume} <br />
        {specialClothing.price}
        <img src={specialClothing.photo} alt='Poza produs' className='w-64 h-128'/>
      </div>
    ) : (
      <div className="mt-14 m-auto">
        Acest produs nu exista, sau a fost sters
      </div>
    )}
    </div>
  )
}
