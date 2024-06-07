import React from 'react';

function InputField({ label, value, onChange, placeholder, inputField= 'inputField'}) {
  return (
    <>
      <label className="label">{label}
      <input
        className={inputField}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      </label>
    </>
  );
}

export default InputField;
