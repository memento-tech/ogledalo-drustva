import styled from "styled-components";
import logoLarge from "../assets/logo-512.png";
import linkedInLogo from "../assets/linkedin.png";
import instagramLogo from "../assets/instagram.png";
import facebookLogo from "../assets/facebook.png";
import twiterXLogo from "../assets/twiterX.png";
import { getWebsiteData } from "../adapters/WebsiteDataAdapter";
import { useEffect, useState } from "react";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

const Footer = () => {
  const [websiteData, setWebsiteData] = useState();

  useEffect(() => {
    getWebsiteData().then((data) => setWebsiteData(data));
  }, []);

  return (
    <FooterContainer>
      <FooterContent>
        <ContactInfoContainer>
          <ContactInfo>Kontakt</ContactInfo>
          {websiteData && (
            <>
              <ContactInfo
                href={websiteData.googleAddress}
                target="_blank"
                rel="noopener noreferrer"
              >
                Adresa: {websiteData.address}
              </ContactInfo>
              <ContactInfo
                href={"tel:" + websiteData.phoneNumber}
                onClick={() =>
                  logEvent(analytics, "user_interaction", {
                    firebase_screen: "PhoneNumber",
                  })
                }
              >
                Telefon: {websiteData.phoneNumber}
              </ContactInfo>
              <ContactInfo
                href={"mailto:" + websiteData.email}
                onClick={() =>
                  logEvent(analytics, "user_interaction", {
                    firebase_screen: "Email",
                  })
                }
              >
                Email: {websiteData.email}
              </ContactInfo>
            </>
          )}
        </ContactInfoContainer>
        <FooterCentralContent>
          <Logo src={logoLarge} />
          <LogoTitle>Ogledalo Drustva</LogoTitle>
          {websiteData && (
            <LogoTextSmall>{websiteData.catchPhrase}</LogoTextSmall>
          )}
        </FooterCentralContent>
        {websiteData && (
          <>
            <LinksContainer>
              {websiteData.facebookLink && (
                <a
                  href={websiteData.facebookLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    logEvent(analytics, "user_interaction", {
                      firebase_screen: "Facebook",
                    })
                  }
                >
                  <SocialMediaLink src={facebookLogo} />
                </a>
              )}
              {websiteData.instagramLink && (
                <a
                  href={websiteData.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    logEvent(analytics, "user_interaction", {
                      firebase_screen: "Instagram",
                    })
                  }
                >
                  <SocialMediaLink src={instagramLogo} />
                </a>
              )}
              {websiteData.linkedinLink && (
                <a
                  href={websiteData.linkedinLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    logEvent(analytics, "user_interaction", {
                      firebase_screen: "LinkedIn",
                    })
                  }
                >
                  <SocialMediaLink src={linkedInLogo} />
                </a>
              )}
              {websiteData.twitterLink && (
                <a
                  href={websiteData.twitterLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    logEvent(analytics, "user_interaction", {
                      firebase_screen: "Twitter",
                    })
                  }
                >
                  <SocialMediaLink src={twiterXLogo} />
                </a>
              )}
            </LinksContainer>
            <LinksHeader>Follow us:</LinksHeader>
          </>
        )}
      </FooterContent>
      <Copyright>© 2025 Memento Tech</Copyright>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 15px;
  box-sizing: border-box;
  padding-top: 2rem;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    padding-top: 1rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  min-height: 380px;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;

const FooterCentralContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 200px;
`;

const LogoTitle = styled.h3`
  font-size: 2rem;
  font-weight: 300;
  margin: 10px;
`;

const Copyright = styled.p`
  font-family: sans-serif;
  font-weight: 100;
`;

const LogoTextSmall = styled.p`
  font-style: italic;
  margin: 0;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 80%;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    flex-direction: row;
    margin-bottom: 3rem;
  }
`;

const LinksHeader = styled.p`
  display: none;
  visibility: hidden;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    display: block;
    visibility: visible;
  }
`;

const SocialMediaLink = styled.img`
  width: 50px;
  height: auto;

  cursor: pointer;

  margin: 0.2rem 0;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    margin: 0 10px;
  }
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    margin-top: 3rem;
    align-items: center;
    margin-bottom: 2rem;
  }
`;

const ContactInfo = styled.a`
  margin: 0;
  padding: 0;
  margin-bottom: 5px;

  color: inherit;
  text-decoration: none;
`;
