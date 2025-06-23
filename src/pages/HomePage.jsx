import styled from "styled-components";
import TopNewsCarousel from "../components/TopNewsCarousel";
import OtherNews from "../components/OtherNews";
import { exampleNews } from "../assets/exampleData";
import PageTemplate from "./PageTemplate";

const HomePage = () => {
  return (
    <PageTemplate>
      <HomePageContainer>
        <TopNewsCarousel news={exampleNews} />
        <OtherNews news={exampleNews} />
      </HomePageContainer>
    </PageTemplate>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
