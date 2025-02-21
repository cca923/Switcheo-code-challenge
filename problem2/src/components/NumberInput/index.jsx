import React from "react";

const NumberInput = ({ className, title, placeholder, value, onChange }) => {
  return (
    <div className={className}>
      <label>
        {title && <span>{title}</span>}
        <input
          type="number"
          placeholder={placeholder ?? 0}
          onChange={onChange}
          value={value}
          min={0}
          required
        />
      </label>
    </div>
  );
};

export default NumberInput;
