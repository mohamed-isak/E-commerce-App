/* eslint-disable no-unused-vars */
import React from "react";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Col, Row } from "react-bootstrap";
import "./SignUpComponent.scss";
import { logIn } from "../../redux/user/userActions";
import { resetFormError } from "../../redux/app/appActions";
import { connect } from "react-redux";

function LoginComponent({ logIn, errorMsg, removeError, movingToCheckout }) {
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log(defaultValues);
    try {
      logIn(data, movingToCheckout);
      // reset();
    } catch (e) {
      console.log("e", e);
    }
  };
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="sign-up-container">
      <div className="card">
        <h5 className="p-text-center">Login</h5>
        {errorMsg && <small className="p-error"> {errorMsg}</small>}
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
          <div className="p-field">
            <span className="p-float-label">
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required." }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    feedback={false}
                    onFocus={() => removeError()}
                    toggleMask
                    className={classNames({ "p-invalid": fieldState.invalid })}
                  />
                )}
              />
              <label
                htmlFor="password"
                className={classNames({ "p-error": errors.password })}
              >
                Password*
              </label>
            </span>
            {getFormErrorMessage("password")}
          </div>

          {/* <a className="forgot-pwd">Forgot Your Password?</a> */}

          <Button
            type="submit"
            label="LogIn"
            className="p-mt-2 p-button-rounded tee-btn-success"
          />
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMsg: state.app.formFailMsg,
    movingToCheckout: state.app.movingToCheckout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (payload) => dispatch(logIn(payload)),
    removeError: () => dispatch(resetFormError()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
