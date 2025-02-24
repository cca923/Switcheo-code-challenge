import classnames from "classnames";

import TokenInfo from "../TokenInfo";

import "./styles.css";

const TokenSelector = ({ token, onClick }) => {
  return (
    <div
      className={classnames("token-selector shadow", {
        "default-selector": !token,
      })}
      onClick={onClick}
    >
      {token ? <TokenInfo token={token} /> : <div>Select token</div>}
      <img className="img-arrow" src="/images/arrow.png" alt="arrow" />
    </div>
  );
};

export default TokenSelector;
