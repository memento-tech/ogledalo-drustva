import styled from "styled-components";
import TopNewsCarousel from "../components/TopNewsCarousel";
import OtherNews from "../components/OtherNews";
import { exampleNews } from "../assets/exampleData";

const HomePage = () => {
  return (
    <HomePageContainer>
      <TopNewsCarousel news={exampleNews} />
      <OtherNews news={exampleNews} />
    </HomePageContainer>
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
