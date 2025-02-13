import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import signImg from "../user.svg";

export default function Signup() {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    firstName:"",
    lastName:"",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.firstName.length > 0 &&
      fields.lastName.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
  event.preventDefault();

  setIsLoading(true);

  try {
    const newUser = await Auth.signUp({
      username: fields.email,
      password: fields.password,
        attributes: {
            given_name: fields.firstName,
            family_name: fields.lastName,
        }
    });
    setIsLoading(false);
    setNewUser(newUser);
  } catch (e) {
    onError(e);
    setIsLoading(false);
  }
}

async function handleConfirmationSubmit(event) {
  event.preventDefault();

  setIsLoading(true);

  try {
    await Auth.confirmSignUp(fields.email, fields.confirmationCode);
    await Auth.signIn(fields.email, fields.password);

    userHasAuthenticated(true);
    history.push("/");
  } catch (e) {
    onError(e);
    setIsLoading(false);
  }
 }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
          <div className="image" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <img src={signImg} alt="login" height="50%" width="50%" alignItems="center"/>
          </div>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
          <FormGroup controlId="firstName" bsSize="large">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                  autoFocus
                  type="firstName"
                  value={fields.firstName}
                  onChange={handleFieldChange}
              />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                  autoFocus
                  type="lastName"
                  value={fields.lastName}
                  onChange={handleFieldChange}
              />
          </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}