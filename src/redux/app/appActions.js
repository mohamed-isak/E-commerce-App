import appActionTypes from "./actionTypes";
export const setSiginVisible = (status) => {
  console.log("visi", status);
  return { type: appActionTypes.SIGIN_VISIBLE, status };
};
export const resetFormError = () => {
  return { type: appActionTypes.RESET_FORM_ERROR };
};

export const setEnableLoginScreen = (status) => {
  return { type: appActionTypes.SET_ENABLE_LOGIN_SCREEN, status };
};
export const setForgotPasswordScreen = (status) => {
  return { type: appActionTypes.SET_ENABLE_FORGOT_PWD_SCREEN, status };
};

export const setCartVisible = (status) => {
  return { type: appActionTypes.SET_CART_VISIBLE, status };
};

export const setMovingToCart = (status) => ({
  type: appActionTypes.SET_MOVING_TO_CART,
  status,
});

export const goToProductDetail = (product) => ({
  type: appActionTypes.GO_TO_PRODUCT_DETAIL,
  product,
});
