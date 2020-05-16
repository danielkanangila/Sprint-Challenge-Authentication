import React, { useEffect } from "react";
import axios from "axios";

const Jokes = () => {
  const [jokes, setJokes] = [];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/jokes`)
      .then((res) => setJokes(res.data))
      .catch((err) => console.log(err));
  });

  return <></>;
};

export default Jokes;
