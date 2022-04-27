import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link }  from "react-router-dom";

export default function TrendProductComponent({product}) {

    const dispatch = useDispatch()

    return (
   <Link to={`/shop/product/${product.productId}`} >
        <div className="trend-product-container" style={{marginBottom:40,}}>  

          <div className="img-wrapper" style={{overflow:'hidden'}}>
   
            <div className="offer-box"  > {product.discount}% Off </div>
                <img src={product.image} width="100%" alt={product.name} style={{marginLeft:0,}} />
             
            </div>


            {/* <div className="img-wrapper">
            <div className="offer-box"> {product.discount}% Off </div>
                <img src={product.image} style={{width: 200+'px'}}/>
            </div> */}
            <div className="product-desc">
            <strong>{product.name}</strong></div>
            <div class="trend-prdct-price"><strong> AED {product.price} </strong> 
            { product.crossPrice && 
                <span> AED {product.crossPrice}</span>
            }
            
            </div>
        </div>
        </Link>
    )
}

