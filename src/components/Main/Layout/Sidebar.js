import React,{ useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useDefault } from '../../../contexts/DefaultContext'

export default function Sidebar() {
    const { filter, setFilter } = useAuth()
    const { setProductLoad, darkTheme } = useDefault()
    const { id } = useParams()
    const [sizeType, setSizeType] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      const validPath = ['man top tricouri','man top bluze','man bottom scurti', 'man bottom lungi',
        'man foot adidasi', 'man foot papuci', 'man top', 'man bottom', 'man foot',
        'woman top tricouri','woman top bluze','woman bottom scurti', 'woman bottom lungi',
        'woman foot adidasi', 'woman foot papuci', 'woman top', 'woman bottom', 'woman foot'
      ]
      if(!validPath.includes(id)) {
        navigate('/')
      }
      setProductLoad(8)
      setFilter({...filter, type:id, size:''})
      if(id.includes('foot')) {
        setSizeType(['37','38','39','40','41','42','43','44'])
      } else {
        setSizeType(['Xs','S','M','L','Xl'])
      }
    }, [id])


  return (
    <div className='side-filter-bar'>
      <span className='side-font'>Filtre</span>
      <form className="side-form" onChange={() => setProductLoad(8)} >
        <label>
          Pret minim (Lei):
          <input type='number' value={filter.minPrice} 
            className='side-price-input'
            onChange={e => setFilter({...filter, minPrice:e.target.value})}
          />
        </label>
        <label>
          Pret maxim (Lei):
          <input type='number' value={filter.maxPrice} 
            className='side-price-input'
            onChange={e => setFilter({...filter, maxPrice:e.target.value})}
          />
        </label>
        <div className="mt-4 mb-3 w-full flex items-center justify-around">
          <div className='side-font'>Marimi</div>
          <div className='side-font'>Sorteaza</div>
        </div>
        <div className='side-flex'>
          <div className="side-size">
            {sizeType.map((size) => {
              return (
              <label className="my-1 w-5/12">
                <input type='checkbox' className="side-size-check"  
                  checked={filter.size.includes(size)}
                  onChange={e => !e.target.checked ? setFilter({...filter, size:''}) : setFilter({...filter, size:size})}
                />
                <div className="side-size-label">{size}</div>
              </label>
              )
            })}
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.size === ''}
                onChange={e => e.target.checked && setFilter({...filter, size:''})}
              />
              <div className="side-size-label">Toate</div>
            </label>
          </div>
  
  
          <div className="side-sort">
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'price+'}
                onChange={e => e.target.checked && setFilter({...filter, sort:'price+'})}
              />
              <div className="side-size-label">Pret <div className={darkTheme ? 'side-size-img-up-dark' : "side-size-img-up"}/></div>
            </label>
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'price-'}
                onChange={e => e.target.checked && setFilter({...filter, sort:'price-'})}
              />
              <div className="side-size-label">Pret <div className={darkTheme ? 'side-size-img-down-dark' : "side-size-img-down"} /></div>
            </label>
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'review+'}
                onChange={e => e.target.checked && setFilter({...filter, sort:'review+'})}
              />
              <div className="side-size-label">Calitate <div className={darkTheme ? 'side-size-img-up-dark' : "side-size-img-up"} /></div>
            </label>
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'review-'}
                onChange={e => e.target.checked && setFilter({...filter, sort:'review-'})}
              />
              <div className="side-size-label">Calitate <div className={darkTheme ? 'side-size-img-down-dark' : "side-size-img-down"} /></div>
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}
