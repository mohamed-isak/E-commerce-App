import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Col, Row,Container } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { useDispatch, useSelector,connect } from "react-redux";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import {
  setShippingInfo,
  getAddressRequest,
  getUserDetails,
  deleteAddressRequest,
  updateAddressRequest,
  addAddressRequest,
} from "../../../redux/user/userActions";
import { goToShipping } from "../../../redux/design/designActions";

const countryDroDowmStyle = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: "10pt",
  color: "#495057",
  background: "#ffffff",
  padding: "0.5rem 0.5rem",
  border: "1px solid #ced4da",
  transition:
    "background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s",
  appearance: "none",
  borderRadius: "3px",
  width: "100%",
};

const mapState = (state) => ({
  shippingInfo: state.user.shippingInfo,
  isLoggedIn: state.user.isLoggedIn,
  loggedUser: state.user,
  loggedInUser: state.user.loggedInUser,
});

  

  //  UI Render Part 

 function CheckoutInformationComponent({getAddressRequest}) {

  // Initial declaration 
  const dispatch = useDispatch();
  const { isLoggedIn, loggedInUser, loggedUser } = useSelector(mapState);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setselectedAddress] = useState(0);
  const [country, setCountry] = useState("");

  const [region, setRegion] = useState("");
  const { shippingInfo } = useSelector(mapState);

  const countryRef = useRef("");

  /// Initial function calls
  useEffect(() => {
    console.log({ loggedUser: loggedUser });
    console.log({ loggedInUser: loggedInUser });

    

    async function getItems() {
      try {
        const response = await getAddressRequest();
        console.log(response);
        if (response.length >= 0) {
          setAddress(response);
        } else {
          console.log("Nor correct reponse");
          //dispatch(loggedOut());
          //history.replace("./");
          //toast("Login expired! Please login again!");
          return;
        }
      } catch (error) {
        console.log("### ListsHoc :: error :: ", error);
      }
    }

    getItems();
  }, [
    getAddressRequest,
  ]);


  


  const defaultValues = shippingInfo || {
    firstName: "",
    email: "",
    lastName: "",
    address: "",
    city: "",
    street: "",
    country: country,
    region: region,
    pinCode: "",
    save: true,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onSubmit = (data) => {
    console.log("data", data);
    dispatch(setShippingInfo(data));
    dispatch(goToShipping());
  };

  return (
    <>
      <Container>
      <Row style={{ fontSize: 16, color: "#4B567B" }}>
          {

          address && address.length === 0 ?(
            <>Empty</>
          ):address.map((item,i)=>{
            var selectedAddr = 0;
            return (
              <Col md={{span: 3,offset: 1,}} className={selectedAddress===i?"Checkout__Address__info1":"Checkout__Address__info2"} key={i}>
                 <div onClick={(e)=>{
                    setselectedAddress(i);
                 }}>
                 <p>{item.firstName.toUpperCase()+' '+item.lastName.toUpperCase()}</p>
                <p>{item.street.toUpperCase()}</p>
                <p>{item.city.toUpperCase()+' '+item.state}</p>
                <p>{item.country.toUpperCase()+' '+item.zipcode}</p>
                <p>{item.phone ? (
                    <p style={{ marginTop: 10 }}>
                      {" "}
                      {"Ph - " + item.phone}{" "}
                    </p>
                  ) : null}</p> 
                 </div>
              </Col>
            )
          })
          }
      </Row>
      </Container>
      <Row className="info-head">
        <Col xs={6} className="info-category-head">
          Contact Information
        </Col>
        <Col xs={6} className="log-text">
          Already Have An Account? <span className="login-link">Login</span>
        </Col>
      </Row>
      <Row className="info-form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-fluid"
          autoComplete="off"
        >
          <Row>
            <Col>
              <div className="p-field">
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message:
                          "Invalid email address. E.g. example@email.com",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
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
            </Col>
          </Row>
          <Row className="form-head">
            {" "}
            <Col xs={6} className="info-category-head">
              {" "}
              Shipping Address
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "first name is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({ "p-error": errors.name })}
                  >
                    First Name*
                  </label>
                </span>
                {getFormErrorMessage("firstName")}
              </div>
            </Col>

            <Col xs={6}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "last name is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="lastName"
                    className={classNames({ "p-error": errors.name })}
                  >
                    Last Name*
                  </label>
                </span>
                {getFormErrorMessage("lastName")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: "address is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({ "p-error": errors.name })}
                  >
                    House no, Building name
                  </label>
                </span>
                {getFormErrorMessage("address")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="street"
                    control={control}
                    rules={{ required: "Street is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({ "p-error": errors.name })}
                  >
                    Street name, Area
                  </label>
                </span>
                {getFormErrorMessage("street")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "City is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="city"
                    className={classNames({ "p-error": errors.name })}
                  >
                    City
                  </label>
                </span>
                {getFormErrorMessage("city")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="country"
                    defaultValue={false}
                    control={control}
                    rules={{ required: "Country is required." }}
                    render={({ field }) => (
                      <CountryDropdown
                        id={field.name}
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setCountry(e);
                        }}
                        style={countryDroDowmStyle}
                      />
                    )}
                  />
                  {/* <label htmlFor="country">Country</label> */}
                </span>
              </div>
            </Col>
            <Col xs={4}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="region"
                    control={control}
                    rules={{ required: "Region is required." }}
                    render={({ field }) => (
                      <RegionDropdown
                        country={country}
                        id={field.name}
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                        style={countryDroDowmStyle}
                      />
                    )}
                  />
                  {/* <label htmlFor="country">State</label> */}
                </span>
              </div>
            </Col>
            <Col xs={4}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="pinCode"
                    control={control}
                    rules={{ required: "Pincode is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="pinCode"
                    className={classNames({ "p-error": errors.name })}
                  >
                    Pin code
                  </label>
                </span>
                {getFormErrorMessage("pinCode")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="p-field">
                <span className="p-float-label">
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "phone is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                      />
                    )}
                  />
                  <label
                    htmlFor="name"
                    className={classNames({ "p-error": errors.name })}
                  >
                    Phone Number
                  </label>
                </span>
                {getFormErrorMessage("phone")}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="p-field-checkbox">
                <Controller
                  name="save"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <Checkbox
                      inputId={field.name}
                      onChange={(e) => field.onChange(e.checked)}
                      checked={field.value}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="save"
                  style={{ margin: 0, marginLeft: ".5em", fontSize: "10pt" }}
                  className={classNames({ "p-error": errors.accept })}
                >
                  Save this information for the next time
                </label>
              </div>
            </Col>
          </Row>
          <div>
            <Button
              label="Continue To Shipping"
              className="p-button-rounded tee-btn-success"
            />
          </div>
        </form>
      </Row>
    </>
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

export default connect(null, mapDispatchToProps)(CheckoutInformationComponent);

