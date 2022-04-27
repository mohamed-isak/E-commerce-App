/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card } from "primereact/card";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SingleProductComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import cartIcon from "../../../assets/images/shop/cart-icon.svg";
import star from "../../../assets/images/shop/star.svg";
import closebtn from "../../../assets/images/closebtn.svg";
import { removeWishlist } from "../../../redux/user/userActions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import {
  addWishlistRequest,
  deleteWishlistRequest,
} from "../../../redux/user/userActions";

export default function SingleProductComponent({
  product,
  wishlist,
  removeWishlist,
}) {
  const dispatch = useDispatch();

  return (
    <Card className="single-product-container">
      {wishlist && (
        <img
          onClick={() => {
            removeWishlist(product.productId);
          }}
          src={closebtn}
          width="40"
          style={{ position: "absolute", margin: 10 }}
        />
      )}

      <div className="img-wrapper" style={{ overflow: "hidden" }}>
        <Link to={`/shop/product/${product.productId}`}>
          <img src={product.image} width="100%" alt={product.name} />
        </Link>
      </div>
      <Row className="product-descr-container">
        <Col xs={8}>
          <Row>
            {" "}
            <small>
              {" "}
              <strong> {product.brand} </strong>{" "}
            </small>{" "}
          </Row>
          <Row>
            <small className="product-name">{product.name} </small>{" "}
          </Row>
          <Row>
            <strong className="product-price"> AED {product.price}</strong>
            {product.crossPrice && product.crossPrice > 0 && (
              <span className="old-price">AED {product.price}</span>
            )}
          </Row>
        </Col>
        {/* <Col xs={4} className='cart-icn'> 
                 <img src={cartIcon}  width="30" />
                 </Col> */}
      </Row>
      <Row className="review-row">
        <Col xs={6}>
          {" "}
          <img src={star} width="15" /> <strong>4.2</strong>{" "}
        </Col>{" "}
        <Col xs={6}> 182 Reviews</Col>
      </Row>
    </Card>
  );
}
