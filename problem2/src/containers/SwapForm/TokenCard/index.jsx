import { useRef, useState } from "react";
import classnames from "classnames";

import TokenSelector from "../../../components/TokenSelector";
import NumberInput from "../../../components/NumberInput";

import "./styles.css";

const TokenCard = ({
  title,
  token,
  amount,
  onSelectorClick,
  onInputChange,
  inputDisabled,
  inputAutoFocus,
}) => {
  const timeoutRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    const regex = /^(?:\d+(?:\.\d*)?|\.\d+)?$/;

    if (timeoutRef?.current) {
      clearTimeout(timeoutRef.current);
    }

    if (regex.test(value)) {
      setErrorMsg("");
      onInputChange({ amount: value });
    } else {
      setErrorMsg("Please enter a number greater than or equal to 0.");
      timeoutRef.current = setTimeout(() => setErrorMsg(""), 1500);
    }
  };

  return (
    <div className="card shadow">
      <div className="card-title">{title}</div>
      <div className="card-content">
        <div className={classnames("field", { disabled: inputDisabled })}>
          <NumberInput
            placeholder="0"
            value={amount}
            onChange={handleInputChange}
            disabled={inputDisabled}
            autoFocus={inputAutoFocus}
          />
          <TokenSelector token={token} onClick={onSelectorClick} />
        </div>
        <div className="tips">
          {errorMsg && <div className="error">{errorMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
