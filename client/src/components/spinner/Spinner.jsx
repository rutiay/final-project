import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className='ring'>
      Loading
      <span className="span"></span>
    </div>
  );
};

export default Spinner;
