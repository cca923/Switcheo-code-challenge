import React from "react";

import "./styles.css";

const Currency = ({ className, icon, name }) => {
  return (
    <div className={className}>
      <img className="token-icon" src={icon} alt="token" />
      <div className="">{name}</div>
    </div>
  );
};

export default Currency;
