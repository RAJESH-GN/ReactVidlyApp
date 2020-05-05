import React, { Component } from "react";

const Input = ({ name, label, value, onChange, inputType, errorMsg }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        //ref={this.username}
        type={inputType}
        className="form-control"
      />
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
    </div>
  );
};

export default Input;
