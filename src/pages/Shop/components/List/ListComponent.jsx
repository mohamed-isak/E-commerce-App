/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./ListComponent.scss";

// import { data } from '../../../../shared/data/Products'
import SingleProductComponent from "../SingleProductComponent";
import { Dropdown } from "primereact/dropdown";
import FilterboxCompoenent from "../FilterboxCompoenent";
import {
  getBrandsRequest,
  getProductCategoryRequest,
  getProductsRequest,
} from "../../../../redux/cart/cartActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function ListComponent({
  getProductsRequest,
  getProductCategoryRequest,
  getBrandsRequest,
}) {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [brandFilters, setBrandFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const sortByData = [
    {
      name: "Price: Low to High",
    },
    {
      name: "Price: High to Low",
    },
    {
      name: "New Arrivals",
    },
  ];
  const getProduct = useCallback(
    function () {
      let query = [];
      let payload = [];
      if (brandFilters.length > 0) {
        query.push("brand=" + brandFilters.join(","));
        payload.push('{"brands":{"inq":' + JSON.stringify(brandFilters) + "}}");
      }

      //query.push("filter[order]=name DESC"  );
      // payload.push(
      //   '{"order":{"inq": "name DESC" }}'
      // );

      if (categoryFilters.length > 0) {
        query.push("category=" + categoryFilters.join(","));
        payload.push(
          '{"itemCategories":{"inq":' + JSON.stringify(categoryFilters) + "}}"
        );
      }
      if (query.length > 0) {
        history.push({ search: query.join("&") });
      } else {
        history.push({ search: "" });
      }

      getProductsRequest(payload).then((res) => {
        setProducts(res);
      });
    },
    [brandFilters, categoryFilters, getProductsRequest, history]
  );

  useEffect(() => { 
    getProduct();
  }, [brandFilters.length, categoryFilters.length, getProduct]);

  useEffect(() => {
    // Update the document title using the browser API
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const brand = params.get("brand");
    if (brand && brand !== "") {
      setBrandFilters(brand.split(","));
    }
    const category = params.get("category");
    if (category && category !== "") {
      setCategoryFilters(category.split(","));
    }
    getProductCategoryRequest().then((res) => {
      let data = [];
      res.map((item) => {
        data.push({ name: item.categoryName, id: item.categoryId });
        return item;
      });
      setProductCategory(data);
    });
    getBrandsRequest().then((res) => {
      let data = [];
      res.map((item) => {
        data.push({ name: item.brandName, id: item.brandId });
        return item;
      });
      setBrand(data);
    });
  }, []);

  const onBrandChange = (e) => {
    setSelectedBrand(e.value);
  };
  const onSortByChange = (e) => {
    setSortBy(e.value);
  };

  const filterBrandChange = (e) => {
    let selectedBrands = [...brandFilters];
    if (e.checked) selectedBrands.push(e.value);
    else selectedBrands.splice(selectedBrands.indexOf(e.value), 1);

    setBrandFilters(selectedBrands);
  };
  const filterCategoryChange = (e) => {
    let selectedCategorys = [...categoryFilters];
    if (e.checked) selectedCategorys.push(e.value);
    else selectedCategorys.splice(selectedCategorys.indexOf(e.value), 1);
    setCategoryFilters(selectedCategorys);
  };

  return (
    <>
      <div className="product-list-conatiner">
        <Row className="product-bredcrumb">
          <Col>
            {" "}
            <small>
              {" "}
              <strong>Home / Shop </strong>
            </small>{" "}
          </Col>
        </Row>
        <Container>
          {/* <Row> <div className="category-head-txt"> 
          <h6><strong>Men’s Topwear</strong></h6> 
          </div></Row> */}

          <Row>
            <Col lg={2}>
              <h6 className="filter-txt">Filters</h6>
              <div className="filter-row">
                <FilterboxCompoenent
                  filterTxt="Brand"
                  items={brand}
                  selected={brandFilters}
                  onFilterChange={filterBrandChange}
                />
              </div>
              <div className="filter-row">
                <FilterboxCompoenent
                  filterTxt="Category"
                  items={productCategory}
                  selected={categoryFilters}
                  onFilterChange={filterCategoryChange}
                />
              </div>
            </Col>

            <Col lg={10}>
              <div className="sort-conatiner d-flex">
                {" "}
                <div>
                  {" "}
                  <Dropdown
                    value={sortBy}
                    options={sortByData}
                    onChange={onSortByChange}
                    optionLabel="name"
                    placeholder="Sort By"
                  />
                </div>
              </div>
              <Row className="">
                {products && products.length === 0 && (
                  <div
                    style={{
                      minHeight: 600,
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <div style={{ color: "#888" }}>No products available!</div>
                  </div>
                )}

                {products.map((product) => (
                  <Col sm={4} key={product.productId} className="product-item">
                    <SingleProductComponent product={product} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsRequest: (payload) => dispatch(getProductsRequest(payload)),
    getProductCategoryRequest: () => dispatch(getProductCategoryRequest()),
    getBrandsRequest: () => dispatch(getBrandsRequest()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
