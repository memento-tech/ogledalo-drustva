import styled from "styled-components";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import { useState } from "react";
import logoImageSmall from "../assets/logo-192.png";

const NavBar = () => {
  const [navPopupOpen, setNavPopupOpen] = useState(false);

  return (
    <NavBarContainer>
      <LogoLink to={"/"}>
        <LogoImage src={logoImageSmall} />
        Ogledalo Drustva
      </LogoLink>
      <NavMenu open={navPopupOpen} changeNavPopupOpen={setNavPopupOpen}>
        <StyledLink to={"/"} onClick={() => setNavPopupOpen(!navPopupOpen)}>
          Aktuelnosti
        </StyledLink>
        <StyledLink
          to={"/projects"}
          onClick={() => setNavPopupOpen(!navPopupOpen)}
        >
          Projekti
        </StyledLink>
        <StyledLink
          to={"/about-us"}
          onClick={() => setNavPopupOpen(!navPopupOpen)}
        >
          O nama
        </StyledLink>
        <StyledLink
          to={"/contact"}
          onClick={() => setNavPopupOpen(!navPopupOpen)}
        >
          Kontakt
        </StyledLink>
      </NavMenu>
      <LinksContainer>
        <StyledLink to={"/"}>Aktuelnosti</StyledLink>
        <StyledLink to={"/projects"}>Projekti</StyledLink>
        <StyledLink to={"/about-us"}>O nama</StyledLink>
        <StyledLink to={"/contact"}>Kontakt</StyledLink>
      </LinksContainer>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10%;
  min-height: 3rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 15px;

  background-color: ${(props) => props.theme.colors.background};

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    padding: 0 5%;
  }
`;

const LinksContainer = styled.div`
  visibility: visible;
  display: block;
  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    visibility: hidden;
    display: none;
  }
`;

const LogoImage = styled.img`
  object-fit: fill;
  object-position: center;
  width: 50px;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0.8rem;

  text-decoration: none;

  &:hover {
    color: black;
  }
`;

const LogoLink = styled(StyledLink)`
  font-family: "Libre Baskerville", serif;
  font-weight: 400;
  font-style: normal;
  margin: 0;
  font-size: 1.5rem;
  color: #131313;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
