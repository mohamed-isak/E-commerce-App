/* eslint-disable no-unused-vars */
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { resetFormError } from "../../../redux/app/appActions";
import {
  fetchUserDetails,
  resetPassword,
  updateUser,
} from "../../../redux/user/userActions";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";

function ResetPasswordComponent({ resetPassword, removeError }) {
  const defaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    try {
      if (data?.password !== data?.confirmPassword) {
        alert("Passwords doesn't match");
        return;
      }
      console.log("### onSubmit data :: ", data);
      resetPassword(data);
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
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        {/* <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div> */}

        <div className="p-field">
          <span className="p-float-label">
            <Controller
              name="currentpassword"
              control={control}
              rules={{ required: "Current Password is required." }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  onFocus={() => removeError()}
                  toggleMask
                  className={classNames({ "p-invalid": fieldState.invalid })}
                />
              )}
            />
            <label
              htmlFor="currentpassword"
              className={classNames({ "p-error": errors.password })}
            >
              Current Password *
            </label>
          </span>
          {getFormErrorMessage("currentpassword")}
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
              New password *
            </label>
          </span>
          {getFormErrorMessage("password")}
        </div>
        <div className="p-field">
          <span className="p-float-label">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: "Confirm your password" }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  onFocus={() => removeError()}
                  className={classNames({ "p-invalid": fieldState.invalid })}
                  feedback={false}
                />
              )}
            />
            <label
              htmlFor="confirmPassword"
              className={classNames({ "p-error": errors.confirmPassword })}
            >
              Confirm your password *
            </label>
          </span>
          {getFormErrorMessage("confirmPassword")}
        </div>
        {/* <div className="p-field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="confirmPassword" control={control}
                                    rules={{ required: 'Please provide a password'}}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} onFocus={() => removeError()} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="confirmPassword" className={classNames({ 'p-error': !!errors.confirmPassword })}>New Password *</label>
                            </span>
                            {getFormErrorMessage('confirmPassword')}
                        </div> */}

        <Button
          type="submit"
          label="Update"
          className="p-mt-2 p-button-rounded tee-btn-success logbtn"
        >
          Update
        </Button>
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
    fetchUserDetails: () => dispatch(fetchUserDetails()),
    resetPassword: (payload) => dispatch(resetPassword(payload)),
    removeError: () => dispatch(resetFormError()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordComponent);
