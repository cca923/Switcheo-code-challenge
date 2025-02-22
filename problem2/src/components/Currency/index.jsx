import React from "react";

import TokenIcon from "../TokenIcon";

import "./styles.css";

const Currency = ({ token }) => {
  return (
    <div className="currency">
      <TokenIcon token={token} />
      <div>{token}</div>
    </div>
  );
};

export default Currency;
