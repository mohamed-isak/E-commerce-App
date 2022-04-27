  
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// redux-undo higher-order reducer
import undoable from 'redux-undo';

// import userReducer from './User/user.reducer';
// import productsReducer from './Products/products.reducer';
 import cartReducer from './cart/cartReducer';
// import ordersReducer from './Orders/orders.reducer';
 import designReducer from './design/designReducer'
 import canvasReducer from './design/canvasReducer';
 import userReducer from './user/userReducer';
 import appReducer  from './app/appReducer';

export const rootReducer = combineReducers({
    design: designReducer,
    canvas: undoable(canvasReducer),
    cartData: cartReducer,
    user: userReducer,
    app: appReducer
//   user: userReducer,
//   productsData: productsReducer,
//   cartData: cartReducer,
//   ordersData: ordersReducer,

});

const configStorage = {
  key: 'root',
  storage,
  whitelist: ['cartData', 'user']
};

export default persistReducer(configStorage, rootReducer);