import React from "react";

const TokenIcon = ({
  token,
  fallbackSrc = `/images/token_fallback.png`,
  ...props
}) => {
  // const [src, setSrc] = useState(`/images/tokens/${token}.svg`);

  // const handleError = () => setSrc(fallbackSrc);

  return (
    <img
      className="token-icon"
      src={`/images/tokens/${token}.svg`}
      alt={token || "token"}
      // onError={handleError}
      {...props}
    />
  );
};

export default TokenIcon;
