import actionTypes from './actionTypes'
const INITIAL_STATE = {
    designStep:1,
    selectedProduct: {color: '#D9D9D9' },
    designStage: 'initial',
    takeImage: false,
    load3D: false,
    checkoutStage: 'cart'
  };

  const designReducer = (state = INITIAL_STATE, action) => {
   
      switch(action.type){
        case actionTypes.GO_TO_NEXT:
            return {...state , designStep: state.designStep + 1}              
        case actionTypes.GO_TO_PREVIOUS:
                return {...state , designStep: state.designStep - 1}                  
        case actionTypes.SELECT_PRODUCT_TO_DESIGN:
            return {...state, selectedProduct: {qty:{s: 0, m: 0, l: 0, xl: 0, xxl:0 }, ...action.payload}}
        case actionTypes.SELECT_PRODUCT_COLOR_TO_DESIGN:
            return {...state, selectedProduct: {...state.selectedProduct, color: action.payload}} 
        case actionTypes.GO_TO_DESIGN_STAGE:
            return {...state, designStage: action.payload} 
        case actionTypes.TAKE_DESIGNED_IMG:
            return {...state, takeImage: true}

        case actionTypes.LOAD_3D_IMAGE:
                return {...state, load3D: true}

        case actionTypes.TOOKE_DESIGNED_IMG:
        return {...state, takeImage: false, selectedProduct: {...state.selectedProduct, designedImg: action.payload}}
        case actionTypes.UPDATE_SIZE_QTY:
            return { ...state, selectedProduct: {...state.selectedProduct, qty: {...state.selectedProduct.qty, [action.payload.key]: action.payload.value}}}
        case actionTypes.REMOVE_PRODUCT_SIZE:
            return {...state, selectedProduct: {...state.selectedProduct, qty: {...state.selectedProduct.qty, [action.size]: 0}}}
       
        case actionTypes.UPDATE_CHECKOUT_STAGE:
            return {...state, checkoutStage: action.stage,  designStep: 5}
        case actionTypes.GO_TO_CHECKOUT_STAGE:
            console.log('sdg')
            return {...state, designStep: 5}    
        default:
          return state  
          
          
        
      }

  }


  export default designReducer;
  
