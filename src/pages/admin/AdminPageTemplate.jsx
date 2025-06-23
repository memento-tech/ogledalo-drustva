import { useState } from "react";
import styled from "styled-components";
import SideNav from "../../components/admin/SideNav";

const AdminPageTemplate = ({ children }) => {
  const [sideNavOpen, setSideNavOpen] = useState(true);

  return (
    <PageContainer>
      <MainContainer $sideNavOpen={sideNavOpen}>{children}</MainContainer>
      <SideNav sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />
    </PageContainer>
  );
};

export default AdminPageTemplate;

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const MainContainer = styled.div`
  transition: width 1s ease, margin 1s ease;
  width: ${({ $sideNavOpen }) =>
    $sideNavOpen ? "calc(100% - 250px)" : "calc(100% - 30px)"};
  margin-right: ${({ $sideNavOpen }) => ($sideNavOpen ? "250px" : "0")};
`;
