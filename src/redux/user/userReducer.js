import actionTypes from './actionTypes'
const INITIAL_STATE = { 
    currentUser: {},
    isLoggedIn: localStorage.getItem('user') ? true : false,
    loggedInUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email: '',
    loggedUser:  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '',
    loggedInUserName: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).firstName: '',
    shippingInfo: {},
    shipMethod: 'free',
    wishlist: [],
    address: [],
  };

  const userReducer = (state = INITIAL_STATE, action) => {
        switch(action.type){
          case actionTypes.SET_LOGGED_IN:
            return {...state, isLoggedIn: action.status}
          case actionTypes.LOGGED_OUT:
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            return {...state, isLoggedIn: false}  
          case actionTypes.SET_SHIPPING_INFO:
            return {...state, shippingInfo: action.info}  
          case actionTypes.SET_SHIPPING_METHOD:
            return {...state, shipMethod: action.method}
          case actionTypes.SET_LOGGED_IN_USER:
             return {...state, loggedInUser: action.user}    
          case actionTypes.ADD_TO_WISHLIST:  
           let index =  state.wishlist.findIndex(item => item.productId === action.item.productId  )
           console.log('index '+index)
           if(index !== -1){
             state.wishlist[index] = action.item
             return {...state, wishlist: state.wishlist} 
           } else {
             return {...state, wishlist:[...state.wishlist, action.item]}
           }

        
          case actionTypes.REMOVE_FROM_WISHLIST: 
           let items =  state.wishlist.filter(item => item.productId !== action.item.productId)           
           return {...state, wishlist: [...items]}  
           
           case actionTypes.ADD_TO_ADDRESS:  
           let index2 =  state.address.findIndex(item => item.id === action.item.id  )
           console.log('index '+index2)
           if(index2 !== -1){
             state.address[index] = action.item
             return {...state, address: state.address} 
           } else {
             return {...state, address:[...state.address, action.item]}
           }

        
          case actionTypes.REMOVE_FROM_ADDRESS: 
           let items2 =  state.address.filter(item => item.id !== action.item.id)           
           return {...state, address: [...items2]}  

       default: 
        return state   

        }
  }

  export default userReducer