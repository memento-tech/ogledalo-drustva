import { useEffect, useState } from "react";
import styled from "styled-components";
import SideNav from "../../components/admin/SideNav";
import { checkLoggedIn } from "../../adapters/AuthAdapter";
import { usePopups } from "../../popup/PopupContext";
import LoginPopup from "../../popup/popups/LoginPopup";

const AdminPageTemplate = ({ children }) => {
  const { addPopup } = usePopups();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addLoginPopup = () => {
    addPopup((key, zIndex) => <LoginPopup key={key} zIndex={zIndex} />);
  };

  useEffect(() => {
    checkLoggedIn().then((result) => {
      if (result === true) {
        setIsLoggedIn(true);
      } else {
        addLoginPopup();
      }
    });
  }, []);

  if (isLoggedIn) {
    return (
      <PageContainer>
        <MainContainer $sideNavOpen={false}>{children}</MainContainer>
        <SideNav sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />
      </PageContainer>
    );
  } else {
    return <></>;
  }
};

export default AdminPageTemplate;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  max-height: 100vh;
  max-width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
`;

const MainContainer = styled.div`
  transition: width 1s ease, margin 1s ease;
  width: ${({ $sideNavOpen }) =>
    $sideNavOpen ? "calc(100% - 250px)" : "calc(100% - 30px)"};
  margin-right: ${({ $sideNavOpen }) => ($sideNavOpen ? "250px" : "0")};

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: calc(100% - 30px);
    margin-right: 0;
    height: 100vh;
  }
`;
