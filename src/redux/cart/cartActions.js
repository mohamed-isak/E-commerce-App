import callApi from "../../services/connection.services";
import appActionTypes from "../app/actionTypes";
import actionTypes from "./actionTypes";

export const getProductsRequest = (payload) => {
  let url = "/products";
  if (payload && payload.length > 0) {
    url = url + '?filter={"where":{"and":[' + payload.join(",") + ']},"order":"name%20DESC",}';
  }
  return (dispatch) => {
    return callApi(url, "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const getTrendingProductsRequest = (payload) => {
  let url = '/products?filter={"where":{"trending":"true"}}[limit]=3';
  return (dispatch) => {
    return callApi(url, "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const getProductCategoryRequest = () => {
  return (dispatch) => {
    return callApi("/product-categories", "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const getProductDetailsRequest = (productId) => {
  return (dispatch) => {
    return callApi("/products/" + productId, "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const getBrandsRequest = () => {
  return (dispatch) => {
    return callApi("/brands", "GET", null, true)
      .then((res) => {
        console.log("user", res);
        const { data } = res;
        return data;
      })
      .catch((err) => dispatch({ type: appActionTypes.DISABLE_LOADER }));
  };
};
export const AddToCart = (item) => ({
  type: actionTypes.ADD_TO_CART,
  payload: item,
});
