import Currency from "../../components/Currency";

import "./styles.css";

const TokenModal = ({ tokenList, onClose }) => {
  const handleClick = ({ token }) => {
    console.log("##", { token });

    onClose({ token });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Select a token</h2>
        <div className="token-list">
          {tokenList?.map((data) => (
            <div
              key={data?.currency}
              onClick={() => handleClick({ token: data?.currency })}
            >
              <Currency token={data?.currency} />
            </div>
          ))}
        </div>
        <div className="btn-close" onClick={() => handleClick({ token: "" })}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default TokenModal;
