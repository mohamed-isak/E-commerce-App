/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import { connect } from "react-redux";
import { confirmPopup } from "primereact/confirmpopup";
import { classNames } from "primereact/utils";
import deleteIcon from "../../../assets/images/delete.svg";
import leftArrow from "../../../assets/images/arrow-right-s-line.svg";
import {
  goToCheckoutInformation,
  goToCart,
  goTOCheckoutStage,
} from "../../../redux/design/designActions";
import {
  setSiginVisible,
  setCartVisible,
  setMovingToCart,
} from "../../../redux/app/appActions";
import CheckoutInformationComponent from "./CheckoutInformationComponent";
import ShippingInformationComponent from "./ShippingInformationComponent";
import CheckoutPayment from "./CheckoutPayment";


const discount = 10;
const shippingCharge = 15;
const availabelColors = [
  { id: 1, label: "White", value: "#D9D9D9" },
  { id: 2, label: "Black", value: "#000000" },
  { id: 3, label: "Grey", value: "#9B9B9B" },
  { id: 4, label: "Blue", value: "#0074D9" },
  { id: 5, label: "Red", value: "#FF2B4D" },
  { id: 6, label: "Green", value: "#00AB85" },
  { id: 7, label: "Yellow", value: "#FFC100" },
  { id: 8, label: "Pink", value: "#FD5D85" },
];

function DesignCheckoutComponent({
  cartItems,
  removeProduct,
  setGrandTotal,
  grandTotal,
  setCartCount,
  cartCount,
  checkoutStage,
  goToInformation,
  goToCart,
  cartOnly,
  isLoggedIn,
  openSignIn,
  setCartHide,
  setMovingToCart,
}) {
  //const { qty } = selectedProduct
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  // const [ grandTotal, setGrandTotal] = useState(0)
  const history = useHistory();

  useEffect(() => {
    let subTotalAmount = 0;
    let sizesCount = 0;
    cartItems.map((item) => {
      const { qty } = item;
      const sizes = Object.keys(qty).filter((size) => +qty[size] > 0);
      sizesCount += sizes.length;
      console.log(sizes);
      subTotalAmount += sizes.reduce((total, size) => {
        const sum = total + item.price * item.qty[size];
        return sum;
      }, 0);
    });
    setCartCount(sizesCount);
    setSubTotal(subTotalAmount);
    setGrandTotal(subTotalAmount - discount + shippingCharge);
    if (cartItems.length > 0) {
      console.log({ cartItems: cartItems });
    }
  }, [cartItems]);

  const removeItem = (event, item) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to remove item?",
      icon: "pi pi-exclamation-triangle",
      accept: () => removeProduct(item),
      //reject: () => rejectFunc()
    });
  };

  const moveToCheckout = () => {
    setCartHide();
    if (isLoggedIn) {
      history.push({ pathname: "/design" });
      goTOCheckoutStage();
      goToInformation();
    } else {
      openSignIn();
      setMovingToCart(true);
    }
  };

  return (
    <>
      <Row className="step5-row">
        <Col className="" lg={8}>
          <div className="step5-left box thin-scroll">
            {checkoutStage !== "cart" && !cartOnly && (
              <Row>
                {" "}
                <div className="checkout-bread">
                  {" "}
                  <span className="active" onClick={goToCart}>
                    Cart <img src={leftArrow} />{" "}
                  </span>
                  <span
                    className={classNames({
                      active:
                        checkoutStage === "information" ||
                        checkoutStage === "shipping",
                    })}
                    onClick={goToInformation}
                  >
                    Information <img src={leftArrow} />
                  </span>
                  <span
                    className={classNames({
                      active: checkoutStage === "shipping",
                    })}
                  >
                    Shipping <img src={leftArrow} />{" "}
                  </span>{" "}
                  <span>Payment</span>{" "}
                </div>{" "}
              </Row>
            )}
            {(checkoutStage === "cart" || cartOnly) && (
              <>
                <h6>My Carts ({cartCount} items)</h6>
                {console.log(cartItems)}
                {cartItems.map((item) => {
                  const { qty } = item;
                  const sizes = Object.keys(qty).filter(
                    (size) => +qty[size] > 0
                  );
                  {
                    return sizes.map((size) => {
                      return (
                        <Col
                          xs={12}
                          key={size}
                          className="cart-prduct-container"
                        >
                          <Col xs={3} md={2}>
                            {item.image ? (
                              <div
                                style={{
                                  overflow: "hidden",
                                  width: 90,
                                  height: 90,
                                }}
                              >
                                <img
                                  src={item.image}
                                  width="90pt"
                                  height="90pt"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            ) : (
                              <img src={item.designedImg} width="90pt" />
                            )}
                          </Col>
                          <Col xs={9} md={10}>
                            <div className="prdct-name d-flex justify-content-between align-items-center">
                              <strong className="flex-1">{item.name}</strong>
                              <img
                                src={deleteIcon}
                                width="30pt"
                                style={{ margin: 5 }}
                                onClick={(e) => removeItem(e, item)}
                              />
                            </div>
                            <Row className="input-row d-none d-md-flex">
                              <Col>
                                <label>Color</label>
                                <div>
                                  <strong>
                                    {
                                      item.color
                                    }
                                    {/* {availabelColors.filter(
                                      (clr) => clr.value === item.color
                                    )[0]
                                      ? availabelColors.filter(
                                          (clr) => clr.value === item.color
                                        )[0].label
                                      : ""} */}
                                  </strong>
                                </div>
                              </Col>
                              <Col>
                                <label>Size</label>
                                <div>
                                  <strong
                                    style={{ textTransform: "uppercase" }}
                                  >
                                    {size}
                                  </strong>
                                </div>
                              </Col>
                              <Col>
                                <label>Unit Price</label>
                                <div>
                                  <strong>AED {item.price}</strong>
                                </div>
                              </Col>
                              <Col>
                                <label>Qty</label>
                                <div>
                                  <strong>{item.qty[size]}</strong>
                                </div>
                              </Col>
                              <Col>
                                <label>Total</label>
                                <div>
                                  <strong>
                                    AED {item.price * item.qty[size]}
                                  </strong>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Col>
                      );
                    });
                  }
                })}
              </>
            )}

            {checkoutStage === "information" && !cartOnly && (
              <CheckoutInformationComponent />
            )}
            {checkoutStage === "shipping" && !cartOnly && (
              <ShippingInformationComponent />
            )}

            {checkoutStage === "payment" && !cartOnly && (
              <CheckoutPayment />
            )}
          </div>
        </Col>
        {cartCount > 0 && (
          <Col className="" lg={4}>
            <div className="step5-right box mt-4 mt-lg-0">
              <h6>Order Summary</h6>
              <div className="d-flex justify-content-between align-items-center">
                <div className="summary-item label">
                  Price ({cartCount} items)
                </div>
                <div className="summary-item value">AED {subTotal}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="summary-item label">Discount</div>
                <div className="summary-item discount value">
                  - AED {discount}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="summary-item label">Shipping charge</div>
                <div className="summary-item value">AED {shippingCharge}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="summary-item label total">Total</div>
                <div className="summary-item value total">AED {grandTotal}</div>
              </div>
              <Row>
                {checkoutStage === "cart" && (
                  <Button
                    label="Checkout"
                    onClick={moveToCheckout}
                    className="p-button-rounded tee-btn-success"
                  />
                )}
              </Row>
            </div>
          </Col>
        )}
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData.cartItems,
    grandTotal: state.cartData.grandTotal,
    cartCount: state.cartData.cartCount,
    checkoutStage: state.design.checkoutStage,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    removeProduct: (item) => dispatch({ type: "REMOVE_ITEM", item }),
    setGrandTotal: (amount) => dispatch({ type: "SET_GRAND_TOTAL", amount }),
    setCartCount: (count) => dispatch({ type: "SET_CART_COUNT", count }),
    goToInformation: () => dispatch(goToCheckoutInformation()),
    goToCart: () => dispatch(goToCart()),
    openSignIn: () => dispatch(setSiginVisible(true)),
    setCartHide: () => dispatch(setCartVisible(false)),
    goTOCheckoutStage: () => dispatch(goTOCheckoutStage()),
    setMovingToCart: (status) => dispatch(setMovingToCart(status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(DesignCheckoutComponent);
