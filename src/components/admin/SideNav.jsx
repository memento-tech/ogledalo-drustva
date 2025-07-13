import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-192.png";
import ArrowIcon from "../../icons/ArrowIcon";
import { logout } from "../../adapters/AuthAdapter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SideNav = ({ sideNavOpen, setSideNavOpen }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sideNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sideNavOpen]);

  return (
    <>
      {sideNavOpen && <HolderContainer onClick={() => setSideNavOpen(false)} />}
      <Container $sideNavOpen={sideNavOpen}>
        <ArrowIconContainer
          onClick={() => setSideNavOpen(!sideNavOpen)}
          $sideNavOpen={sideNavOpen}
        >
          <ArrowIcon height={20} />
        </ArrowIconContainer>
        <AdminPanelTitle>Admin Panel</AdminPanelTitle>
        <LinkContainer>
          <StyledLink to="/admin" onClick={() => setSideNavOpen(false)}>
            Editor
          </StyledLink>
          <StyledLink
            to="/admin/documents"
            onClick={() => setSideNavOpen(false)}
          >
            Documents
          </StyledLink>
          <StyledLink
            to="/admin/settings"
            onClick={() => setSideNavOpen(false)}
          >
            Information
          </StyledLink>
          <StyledLink
            to="/admin"
            onClick={() => {
              logout();
              navigate(0);
            }}
          >
            Logout
          </StyledLink>
        </LinkContainer>
        <Logo src={logo} />
        <CompanyName>Ogledalo drustva</CompanyName>
      </Container>
    </>
  );
};

export default SideNav;

const HolderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #8080805c;

  z-index: 999;
`;

const Container = styled.div`
  width: 250px;
  height: 100vh;
  border-left: 1px solid black;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 2rem;
  position: absolute;
  transform: translateX(${(props) => (props.$sideNavOpen ? "0" : "220px")});
  right: 0;
  transition: transform 1s ease;
  background-color: #ffffff;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    position: absolute;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    top: 0;
    z-index: 1000;

    transform: ${(props) =>
      props.$sideNavOpen ? "0" : "translateX(calc(100% - 30px))"};
    transition: transform 1s ease;
  }
`;

const ArrowIconContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 5px;
  cursor: pointer;
  transform: rotate(${(props) => (props.$sideNavOpen ? "180deg" : "0")});
  transition: transform 1s ease;
  width: fit-content;
`;

const AdminPanelTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  margin-top: auto;
  width: 80px;
`;

const CompanyName = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 500;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  margin-top: 1rem;

  &:hover {
    transform: scale(1.05);
  }
`;
