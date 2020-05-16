import React from "react";
import styled from "styled-components";

const Joke = ({ joke }) => {
  return (
    <Wrapper>
      <p>{joke}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Joke;
