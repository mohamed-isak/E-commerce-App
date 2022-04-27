import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { getBrandsRequest } from "../../../redux/cart/cartActions";
import { connect } from "react-redux";
import menImg from "../../../assets/images/shop/fit/men.png";
import { Link } from "react-router-dom";

function BrandsListing({ type, getBrandsRequest }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await getBrandsRequest();
        setBrands(response);
      } catch (error) {
        console.log("### ListsHoc :: error :: ", error);
      }
    }

    getItems();
  }, [getBrandsRequest]);

  return (
    <Row className="fit-item">
      <Col sm={5}>
        <div className="d-flex d-sm-block justify-content-between">
          <div>
            <h6>
              <strong>Brands</strong>
            </h6>
            <ul>
              {brands.map((item) => (
                <li key={item.brandId}> {item.brandName}</li>
              ))}
            </ul>
          </div>
          <Link to="/shop/product">
            <Button
              label="Browse"
              className="p-button-rounded p-button-outlined tee-btn-outlined"
            />
          </Link>
        </div>
      </Col>
      <Col sm={7}>
        <img src={menImg} width="250" alt="Brands" />
      </Col>
    </Row>
  );
}

// const mapStateToProps = (state) => ({

// })

const mapDispatchToProps = {
  getBrandsRequest,
};

export default connect(null, mapDispatchToProps)(BrandsListing);
