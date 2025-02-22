import classnames from "classnames";

import Currency from "../Currency";

import "./styles.css";

const TokenSelector = ({ token, onClick }) => {
  return (
    <div
      className={classnames("token-selector shadow", {
        "default-selector": !token,
      })}
      onClick={onClick}
    >
      {token ? <Currency token={token} /> : <div>Select token</div>}
      <img className="img-arrow" src="/images/arrow.png" alt="arrow" />
    </div>
  );
};

export default TokenSelector;
