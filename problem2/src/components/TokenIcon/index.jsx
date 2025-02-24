import React from "react";

const TokenIcon = ({
  token,
  fallbackSrc = "/images/token_fallback.png",
  ...props
}) => (
  <img
    className="token-icon"
    src={token ? `/images/tokens/${token}.svg` : fallbackSrc}
    alt={token || "token"}
    onError={(e) => {
      e.currentTarget.src = fallbackSrc;
    }}
    {...props}
  />
);

export default TokenIcon;
