import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useDefault } from '../../../contexts/DefaultContext'

export default function SpecialProduct() {
  const { idPath } = useParams()
  const { product, favorite } = useAuth()
  // const { favAdd, favRemove} = useDefault()
  const [zoom, setZoom] = useState(false);

  const specialClothing = product.find(item => item.id === idPath);

  return (
    <div className='special'>
      {specialClothing ? (
        <div className='special-div'>
          <div className={zoom ? 'special-photo-zoom' : "special-photo"}>
            <img src={specialClothing.photo} alt='Poza produs'
              onClick={() => setZoom(z => !z)}
              className='special-img'
            />
          </div>
          <div className={specialClothing.sex === 'man' ? 'cloth-det cloth-grad-man' : 'cloth-det cloth-grad-woman'}>
            <div className="cloth-left">
              <div className="cloth-name">
                {specialClothing.nume}
              </div>
              <div className="cloth-price">
                {specialClothing.price} <span className="font-medium">Lei</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-14 m-auto">
          Acest produs nu exista, sau a fost sters
        </div>
      )}
    </div>
  )
}
