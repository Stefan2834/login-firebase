import React from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { useDefault } from '../../contexts/DefaultContext'


export default function Navbar() {
  const {
    currentUser,
    favorite,
    cart,
    setCurrentUser,
    server
  } = useAuth()
  const {setError,setActiveForm} = useDefault()
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
        <div className='nav-icon'>
          <div className='nav-icon-img1' onClick={() => {navigate('/main/fav')}}/>
          <div className='nav-drop-right nav-spec'>
          <div className='nav-fav-title'>Favorite</div>
         {currentUser ? (
              favorite.length === 0 ? (
                <div className='nav-tot'>Nu ai nimic la favorite</div>
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
                          <div className='nav-fav-price'>{product.price}Lei</div>
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
                <div className='nav-tot'><Link to='/main/fav'>Vezi Favoritele</Link></div>
                </>
                )
            ) : (
              <div className='nav-connect'><NavLink to='/connect'>Conecteaza-te</NavLink></div>
            )}
          </div>
        </div>
        <div className='nav-icon'>
          <div className='nav-icon-img2' onClick={() => {navigate('/main/cart')}}/>
          <div className='nav-drop-right nav-spec'>
          <div className='nav-fav-title'>Cosul meu</div>
          {currentUser ? (
              !cart ? (
                <div className='nav-not'>Nu ai nimic in cos!</div>
              ) : (
                <>
                {cart.map((product,index) => {
                  if(index < 4) {
                    return (
                      <Link to='/'>
                      <div className={product.sex === 'man' ? (
                          'nav-fav nav-fav-man'
                        ) : (
                          'nav-fav nav-fav-woman'
                        )}>
                        <img src={product.photo} alt='Poza' className='nav-fav-photo'/>
                        <Link to='/'>
                        </Link>
                        <div className='nav-fav-flex'>
                          <div className='nav-fav-nume'>{product.nume}</div>
                          <div className='nav-fav-size'>Marime: {product.size}</div>
                          <div className='nav-fav-nr'>Numar: {product.numar}</div>
                          <div className='nav-fav-price'>{product.price} Lei</div>
                        </div>
                      </div>
                      </Link>
                    )
                  } else return (<></>)
                })}
                <div className='nav-tot'><Link to='/main/cart'>Vezi Cosul</Link></div>
                </>
              )
            ) : (
              <div className='nav-connect'><NavLink to='/connect'>Conecteaza-te</NavLink></div>
            )}
          </div>
        </div>
        <div className='nav-icon' >
          <div className='nav-icon-img3' onClick={() => {navigate('/main/profile')}}/>
          <div className='nav-drop-right'>
          <div className='nav-fav-title'>Profil</div>
          {currentUser ? (
              <>
              <div className='nav-profile-email'>{currentUser.email}</div>
              <div className='nav-profile-more'><Link to='/main/profile'>Profilul meu</Link></div>
              </>
            ) : (
              <div className='nav-connect'><Link to='/connect'>Conecteaza-te</Link></div>
            )}
          </div>
        </div>
        {currentUser ? (
          <div className='nav-icon' onClick={() => handleLogout()}>
            <div className='nav-icon-img4' />
            <div className='nav-drop-right nav-drop-set'>Deconectare</div>
          </div>
        ) : (
          <div className='nav-icon' onClick={() => navigate('/connect')}>
            <div className='nav-icon-img5' />
            <div className='nav-drop-right nav-drop-set'>Conectare</div>
          </div>
        )}
      </div>
    </div>
  )
}
