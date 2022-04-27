/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Container, Row, Col } from "react-bootstrap";
import "./ProfileComponent.scss";
import {
  updateUser,
  fetchUserDetails,
  resetPassword,
} from "../../redux/user/userActions";
import { resetFormError } from "../../redux/app/appActions";
import useFetch from "../../redux/useFetch";
import { connect } from "react-redux";
import { TabPanel, TabView } from "primereact/tabview";
import ResetPasswordComponent from "./Components/ResetPasswordComponent";
import ProfileUpdateComponent from "./Components/ProfileUpdateComponent";
import AddressComponent from "./Components/AddressComponent";


function ProfileMyOrderComponent() {

   var uId = JSON.parse(localStorage.getItem('user')).id;
   var accessToken = localStorage.getItem('accessToken');
  
    const  data = useFetch("https://api.zigners.ae/users/"+uId+"/orders",accessToken);
    console.log(data);

  

  return (
    <>
      <div className="profile-myorder-conatiner">
        <Row className="product-bredcrumb  bredcrumb__custom__align">
          <Col>
            <small>
              <strong>Home / Orders </strong>
            </small>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
             {
               data!==null?<>
               
               {
                  <Container className="myOrderBody">
                  <Row>
                    <Col md={{ span: 1 }}>
                      <p className="orderFilterTitle">Orders</p>
                    </Col>
                    <Col md={{ span: 2, offset: 9 }}>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Past 30 days"
                        size="md"
                        variant="Light"
                        className="Order__item__Card"
                      >
                        <Dropdown.Item href="#">2021</Dropdown.Item>
                        <Dropdown.Item href="#">2020</Dropdown.Item>
                        <Dropdown.Item href="#">2019</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                     {
                        data.map((item,i)=>{
                         return(
                           <>
                            <div className="Order__item__Card">
                     <div className="Order__item__Header">
                       <Row >
                         <Col md={{ span: 2 }} sm ={{ span: 4 }} xs ={{ span: 6 }} >
                           <p>Order Id</p>
                           <p className="Order__item__Header__values">{item.orderId.slice(0,8)}</p>
                         </Col>
                         <Col md={{ span: 2 }} sm ={{ span: 4 }}  xs ={{ span: 6 }}>
                           <p>Order Placed</p>
                           <p className="Order__item__Header__values">{item.date.slice(0,10)}</p>
                         </Col>
                         <Col md={{ span: 2 }}   sm ={{ span: 4 }} xs ={{ span: 6 }}>
                           <p>Payment Status</p>
                           <p className="Order__item__Header__values">Paid</p>
                         </Col>
                         <Col md={{ span: 2 }} sm ={{ span: 4 }} xs ={{ span: 6 }} >
                           <p>Total</p>
                           <p className="Order__item__Header__values">{item.total}</p>
                         </Col>
                         <Col md={{ span: 2, offset: 2 }} sm ={{ span: 4 }}  xs ={{ span: 12}}  >
                           <p className=" btn btn-success Order__item__Header__deliver__status">Delivered Jan 20th</p>
                         </Col>
                       </Row>
                       
                     </div>
     
                     {
                       item.products.map((procd)=>{
                         return (
                           <>
                           <Row>
                       <Col md={{ span: 2 }} sm={{ span: 2}}>
                         <img
                           src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                           alt=""
                           className="Myorder__product__Image"
                         />
                       </Col>
                       <Col md={{ span: 2 }}  sm={{ span: 2 }}>
                           <div class="product__Basic__details">
      
                           <b>
                             <p>{procd.name}</p>
                           </b>
                           <p>T-shirt with printed detail</p>
                           <p>
                             Sized: <b>M</b>
                           </p>
                           <p>
                             Color: <b>Black</b>
                           </p>
                         </div>
                       </Col>
                       <Col md={{ span: 1, offset: 2 }} xs={12}>
                         <p className="Order__item__Header__values__align">QTY: {procd.quantity}</p>
                       </Col>
                       <Col md={{ span: 2}}  xs={12}>
                         <p className="Order__item__Header__values__align">
                           Price: <b>{procd.price}</b>
                         </p>
                       </Col>
                       <Col 
                         md={{ span: 1 }} xs={12}
                         className="Order__item__Header__values__align"
                       >
                         <a href="#" className="btn-custom">
                           Cancel
                         </a>
                         &nbsp;
                       </Col>
                       <Col
                         md={{ span: 1 }} xs={12}
                         className="Order__item__Header__values__align"
                       >
                         <a href="#" className="btn-custom">
                           Reorder
                         </a>
                       </Col>
                     </Row>
                     <br></br>
                           </>
                         )
                       })
                     }
                    
                   </div>
                           </>
                         )
                       })
                     }
                </Container>
               }
               </>:<p>Loading.....</p>
             }
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMsg: state.app.formFailMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileMyOrderComponent);
