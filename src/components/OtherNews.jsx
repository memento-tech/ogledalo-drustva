import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OtherNews = ({ news = [], limit = 15, presentational = false }) => {
  let navigate = useNavigate();
  return (
    <Container $presentational={presentational}>
      {news.slice(0, limit).map((newsData, index) => (
        <NewsCard
          key={index}
          onClick={() => navigate("/news?id=" + newsData.id)}
          $presentational={presentational}
        >
          <NewsImage src={newsData.img} />
          <NewsTextContainer id="textContainer">
            <NewsTitle className="titleAndText">{newsData.topTitle}</NewsTitle>
            <NewsText className="titleAndText">
              {newsData.topDescription}
            </NewsText>
            <ReadMoreText id="readMoreText">Read more...</ReadMoreText>
          </NewsTextContainer>
        </NewsCard>
      ))}
    </Container>
  );
};

export default OtherNews;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$presentational ? "1fr" : "1fr 1fr 1fr"};
  grid-gap: 2rem;
  grid-row-gap: 6rem;
  margin-top: 3rem;
  margin-bottom: 8rem;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
    grid-row-gap: 6.5rem;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const NewsCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colors.borderInactive};
  cursor: pointer;

  &:hover {
    scale: ${(props) => (props.$presentational ? "1" : "1.1")};
    .titleAndText {
      @media screen and (min-width: ${(props) => props.theme.screen.small}) {
        display: none;
        visibility: hidden;
      }
    }
    #readMoreText {
      @media screen and (min-width: ${(props) => props.theme.screen.small}) {
        display: block;
        visibility: visible;
      }
    }
    #textContainer {
      @media screen and (min-width: ${(props) => props.theme.screen.small}) {
        bottom: unset;
      }
    }
  }

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    padding: 1px;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    max-width: 100%;
  }
`;

const NewsImage = styled.img`
  min-width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  overflow: hidden;
  opacity: 0.9;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    max-width: 100%;
  }
`;

const NewsTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #ffffffba;
  width: 90%;
  border-radius: 5px;
  bottom: -70px;
  padding: 1rem;
  box-sizing: border-box;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    bottom: -90px;
    padding: 0.5rem;
  }
`;

const NewsTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.theme.fonts.medium} !important;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    font-size: ${(props) => props.theme.fonts.medium} !important;
  }
`;

const NewsText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    padding: 0;
    margin-bottom: 0;
  }
`;

const ReadMoreText = styled.p`
  display: none;
  visibility: hidden;
`;
