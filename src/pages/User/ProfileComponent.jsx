/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import "./ProfileComponent.scss";
import {
  updateUser,
  fetchUserDetails,
  resetPassword,
} from "../../redux/user/userActions";
import { resetFormError } from "../../redux/app/appActions";
import { connect } from "react-redux";
import { TabPanel, TabView } from "primereact/tabview";
import ResetPasswordComponent from "./Components/ResetPasswordComponent";
import ProfileUpdateComponent from "./Components/ProfileUpdateComponent";
import AddressComponent from "./Components/AddressComponent";

function ProfileComponent() {
  return (
    <div className="profile-up-container">
      <div className="card" style={{ minHeight: 700 }}>
        <TabView className="apparel-tab">
          <TabPanel header="Profile">
            <ProfileUpdateComponent></ProfileUpdateComponent>
          </TabPanel>
          <TabPanel header="Address">
            <AddressComponent></AddressComponent>
          </TabPanel>
          <TabPanel header="Reset Password">
            <ResetPasswordComponent></ResetPasswordComponent>
          </TabPanel>
        </TabView>
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
