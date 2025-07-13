import styled from "styled-components";
import PageTemplate from "./PageTemplate";
import { Link } from "react-router-dom";
import errorImage from "../assets/404error.png";

const ErrorPage = () => {
  return (
    <PageTemplate>
      <Container>
        <StyledImage src={errorImage} />
        <ErrorText>404 Page not found.</ErrorText>
        <ErrorText>
          The page you are looking for might have been removed, had it's name
          changed or temporaily unavailable.
        </ErrorText>
        <StyledLink to={"/"}>Go home.</StyledLink>
      </Container>
    </PageTemplate>
  );
};

export default ErrorPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50vh;
`;

const StyledImage = styled.img`
  height: 150px;
  width: 250px;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
`;

const ErrorText = styled.p`
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  padding-left: 4px;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;

  padding: 0.3rem 1rem;
  border-radius: 15px;

  background-color: #4831e3;
  border: 2px solid #4831e3;
  color: white;

  &:hover {
    transform: scale(1.1);
    background-color: white;
    color: #4831e3;
  }
`;
