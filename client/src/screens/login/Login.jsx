import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, isValidInput } from "./loginUtils";
import { AiOutlineClose } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Logo from "../../components/logo/Logo";
import "./login.css";

const Login = ({setAuth}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  if(redirectToHome) return <Redirect to='/home'/>

  return (
    <>
      <Logo />
      <Link to="/">
        <AiOutlineClose className="loginBack" title="Go back to home page" />
      </Link>
      <section className="vh-100">
        <h1 className="loginTitleText">Sign in</h1>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="PhoneImage"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form
                onSubmit={(e) => {
                  setError("");
                  e.preventDefault();
                  if (isValidInput(email, setError)) {
                    login(email, password, setError, setAuth, setRedirectToHome);
                  }
                }}
              >
                <div className="form-outline mb-4">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    required
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4"></div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="loginButton"
                >
                  LOGIN
                </Button>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
              </form>
              {error ? <p className="loginError">{error}</p> : ""}
              <div className="loginRegister">
                <span className="loginRegisterText">
                  Don't have an account?
                </span>
                <Link to="/register">
                  <Button
                    className="loginRegisterButton"
                    variant="success"
                    size="lg"
                  >
                    Create new account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
