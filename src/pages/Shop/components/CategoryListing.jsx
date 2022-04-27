import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { getProductCategoryRequest } from "../../../redux/cart/cartActions";
import { connect } from "react-redux";
import womenImg from "../../../assets/images/shop/fit/women.png";
import { Link } from "react-router-dom";

function CategoryListing({ getProductCategoryRequest }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await getProductCategoryRequest();
        setCategories(response);
      } catch (error) {
        console.log("### ListsHoc :: error :: ", error);
      }
    }

    getItems();
  }, [getProductCategoryRequest]);

  return (
    <Row className="fit-item">
      <Col sm={5}>
        <div className="d-flex d-sm-block justify-content-between">
          <div>
            <h6>
              <strong>Categories</strong>
            </h6>
            <ul>
              {categories.map((item) => (
                <li key={item.categoryId}> {item.categoryName}</li>
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
        <img src={womenImg} width="250" alt="categories" />
      </Col>
    </Row>
  );
}

// const mapStateToProps = (state) => ({

// })

const mapDispatchToProps = {
  getProductCategoryRequest,
};

export default connect(null, mapDispatchToProps)(CategoryListing);
