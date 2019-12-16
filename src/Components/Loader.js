import React from "react";
import styled, { keyframes } from "styled-components";
import { Logo } from "./Icons";

//keyframes을 통하여 애니메이션을 구현 할 수 있다.
const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  width: 100%;
  text-align: center;
`;

export default () => (
  <Loader>
    <Logo size={50} />
  </Loader>
);
