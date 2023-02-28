import React from 'react'
import { NavLink } from 'react-router-dom'
import product from '../../clothing/barbati-shoes.jpg'

export default function Navbar() {
  const currentUser = true;
  const cart = [{
    nume:'Sosete din bumbac',
    pret:99.99,
    numar:1,
    poza:product
  }, {
    nume:'Sosete din bumbac',
    pret:99.99,
    numar:1,
    poza:product
  }];
  const favorite= [{
    nume:'Sosete din bumbac',
    pret:99.99,
    numar:1,
    poza:product
  }, {
    nume:'Sosete din bumbac',
    pret:99.99,
    numar:1,
    poza:product
  }]
  return (
    <div className='navbar'>
      <div className='nav-left'>
        <div className='nav-logo'>Fashionista</div>
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
      <div className='nav-right'>
        <div className='nav-icon'>
          <div className='nav-drop-right nav-spec'>
          <div className='nav-fav-title'>Favorite</div>
          {currentUser ? (
              !favorite ? (
                <div className='nav-not'>Nu ai nimic la favorite!</div>
              ) : (
                favorite.map(product => {
                  return (
                    <NavLink to='/'><div className='nav-fav'>
                      <img src={product.poza} alt='Poza' className='nav-fav-photo'/>
                      <div className='nav-fav-nume'>{product.nume}</div>
                      <div className='nav-fav-flex'>
                        <div className='nav-fav-price'>{product.pret}RON</div>
                      </div>
                    </div></NavLink>
                  )
                })
              )
            ) : (
              <div className='nav-connect'><NavLink to='/'>Nu esti conectat!</NavLink></div>
            )}
          </div>
        </div>
        <div className='nav-icon'>
          <div className='nav-drop-right nav-spec'>
          <div className='nav-fav-title'>Cosul meu</div>
          {currentUser ? (
              !cart ? (
                <div className='nav-not'>Nu ai nimic in cos!</div>
              ) : (
                cart.map(product => {
                  return (
                    <NavLink to='/'><div className='nav-fav'>
                      <img src={product.poza} alt='Poza' className='nav-fav-photo'/>
                      <div className='nav-fav-nume'>{product.nume}</div>
                      <div className='nav-fav-flex'>
                        <div className='nav-fav-price'>{product.pret}RON</div>
                        <div className='nav-fav-nr'>X{product.numar}</div>
                      </div>
                    </div></NavLink>
                  )
                })
              )
            ) : (
              <div className='nav-connect'><NavLink to='/'>Nu esti conectat!</NavLink></div>
            )}
          </div>
        </div>
        <div className='nav-icon'>
          <div className='nav-drop-right nav-spec'>
          {currentUser ? (
              <>
              <div className='nav-profile-email'>iosifs617@gmail.com</div>
              <div className='nav-profile-more'><NavLink to='/'>Profilul meu</NavLink></div>
              </>
            ) : (
              <div className='nav-connect'><NavLink to='/'>Nu esti conectat!</NavLink></div>
            )}
          </div>
        </div>
        <div className='nav-icon'>
          <div className='nav-drop-right'>
            Setari
          </div>
        </div>
      </div>
    </div>
  )
}
