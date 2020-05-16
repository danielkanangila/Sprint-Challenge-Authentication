import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Form from "./Form";

const Signup = () => {
  const history = useHistory();

  const handleSignup = (credentials) => {
    const url = `${process.env.REACT_APP_API_URL}/auth/register`;
    axios
      .post(url, credentials)
      .then((res) => {
        if (res.data.username) {
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return <Form handleChange={handleSignup} />;
};

export default Signup;
