/* eslint-disable eqeqeq */
import actionTypes from "./actionTypes";

const initialState = {
  cartCount: 0,
  grandTotal: 0,
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      console.log("item", action);
      let index = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.designedImg === action.payload.designedImg
      );
      if (index !== -1) {
        state.cartItems[index] = action.payload;
        return { ...state, cartItems: state.cartItems };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }
    case actionTypes.SET_GRAND_TOTAL:
      return { ...state, grandTotal: action.amount };
    case actionTypes.SET_CART_COUNT:
      return { ...state, cartCount: action.count };
    case actionTypes.REMOVE_ITEM:
      let items = state.cartItems.filter(
        (item) => item.designedImg != action.item.designedImg
      );
      return { ...state, cartItems: [...items] };
    default:
      return state;
  }
};

export default cartReducer;
