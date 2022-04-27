import React from 'react'
import {Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { goNextStep, selectProductToDesign } from '../../../redux/design/designActions';
import ProductItemComponent from '../../../shared/components/ProductItemComponent';
 
export default function ItemListComponent(props) {
    const dispatch = useDispatch();
    const {items} = props

    const selectProduct = (product) => {
        console.log('product', product)
        dispatch(goNextStep())
        dispatch(selectProductToDesign(product))
    }
    return (
        <>
         <Row className="items-row">
             { items.map(item => <div key={item.id} onClick={() =>selectProduct(item)}><ProductItemComponent   product={item}  /></div>)} 
         </Row>   
        </>
    )
}
