import styled from "styled-components";
import ContextPopupModal from "../ContextPopupModal";
import { PopupMainContainer } from "../components/PopupMainContainer";
import { useState } from "react";
import PopupButtons from "../components/PopupButtons";
import { login } from "../../adapters/AuthAdapter";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ zIndex, onForgotPassword }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    var valid = true;

    if (!username || username.length === 0) {
      setErrorMessage("Please input valid username");
      valid = false;
    }

    if (!password && valid) {
      setErrorMessage("Password is missing");
      valid = false;
    }

    if (valid) {
      setErrorMessage("");
      login({ username, password }).then((res) => {
        if (!res) {
          setErrorMessage("Bad credentials");
        } else {
          navigate(0);
        }
      });
    }
  };

  return (
    <ContextPopupModal zIndex={zIndex} closable={false}>
      <PopupMainContainer $width="300px">
        Login
        <ErrorLabel>{errorMessage}</ErrorLabel>
        <LabelStyled htmlFor="username">Username</LabelStyled>
        <InputStyled
          id="username"
          type="username"
          name="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <LabelStyled htmlFor="password">Password</LabelStyled>
        <InputStyled
          id="password"
          type="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Spacer />
        <PopupButtons
          buttons={[
            {
              label: "Login",
              onClick: handleLogin,
              width: "40%",
            },
          ]}
        />
        <ForgotPasswordButton onClick={onForgotPassword}>
          Forgot password
        </ForgotPasswordButton>
      </PopupMainContainer>
    </ContextPopupModal>
  );
};

export default LoginPopup;

const LabelStyled = styled.label`
  width: 100%;
  text-align: start;
  margin-top: 1rem;
  font-style: italic;
`;

const InputStyled = styled.input`
  width: 100%;
  color: ${(props) => props.theme.colors.textPrimary};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  outline: none;
  background-color: transparent;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: rgba(36, 91, 150, 0.97);
  }
`;

const Spacer = styled.div`
  margin-top: 1rem;
`;

const ForgotPasswordButton = styled.button`
  border: none;
  background-color: inherit;
  margin-top: 0.5rem;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const ErrorLabel = styled.p`
  text-align: center;
  margin-bottom: 0;
  font-size: 13px;
  color: red;
`;
