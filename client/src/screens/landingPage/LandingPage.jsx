import React from "react";
import Logo from "../../components/logo/Logo";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <Logo />
      <div className="landingPageTitle">
        <h1 className="landingPageTitleText">
          Welcome to <span className="landingPageName">Chatvibe</span>
        </h1>
        <span className="landingPageDescription">
          Connect with friends and the world around you on Chatvibe.
        </span>
        <div className="landingPageButtons">
          <Link to="/login">
            <Button className="landingPageButton" variant="primary" size="lg">
              Login
            </Button>
          </Link>
          <Link to="register">
            <Button className="landingPageButton" variant="primary" size="lg">
              Register
            </Button>
          </Link>
        </div>
      </div>
      <img
        src="./media/Social-Network-Cover.png"
        alt="cover"
        className="landingPageCover"
      />
    </div>
  );
};

export default LandingPage;
