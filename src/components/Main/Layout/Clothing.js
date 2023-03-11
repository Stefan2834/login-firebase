import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useDefault } from "../../../contexts/DefaultContext";

export default function Clothing () {
    const { product, setProduct,
      favorite, setFavorite,
      filter, 
    } = useAuth()
    const { productLoad, setProductLoad } = useDefault()
    const [loading, setLoading] = useState(true);
    let noProduct = 0;
    
    useEffect(() => {
      let sortedProducts = [...product];
      if(filter.sort === 'price+') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if(filter.sort === 'price-') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      setProduct(sortedProducts)
      setLoading(false);
    }, [filter.sort])
    

    const handleFilter = (product) => {
      if(product.type.includes(filter.type)) {
        if((filter.maxPrice > product.price && filter.minPrice < product.price) || (filter.maxPrice === '' || filter.minPrice === '')) {
          if(filter.size === '' || product.size.includes(filter.size)) {
            noProduct += 1;
            return true
          } 
        }
      }
      return false
    }
    const favAdd = (product) => {
      setFavorite([...favorite, product])
    }
    const favRemove = (product) => {
      setFavorite(favorite.filter(fav => fav.id !== product.id))
    }



  return (
    <>
    {loading && (
      <div className="prof-loading">
          <div className="loading-spin" />
      </div>
    )}
    <div className='cloth'>
        {product.map((product,index) => {if (handleFilter(product) && noProduct <= productLoad) {
          return (
            <div className='cloth-div'>
              <Link to={`/product/${product.id}`}>
                <div className="cloth-photo">
                  <img src={product.photo} alt='Poza produs' className="cloth-img"/>
                </div>
              </Link>
              <div className={product.sex === 'man' ? 'cloth-det cloth-grad-man' : 'cloth-det cloth-grad-woman'}>
                <Link to={`/product/${product.id}`}>
                  <div className="cloth-left">
                    <div className="cloth-name">
                      {product.nume}
                    </div>
                    <div className="cloth-price">
                      {product.price} <span className="from-stone-700 font-medium">Lei</span>
                    </div>
                  </div>
                </Link>
                <div className="cloth-right">
                  {favorite.some(item => item.id === product.id) ? (
                      <div className="cloth-removefav" onClick={() => favRemove(product)} />
                    ) : (
                      <div className="cloth-fav" onClick={() => favAdd(product)}/>
                  )}
                </div>
              </div>
            </div> 
          )
        }
        })}
        {noProduct > productLoad && (
          <div className="my-3 bg-slate-900 p-2 rounded text-white cursor-pointer" onClick={() => setProductLoad(p => p + 8)}>Incarca mai multe produse</div>
        )}
        {noProduct === 0 && (
          <div className="mt-8">Nici un product in stoc nu indeplineste filtrele</div>
        )}
    </div>
    </>
  )
}