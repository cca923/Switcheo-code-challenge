import React from "react";

import "./styles.css";

const NumberInput = ({ placeholder, value, onChange, disabled }) => {
  return (
    <input
      className="number-input"
      type="text"
      placeholder={placeholder ?? 0}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default NumberInput;
