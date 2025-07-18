import styled from "styled-components";
import ButtonOutlined from "../../components/ButtonOutlined";
import { useEffect, useState } from "react";
import {
  getWebsiteData,
  updateWebsiteData,
} from "../../adapters/WebsiteDataAdapter";
import { usePopups } from "../../popup/PopupContext";
import InfoPopup from "../../popup/popups/InfoPopup";
import { logout, updatePassword } from "../../adapters/AuthAdapter";
import { useNavigate } from "react-router";

const AdminSettingsPage = () => {
  const { addPopup } = usePopups();
  const navigate = useNavigate();

  const [catchPhrase, setCatchPhrase] = useState("");
  const [address, setAddress] = useState("");
  const [googleAddress, setGoogleAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");

  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  useEffect(() => {
    getWebsiteData().then((data) => {
      setCatchPhrase(data.catchPhrase);
      setAddress(data.address);
      setGoogleAddress(data.googleAddress);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
      setFacebookLink(data.facebookLink);
      setInstagramLink(data.instagramLink);
      setLinkedinLink(data.linkedinLink);
      setTwitterLink(data.twitterLink);
    });
  }, []);

  const onWebsiteDataUpdate = () => {
    updateWebsiteData({
      catchPhrase,
      address,
      googleAddress,
      phoneNumber,
      email,
      facebookLink,
      instagramLink,
      linkedinLink,
      twitterLink,
    }).then((res) => {
      addPopup((key, zIndex, closePopup) => (
        <InfoPopup
          key={key}
          zIndex={zIndex}
          closePopup={closePopup}
          onConfirm={undefined}
          title={res ? "Success" : "Failed"}
          description={
            res
              ? "Website data updated successfully!"
              : "Something went wrong, please try later."
          }
        />
      ));
    });
  };

  const onUpdatePassword = () => {
    let message = validatePassword(password, retypePassword);

    if (message) {
      var retypePasswordError = undefined;
      if (password !== retypePassword) {
        retypePasswordError = "Please retype password!";
      }
      var description = undefined;
      if (retypePasswordError) {
        description = retypePasswordError;
      } else {
        description = (
          <>
            {message}
            <br />
            <br />
            Password validation rules are:
            <br />- At least 6 characters
            <br />- At least one uppercase letter
            <br />- At least one lowercase letter
            <br />- At least one digit
          </>
        );
      }

      addPopup((key, zIndex, closePopup) => (
        <InfoPopup
          key={key}
          zIndex={zIndex}
          closePopup={closePopup}
          onConfirm={undefined}
          title={"Wrong Password Format"}
          description={description}
        />
      ));

      return;
    }
    updatePassword(password).then((result) => {
      if (result) {
        addPopup((key, zIndex, closePopup) => (
          <InfoPopup
            key={key}
            zIndex={zIndex}
            closePopup={() => {
              closePopup();
              console.log("dasdasdas");
              logout();
              navigate(0);
            }}
            onConfirm={undefined}
            title={"Password updated successfully!"}
            description={
              "Your password is updated. You will be logged out now."
            }
          />
        ));
      } else {
        addPopup((key, zIndex, closePopup) => (
          <InfoPopup
            key={key}
            zIndex={zIndex}
            closePopup={closePopup}
            onConfirm={undefined}
            title={"Password Update Fail"}
            description={
              "Password is not updated, something went wrong. Please try later."
            }
          />
        ));
      }
    });
  };

  function validatePassword(password, retypePassword) {
    // Example validation rules:
    // - At least 6 characters
    // - At least one uppercase letter
    // - At least one lowercase letter
    // - At least one digit

    if (password !== retypePassword) {
      return "Please retype password!";
    }

    const minLength = 6;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /[0-9]/;

    if (typeof password !== "string") {
      return "Password must be a string.";
    }
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters.`;
    }
    if (!uppercasePattern.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!lowercasePattern.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!digitPattern.test(password)) {
      return "Password must include at least one digit.";
    }

    return undefined;
  }

  return (
    <Container>
      <PartContainer>
        <PartTitle>General Information</PartTitle>
        <InputContainer>
          <Label>Catch Phrase:</Label>
          <InputStyled
            onChange={(e) => setCatchPhrase(e.target.value)}
            value={catchPhrase}
          />
        </InputContainer>
        <PartTitle>Contact information</PartTitle>
        <InputContainer>
          <Label>Address:</Label>
          <InputStyled
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </InputContainer>
        <InputContainer>
          <Label>Google Address:</Label>
          <InputStyled
            onChange={(e) => setGoogleAddress(e.target.value)}
            value={googleAddress}
          />
        </InputContainer>
        <InputContainer>
          <Label>Phone Number:</Label>
          <InputStyled
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </InputContainer>
        <InputContainer>
          <Label>Email:</Label>
          <InputStyled
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputContainer>
        <PartTitle>Links Information</PartTitle>
        <InputContainer>
          <Label>Facebook:</Label>
          <InputStyled
            onChange={(e) => setFacebookLink(e.target.value)}
            value={facebookLink}
          />
        </InputContainer>
        <InputContainer>
          <Label>Instagram:</Label>
          <InputStyled
            onChange={(e) => setInstagramLink(e.target.value)}
            value={instagramLink}
          />
        </InputContainer>
        <InputContainer>
          <Label>LinkedIn:</Label>
          <InputStyled
            onChange={(e) => setLinkedinLink(e.target.value)}
            value={linkedinLink}
          />
        </InputContainer>
        <InputContainer>
          <Label>Twitter:</Label>
          <InputStyled
            onChange={(e) => setTwitterLink(e.target.value)}
            value={twitterLink}
          />
        </InputContainer>
        <ButtonOutlined onClick={onWebsiteDataUpdate}>Save</ButtonOutlined>
      </PartContainer>
      <PartContainer>
        <PartTitle>User Settings</PartTitle>
        <InputContainer>
          <Label>Password:</Label>
          <InputStyled
            style={{ width: "200px" }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputContainer>
        <InputContainer>
          <Label>Retype Password:</Label>
          <InputStyled
            style={{ width: "200px" }}
            type="password"
            onChange={(e) => setRetypePassword(e.target.value)}
            value={retypePassword}
          />
        </InputContainer>
        <ButtonOutlined onClick={onUpdatePassword}>
          Update password
        </ButtonOutlined>
      </PartContainer>
    </Container>
  );
};

export default AdminSettingsPage;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  padding-bottom: 2rem;
  font-size: 14px;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    box-sizing: border-box;
    margin: 0;
    width: 100%;
    margin-top: 2rem;
    overflow: hidden;
  }
`;

const PartContainer = styled.div`
  box-sizing: border-box;
  width: 80%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    box-sizing: border-box;
    width: 90%;
    padding: 1rem 0;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    flex-direction: column;
  }
`;

const PartTitle = styled.p`
  font-size: 16px;
  width: 100%;
  text-align: center;
`;

const Label = styled.p`
  box-sizing: border-box;
  width: 20%;
  text-align: end;
  padding-left: 1rem;
  margin: 0;
  font-size: ${(props) => props.theme.fonts.small};

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 100%;
    text-align: start;
  }
`;

const InputStyled = styled.input`
  box-sizing: border-box;
  width: calc(80% - 1rem);
  color: ${(props) => props.theme.colors.textPrimary};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  outline: none;
  background-color: transparent;
  transition: border-color 0.3s ease;
  margin-left: 1rem;
  font-family: inherit;
  font-size: ${(props) => props.theme.fonts.small};
  transform: translateY(-3px);

  &:focus {
    border-color: rgba(36, 91, 150, 0.97);
  }

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: auto;
    margin-right: 1rem;
  }
`;
