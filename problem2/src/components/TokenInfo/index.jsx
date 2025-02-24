import React from "react";

import TokenIcon from "../TokenIcon";

import "./styles.css";

const TokenInfo = ({ token }) => {
  return (
    <div className="token-info">
      <TokenIcon token={token} />
      <div>{token}</div>
    </div>
  );
};

export default TokenInfo;
