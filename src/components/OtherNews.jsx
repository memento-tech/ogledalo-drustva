import styled from "styled-components";

const OtherNews = ({ news = [] }) => {
  return (
    <Container>
      {news.map((newsData, index) => (
        <NewsCard key={index} onClick={() => console.log("clicked")}>
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  grid-row-gap: 6rem;
  margin-top: 3rem;
  margin-bottom: 8rem;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    grid-template-columns: 1fr;
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
    scale: 1.1;
    .titleAndText {
      display: none;
      visibility: hidden;
    }
    #readMoreText {
      display: block;
      visibility: visible;
    }
    #textContainer {
      bottom: unset;
    }
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
`;

const NewsTitle = styled.h3`
  margin: 0;
  padding: 0;
`;

const NewsText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const ReadMoreText = styled.p`
  display: none;
  visibility: hidden;
`;
