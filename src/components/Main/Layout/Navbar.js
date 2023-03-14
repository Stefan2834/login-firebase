import React, {useState} from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import axios from 'axios'
import { useDefault } from '../../../contexts/DefaultContext'


export default function Navbar() {
  const {
    currentUser,
    favorite,
    cart,
    setCurrentUser,
    server, 
  } = useAuth()
  const {setError,setActiveForm,
    favRemove, cartRemove,
    darkTheme, setDarkTheme
  } = useDefault()
  const navigate = useNavigate()
  
  async function handleLogout() {
    try {
        setError()
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
    <div className='navbar'>
      <div className='nav-left'>
        <div className='nav-logo'><Link to='/main'>Fashionista</Link></div>
        <div className='nav-left-btn'>
          <div className='nav-left-type'>Barbati</div>
          <div className='nav-drop'>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/man top'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man top tricouri'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man top bluze'>Bluze</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/man bottom'>Pantaloni</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man bottom scurti'>Scurti</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man bottom lungi'>Lungi</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/man foot'>Incaltaminte</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man foot adidasi'>Adidasi</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man foot papuci'>Papuci</NavLink></div>
            </div>
          </div>
        </div>
        <div className='nav-left-btn'>
          <div className='nav-left-type'>Femei</div>
          <div className='nav-drop'>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/woman top'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman top tricouri'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman top bluze'>Bluze</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/woman bottom'>Pantaloni</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman bottom scurti'>Scurti</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman bottom lungi'>Lungi</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/woman foot'>Incaltaminte</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman foot adidasi'>Adidasi</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman foot papuci'>Papuci</NavLink></div>
            </div>
          </div>
        </div>
      </div>
      <div className='nav-right'>
        <div className='nav-theme'>
          <label>
            <input type='checkbox' value={darkTheme} className='nav-theme-input'
              onChange={() => setDarkTheme(c => !c)} 
            />
            <span className='nav-switch'>
              <span className={darkTheme ? 'nav-handle' : 'nav-handle-dark'}/>
            </span>
          </label>
        </div>
        <div className='nav-icon'>
          <div className={darkTheme ? 'nav-icon-dark-img1' : 'nav-icon-img1'} onClick={() => {navigate('/main/fav')}}/>
          <div className='nav-drop-right nav-spec'>
          <div className='nav-fav-title'>Favorite</div>
         {currentUser ? (
              favorite.length === 0 ? (
                <div className='nav-none'>Nu ai nimic la favorite!</div>
              ) : (
                <>
                {favorite.map((product,index) => {
                  if(index < 4) {
                    return (
                      <Link to={`/product/${product.id}`}>
                      <div className={product.sex === 'man' ? (
                          'nav-fav nav-fav-man'
                        ) : (
                          'nav-fav nav-fav-woman'
                        )}>
                        <img src={product.photo} alt='Poza' className='nav-fav-photo'/>
                        <div className='nav-fav-flex'>
                          <div className='nav-fav-nume'>{product.nume}</div>
                          <div className='nav-fav-price'>{product.price} Lei
                            <div className='nav-fav-del1' onClick={e => {e.preventDefault(); favRemove(product)}} />
                          </div>
                        </div>
                      </div>
                      </Link>
                    )
                  } else if(index === 4) { return (
                    <div>
                      + Alte {favorite.length - 4} produse  
                    </div>
                  )}
                })}
                <div className='nav-tot'><Link className='flex' to='/main/fav'>Vezi Favoritele<div className={darkTheme ? 'nav-arrow-dark' :'nav-arrow'} /></Link></div>
                </>
                )
            ) : (
              <div className='nav-connect'><NavLink to='/connect'>Conecteaza-te</NavLink></div>
            )}
          </div>
        </div>
        <div className='nav-icon'>
          <div className={darkTheme ? 'nav-icon-dark-img2' : 'nav-icon-img2'} onClick={() => {navigate('/main/cart')}}/>
          <div className='nav-drop-right nav-spec'>
          <div className='nav-fav-title'>Cosul meu</div>
          {currentUser ? (
              cart.length === 0 ? (
                <div className='nav-none'>Nu ai nimic in cos!</div>
              ) : (
                <>
                {cart.map((product,index) => {
                  if(index < 4) {
                    return (
                      <Link to={`/product/${product.id}`}>
                      <div className={product.sex === 'man' ? (
                          'nav-fav nav-fav-man'
                        ) : (
                          'nav-fav nav-fav-woman'
                        )}>
                        <img src={product.photo} alt='Poza' className='nav-fav-photo'/>
                        <div className='nav-fav-flex'>
                          <div className='nav-fav-nume'>{product.nume}</div>
                          <div className='nav-fav-size'>Marime: {product.size}</div>
                          <div className='nav-fav-nr'>Numar: {product.numar}</div>
                          <div className='nav-fav-price'>{product.price} Lei
                            <div className='nav-fav-del2' onClick={e => {e.preventDefault(); cartRemove(product)}} />
                          </div>
                        </div>
                      </div>
                      </Link>
                    )
                  } else return (<></>)
                })}
                <div className='nav-tot'><Link className='flex' to='/main/cart'>Vezi Cosul<div className={darkTheme ? 'nav-arrow-dark' :'nav-arrow'} /></Link></div>
                </>
              )
            ) : (
              <div className='nav-connect'><NavLink to='/connect'>Conecteaza-te</NavLink></div>
            )}
          </div>
        </div>
        <div className='nav-icon' >
          <div className={darkTheme ? 'nav-icon-dark-img3' : 'nav-icon-img3'} onClick={() => {navigate('/main/profile')}}/>
          <div className='nav-drop-right'>
          <div className='nav-fav-title'>Profil</div>
          {currentUser ? (
              <>
              <div className='nav-profile-email'>{currentUser.email}</div>
              <div className='nav-tot'><Link className='flex' to='/main/profile'>Vezi Profilul<div className={darkTheme ? 'nav-arrow-dark' :'nav-arrow'} /></Link></div>
              </>
            ) : (
              <div className='nav-connect'><Link to='/connect'>Conecteaza-te</Link></div>
            )}
          </div>
        </div>
        {currentUser ? (
          <div className='nav-icon'>
            <div className={darkTheme ? 'nav-icon-dark-img4' : 'nav-icon-img4'} onClick={() => handleLogout()} />
            <div className='nav-drop-right nav-drop-set'>
              <div className='nav-fav-title'>Optiuni</div>
              <div className='nav-set' onClick={() => handleLogout()}>Deconectare</div>
            </div>
          </div>
        ) : (
          <div className='nav-icon'>
            <div className={darkTheme ? 'nav-icon-dark-img5' : 'nav-icon-img5'} onClick={() => navigate('/connect')} />
            <div className='nav-drop-right nav-drop-set'>
              <div className='nav-fav-title'>Optiuni</div>
              <div className='nav-set' onClick={() => navigate('/connect')}>Conectare</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
