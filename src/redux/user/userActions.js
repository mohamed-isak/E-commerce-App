import actionTypes from "./actionTypes";
import appActionTypes from "../app/actionTypes";
import { Redirect } from "react-router-dom";
import { setSiginVisible, setEnableLoginScreen } from "../app/appActions";
import { goToCheckoutInformation } from "../design/designActions";
import callApi from "../../services/connection.services";
import {  toast } from 'react-toastify';

export const signUp = (payload) => {
  console.log("action creator", payload);
  return (dispatch) => {
    dispatch({ type: appActionTypes.ENABLE_LOADER });
    console.log("sddsf");
    return callApi("/users", "POST", payload, false)
      .then((res) => {
        console.log(res);
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        //move to login
        dispatch(setEnableLoginScreen(true));
      })
      .catch((err) => {
        console.log("err", err);
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        dispatch({
          type: appActionTypes.SET_LOGGIN_ERROR,
          message: err.error.message,
        });
      });
    //console.log('user', user)
  };
};

export const logIn = (payload, movingToCheckout) => {
  return (dispatch) => {
    dispatch({ type: appActionTypes.ENABLE_LOADER });
    return callApi("/users/login", "POST", payload, false)
      .then((res) => {
        console.log('userloginresp')
        console.log(res);
        if (res) {
          let { data } = res;
          localStorage.setItem("accessToken", data.token);
        }
        dispatch(setSiginVisible(false));
        dispatch(fetchUserDetails());
        if (movingToCheckout) {
          dispatch(goToCheckoutInformation());
          return <Redirect to="/design" />;
          //   goTOCheckoutStage();
        }

        // dispatch({type: actionTypes.DISABLE_LOADER})
      })
      .catch((err) => {
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        dispatch({
          type: appActionTypes.SET_LOGGIN_ERROR,
          message: err.error.message,
        });
        // throw err
        console.log("ee", err);
      });
  };
};

export const updateUser = (payload, movingToCheckout) => {
  return (dispatch) => {
    dispatch({ type: appActionTypes.ENABLE_LOADER });
    return callApi("/users", "POST", payload, false)
      .then((res) => {
        console.log(res);
        let { data } = res;
        return data;
      })
      .catch((err) => {
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        dispatch({
          type: appActionTypes.SET_LOGGIN_ERROR,
          message: err.error.message,
        });
        // throw err
        console.log("ee", err);
      });
  };
};

export const checkWishlistRequest = (id) => {
  return (dispatch) => {
    return callApi("/wishlist?filter[productId]="+id, "GET", null, true)
      .then((res) => {
        console.log("wishlist", res);
         const { data } = res;
        // return data;
        try{
          let filtrd = data.filter(item => item.productId === id);
          console.log({'filtereeddd': filtrd})
          if(filtrd.length > 0){

            return true;
          }
        
          else return false;
        }
        catch(e){
          return false;
        }
    
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};

export const getWishlistRequest = () => {
  return (dispatch) => {
    return callApi("/wishlist", "GET", null, true)
      .then((res) => {
        console.log("wishlist", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};

export const deleteWishlistRequest = (id) => {
  return (dispatch) => {
    return callApi("/wishlist/"+id, "DELETE", null, true)
      .then((res) => {
        console.log("wishlist", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};

export const addWishlistRequest = (id,payload) => {
  return (dispatch) => {
    return callApi("/wishlist/"+id, "POST", payload, true)
      .then((res) => {
        console.log("wishlist", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};






export const getAddressRequest = () => {
  return (dispatch) => {
    return callApi("/address", "GET", null, true)
      .then((res) => {
        console.log("address", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};


export const updateAddressRequest = (id,payload) => {
  return (dispatch) => {
    return callApi("/address/"+id, "PUT", payload, true)
      .then((res) => {
        console.log("address", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};


export const deleteAddressRequest = (id) => {
  return (dispatch) => {
    return callApi("/address/"+id, "DELETE", null, true)
      .then((res) => {
        console.log("address", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};

export const addAddressRequest = (payload) => {
  return (dispatch) => {
    return callApi("/address/", "POST", payload, true)
      .then((res) => {
        console.log("address", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};


export const resetPassword = (payload = {}) => {
  return (dispatch, getState) => {
    const { user: {loggedInUser = ''} = {}} = getState();
    dispatch({ type: appActionTypes.ENABLE_LOADER });
    return callApi("/users/forgot-password", "PUT", {...payload, email: loggedInUser}, true)
      .then((res) => {
        console.log(res);
        let { data } = res;
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        return data;
      })
      .catch((err) => {
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        dispatch({
          type: appActionTypes.SET_LOGGIN_ERROR,
          message: err.error.message,
        });
        // throw err
        console.log("ee", err);
      });
  };
};

export const setNewPassword = (payload = {}, gotoLogin) => {
  return (dispatch, ) => {
    dispatch({ type: appActionTypes.ENABLE_LOADER });
    gotoLogin?.();
    return callApi("/users/reset-password/finish", "PUT", payload, true)
      .then((res) => {
        console.log(res);
        let { data } = res;
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        return data;
      })
      .catch((err) => {
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        dispatch({
          type: appActionTypes.SET_LOGGIN_ERROR,
          message: err.error.message,
        });
        // throw err
        console.log("ee", err);
      });
  };
};

export const fetchUserDetails = () => {
  return (dispatch) => {
    return callApi("/users/me", "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        dispatch({ type: actionTypes.SET_LOGGED_IN, status: true });
        dispatch({ type: actionTypes.SET_LOGGED_IN_USER, user: data.email });
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const getUserDetails = () => {
  return (dispatch) => {
    return callApi("/users/me", "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const forgotPassword = (payload) => {
  return (dispatch) => {
    dispatch({ type: appActionTypes.ENABLE_LOADER });
    console.log("payload :: ", payload);
    return callApi('/users/reset-password/reset', 'POST', payload, false)
      .then((res) => {
        toast('Reset password link is successfully sent to your email!')
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        //move to login
        dispatch(setEnableLoginScreen(true));
        return res;
      })
      .catch((err) => {
        console.log("err", err);
        dispatch({ type: appActionTypes.DISABLE_LOADER });
        dispatch({
          type: appActionTypes.SET_LOGGIN_ERROR,
          message: err.error.message,
        });
        return 'Something went wrong!'
      });
    //console.log('user', user)
  };
};
export const loggedOut = () => {
  return { type: actionTypes.LOGGED_OUT };
};

export const setShippingInfo = (info) => {
  return { type: actionTypes.SET_SHIPPING_INFO, info };
};

export const setShippimgMethod = (method) => {
  return { type: actionTypes.SET_SHIPPING_METHOD, method };
};

export const addWishlist = (item) => {
  return { type: actionTypes.ADD_TO_WISHLIST, item };
};

export const removeWishlist = (item) => {
  return { type: actionTypes.REMOVE_FROM_WISHLIST, item };
};


export const addAddress = (item) => {
  return { type: actionTypes.ADD_TO_ADDRESS, item };
};

export const removeAddress = (item) => {
  return { type: actionTypes.REMOVE_FROM_ADDRESS, item };
};

 