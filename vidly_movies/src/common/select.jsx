import React, { Component } from "react";

const Select = ({
  name,
  value,
  label,
  onChange,
  optionValues,
  errorMessage,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        className="form-control"
        onChange={onChange}
        value={value}
      >
        <option value=""></option>
        {optionValues.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default Select;
