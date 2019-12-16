import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.img`
  height: auto;
  max-width: 50%;
  display:block;
  margin-left: auto;
  margin-right: auto;
  padding: auto;
`;

const Banner = ({ src }) => <Container src={src} />;

Banner.propTypes = {
  src: PropTypes.string.isRequired
};

export default Banner;
