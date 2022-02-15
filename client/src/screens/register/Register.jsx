import { Link, Redirect } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../../components/logo/Logo";
import { AiOutlineClose } from "react-icons/ai";
import { register, isValidInput, isPasswordMatch } from "./registerUtils";
import "./register.css";


const Register = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  if (redirectToDetails) return <Redirect to="/details" />;

  return (
    <div className="register">
      <Logo />
      <Link to="/">
        <AiOutlineClose className="registerBack" title="Go back to home page" />
      </Link>
      <div className="card-body p-md-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              Sign up
            </p>
            <form
              className="mx-1 mx-md-4"
              onSubmit={(e) => {
                setError("");
                e.preventDefault();
                if (isValidInput(name, lastName, email)) {
                  if (isPasswordMatch(password, confirmPassword, setError)) {
                    register(
                      name,
                      lastName,
                      email,
                      password,
                      setError,
                      setAuth,
                      setRedirectToDetails
                    );
                  }
                } else {
                  setError("Invalid input");
                }
              }}
            >
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First Name"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    type="email"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    type="password"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Register
                </button>
              </div>
            </form>
            {error ? <p className="registerError">{error}</p> : ""}
            <div>
              <span className="registerText">
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </div>
          <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              className="img-fluid"
              alt="SampleImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
