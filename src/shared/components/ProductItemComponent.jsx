import React from 'react'
import { Card } from 'primereact/card';

export default function ProductItemComponent(props) {
    const {product} = props
    return (
        <Card  className="product-card" >
          <div className="produxt-img-wrap" style={{backgroundColor: product.color}}>
            <img src={product.img} alt="" /> 
         </div> 
         <div className="product-info">
            <strong>{product.name}</strong>
            <p>AED {product.price}</p>
           </div>
          
       </Card>
    )
}
