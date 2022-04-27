/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./WishListComponent.scss";

// import { data } from '../../../../shared/data/Products'
import SingleProductComponent from "../Shop/components/SingleProductComponent";
import { Dropdown } from "primereact/dropdown";
import FilterboxCompoenent from "../Shop/components/FilterboxCompoenent";
import {
  getBrandsRequest,
  getProductCategoryRequest,
  getProductsRequest,
} from "../../redux/cart/cartActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loggedOut } from "../../redux/user/userActions";
import { ToastContainer, toast } from "react-toastify";

import {
  getWishlistRequest,
  deleteWishlistRequest,
} from "../../redux/user/userActions";

// const mapState = state => ({
//   wishlist: state.user.wishlist,
// })

function WishListComponent({
  getProductsRequest,
  getProductCategoryRequest,
  getBrandsRequest,
  getWishlistRequest,
  deleteWishlistRequest,
}) {
  // const { wishlist } = useSelector(mapState)
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [brandFilters, setBrandFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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

  async function getItems() {
    try {
      const response = await getWishlistRequest();
      console.log(response);
      console.log(response);
      console.log("wishcount " + response.length);
      if (response && response.error && response.error.statusCode === 401) {
        dispatch(loggedOut());
        history.replace("./");
        toast("Login expired! Please login again!!");
        return;
      } else if (response && response.error) {
        dispatch(loggedOut());
        history.replace("./");
        toast("Something went wrong! Please login again later!");
        return;
      }

      if (response && response.length && response.length > 0 || response.length == 0) {
        setWishlist(response);
      }

      // if (!response.length) {
        // dispatch(loggedOut());
        // history.replace("./");
        // toast("Login expired! Please login again!!!");
        // return;
      // }
    } catch (error) {
      console.log("### ListsHoc :: error :: ", error);
    }
  }
  useEffect(() => {
    //     getUserDetails().then((res) => {
    //       console.log("user-response");
    //       console.log(res);

    //       setCurrentuser(res)

    //  });

    getItems();
  }, [getWishlistRequest]);

  const deleteFromWishlist = async (id) => {
    console.log("addwishlistid : " + id);
    try {
      const response = await deleteWishlistRequest(id);
      console.log(response);
      getItems();
      // if(response.error.statusCode === 401){

      //   }
      //   else if(response.length >= 0){

      //   }
    } catch (error) {
      console.log("### ListsHoc :: error :: ", error);
    }
  };

  // useEffect(() => {
  //   console.log("wishlist-data");
  //   console.log(wishlist);
  //   getProduct();
  // }, [brandFilters.length, categoryFilters.length, getProduct]);

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   const search = window.location.search;
  //   const params = new URLSearchParams(search);
  //   const brand = params.get("brand");
  //   if (brand && brand !== "") {
  //     setBrandFilters(brand.split(","));
  //   }
  //   const category = params.get("category");
  //   if (category && category !== "") {
  //     setCategoryFilters(category.split(","));
  //   }
  //   getProductCategoryRequest().then((res) => {
  //     let data = [];
  //     res.map((item) => {
  //       data.push({ name: item.categoryName, id: item.categoryId });
  //       return item;
  //     });
  //     setProductCategory(data);
  //   });
  //   getBrandsRequest().then((res) => {
  //     let data = [];
  //     res.map((item) => {
  //       data.push({ name: item.brandName, id: item.brandId });
  //       return item;
  //     });
  //     setBrand(data);
  //   });
  // }, []);
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

  const displayWishlist = () => {
    if (wishlist && wishlist.length === 0) {
      return (
        <div
          style={{
            minHeight: 600,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#888" }}>Wishlist is empty!</div>
        </div>
      );
    } else {
      return (
        <Row>
          {/* <Col sm={2}>  <h6 className="filter-txt">Filters</h6>
       <Row className="filter-row">
         <FilterboxCompoenent filterTxt='Brand' items={brand} selected={brandFilters}  onFilterChange={filterBrandChange}/>
        
       </Row>
       <Row className="filter-row">
        
         <FilterboxCompoenent filterTxt='Category' items={productCategory} selected={categoryFilters}  onFilterChange={filterCategoryChange}/>
       </Row>
      
      </Col> */}

          <Col sm={12}>
            {/* <Row className="sort-conatiner"> <div> <Dropdown value={sortBy} options={sortByData} onChange={onSortByChange} optionLabel="name" placeholder="Sort By" /></div></Row> */}
            <Row>
              {wishlist.map((product) => (
                <Col sm={3} key={product.productId} className="product-item">
                  <SingleProductComponent
                    product={product}
                    wishlist={true}
                    removeWishlist={deleteFromWishlist}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      );
    }
  };

  return (
    <>
      <div className="product-list-conatiner">
        <Row className="product-bredcrumb">
          <Col>
            {" "}
            <small>
              {" "}
              <strong>Home / Wishlist </strong>
            </small>{" "}
          </Col>
        </Row>
        <Container>
          {/* <Row> <div className="category-head-txt"> 
          <h6><strong>Men’s Topwear</strong></h6> 
          </div></Row> */}

          {displayWishlist()}
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  getWishlistRequest,
  deleteWishlistRequest,
};

export default connect(null, mapDispatchToProps)(WishListComponent);

// const mapDispatchToProps = (dispatch) => {
//    return {
//       getProductsRequest:(payload)=>dispatch(getProductsRequest(payload)),
//       getProductCategoryRequest:()=>dispatch(getProductCategoryRequest()),
//       getBrandsRequest:()=>dispatch(getBrandsRequest()),
//    }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(WishListComponent)
