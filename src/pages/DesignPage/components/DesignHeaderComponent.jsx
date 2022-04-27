import React, { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import {
  goPreviousStep,
  goNextStep,
  takeImage,
  goToCheckoutInformation,
} from "../../../redux/design/designActions";
import { AddToCart } from "../../../redux/cart/cartActions";
import { setSiginVisible } from "../../../redux/app/appActions";
const mapState = (state) => ({
  step: state.design.designStep,
  selectedProduct: state.design.selectedProduct,
  grandTotal: state.cartData.grandTotal,
  isLoggedIn: state.user.isLoggedIn,
});

export default function DesignHeaderComponent() {
  const { step, selectedProduct, grandTotal, isLoggedIn } =
    useSelector(mapState);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const backClick = () => {
    if (step > 1) dispatch(goPreviousStep());
  };
  const forwardClick = () => {
    if (step === 4) {
      const { qty } = selectedProduct;
      const sizes = Object.keys(qty).filter((size) => +qty[size] > 0);
      if (sizes.length > 0) {
        dispatch(AddToCart(selectedProduct));
      } else {
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: "Please select any size",
          life: 3000,
        });
        return;
      }
    }
    if ((step > 1 && step < 3) || step == 4) {
      dispatch(goNextStep());
    }
    if (step === 3) {
      dispatch(takeImage());
    }
    if (step === 5) {
      isLoggedIn
        ? dispatch(goToCheckoutInformation())
        : dispatch(setSiginVisible(true));
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <Row className="design-header-container justify-content-between align-items-center ">
        <div>
          <span>Step {step}:</span>
          <strong>
            {(step === 1 || step === 2) && " Select an apparel you like?"}
            {step === 3 && " Start Designing"}
            {step === 4 && " Select Quantity"}
            {step === 5 && " Checkout"}
          </strong>
        </div>
        <div className="d-flex mt-3 mt-sm-0">
          <Button
            label={step === 1 ? "Cancel" : "Previous"}
            onClick={backClick}
            className="p-button-rounded p-button-outlined tee-btn-outlined"
          />
          <Button
            label={step !== 5 ? "Next" : "Checkout"}
            className="p-button-rounded tee-btn-success"
            onClick={forwardClick}
          />
        </div>
      </Row>
    </>
  );
}
