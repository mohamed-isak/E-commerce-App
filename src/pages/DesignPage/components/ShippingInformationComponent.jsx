import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { setShippimgMethod } from "../../../redux/user/userActions";
import { goToPayment } from "../../../redux/design/designActions";

const mapState = (state) => ({
  shippingInfo: state.user.shippingInfo,
  shipMethod: state.user.shipMethod,
});

export default function ShippingInformationComponent() {
  const { shippingInfo, shipMethod } = useSelector(mapState);
  const dispatch = useDispatch();


  const makePayment = () => {
   
     dispatch(goToPayment());
  };

  return (
    <>
      <Row className="info-head">
        <Col xs={6} className="info-category-head">
          Shipping Information
        </Col>
      </Row>
      <Row style={{ padding: "1em" }}>
        <Col xs={12} className="ship-box">
          <Row className="info-row justify-content-between">
            <Col xs={12} sm={2} className="label">
              Contact
            </Col>
            <Col sm={8}>{shippingInfo.email}</Col>
            <Col sm={2} className="change-label">
              Change
            </Col>
          </Row>
          <Row className="info-row justify-content-between">
            <Col xs={12} sm={2} className="label">
              Ship to
            </Col>
            <Col sm={8}>
              {shippingInfo.firstName} {shippingInfo.lastName} <br />
              {shippingInfo.address} {shippingInfo.street}, {shippingInfo.city},
              {shippingInfo.region}, {shippingInfo.country},{" "}
              {shippingInfo.pinCode} <br />
              mobile: {shippingInfo.phone}
            </Col>
            <Col sm={2} className="change-label">
              Change
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="info-head">
        <Col xs={6} className="info-category-head">
          Shipping Method
        </Col>
      </Row>
      <Row style={{ padding: "1em" }}>
        <Col xs={12} className="ship-box">
          <Row className="info-row align-items-center">
            <Col xs={10}>
              <div className="p-field-radiobutton">
                <RadioButton
                  inputId="shipMethod1"
                  name="shipMethod"
                  value="free"
                  onChange={(e) => dispatch(setShippimgMethod(e.value))}
                  checked={shipMethod === "free"}
                />
                <label htmlFor="shipMethod1" className="mt-2">
                  Free Shipping- For Prepaid Orders
                </label>
              </div>
            </Col>
            <Col xs={2}> Free</Col>
          </Row>
          <Row className="info-row align-items-center">
            <Col xs={10}>
              <div className="p-field-radiobutton">
                <RadioButton
                  inputId="shipMethod2"
                  name="shipMethod"
                  value="standard"
                  onChange={(e) => dispatch(setShippimgMethod(e.value))}
                  checked={shipMethod === "standard"}
                />
                <label htmlFor="shipMethod2" className="mt-2">
                  Standard Shipping ( Cash On Delivery )
                </label>
              </div>
            </Col>
            <Col xs={2}>AED 25</Col>
          </Row>
        </Col>
      </Row>
      <div>
        <Button
          label="Continue To Payment"
          className="p-button-rounded tee-btn-success"
          onClick={makePayment}
        />
      </div>
    </>
  );
}
