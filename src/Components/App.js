import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

//토스트메세지를 위한 라이브러리
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//스타일 구성
import { HashRouter as Router } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import Theme from "../Styles/Theme";
import Routes from "./Routes"
import Header from "./Header";
import Footer from "./Footer";

const QUERY = gql `
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;


export default () => {

  const { data : {isLoggedIn} } = useQuery(QUERY);
  return(
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
      </>
    </ThemeProvider>
  );
};
