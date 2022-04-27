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
import { getUserDetails, updateUser } from "../../../redux/user/userActions";
import { resetFormError } from "../../../redux/app/appActions";
import { connect } from "react-redux";

function ProfileUpdateComponent({
  updateUser,
  getUserDetails,
  errorMsg,
  removeError,
}) {
  // const defaultValues = {
  //     firstName: '',
  //     lastName:'',
  //     email: '',
  //     password: ''
  // }

  const [profile, setProfileObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  //   const [firstName, setFirstName] = useState('')
  useEffect(() => {
    // Update the document title using the browser API
    getUserDetails().then((res) => {
      console.log("user-response");
      console.log(res);
      setProfileObj(res);

      // setFirstName(res.firstName);
      setValue("firstName", res.firstName);
      setValue("lastName", res.lastName);
      setValue("email", res.email);
      // setValue([
      //     { firstName: "test" },

      // ]);
    });
  }, []);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ defaultValues: {} });

  const onSubmit = (data) => {
    try {
      //let obj = { ...profile };
      updateUser(data);
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
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <div className="profile-up-container">
      {errorMsg && <small className="p-error">{errorMsg}</small>}
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
                    className={classNames({ "p-invalid": fieldState.invalid })}
                    {...field}
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
                  className={classNames({ "p-invalid": fieldState.invalid })}
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
                  message: "Invalid email address. E.g. example@email.com",
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  onFocus={() => removeError()}
                  className={classNames({ "p-invalid": fieldState.invalid })}
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

        <Button
          type="submit"
          label="Update"
          className="p-mt-2 p-button-rounded tee-btn-success logbtn"
        />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMsg: state.app.formFailMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (payload) => dispatch(updateUser(payload)),
    getUserDetails: () => dispatch(getUserDetails()),
    removeError: () => dispatch(resetFormError()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileUpdateComponent);
