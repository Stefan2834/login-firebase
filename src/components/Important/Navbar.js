import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='nav-left'>
        <div className='nav-logo'></div>
        <div className='nav-left-btn'>
          <div className='nav-left-type'>Barbati</div>
          <div className='nav-drop'>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Bluze</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/'>Pantaloni</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Scurti</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Lungi</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/'>Incaltaminte</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Adidasi</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Papuci</NavLink></div>
            </div>
          </div>
        </div>
        <div className='nav-left-btn'>
          <div className='nav-left-type'>Femei</div>
          <div className='nav-drop'>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Bluze</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/'>Pantaloni</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Scurti</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Lungi</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/'>Incaltaminte</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Adidasi</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/'>Papuci</NavLink></div>
            </div>
          </div>
        </div>
      </div>
      <div className='nav-right'></div>
    </div>
  )
}
