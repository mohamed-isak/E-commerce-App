/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import { resetFormError } from "../../../redux/app/appActions";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { removeAddress, addAddress } from "../../../redux/user/userActions";
import { connect } from "react-redux";
import {
  getAddressRequest,
  getUserDetails,
  deleteAddressRequest,
  updateAddressRequest,
  addAddressRequest,
} from "../../../redux/user/userActions";
//import {  useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { loggedOut } from "../../../redux/user/userActions";
import { useHistory } from "react-router-dom";

import TextInput from "./TextInput";

const mapState = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  loggedUser: state.user,
  loggedInUser: state.user.loggedInUser,
});

function AddressComponent({
  type,
  deleteAddressRequest,
  getUserDetails,
  getAddressRequest,
  updateAddressRequest,
  addAddressRequest,
}) {
  const dispatch = useDispatch();
  const { isLoggedIn, loggedInUser, loggedUser } = useSelector(mapState);
  const history = useHistory();
  //  const { address } = useSelector(mapState);
  const [address, setAddress] = useState([]);
  const [currentuser, setCurrentuser] = useState("");
  // const defaultValues = {
  //     firstName: '',
  //     lastName:'',
  //     email: '',
  //     password: ''
  // }
  const [errorMsg, setErrorMsg] = useState("");

  const [addaddressview, setAddaddressview] = useState(false);
  const [editaddressview, setEditaddressview] = useState(false);

  const [editaddress, setEditaddress] = useState("");

  const [defaultAddress, setDefaultAddress] = useState({
    firstName: "Paul",
    lastName: "Joy",
    email: "to.paul24@gmail.com",
    addressLine1:
      "Fatima Bint Mubarak Street, Ground Floor, Opp. Al Safa Supermarket",
    addressLine2: "Zayed Bin Sultan St",
    city: "Ruwais",
    country: "United Arab Emirates",
    state: "Abu Dhabi",
    pincode: "307501",
    phoneNumber: "971 811 5555",
    default: true,
  });

  const [userId, setUserId] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [houseNo, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [primary, setPrimary] = useState(false);

  const removeError = () => {
    setErrorMsg("");
  };

  const [profile, setProfileObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  //   const [firstName, setFirstName] = useState('')
  //   useEffect(() => {
  //     console.log("address details");
  //     console.log(address);
  //   }, [addaddressview, editaddressview]);

  useEffect(() => {
    console.log({ loggedUser: loggedUser });
    console.log({ loggedInUser: loggedInUser });

    getUserDetails().then((res) => {
      console.log("user-response");
      console.log(res);

      setCurrentuser(res);
    });

    async function getItems() {
      try {
        const response = await getAddressRequest();
        console.log(response);
        if (response.length >= 0) {
          setAddress(response);
        } else {
          dispatch(loggedOut());
          history.replace("./");
          toast("Login expired! Please login again!");
          return;
        }
      } catch (error) {
        console.log("### ListsHoc :: error :: ", error);
      }
    }

    getItems();
  }, [
    getAddressRequest,
    addaddressview,
    updateAddressRequest,
    editaddressview,
  ]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultValues: {} });

  async function updateAddr(addrItem) {
    try {
      console.log({ editaddr: addrItem });
      const response = await updateAddressRequest(editaddress.id, addrItem);
      console.log({ upatedAddrresp: response });
      if (response.id) {
        setEditaddressview(false);
        setAddaddressview(false);
      } else {
        toast("Failed to update address!");
      }
    } catch (error) {
      console.log("### ListsHoc :: error :: ", error);
    }
  }

  async function deleteAddr(id) {
    try {
      console.log({ editaddr: id });
      const response = await deleteAddressRequest(id);
      console.log({ deleteAddrresp: response });
      let newaddr = address.filter((item) => item.id !== id);
      setAddress(newaddr);
      // if(response.id){
      //     setEditaddressview(false);
      //     setAddaddressview(false);
      // }
      // else{
      //     toast('Failed to update address!')
      // }
    } catch (error) {
      console.log("### ListsHoc :: error :: ", error);
    }
  }

  async function addnewAddr(addrItem) {
    try {
      console.log({ editaddr: addrItem });
      const response = await addAddressRequest(addrItem);
      console.log({ upatedAddrresp: response });
      if (response.id) {
        setEditaddressview(false);
        setAddaddressview(false);
      } else {
        toast("Failed to add address!");
      }
    } catch (error) {
      console.log("### ListsHoc :: error :: ", error);
    }
  }

  const onSubmit = (target) => {
    console.log(editaddress.userId);
    console.log(target[0].value);
    console.log(target[1].value);
    console.log(target[2].value);
    console.log(target[3].value);
    console.log(target[4].value);
    console.log(target[5].value);
    console.log(target[6].value);
    console.log(target[7].value);
    console.log(target[8].value);
    console.log(target[9].value);

    if (editaddressview) {
      let addrItem = {
        userId: editaddress.userId,
        firstName: target[1].value,
        lastName: target[2].value,
        email: target[0].value,
        phone: target[9].value,
        houseNo: target[3].value,
        street: target[4].value,
        city: target[5].value,
        state: target[7].value,
        country: target[6].value,
        zipcode: target[8].value,
        primary: false,
      };
      console.log("updating_adress");
      console.log({ updateaddddresssss: addrItem });
      updateAddr(addrItem);
    } else {
      console.log("addingnew_adress");
      if (!currentuser) {
        toast("Unable to process your request!");
        return;
      }
      let addrItem = {
        userId: currentuser.id,
        firstName: target[1].value,
        lastName: target[2].value,
        email: target[0].value,
        phone: target[9].value,
        houseNo: target[3].value,
        street: target[4].value,
        city: target[5].value,
        state: target[7].value,
        country: target[6].value,
        zipcode: target[8].value,
        primary: false,
      };
      addnewAddr(addrItem);
    }
  };

  const onSubmit2 = (data) => {
    try {
      //let obj = { ...profile };
      console.log("add-new-adddress");
      console.log(data);
      //   let newaddress = {
      //     ...data,
      //     id: address & address.length ? address.length + 1 : 1,
      //   };

      //   addAddress(newaddress);

      let addrItem = {
        userId: editaddress.userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        houseNo: houseNo,
        street: street,
        city: city,
        state: state,
        country: country,
        zipcode: zipcode,
        primary: false,
      };
      if (editaddressview) {
        console.log("updating_adress");
        console.log({ updateaddddresssss: addrItem });
        //  updateAddr(addrItem)
      } else {
        console.log("addingnew_adress");
      }

      //   reset();
    } catch (e) {
      console.log("err", e);
    }
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const AllAddressView = () => {
    return (
      <Container>
        <Row>
          <Col sm={6}>
            <h6>{/* <strong>Address</strong> */}</h6>
          </Col>
          <Col sm={6}>
            <Button
              type="submit"
              label="Add New Address"
              onClick={(e) => {
                setAddaddressview(true);
              }}
              className="p-mt-2 p-button-rounded tee-btn-success logbtn"
            />
          </Col>
        </Row>

        {address && address.length === 0 ? (
          <div
            style={{
              minHeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#888" }}>Address is empty!</div>
          </div>
        ) : (
          address.map((item) => (
            <div>
              <Row style={{ fontSize: 16, color: "#4B567B" }}>
                <Col sm={8} style={{ fontSize: 12 }}>
                  <Row className="filter-row">
                    {" "}
                    {item.firstName.toUpperCase() +
                      " " +
                      item.lastName.toUpperCase()}{" "}
                  </Row>
                  <Row> {item.houseNo} </Row>
                  <Row className="filter-row">
                    {" "}
                    {item.street.toUpperCase()}{" "}
                  </Row>
                  <Row className="filter-row">
                    {" "}
                    {item.city.toUpperCase() +
                      ", " +
                      item.state.toUpperCase()}{" "}
                  </Row>
                  <Row className="filter-row">
                    {" "}
                    {item.country.toUpperCase() +
                      " - " +
                      item.zipcode.toUpperCase()}{" "}
                  </Row>
                  {item.phone ? (
                    <Row className="filter-row" style={{ marginTop: 10 }}>
                      {" "}
                      {"Ph - " + item.phone}{" "}
                    </Row>
                  ) : null}
                </Col>
              </Row>

              <Row
                xs={2}
                md={6}
                lg={6}
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                <span
                  onClick={() => {
                    setUserId(item.userId);
                    setFirstname(item.firstName);
                    setLastname(item.lastName);
                    setEmail(item.email);
                    setPhone(item.phone);
                    setHouse(item.houseNo);
                    setStreet(item.street);
                    setCity(item.city);
                    setState(item.state);
                    setCountry(item.country);
                    setZipcode(item.zipcode);
                    setPrimary(item.primary);

                    setEditaddress(item);
                    setEditaddressview(true);
                    setAddaddressview(true);
                  }}
                  style={{ color: "#FF6740" }}
                >
                  Edit
                </span>
                <span
                  onClick={() => {
                    deleteAddr(item.id);
                  }}
                  style={{ color: "#FF6740" }}
                >
                  Delete
                </span>
              </Row>

              <Row
                xs={2}
                md={6}
                lg={6}
                style={{ height: 1, backgroundColor: "#eee", margin: 40 }}
              ></Row>
            </div>
          ))
        )}
      </Container>
    );
  };

  const foo = ({ param1 }) => {
    // do your stuff
    return (
      <div className="p-field" style={{ marginBottom: 20 }}>
        <span className="p-float-label p-input-icon-right">
          <i className="pi pi-envelope" />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address. E.g. example@email.com",
              },
            }}
            render={({ field, fieldState }) => (
              <InputText
                id={field.name}
                {...field}
                onFocus={() => removeError()}
                className={classNames({ "p-invalid": fieldState.invalid })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          />
          <label
            htmlFor="email"
            className={classNames({ "p-error": !!errors.email })}
          >
            Email*
          </label>
        </span>
        {getFormErrorMessage("email")}
      </div>
    );
  };

  const AddAddressView = () => {
    return (
      <Container style={{ minHeight: 600 }}>
        <Row style={{ marginBottom: 20 }}>
          <Col sm={8}>
            <div className="category-head-txt">
              <h6>
                <strong>
                  {editaddressview && editaddress
                    ? "Edit Address"
                    : "Add New Address"}
                </strong>
              </h6>
            </div>
          </Col>
        </Row>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
            onSubmit(e.target);
            // handleSubmit(onSubmit);
          }}
          className="p-fluid"
        >
          {/* <TextInput name="newemail" label="Email" value={email} setValue={setEmail} />
   

          <TextInput name="name" label="First Name" value={firstName} setValue={setFirstname} />
    */}

          <div className="p-field" style={{ marginBottom: 20 }}>
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-envelope" />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address. E.g. example@email.com",
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    onFocus={() => removeError()}
                    className={classNames({ "p-invalid": fieldState.invalid })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
              />
              <label
                htmlFor="email"
                className={classNames({ "p-error": !!errors.email })}
              >
                Email*
              </label>
            </span>
            {getFormErrorMessage("email")}
          </div>

          <Row style={{ marginBottom: 10 }}>
            <Col sm={6}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "First Name is required." }}
                    render={({ field, fieldState }) => {
                      console.log("field");
                      console.log(field);
                      return (
                        <InputText
                          id={field.name}
                          onFocus={() => removeError()}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          {...field}
                          value={firstName}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      );
                    }}
                  />
                  <label
                    htmlFor="firstName"
                    className={classNames({ "p-error": errors.firstName })}
                  >
                    First Name*
                  </label>
                </span>
                {getFormErrorMessage("firstName")}
              </div>
            </Col>
            <Col sm={6}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "Last Name is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        onFocus={() => removeError()}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    )}
                  />
                  <label
                    htmlFor="lastName"
                    className={classNames({ "p-error": errors.lastName })}
                  >
                    Last Name*
                  </label>
                </span>
                {getFormErrorMessage("lastName")}
              </div>
            </Col>
          </Row>

          <div className="p-field" style={{ marginBottom: 10 }}>
            <span className="p-float-label">
              <Controller
                name="addressLine1"
                control={control}
                rules={{ required: "Required House no, Building name" }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    onFocus={() => removeError()}
                    className={classNames({ "p-invalid": fieldState.invalid })}
                    value={houseNo}
                    onChange={(e) => setHouse(e.target.value)}
                  />
                )}
              />
              <label
                htmlFor="addressLine1"
                className={classNames({ "p-error": errors.lastName })}
              >
                House no, Building name
              </label>
            </span>
            {getFormErrorMessage("addressLine1")}
          </div>

          <div className="p-field" style={{ marginBottom: 10 }}>
            <span className="p-float-label">
              <Controller
                name="addressLine2"
                control={control}
                rules={{ required: "Street name, Area is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    onFocus={() => removeError()}
                    className={classNames({ "p-invalid": fieldState.invalid })}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                )}
              />
              <label
                htmlFor="addressLine2"
                className={classNames({ "p-error": errors.lastName })}
              >
                Street name, Area *
              </label>
            </span>
            {getFormErrorMessage("addressLine2")}
          </div>

          <div className="p-field" style={{ marginBottom: 10 }}>
            <span className="p-float-label">
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    onFocus={() => removeError()}
                    className={classNames({ "p-invalid": fieldState.invalid })}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                )}
              />
              <label
                htmlFor="city"
                className={classNames({ "p-error": errors.lastName })}
              >
                City
              </label>
            </span>
            {getFormErrorMessage("city")}
          </div>

          <Row style={{ marginBottom: 10 }}>
            <Col sm={4}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country is required." }}
                    render={({ field, fieldState }) => {
                      console.log("field");
                      console.log(field);
                      return (
                        <InputText
                          id={field.name}
                          onFocus={() => removeError()}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          {...field}
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      );
                    }}
                  />
                  <label
                    htmlFor="country"
                    className={classNames({ "p-error": errors.firstName })}
                  >
                    Country *
                  </label>
                </span>
                {getFormErrorMessage("country")}
              </div>
            </Col>
            <Col sm={4}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="state"
                    control={control}
                    rules={{ required: "state is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        onFocus={() => removeError()}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    )}
                  />
                  <label
                    htmlFor="state"
                    className={classNames({ "p-error": errors.lastName })}
                  >
                    State *
                  </label>
                </span>
                {getFormErrorMessage("state")}
              </div>
            </Col>

            <Col sm={4}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="pin"
                    control={control}
                    rules={{ required: "PIN is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        key={"inzipcode"}
                        id={field.name}
                        {...field}
                        onFocus={() => removeError()}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                      />
                    )}
                  />
                  <label
                    htmlFor="pin"
                    className={classNames({ "p-error": errors.lastName })}
                  >
                    PIN *
                  </label>
                </span>
                {getFormErrorMessage("pin")}
              </div>
            </Col>
          </Row>

          <div className="p-field" style={{ marginBottom: 10 }}>
            <span className="p-float-label">
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: "Phone Number is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    key={"inphone"}
                    {...field}
                    onFocus={() => removeError()}
                    className={classNames({ "p-invalid": fieldState.invalid })}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}
              />
              <label
                htmlFor="phoneNumber"
                className={classNames({ "p-error": errors.lastName })}
              >
                Phone Number *
              </label>
            </span>
            {getFormErrorMessage("phoneNumber")}
          </div>

          <div className="form-group form-check">
            <input
              name="defaultAddress"
              type="checkbox"
              id="defaultAddress"
              className={`form-check-input ${
                errors.defaultAddress ? "is-invalid" : ""
              }`}
            />
            <label htmlFor="defaultAddress" className="form-check-label">
              Set as default address
            </label>
          </div>

          <Button
            type="submit"
            label="Submit"
            className="p-mt-2 p-button-rounded tee-btn-success logbtn"
          />
        </form>
      </Container>
    );
  };

  return (
    <div className="profile-up-container">
      {errorMsg && <small className="p-error">{errorMsg}</small>}

      {addaddressview ? AddAddressView() : <AllAddressView />}
    </div>
  );
}

// export default AddressComponent;
const mapDispatchToProps = {
  getAddressRequest,
  updateAddressRequest,
  addAddressRequest,
  getUserDetails,
  deleteAddressRequest,
};

export default connect(null, mapDispatchToProps)(AddressComponent);
