/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import InfoBox from "../../../shared/components/InfoBox";
import CatalogComponent from "../../../shared/components/CatalogComponent";
import "./HomePageComponent.scss";
import { useHistory } from "react-router-dom";
import girlImg from "../../../assets/images/image-girl.png";
import tshirt from "../../../assets/images/tshirt-art.svg";
import oneIcon from "../../../assets/images/shape-one-icon.svg";
import designshirt from "../../../assets/images/design-tshirt-art.svg";
import twoIcon from "../../../assets/images/shape-two-icon.svg";
import collectYourOrder from "../../../assets/images/collect-your.svg";
import threeIcon from "../../../assets/images/shape-three-icon.svg";
import allStyles from "../../../assets/images/home/All Styles.png";
import mens from "../../../assets/images/home/Men’s apparel.png";
import womens from "../../../assets/images/home/Women’s apparel.png";
import kids from "../../../assets/images/home/Kids apparel.png";
import dualColor from "../../../assets/images/home/Dual Color.png";
import accessories from "../../../assets/images/home/Accessories.png";
import brush from "../../../assets/images/home/brush stroke.svg";
import tshirticon from "../../../assets/images/home/tshirt-icon.svg";
import wtbrush from "../../../assets/images/home/wt-brush stroke.svg";

const leftBannertBtnStyle = {
  height: "3rem",
  position: "absolute",
  top: "60%",
  left: "18%",
};

const rightBannertBtnStyle = {
  height: "3rem",
  position: "absolute",
  top: "60%",
  right: "20%",
};
export default function HomePageComponent() {
  let history = useHistory();

  const goToDesign = () => {
    console.log("/design");
    history.push("/design");
  };

  return (
    <>
      <Row className="banner-container ">
        <Col xs={12} xl={6} className="banner-left ">
          <div className="img-text-wrapper">
            <img src={brush} alt="" width="60" />
            <span>
              <h5>
                <strong>Design your own T-shirt</strong>
                <br />
                <span className="d-block d-xl-none">
                  <strong>Or Shop our Design </strong>
                </span>
              </h5>
            </span>
            <img src={tshirticon} alt="" width="25" className="t-shirt-icon" />
          </div>
          <div className="d-flex align-items-center justify-content-start banner-left-btn-wrapper">
            <Link to="/design">
              <Button
                label="Start designing now"
                onClick={() => console.log("clicked")}
                className="p-button-rounded tee-btn-success d-none d-md-block"
                style={leftBannertBtnStyle}
              />
              <Button
                label="Design now"
                onClick={() => console.log("clicked")}
                className="p-button-rounded tee-btn-success d-md-none "
                style={leftBannertBtnStyle}
              />
            </Link>
            <Link to="/" className="second-btn d-xl-none">
              <Button
                label="Explore Designs"
                onClick={() => console.log("clicked")}
                className="p-button-rounded tee-btn-success"
                style={rightBannertBtnStyle}
              />
            </Link>
          </div>
          <img src={girlImg} alt="" className="banner-left-img d-xl-none" />
        </Col>
        <Col md={6} className="banner-right d-none d-xl-block">
          <div className="img-text-wrapper">
            <img src={wtbrush} alt="" width="60" />
            <span>
              <h5>
                <strong>Shop our Design explore Now</strong>
              </h5>
            </span>
          </div>
          <Button
            label="Explore Designs"
            onClick={() => console.log("clicked")}
            className="p-button-rounded tee-btn-success"
            style={rightBannertBtnStyle}
          />
        </Col>

        <img src={girlImg} alt="" className="d-none d-xl-block" />
      </Row>
      <Container className="works-conatiner">
        {/* How it Works Start */}
        <Row>
          <h3>
            <strong>How it works</strong>
          </h3>
        </Row>
        <Row className="info-box-conatiner">
          <Col sm={12} md={4}>
            <InfoBox
              primaryIcon={tshirt}
              secondaryIcon={oneIcon}
              description="Choose a t-shirt model and color that you like."
              title="Pick a T-shirt"
            />
          </Col>
          <Col sm={12} md={4}>
            <InfoBox
              primaryIcon={designshirt}
              secondaryIcon={twoIcon}
              description="Upload your personal design or add text and Graphics in our product design tool."
              title="Design your T-shirt"
            />
          </Col>
          <Col sm={12} md={4}>
            <InfoBox
              primaryIcon={collectYourOrder}
              secondaryIcon={threeIcon}
              description="Enjoy your new favourite t-shirt."
              title="Collect your order"
            />
          </Col>
        </Row>
        {/* How it Works End */}
        <Row>
          <h3>
            <strong>Find your perfect canvas </strong>
          </h3>
        </Row>
        <div className="image-row">
          <div className="column">
            <CatalogComponent src={allStyles} text="All Styles" />
            <CatalogComponent src={kids} text="Kids's apparel" />
          </div>
          <div className="column">
            <CatalogComponent src={mens} text="Men's apparel" />
            <CatalogComponent src={dualColor} text="Dual Color" />
          </div>
          <div className="column last">
            <CatalogComponent src={womens} text="Women's apparel" />
            <CatalogComponent src={accessories} text="Accessories" />
          </div>
        </div>
        {/* <Row className="img-box-conatiner first">
          <Col md={4}>
            <CatalogComponent src={allStyles} text="All Styles" />
          </Col>
          <Col md={4}>
            <CatalogComponent src={mens} text="Men's apparel" />
          </Col>
          <Col md={4}>
            <CatalogComponent src={womens} text="Women's apparel" />
          </Col>
          <Col md={4} className="d-md-none">
            <div>
              <CatalogComponent src={kids} text="Kids's apparel" />
            </div>
          </Col>
        </Row> */}
        {/* <Row className="img-box-conatiner second">
          <Col md={4} className=" d-none d-md-block ">
            <div>
              <CatalogComponent src={kids} text="Kids's apparel" />
            </div>
          </Col>
          <Col md={4}>
            <div>
              <CatalogComponent src={dualColor} text="Dual Color" />
            </div>
          </Col>
          <Col md={4}>
            <CatalogComponent src={accessories} text="Accessories" />
          </Col>
        </Row> */}
      </Container>
    </>
  );
}
