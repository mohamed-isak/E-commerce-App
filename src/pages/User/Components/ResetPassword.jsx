import { Controller, useForm } from "react-hook-form";
import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { setNewPassword } from "../../../redux/user/userActions";
import { resetFormError } from "../../../redux/app/appActions";
import { useLocation, useHistory } from "react-router-dom";

function useQP() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword({ setNewPassword, removeError }) {
  const query = useQP();
  const history = useHistory();

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  function gotoLogin() {
    console.log("#### AAAAAAA")
    history.push("/");
  }

  const onSubmit = (data) => {
    try {
      if (data?.password !== data?.confirmPassword) {
        alert("Passwords doesn't match");
        return;
      }
      setNewPassword({ ...data, resetKey: query.get("resetKey") }, gotoLogin);
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
    <div className="profile-up-container" style={{ margin: "300px 0 0 0" }}>
      <div className="card">
        <div className="container">
          <div className="row">
            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
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
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
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
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        feedback={false}
                      />
                    )}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={classNames({
                      "p-error": errors.confirmPassword,
                    })}
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
        </div>
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
    setNewPassword: (payload, callback) => dispatch(setNewPassword(payload, callback)),
    removeError: () => dispatch(resetFormError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
