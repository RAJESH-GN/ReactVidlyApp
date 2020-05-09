import React, { Component } from "react";
import Input from "../common/input";
import Joi from "@hapi/joi";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  handleSubmit = (e) => {
    e.preventDefault(); //to stop reloading of the whole page after submitting form
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.toDoAfterValidation();
  };

  validate = () => {
    const errors = {};
    const result = this.schema.validate(this.state.data, {
      abortEarly: false,
    });
    if (!result.error) return null;
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    debugger;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = (input) => {
    const tempState = { [input.name]: input.value };
    const inputSchema = Joi.object({
      [input.name]: this.schema._ids._byKey.get(input.name).schema,
    });
    const result = inputSchema.validate(tempState);
    if (!result.error) return null;
    return result.error.details[0].message;
  };
  renderInput = (name, label, type = "text") => {
    return (
      <Input
        name={name}
        label={label}
        onChange={this.handleChange}
        value={this.state.data[name]}
        inputType={type}
        errorMsg={this.state.errors[name]}
      />
    );
  };
}

export default Form;
