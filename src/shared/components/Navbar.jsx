/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Row, Col, Dropdown } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import cartIcon from "../../assets/images/cart-icon.svg";
import userIcon from "../../assets/images/user-icon.svg";
import favIcon from "../../assets/images/like-icon.svg";
import DesignCheckoutComponent from "../../pages/DesignPage/components/DesignCheckoutComponent";
import SignUpComponent from "../../pages/SignIn/SignUpComponent";
import LoginComponent from "../../pages/SignIn/LoginComponent";
import { loggedOut } from "../../redux/user/userActions";
import {
  setSiginVisible,
  setEnableLoginScreen,
  setCartVisible,
  setForgotPasswordScreen,
} from "../../redux/app/appActions";
import ForgotPasswordComponent from "../../pages/SignIn/ForgotPasswordComponent";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mapState = (state) => ({
  count: state.cartData.cartCount,
  isLoggedIn: state.user.isLoggedIn,

  loggedUser: state.user,
  loggedInUser: state.user.loggedInUser,
  loggedInUserName: state.user.loggedInUserName,
  siginVisible: state.app.siginVisible,
  enableLoginScreen: state.app.enableLoginScreen,
  cartVisible: state.app.cartVisible,
  enableForgotPwdScreen: state.app.enableForgotPwdScreen,
});
export default function NavbarComponent(props) {
  const { location } = props;
  const {
    count,
    isLoggedIn,
    loggedInUser,
    loggedUser,
    loggedInUserName,
    siginVisible,
    enableLoginScreen,
    cartVisible,
    enableForgotPwdScreen,
  } = useSelector(mapState);
  // const [cartVisible , setCartVisible] = useState(false)
  //  const [signInVisible , setSignInVisible] = useState(false)
  // const [ enableLoginScreen, setEnableLoginScreen] = useState(true)
  const op = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const loginFormHeader = (
    <div style={{ textAlign: "center" }}>
      <Button
        label="Continue As Guest"
        className="p-button-rounded p-button-outlined tee-btn-outlined"
      />
    </div>
  );

  const prof = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  useEffect(() => {
    console.log("profdata");
    console.log(prof);
  }, []);
  return (
    <>
      <Navbar expand="lg" expanded={expanded}>
        <Navbar.Brand href="/">
          <img
            src="/logo.png"
            width="80"
            height="66"
            className="d-inline-block align-top logo"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Nav className="header-item main-nav-item mobile d-lg-none">
            <div
              onClick={(e) => {
                if (!isLoggedIn) {
                  toast("Please login!", { position: "bottom-right" });
                  dispatch(setSiginVisible(true));
                  return;
                } else {
                  history.push("/wishlist/");
                }
                setExpanded(false);
              }}
            >
              <img src={favIcon} />
            </div>
          </Nav>

          <Nav
            className="header-item cart-icn main-nav-item mobile d-lg-none"
            onClick={() => {
              dispatch(setCartVisible(true));
            }}
          >
            <Image src={cartIcon} fluid width="60" /> <span>{count}</span>
          </Nav>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
        </div>
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ backgroundColor: "#fff", borderRadius: 30, padding: 10 }}
        >
          <Nav
            className="mr-auto"
            activeKey={
              location.pathname.includes("/shop")
                ? "/shop"
                : location.pathname === "/design"
                ? "/design"
                : ""
            }
          >
            <Nav.Link
              href="/design"
              className="main-nav-item"
              onClick={() => setExpanded(false)}
            >
              {" "}
              <div>
                {" "}
                <strong>Design</strong>{" "}
                <p className="link-desc-txt">Your own</p>
              </div>
            </Nav.Link>
            <Nav.Link
              href="/shop"
              className="main-nav-item"
              onClick={() => setExpanded(false)}
            >
              {" "}
              <div>
                {" "}
                <strong>Shop </strong>{" "}
                <p className="link-desc-txt">Explore Designs</p>
              </div>{" "}
            </Nav.Link>
          </Nav>
          <Nav className="header-item">
            {/* <NavDropdown
              title="English"
              className="main-nav-item"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="#action/3.1"
                onClick={() => setExpanded(false)}
              >
                Arabic
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onClick={() => setExpanded(false)}
              >
                English
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav className="header-item main-nav-item ">
            {isLoggedIn ? (
              <Dropdown
                className="dropdown-nav"
                onClick={(e) => {
                  console.log("logpopup");
                  console.log(loggedUser);
                  // op.current.toggle(e);
                }}
              >
                <Dropdown.Toggle>
                  <img src={userIcon} />
                  <span className="acnt-txt">Account</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Row
                    style={{
                      fontWeight: "bold",
                      borderBottomColor: "#444",
                      borderBottomWidth: 1,
                    }}
                  >
                    <div className="acnt-itms">
                      {prof && prof.firstName
                        ? prof.firstName + " " + prof.lastName
                        : ""}
                    </div>
                  </Row>
                  <Row style={{ margin: 5 }}>
                    <div className="acnt-itms">
                      <Link
                        to={`/profile/`}
                        onClick={() => {
                          setExpanded(false);
                          op.current.hide();
                        }}
                      >
                        My Profile
                      </Link>
                    </div>
                  </Row>
                  <Row style={{ margin: 5 }}>
                    <div className="acnt-itms">
                      <Link
                        to={`/myorder/`}
                        onClick={() => {
                          setExpanded(false);
                          op.current.hide();
                        }}
                      >
                        My Orders
                      </Link>
                    </div>
                  </Row>

                  <Row style={{ margin: 5 }}>
                    <div
                      className="acnt-itms"
                      onClick={(e) => {
                        console.log("logout dismiss");
                        op.current.hide();
                        dispatch(loggedOut());
                      }}
                    >
                      Logout
                    </div>
                  </Row>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <span onClick={() => dispatch(setSiginVisible(true))}>
                Sign In
              </span>
            )}
          </Nav>

          <Nav className="header-item main-nav-item d-none d-lg-block">
            <div
              onClick={(e) => {
                if (!isLoggedIn) {
                  toast("Please login!", { position: "bottom-right" });
                  dispatch(setSiginVisible(true));
                  return;
                } else {
                  history.push("/wishlist/");
                }
                setExpanded(false);
              }}
            >
              <img src={favIcon} />
              <span className="acnt-txt">Wishlist</span>{" "}
            </div>
          </Nav>

          <Nav
            className="header-item cart-icn main-nav-item d-none d-lg-block"
            onClick={() => {
              dispatch(setCartVisible(true));
              setExpanded(false);
            }}
          >
            <Image src={cartIcon} fluid width="60" /> <span>{count}</span>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
     
     {/*******Cart******** */}
     <Dialog
        visible={cartVisible}
        onHide={() => dispatch(setCartVisible(false))}
        breakpoints={{ "960px": "75vw", "640px": "100vw","1024": "50vw"}}
        style={{ width: "70vw" }}
      >
        <div className="popup-chkt thin-scroll">
          <DesignCheckoutComponent cartOnly />
        </div>
      </Dialog>

      {/* header={loginFormHeader}  */}
      <Dialog

        visible={siginVisible}
        onHide={() => {
          dispatch(setSiginVisible(false));
          dispatch(setEnableLoginScreen(true));
        }}
        breakpoints={{ "960px": "75vw", "640px": "100vw" }}
        className="login-popup"
        style={{ width: "25vw" }}
      >
        <div className="popup-chkt thin-scroll">
          {enableLoginScreen && !enableForgotPwdScreen && (
            <>
              <LoginComponent />
              <a
                className="signup-link"
                onClick={() => dispatch(setEnableLoginScreen(false))}
              >
                Create Account
              </a>
              <a
                className="signup-link fr"
                onClick={() => dispatch(setForgotPasswordScreen(true))}
              >
                Forgot Your Password?
              </a>
            </>
          )}
          {!enableLoginScreen && (
            <>
              <SignUpComponent />
              <span className="acnt-txt">Already Have An Account? </span>
              <a
                className="signup-link"
                onClick={() => dispatch(setEnableLoginScreen(true))}
              >
                Login
              </a>
            </>
          )}
          {enableForgotPwdScreen && (
            <>
              <ForgotPasswordComponent />
              <span className="acnt-txt">Already Have An Account? </span>
              <a
                className="signup-link"
                onClick={() => dispatch(setForgotPasswordScreen(false))}
              >
                Login
              </a>
            </>
          )}
        </div>
      </Dialog>

      <OverlayPanel
        ref={op}
        id="overlay_panel"
        className="overlaypanel-demo"
        dismissable
      >
        <Row
          style={{
            margin: 5,
            fontWeight: "bold",
            borderBottomColor: "#444",
            borderBottomWidth: 1,
          }}
        >
          <Col className="acnt-itms">
            {prof && prof.firstName ? prof.firstName + " " + prof.lastName : ""}
          </Col>
        </Row>
        <Row style={{ margin: 5 }}>
          <Col className="acnt-itms">
            <Link
              to={`/profile/`}
              onClick={() => {
                setExpanded(false);
                op.current.hide();
              }}
            >
              My Profile
            </Link>
          </Col>
        </Row>

        <Row style={{ margin: 5 }}>
          <Col
            className="acnt-itms"
            onClick={(e) => {
              console.log("logout dismiss");
              op.current.hide();
              dispatch(loggedOut());
            }}
          >
            Logout
          </Col>
        </Row>

        {/* <Row><Col className="acnt-itms" onClick={() => dispatch(loggedOut())}>Logout</Col></Row>        */}
      </OverlayPanel>
    </>
  );
}
