import React from "react";
import { FaCubes } from "react-icons/fa";
import "./logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <FaCubes className="iconLogo"></FaCubes>
      <span className="logoText">Chatvibe</span>
    </div>
  );
};

export default Logo;
