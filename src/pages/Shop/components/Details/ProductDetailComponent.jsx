import React, { useState, useEffect, Fragment, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { ProgressBar } from "primereact/progressbar";
import "./ProductDetailComponent.scss";
import { Galleria } from "primereact/galleria";
import star from "../../../../assets/images/shop/star.svg";
import DOMPurify from "dompurify";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";

import {
  addWishlistRequest,
  deleteWishlistRequest,
  checkWishlistRequest,
} from "../../../../redux/user/userActions";

// import Parser from 'html-react-parser';

// import image1 from '../../../../assets/images/shop/productdetail/black/image-06-large.png'
// import image1thumbnail from '../../../../assets/images/shop/productdetail/black/image-06-thumbnail.png'
// import image2 from '../../../../assets/images/shop/productdetail/black/image-07-large.png'
// import image2thumbnail from '../../../../assets/images/shop/productdetail/black/image-07-thumbnail.png'
// import image3 from '../../../../assets/images/shop/productdetail/black/image-08-large.png'
// import image3thumbnail from '../../../../assets/images/shop/productdetail/black/image-08-thumbnail.png'
// import image4 from '../../../../assets/images/shop/productdetail/black/image-09-large.png'
// import image4thumbnail from '../../../../assets/images/shop/productdetail/black/image-09-thumbnail.png'
// import image5 from '../../../../assets/images/shop/productdetail/black/image-10-large.png'
// import image5thumbnail from '../../../../assets/images/shop/productdetail/black/image-10-thumbnail.png'

// import image11 from '../../../../assets/images/shop/productdetail/grey/image-11-large.png'
// import image11thumbnail from '../../../../assets/images/shop/productdetail/grey/image-11-thumbnail.png'
// import image12 from '../../../../assets/images/shop/productdetail/grey/image-12-large.png'
// import image12thumbnail from '../../../../assets/images/shop/productdetail/grey/image-12-thumbnail.png'
// import image13 from '../../../../assets/images/shop/productdetail/grey/image-13-large.png'
// import image13thumbnail from '../../../../assets/images/shop/productdetail/grey/image-13-thumbnail.png'
// import image14 from '../../../../assets/images/shop/productdetail/grey/image-14-large.png'
// import image14thumbnail from '../../../../assets/images/shop/productdetail/grey/image-14-thumbnail.png'
// import image15 from '../../../../assets/images/shop/productdetail/grey/image-15-large.png'
// import image15thumbnail from '../../../../assets/images/shop/productdetail/grey/image-15-thumbnail.png'

import wishListbtn from "../../../../assets/images/wishlist-button.svg";
import wishListbtnactive from "../../../../assets/images/wishlist-button-active.svg";
import truckLine from "../../../../assets/images/truck-line.svg";

import related1 from "../../../../assets/images/shop/related/related-1.png";
import related2 from "../../../../assets/images/shop/related/related-2.png";
import related3 from "../../../../assets/images/shop/related/related-3.png";
import related4 from "../../../../assets/images/shop/related/related-4.png";
import SingleProductComponent from "../SingleProductComponent";
import {
  AddToCart,
  getProductDetailsRequest,
} from "../../../../redux/cart/cartActions";

import {
  addWishlist,
  removeWishlist,
} from "../../../../redux/user/userActions";

import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const mapState = (state) => ({
  wishlist: state.user.wishlist,
});

const relatedProduct = [
  {
    id: 1,
    name: "Printed Round Neck T-Shirt",
    brand: "Allen Solly",
    img: related1,
    price: 152,
  },
  {
    id: 2,
    name: "Printed Round Neck T-Shirt",
    brand: "Allen Solly",
    img: related2,
    price: 128,
  },
  {
    id: 3,
    name: "Printed Round Neck T-Shirt",
    brand: "Allen Solly",
    img: related3,
    price: 132,
  },
  {
    id: 4,
    name: "Printed Round Neck T-Shirt",
    brand: "Allen Solly",
    img: related4,
    price: 140,
  },
];

const quanties = [
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: 4, value: 4 },
  { name: 5, value: 5 },
];

const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 5,
  },
  {
    breakpoint: "768px",
    numVisible: 3,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
  },
];
const responsiveOptions2 = [
  {
    breakpoint: "1024px",
    numVisible: 5,
  },
  {
    breakpoint: "768px",
    numVisible: 3,
  },
  {
    breakpoint: "560px",
    numVisible: 3,
  },
];

// const greyImages = [
//     {
//         "itemImageSrc": image11,
//         "thumbnailImageSrc": image11thumbnail,
//         "alt": "Description for Image 1",
//         "title": "Title 1"
//     },
//     {
//         "itemImageSrc": image12,
//         "thumbnailImageSrc": image12thumbnail,
//         "alt": "Description for Image 2",
//         "title": "Title 2"
//     },
//     {
//         "itemImageSrc": image13,
//         "thumbnailImageSrc": image13thumbnail,
//         "alt": "Description for Image 3",
//         "title": "Title 3"
//     },
//     {
//         "itemImageSrc": image14,
//         "thumbnailImageSrc": image14thumbnail,
//         "alt": "Description for Image 4",
//         "title": "Title 4"
//     },
//     {
//         "itemImageSrc": image15,
//         "thumbnailImageSrc": image15thumbnail,
//         "alt": "Description for Image 4",
//         "title": "Title 4"
//     }]

// const blackImages = [
// {
//     "itemImageSrc": image1,
//     "thumbnailImageSrc": image1thumbnail,
//     "alt": "Description for Image 1",
//     "title": "Title 1"
// },
// {
//     "itemImageSrc": image2,
//     "thumbnailImageSrc": image2thumbnail,
//     "alt": "Description for Image 2",
//     "title": "Title 2"
// },
// {
//     "itemImageSrc": image3,
//     "thumbnailImageSrc": image3thumbnail,
//     "alt": "Description for Image 3",
//     "title": "Title 3"
// },
// {
//     "itemImageSrc": image4,
//     "thumbnailImageSrc": image4thumbnail,
//     "alt": "Description for Image 4",
//     "title": "Title 4"
// },
// {
//     "itemImageSrc": image5,
//     "thumbnailImageSrc": image5thumbnail,
//     "alt": "Description for Image 4",
//     "title": "Title 4"
// }]

function ProductDetailComponent({
  getProductDetailsRequest,
  checkWishlistRequest,
  addWishlistRequest,
}) {
  let { id } = useParams();
  const { wishlist } = useSelector(mapState);
  const [productDetails, setProductDetails] = useState({});
  const [sizeAvailable, setSizeAvailable] = useState([]);
  const [size, setSize] = useState("");
  const [productItem, setProductItem] = useState("");
  const toast = useRef(null);
  const dispatch = useDispatch();
  const { cartData = {} } = useSelector((state) => state);
  const { cartItems = [] } = cartData ?? {};
  const [colorsAvailable, setColorsAvailable] = useState([]);
  console.log(colorsAvailable);
  useEffect(() => {
    console.log("usefectssssssss1111");
    dispatch({ type: "SET_CART_COUNT", count: cartItems.length });
  }, [cartItems.length, dispatch]);

  async function checkWishItem(id) {
    console.log("addwishlistid : " + id);
    try {
      const response = await checkWishlistRequest(id);
      console.log(response);
      if (response) {
        setWishitem(true);
      }
    } catch (error) {
      console.log("### ListsHoc :: error :: ", error);
    }
  }

  useEffect(() => {
    console.log("usefectssssssss1111222222222");
    getProductDetailsRequest(id).then((res) => {
      console.log("product-details");
      setProductItem(res);
      //  checkWishlist(res)

      checkWishItem(res.productId);

      console.log(res);
      let productImage = [];
      res.productImages.map((item) => {
        productImage.push({
          itemImageSrc: item,
          thumbnailImageSrc: item,
          alt: item,
          title: item,
        });
        return item;
      });
      setColorsAvailable(res.colorsAvailable);
      if (res.colorsAvailable.length > 0) {
        // setColor({
        //   name: res.colorsAvailable[0].cName,
        //   code: res.colorsAvailable[0].cCode,
        // });
        setColor(res.colorsAvailable);
      }

      setImages(productImage);
      setSizeAvailable(res.sizeAvailable);

      setProductDetails(res);
      console.log(res);
    });
  }, []);
  const [selectedCount, setSelectedCount] = useState(1);
  const [color, setColor] = useState("");

  const [wishitem, setWishitem] = useState(false);

  const [images, setImages] = useState([]);
  const [deliverTo, setDeliverTo] = useState("");

  async function addToWishlist(id) {
    console.log("addwishlistid : " + id);
    try {
      const response = await addWishlistRequest(id);
      console.log(response);

      // if(response.error.statusCode === 401){

      //   }
      //   else if(response.length >= 0){

      //   }
    } catch (error) {
      console.log("### ListsHoc :: error :: ", error);
    }
  }

  async function deleteFromWishlist(id) {
    console.log("deleteFromWishlist : " + id);
    try {
      const response = await deleteWishlistRequest(id);
      console.log(response);
    } catch (error) {
      console.log("### ListsHoc :: error :: ", error);
    }
  }

  const checkWishlist = (product) => {
    let index = wishlist.findIndex(
      (item) => item.productId === product.productId
    );
    console.log("index " + index);
    if (index !== -1) {
      setWishitem(true);
    } else {
      setWishitem(false);
    }
  };

  const itemTemplate = (item) => {
    return (
      <img src={item.itemImageSrc} alt={item.alt} style={{ width: "80%" }} />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        className="thumb-img"
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ width: "80%" }}
      />
    );
  };

  const onCountChange = (e) => {
    setSelectedCount(e.value);
  };

  // useEffect(() => {
    // console.log("usefectssssssss1111333333333333 " + wishitem);
    //  if(color === '#000000')
    //   setImages(blackImages)
    //  else
    //  setImages(greyImages)
  // }, [color, wishitem]);

  const colorChange = (val) => {
    setColor(val);
    // let colorFilter = colorsAvailable.find((w) => w.cCode === e);
    // if (colorFilter) {
      // setColor({
      //   name: colorFilter.cName,
      //   code: colorFilter.cCode,
      // });
    // }
  };

  const getWishColor = (wishitem) => {
    if (wishitem) return "#FF6740";
    else return "#888";
  };

  const Wishbtn = () => {
    return (
      <Button
        onClick={() => {
          //  console.log({productitem : productItem})

          console.log("wishitemmmmmmmm " + wishitem);

          if (wishitem) {
            setWishitem(false);
            deleteFromWishlist(productItem.productId);
          } else {
            setWishitem(true);
            addToWishlist(productItem.productId);
          }
        }}
        label={"Wishlist"}
        className="p-button-rounded tee-btn-success wish-btn"
        style={{ marginLeft: 10, backgroundColor: getWishColor(wishitem) }}
      />
    );
  };
  function handleAddToCart() {
    const data = {
      qty: {
        [`${size}`.toLowerCase()]: selectedCount,
      },
      price: productDetails.price,
      id: productDetails.productId,
      image: productDetails.image,
      color: color
    };

    if (!size) {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Please select any size",
        life: 3000,
      });
      return;
    }
    if (color !== "White" && color !== "Black") {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Please select any color",
        life: 3000,
      });
      return;
    }
    console.log(data)
    dispatch(AddToCart(data));
  }

  return (
    <Fragment>
      <Toast ref={toast} />
      <div className="product-detail-conatiner">
        <Row className="product-bredcrumb">
          <Col>
            {" "}
            <small>
              {" "}
              <strong>Home / Shop / Allen Solly </strong>
            </small>{" "}
          </Col>
          {/* <Col> <Button label='Add To Cart' className="p-button-rounded tee-btn-success"  /> </Col> */}
        </Row>

        <Container>
          <Row>
            {/* <Col sm={12}><h6><strong>Men’s Topwear </strong></h6></Col> */}
            <Col sm={12}>
              <Card>
                <Row>
                  <Col className="d-none d-md-block" lg={6}>
                    <Galleria
                      value={images}
                      responsiveOptions={responsiveOptions}
                      numVisible={5}
                      style={{ maxWidth: "640px" }}
                      thumbnailsPosition="left"
                      verticalThumbnailViewPortHeight="300"
                      item={itemTemplate}
                      thumbnail={thumbnailTemplate}
                    />
                  </Col>
                  <Col className=" d-md-none" lg={6}>
                    <Galleria
                      value={images}
                      responsiveOptions={responsiveOptions2}
                      numVisible={5}
                      style={{ maxWidth: "640px" }}
                      thumbnailsPosition="bottom"
                      verticalThumbnailViewPortHeight=""
                      item={itemTemplate}
                      thumbnail={thumbnailTemplate}
                    />
                  </Col>
                  <Col lg={6} style={{ lineHeight: "1.5em" }}>
                    <h6>
                      {" "}
                      <strong className="prdct-name-txt">
                        {productDetails.name}{" "}
                      </strong>
                    </h6>
                    <small className="product-desc">
                      {productDetails.details}
                    </small>
                    <div style={{ fontSize: "10pt" }}>
                      {" "}
                      <strong>AED {productDetails.price}</strong>
                      {productDetails.crossPrice && (
                        <span className="old-price">
                          AED {productDetails.crossPrice}
                        </span>
                      )}
                    </div>
                    <div>
                      <img src={star} /> <strong>4.2</strong>{" "}
                      <span>183 reviews</span>
                    </div>
                    <div className="size-label">
                      {" "}
                      <small>
                        <strong> Size: {size} </strong>
                      </small>{" "}
                      <small className="chart-link">
                        <strong>Size Chart </strong>
                      </small>{" "}
                      <small className="qty-label">
                        <strong>Quantity </strong>
                      </small>
                    </div>

                    <div className="sizes-container">
                      {sizeAvailable.map((sizeOption) => {
                        return (
                          <div
                            className={`size-item ${
                              sizeOption.sizeName === size ? "selectedSize" : ""
                            }`}
                            onClick={() => {
                              setSize(sizeOption.sizeName);
                            }}
                          >
                            {sizeOption.sizeName}
                          </div>
                        );
                      })}
                      {/*                      
                     <div className="size-item">m</div>
                     <div className="size-item">l</div>
                     <div className="size-item">xl</div>
                     <div className="size-item">xxl</div>   */}
                      <div style={{ marginLeft: "2em" }}>
                        <Dropdown
                          value={selectedCount}
                          options={quanties}
                          onChange={onCountChange}
                          optionLabel="name"
                        />
                      </div>
                    </div>
                    <div className="color-label">
                      {" "}
                      <small>
                        {
                          color !== '' ? (
                            <strong> Color : {color === "White" ? "White" : color === "Black" ? "Black" : ''}</strong>
                          ) : ''
                        }
                      </small>
                    </div>
                    <div className="color-container">
                      { colorsAvailable.map((colorCode) => {
                        return (
                          <div className="txt-cnt" style ={{ paddingLeft: "10px"}}>
                            {/* <RadioButton
                              inputId={colorCode}
                              name="color"
                              // style={{ backgroundColor: colorCode.cCode }}
                              style={{ backgroundColor: colorCode === "White" ? "white" : "black" }}
                              value={colorCode}
                              onClick={(e) => colorChange(e.value)}
                              checked={color === colorCode}
                            /> */}
                              <div
                                style={{ 
                                  padding: "9px", 
                                  borderStyle: "solid", 
                                  borderColor: color === colorCode ? "orange" : "", 
                                  cursor: "pointer",
                                  backgroundColor: colorCode === "White" ? "white" : "black" 
                                }}
                              value={colorCode}
                              onClick={() => colorChange(colorCode)}
                            />
                            {/* <label htmlFor={colorCode.cCode} style={{backgroundColor:colorCode.cCode}}>{colorCode.cName}</label> */}
                          </div>
                        );
                      })}

                      {/* <RadioButton inputId="grey" name="color" className="greyItem" value="#9FA8AB" onChange={(e) => setColor(e.value)} checked={color === '#9FA8AB'} /> */}
                    </div>

                    <div className="btn-container">
                      {" "}
                      <Button
                        onClick={handleAddToCart}
                        label="Add To Cart"
                        className="p-button-rounded tee-btn-success cart-btn"
                      />
                      <Wishbtn />
                    </div>
                  </Col>
                </Row>
              </Card>
              <Row style={{ marginTop: "1em" }}>
                <Col sm={6}>
                  <Card style={{ height: "100%" }}>
                    {/* <h6><strong>Product Details</strong></h6>
                         <small>
                         {productDetails.details}
                         </small>
                         <br/>
                         <br/> */}

                    <div
                      className="content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(productDetails.description),
                      }}
                    ></div>

                    {/* <br />
                         <br />
                         <small>
                             <ul className='product-specs-ul'>
                                 <li>Solid</li>
                                 <li>regular length</li>
                                 <li>round neck</li>
                                 <li>short sleeves, regular sleeves</li>
                                 <li>knitted cotton fabric</li>
                             </ul>                      
                         </small>                    
                        
                         <small>
                             <strong>Size & Fit</strong>
                             <br />
                             Regular fit The model (height 6’) is wearing a Size 32
                         </small>
                         <br />
                         <br />
                        
                         <small>
                             <strong>Material & Care</strong>
                             <br />
                             100% Cotton Machine Wash
                         </small> */}
                  </Card>
                </Col>
                <Col sm={6} className="my-4 my-md-0">
                  <Card>
                    <h6>
                      <strong>Delivery Options</strong>
                    </h6>
                    <h6>
                      <small>Deliver to</small>
                    </h6>
                    <InputText
                      value={deliverTo}
                      onChange={(e) => setDeliverTo(e.target.value)}
                    />
                    <br />
                    <br />
                    <img src={truckLine} />
                    <br />
                    <h6>
                      <small>Delivery by</small>
                    </h6>
                    <strong> Wed 25 Aug - Mon 30 Aug.</strong>
                    <br />
                    <h6>
                      <small>30 day return policy</small>
                    </h6>
                    <h6>
                      <small>Cash on delivery available</small>
                    </h6>
                    <br />
                    <strong> Reviews (183) </strong>
                    <br />
                    <div>
                      <img src={star} /> <strong>4.2 / 5</strong>{" "}
                    </div>
                    <Row className="review-bar">
                      {" "}
                      <Col>
                        5{" "}
                        <ProgressBar
                          value={70}
                          color="#00A74F"
                          style={{ height: "6px" }}
                        ></ProgressBar>
                      </Col>{" "}
                    </Row>
                    <Row className="review-bar">
                      {" "}
                      <Col>
                        4{" "}
                        <ProgressBar
                          value={55}
                          color="#00A74F"
                          style={{ height: "6px" }}
                        ></ProgressBar>
                      </Col>{" "}
                    </Row>
                    <Row className="review-bar">
                      {" "}
                      <Col>
                        3{" "}
                        <ProgressBar
                          value={40}
                          color="#00A74F"
                          style={{ height: "6px" }}
                        ></ProgressBar>
                      </Col>{" "}
                    </Row>
                    <Row className="review-bar">
                      {" "}
                      <Col>
                        2{" "}
                        <ProgressBar
                          value={12}
                          color="#FFC300"
                          style={{ height: "6px" }}
                        ></ProgressBar>
                      </Col>{" "}
                    </Row>
                    <Row className="review-bar">
                      {" "}
                      <Col>
                        1{" "}
                        <ProgressBar
                          value={8}
                          color="#FFC300"
                          style={{ height: "6px" }}
                        ></ProgressBar>
                      </Col>{" "}
                    </Row>
                  </Card>
                </Col>
              </Row>

              {/* <Row style={{margin:'2em 0'}}>
               <Col sm={12}>
                  <h6><strong>Related Products</strong></h6>
                  <Row> { relatedProduct.map(related => <SingleProductComponent  key={related.id} product={related}/> )} </Row>
                  
                 </Col>        

               </Row> */}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductDetailsRequest: (productId) =>
      dispatch(getProductDetailsRequest(productId)),
    addWishlistRequest: (id) => dispatch(addWishlistRequest(id)),
    deleteWishlistRequest: (id) => dispatch(deleteWishlistRequest(id)),
    checkWishlistRequest: (id) => dispatch(checkWishlistRequest(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailComponent);
