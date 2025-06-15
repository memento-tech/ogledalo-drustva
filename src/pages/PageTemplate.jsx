import styled from "styled-components";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const PageTemplate = ({ children }) => {
  return (
    <PageContainer>
      <NavBar />
      <MainContainer>{children}</MainContainer>
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default PageTemplate;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textPrimary};
`;

const MainContainer = styled.div`
  flex-grow: 1;
  width: 80%;
  min-height: 80vh;
`;
