import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Form from "./Form";
import Cookie from "js-cookie";

const Login = () => {
  const history = useHistory();

  const handleLogin = (credentials) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    axios
      .post(url, credentials)
      .then((res) => {
        console.log(Cookie.get("session"));
        //history.push("/");
      })
      .catch((err) => console.log(err.response.data.message || err));
  };

  return <Form handleSubmit={handleLogin} />;
};

export default Login;
