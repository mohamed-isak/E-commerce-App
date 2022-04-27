import appActionTypes from "./actionTypes";
const INITIAL_STATE = {
  loading: false,
  submitted: false,
  submitError: false,
  siginVisible: false,
  formFailMsg: "",
  enableForgotPwdScreen: false,
  enableLoginScreen: true,
  cartVisible: false,
  movingToCheckout: false,
};

const appReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case appActionTypes.ENABLE_LOADER:
      return { ...state, loading: true };
    case appActionTypes.DISABLE_LOADER:
      return { ...state, loading: false };
    case appActionTypes.SIGIN_VISIBLE:
      return { ...state, siginVisible: action.status, formFailMsg: "" };
    case appActionTypes.SET_LOGGIN_ERROR:
      return { ...state, formFailMsg: action.message };
    case appActionTypes.RESET_FORM_ERROR:
      return { ...state, formFailMsg: "" };
    case appActionTypes.SET_ENABLE_LOGIN_SCREEN:
      return { ...state, enableLoginScreen: action.status };
    case appActionTypes.SET_CART_VISIBLE:
      return { ...state, cartVisible: action.status };
    case appActionTypes.SET_MOVING_TO_CART:
      return { ...state, movingToCheckout: action.status };
    case appActionTypes.SET_ENABLE_FORGOT_PWD_SCREEN:
      return { ...state, enableForgotPwdScreen: action.status };
    default:
      return state;
  }
};

export default appReducer;
