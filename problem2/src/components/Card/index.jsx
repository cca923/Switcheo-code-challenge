import NumberInput from "../NumberInput";
import TokenSelector from "../TokenSelector";

import "./styles.css";

const Card = ({ title, token, amount, onSelectorClick, onInputChange }) => (
  <div className="card shadow">
    <div className="card-title">{title}</div>
    <div className="card-content">
      <TokenSelector token={token} onClick={onSelectorClick} />
      <NumberInput value={amount} onChange={onInputChange} placeholder="0" />
    </div>
  </div>
);

export default Card;
