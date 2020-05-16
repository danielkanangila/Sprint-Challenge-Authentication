import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { StyledForm } from "../styled-components";
import { validateCredentials } from "./../../utils";

const Form = ({ handleSubmit }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [title, setTitle] = useState("");

  useEffect(() => {
    const title = location.pathname === "/login" ? "Login" : "Signup";
    setTitle(title);
  }, []);

  const location = useLocation();

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (location.pathname === "/signup")
      validateCredentials(credentials, setErrors);

    handleSubmit(credentials);
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <h1>{title}</h1>
      <div className="field">
        <label>Username</label>
        <input
          onChange={handleChange}
          value={credentials.username}
          type="text"
          name="username"
          placeholder="danJoe258"
          required
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          onChange={handleChange}
          value={credentials.password}
          type="password"
          name="password"
          placeholder="********"
          required
        />
      </div>
      <div className="form-footer">
        <button className="btn btn-primary">{title}</button>
        {location.pathname === "/signup" ? (
          <Link to="/login">I have an account. Login</Link>
        ) : (
          <Link to="/signup">Create an account</Link>
        )}
      </div>
    </StyledForm>
  );
};

export default Form;
