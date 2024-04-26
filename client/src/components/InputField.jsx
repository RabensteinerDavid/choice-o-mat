import React from 'react';

function InputField({ label, value, onChange, placeholder }) {
  return (
    <>
      <label className="label">{label}</label>
      <input
        className="inputField"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}

export default InputField;
