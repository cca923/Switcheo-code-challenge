import "./styles.css";

const TokenModal = ({ tokenList, onClose }) => {
  const handleClick = ({ token }) => {
    onClose({ token });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Select a Token</h2>
        <div>
          {tokenList?.map((data) => (
            <div
              key={data?.currency}
              onClick={() => handleClick({ token: data?.currency })}
            >
              {data?.currency}
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
