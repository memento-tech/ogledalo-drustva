import styled from "styled-components";
import ArrowIcon from "./ArrowIcon";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopNewsCarousel = ({ news = [] }) => {
  const [displayableNews, setDisplayableNews] = useState(news.slice(0, 5));
  const [visibleNews, setVisibleNews] = useState();
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef(null);
  let navigate = useNavigate();

  const isDotActive = (newsId) => {
    return visibleNews.id === newsId;
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goToNextSlide();
    }, 4000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goToNextSlide = () => {
    setCounter((prev) => (prev + 1) % displayableNews.length);
    resetInterval();
  };

  const goToPreviousSlide = () => {
    setCounter((prev) =>
      prev - 1 < 0 ? displayableNews.length - 1 : prev - 1
    );
    resetInterval();
  };

  const selectSlide = (index) => {
    setCounter(index);
    resetInterval();
  };

  useEffect(() => {
    if (news && news.length > 0) {
      setVisibleNews(displayableNews[counter]);
    }
  }, [displayableNews, counter, news]);

  if (!visibleNews) {
    return <></>;
  }

  return (
    <CarouselContainer>
      <TopNewsContainer onClick={() => navigate("/news?id=" + visibleNews.id)}>
        <CarouselImage src={visibleNews.img} />
        <CarouselTextContainer>
          <TopNewsTitle>{visibleNews.topTitle}</TopNewsTitle>
          <TopNewsText>{visibleNews.topDescription}</TopNewsText>
        </CarouselTextContainer>
        <ReadMoreLink className="scalableOnHover">read more →</ReadMoreLink>
      </TopNewsContainer>
      <TopNewsCounterDots>
        {displayableNews.map((newsData, index) => (
          <DotStyled
            key={index}
            className={isDotActive(newsData.id) ? "active" : ""}
            onClick={() => selectSlide(index)}
          />
        ))}
      </TopNewsCounterDots>
      <LeftArrowNav onClick={goToPreviousSlide}>
        <ArrowIcon height={50} />
      </LeftArrowNav>
      <RightArrowNav onClick={goToNextSlide}>
        <ArrowIcon height={50} />
      </RightArrowNav>
    </CarouselContainer>
  );
};

export default TopNewsCarousel;

const TopNewsContainer = styled.div`
  width: 100%;
  height: 100%;

  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: row;
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 500px;

  margin: 2rem 0;
  padding: 10px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.borderInactive};

  position: relative;

  &:hover {
    .scalableOnHover {
      scale: 1.1;
    }
  }

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    flex-direction: column;
    justify-content: start;
  }
`;

const TopNewsTitle = styled.h3`
  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    margin: 0;
    padding: 0;
    margin-top: 1rem;
  }
`;

const TopNewsText = styled.p`
  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    max-height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CarouselImage = styled.img`
  min-width: 55%;
  max-height: 500px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  overflow: hidden;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    height: 200px;
    max-height: 200px;
    min-height: 200px;
  }
`;

const CarouselTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 2rem 0 3rem;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    margin: 0 1rem;
  }
`;

const ReadMoreLink = styled.a`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-style: italic;
  font-size: ${(props) => props.theme.fonts.small};
`;

const TopNewsCounterDots = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  cursor: default;

  .active {
    border-color: #02ea02;
    background-color: #5ef65e;

    cursor: default;

    &:hover {
      scale: 1;
      border-color: #02ea02;
    }
  }
`;

const DotStyled = styled.div`
  width: 8px;
  height: 8px;
  border: 2px solid ${(props) => props.theme.colors.borderInactive};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    scale: 1.2;
    border-color: #636363;
  }
`;

const LeftArrowNav = styled.div`
  position: absolute;
  top: 50%;
  left: -70px;
  transform: translateY(-50%);
  cursor: pointer;

  color: #5a5a5a;

  &:hover {
    color: black;
    scale: 1.01;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    display: none;
    visibility: hidden;
  }
`;

const RightArrowNav = styled.div`
  position: absolute;
  top: 50%;
  right: -70px;
  transform: translateY(50%);
  rotate: 180deg;
  cursor: pointer;

  color: #5a5a5a;

  &:hover {
    color: black;
    scale: 1.01;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    display: none;
    visibility: hidden;
  }
`;
