
import actionTypes from './actionTypes'


export const goNextStep = () => ({
    type: actionTypes.GO_TO_NEXT
  });
  
  export const goPreviousStep = () => ({
    type: actionTypes.GO_TO_PREVIOUS
  });
  
   export const selectProductToDesign = (product) => ({
      type: actionTypes.SELECT_PRODUCT_TO_DESIGN,
      payload: product
  })
  
  export const selectProductColorToDesign = (color) => ({
    type: actionTypes.SELECT_PRODUCT_COLOR_TO_DESIGN,
    payload: color
})

export const takeImage = () => ({
  type:actionTypes.TAKE_DESIGNED_IMG
})

export const load3Dimage = () => ({
  type:actionTypes.LOAD_3D_IMAGE
})


  export const tookeImage = () => ({
    type:actionTypes.TOOKE_DESIGNED_IMG
  })

  export const goTOCheckoutStage = () => {
    console.log('reach')
  return { type: actionTypes.GO_TO_CHECKOUT_STAGE }
  }

  export const addSizeNumber = (data) => {
console.log('sdfds', data)
    return (dispatch, getState) => {
      console.log('thunk')
      dispatch({type: actionTypes.UPDATE_SIZE_QTY, payload: data })
     const {selectedProduct} =  getState()
      console.log('product', selectedProduct)
    }
  }

   export const goToCheckoutInformation = () => {
     return {type: actionTypes.UPDATE_CHECKOUT_STAGE, stage: 'information'}
   }
 

   export const goToShipping = () => {
    return {type: actionTypes.UPDATE_CHECKOUT_STAGE, stage: 'shipping'}
  }
  export const goToPayment = () => {
    return {type: actionTypes.UPDATE_CHECKOUT_STAGE, stage: 'payment'}
  }
  
  export const goToCart = () => {
    return {type: actionTypes.UPDATE_CHECKOUT_STAGE, stage: 'cart'}
  }