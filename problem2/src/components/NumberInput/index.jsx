import React from "react";

import "./styles.css";

const NumberInput = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="number-input"
      type="text"
      placeholder={placeholder ?? 0}
      onChange={onChange}
      value={value}
      // required
    />
  );
};

export default NumberInput;
