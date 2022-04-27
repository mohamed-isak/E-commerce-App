import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

export default function FooterComponent() {
  const [value4, setValue4] = useState("");
  return (
    <div className="footer-container">
      <Container fluid>
        <Row className="footer-info">
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            <img src={logo} alt="" className="logo" />
          </Col>
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            <h6>Main Pages</h6>
            <div>
              <ul>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Abouts</li>
              </ul>
            </div>
          </Col>
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            {" "}
            <h6>Policy</h6>
            <div>
              <ul>
                <li>Terms of Usage </li>
                <li>Privacy Policy </li>
                <li>Return Policy</li>
              </ul>
            </div>
          </Col>
          <Col sm={6} md={3} lg={2} className="mb-4 mb-md-0">
            <h6>Categories</h6>
            <div>
              <ul>
                <li>Men's apparel </li>
                <li>Women's apparel</li>
                <li>Kids's apparel</li>
                <li>Dual Color </li>
                <li>Accessories</li>
              </ul>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4} className="mb-4 mb-md-0">
            <h6>Subscribe</h6>
            <div>
              <p>
                Subscribe to our newsletter, so that you can be the first to
                know about new offers and promotions
              </p>
              <span className="p-input-icon-right">
                <Button
                  label="Subscribe"
                  className="p-button-rounded tee-btn-success"
                />
                <InputText
                  value={value4}
                  onChange={(e) => setValue4(e.target.value)}
                />
              </span>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row className="footer-reserve">
          <Col>© 2021. All rights reserved</Col>
          <Col className="txt-align-end">Visa</Col>
        </Row>
      </Container>
    </div>
  );
}
