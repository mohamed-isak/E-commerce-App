import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Elements,
  CardElement,
  CardNumberElement, CardExpiryElement, CardCvcElement,
  useStripe,
  useElements,
  stripePayment
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "primereact/radiobutton";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "primereact/button";
import { setShippimgMethod } from "../../../redux/user/userActions";
import { goToPayment } from "../../../redux/design/designActions";

const mapState = (state) => ({
  shippingInfo: state.user.shippingInfo,
});

const stripePromise = loadStripe(
  "pk_test_51HAuCQA3GUrFsy2auqpVY5zzKoy5fKP6AsCBPkVYyZXmlI0F6vAgC0gXYhXh8dtDzFvk6GdBBWRrCNJG7FxwSVmh00oQMrbUEU"
);



export default function CheckoutPayment() {
  // Variable declaration part
  const { shippingInfo } = useSelector(mapState);
  
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "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",
  };

  // const stripePromise = loadStripe(
  //   "pk_live_51JxTaBHneeV50Qz2CAxcXICGdbTWKWBhzw00UUFuo2nBcqP7Z1cCAWrGjXpMGudFOXUQQobdjxyjf7nQFGM0hG3s00C66WNfy3"
  // );

  

  return (
    <>
      <Row className="info-head">
        <Col xs={6} className="info-category-head">
          Payment Information
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

      {/*************Payment Options********* */}
      <Row style={{ padding: "1em" }}>
        <Col xs={12} className="ship-box">
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={2000}></CheckoutForm>
          </Elements>
        </Col>
      </Row>
    </>
  );
}

function CheckoutForm(props) {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  // var clientSecert = "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";
  var clientSecert = "pk_test_51HAuCQA3GUrFsy2auqpVY5zzKoy5fKP6AsCBPkVYyZXmlI0F6vAgC0gXYhXh8dtDzFvk6GdBBWRrCNJG7FxwSVmh00oQMrbUEU";

  // const payMoney = async (e) => {
  //   e.preventDefault();
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   setPaymentLoading(true);
  //   const paymentResult = await stripe.confirmCardPayment(clientSecert, {
  //     payment_method: {
  //       card: elements.getElement(CardElement),
  //       billing_details: {
  //         name: "Mohamed",
  //       },
  //     },
  //   });
  //   setPaymentLoading(false);
  //   if (paymentResult.error) {
  //     alert(paymentResult.error.message);
  //   } else {
  //     if (paymentResult.paymentIntent.status === "succeeded") {
  //       alert("Success!");
  //     }
  //   }
  // };

  // return (
  //   <form  onSubmit = {payMoney}>
  //     {/* <PaymentElement /> */}
  //     <from>
  //       <CardElement></CardElement>
  //     </from>
  //     <br></br>
  //     <div>
  //       <Button
  //         label= {isPaymentLoading ? "Loading..." : "Pay NOw"}
  //         className="p-button-rounded tee-btn-success"
  //         onClick={payMoney}
  //       />
  //     </div>
  //   </form>
  // );



  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setPaymentLoading(true);
  //  setErrorMsg('');

    const paymentMethodObj = {
      type: 'card',
      card: elements.getElement(CardNumberElement),
    };
   
    const paymentMethodResult = await stripe.createPaymentMethod(paymentMethodObj);

    // stripePaymentMethodHandler({
    //   result: paymentMethodResult,
    //   amount: props.amount
    // }, handleResponse);
  };

 return (
  <form onSubmit={handleSubmit}>
       <Row>
         <Col md={12}>
         <CardNumberElement
              id="cc-number"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
         </Col>
       </Row>
       <br></br>
       <Row>
         <Col md={6}> 
         <CardExpiryElement
              id="expiry"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
         </Col>
         <Col md={6}>
         <CardCvcElement
              id="cvc"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
         </Col>
       </Row>
       <Button
          label= {isPaymentLoading ? "Loading..." : "Pay NOw"}
          className="p-button-rounded tee-btn-success"
          type="submit"
         // onClick={payMoney}
        />
  </form>
 )

}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};



/// Handle Payment Response

export const stripePaymentMethodHandler = async (data, cb) => {
  const { amount, result } = data;
  if (result.error) {
    // show error in payment form
    cb(result);
  } else {
    const paymentResponse = await stripePayment({
      payment_method_id: result.paymentMethod.id,
      name: result.paymentMethod.billing_details.name,
      email: result.paymentMethod.billing_details.email,
      amount: amount
    });
    console.log(paymentResponse);
    cb(paymentResponse);




    
  }
}

