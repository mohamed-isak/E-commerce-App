/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
//import ProductCarouselComponent from "./ProductCarouselComponent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
import "./ShopHomeComponent.scss";
import homeIcn from "../../../assets/images/shop/landing-img.png";
// import trendImg1 from '../../../assets/images/shop/trend/image-01.png'
// import trendImg2 from '../../../assets/images/shop/trend/image-02.png'
// import trendImg3 from '../../../assets/images/shop/trend/image-03.png'
// import trendImg4 from '../../../assets/images/shop/trend/image-04.png'

import brand1 from "../../../assets/images/shop/brands/designer-01.png";
import brand2 from "../../../assets/images/shop/brands/designer-02.png";
import brand3 from "../../../assets/images/shop/brands/designer-03.png";
import brand4 from "../../../assets/images/shop/brands/designer-04.png";

// import menImg from '../../../assets/images/shop/fit/men.png'
// import womenImg from '../../../assets/images/shop/fit/women.png'
import childrensImg from "../../../assets/images/shop/fit/childrens.png";

import TrendProductComponent from "./TrendProductComponent";
import StyleCategoryComponent from "./StyleCategoryComponent";
import BrandsListing from "./BrandsListing";
import CategoryListing from "./CategoryListing";
import { connect } from "react-redux";
import { getTrendingProductsRequest } from "../../../redux/cart/cartActions";

// const ShopProductDetail = lazy(() => import('./Details/ProductDetailComponent'))

// const trendProducts = [
//     {id:1, name: 'Zayn Malik T-Shirt', img: trendImg1 , price: 120, discount: 20},
//     {id:2, name: 'T Shirt Lol Girls', img: trendImg2 , price: 110, discount: 15},
//     {id:3, name: 'Aqua Blue Girls', img: trendImg3 , price: 130, discount: 20},
//     {id:4, name: 'Charcoal Guinness', img: trendImg4 , price: 120, discount: 10}
// ]

function ShopHomeComponent({ getTrendingProductsRequest }) {
  
  let { path, url } = useRouteMatch();
  const [trendProducts, setTrendProducts] = useState([]);
  useEffect(() => {
    getTrendingProductsRequest().then((res) => {
      res.forEach((element) => {
        element.discount =
          parseInt(
            ((element.crossPrice - element.price) / element.price) * 100
          ) | 0;
      });
      setTrendProducts(res);
    });
  }, []);
  console.log("path", path);
  const brands = [
    { id: 1, img: brand1, name: "designer1" },
    { id: 2, img: brand2, name: "designer2" },
    { id: 3, img: brand3, name: "designer3" },
    { id: 4, img: brand4, name: "designer4" },
  ];

  // const menWomenFit = [{ id: 1, name: 'T-Shirts'} , {id: 2 , name: 'Long-Sleeve'}, {id: 3, name:'Tank Tops'},
  // {id:4, name: 'Sweats'} ,{id: 5, name:'Jacket/Vests'}, {id:6, name:'Hats'} ,{id:7, name:'Polos'}];
  const kidsFit = [
    { id: 1, name: "Shirts" },
    { id: 2, name: "Toddler" },
    { id: 3, name: "Infant" },
  ];

  return (
    <>
      <Row className="shop-banner-container">
        <Col xs={6} className="shop-banner-left">
          <div
            className="text-container d-flex h-100 w-100"
            style={{ flexDirection: "column", justifyContent: "center" }}
          >
            <h2>Custom T-shirts</h2>
            <div className="p-text">When Style Meets Personalisation </div>
          </div>
        </Col>
        <Col xs={6} className="shop-banner-right">
          <img
            src={homeIcn}
            alt=""
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </Col>
      </Row>

      <Row className="trend-container">
        <div className="w-100 d-flex justify-content-between align-items-center px-4">
          <div>
            {" "}
            <h3>Trending now </h3>
          </div>
          <div style={{ color: "#FF6740", cursor: "pointer" }}>
            <Link to="/shop/product">See all </Link>{" "}
          </div>
        </div>
        <Row style={{ width: "100%", marginTop: "2em" }}>
          {trendProducts.map((product) => (
            <Col xs={12} sm={6} md={3} key={product.id}>
              {" "}
              <TrendProductComponent product={product} />{" "}
            </Col>
          ))}
        </Row>
      </Row>

      {/* <Row className="top-designers-container">
        <Row className="carosel-head">
          <Col xs={12}>
            <h3>Top Designers</h3>
          </Col>
        </Row>

        <Row style={{ width: "75%", margin: "auto" }}>
          <ProductCarouselComponent items={brands} />
        </Row>
      </Row> */}

      <Row className="style-category-container">
        <div className="header-row">
          <h3>
            <strong>Browse By Fit</strong>
          </h3>
        </div>
        <Col xs={12} xl={6}>
          <BrandsListing />
        </Col>
        <Col xs={12} xl={6}>
          <CategoryListing />
          <StyleCategoryComponent
            title={`Kids & Babies`}
            fits={kidsFit}
            img={childrensImg}
          />
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrendingProductsRequest: (payload) =>
      dispatch(getTrendingProductsRequest(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopHomeComponent);
