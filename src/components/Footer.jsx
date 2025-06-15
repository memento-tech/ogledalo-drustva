import styled from "styled-components";
import logoLarge from "../assets/logo-512.png";
import linkedInLogo from "../assets/linkedin.png";
import instagramLogo from "../assets/instagram.png";
import facebookLogo from "../assets/facebook.png";
import twiterXLogo from "../assets/twiterX.png";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <ContactInfoContainer>
          <ContactInfo>Kontakt</ContactInfo>
          <ContactInfo
            href="https://www.google.com/maps/place/Ljubomira+Nenadovi%C4%87a+26,+Vrbica"
            target="_blank"
            rel="noopener noreferrer"
          >
            Adresa: Ljubomira Nenadovića br. 26, Arandjelovac
          </ContactInfo>
          <ContactInfo href="tel:+381692005249">
            Telefon: +381692005249
          </ContactInfo>
          <ContactInfo href="mailto:odrustva@gmail.com">
            Email: odrustva@gmail.com
          </ContactInfo>
        </ContactInfoContainer>
        <FooterCentralContent>
          <Logo src={logoLarge} />
          <LogoTitle>Ogledalo Drustva</LogoTitle>
          <LogoTextSmall>
            Kultura i društvo kroz objektiv istine i razumevanja.
          </LogoTextSmall>
        </FooterCentralContent>
        <LinksContainer>
          <a
            href="https://www.linkedin.com/in/igor--stojanovic"
            target="_blank"
            rel="noreferrer"
          >
            <SocialMediaLink src={facebookLogo} />
          </a>
          <a
            href="https://www.instagram.com/igor____stojanovic/"
            target="_blank"
            rel="noreferrer"
          >
            <SocialMediaLink src={instagramLogo} />
          </a>
          <a
            href="https://www.linkedin.com/in/igor--stojanovic"
            target="_blank"
            rel="noreferrer"
          >
            <SocialMediaLink src={linkedInLogo} />
          </a>
          <a
            href="https://www.linkedin.com/in/igor--stojanovic"
            target="_blank"
            rel="noreferrer"
          >
            <SocialMediaLink src={twiterXLogo} />
          </a>
        </LinksContainer>
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
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 380px;
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
  font-size: 0.8rem;
  font-weight: 100;
`;

const LogoTextSmall = styled.p`
  font-style: italic;
  margin: 0;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SocialMediaLink = styled.img`
  width: 50px;
  height: auto;

  cursor: pointer;

  margin: 0.2rem 0;
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContactInfo = styled.a`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  margin-bottom: 5px;

  color: inherit;
  text-decoration: none;
`;
