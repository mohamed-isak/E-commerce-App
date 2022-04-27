/* eslint-disable no-unused-vars */
import React from "react";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import "./SignUpComponent.scss";
import { signUp } from "../../redux/user/userActions";
import { resetFormError } from "../../redux/app/appActions";
import { connect } from "react-redux";

function SignUpComponent({ signUp, errorMsg, removeError }) {
  const defaultValues = {
    firstName: "",
    lastName: "",
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
    try {
      signUp(data);
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
    <div className="sign-up-container">
      <div className="card">
        <h5 className="p-text-center">Create An Account</h5>
        {errorMsg && <small className="p-error">{errorMsg}</small>}
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="p-field">
            <span className="p-float-label">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First Name is required." }}
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
                htmlFor="firstName"
                className={classNames({ "p-error": errors.firstName })}
              >
                Fisrt Name*
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
                    onFocus={() => removeError()}
                    toggleMask
                    className={classNames({ "p-invalid": fieldState.invalid })}
                    header={passwordHeader}
                    footer={passwordFooter}
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

          <Button
            type="submit"
            label="Create Account"
            className="p-mt-2 p-button-rounded tee-btn-success logbtn"
          />
        </form>
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
  return {
    signUp: (payload) => dispatch(signUp(payload)),
    removeError: () => dispatch(resetFormError()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
