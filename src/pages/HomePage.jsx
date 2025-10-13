import styled from "styled-components";
import TopNewsCarousel from "../components/TopNewsCarousel";
import PageTemplate from "./PageTemplate";
import { useEffect, useState } from "react";
import { getOtherNews, getTopNews } from "../adapters/NewsAdapter";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import { useNavigate } from "react-router";
import DocumentList from "../components/DocumentList";
import { getDocumentUrlSegment } from "../adapters/DocumentAdapter";

const HomePage = () => {
  let navigate = useNavigate();
  const [topNews, setTopNews] = useState();
  const [otherNews, setOtherNews] = useState();

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(undefined);

  useEffect(() => {
    getTopNews().then(setTopNews);
    logEvent(analytics, "page_view", { firebase_screen: "HomePage" });
  }, []);

  useEffect(() => {
    getOtherNews(currentPageNumber).then((responseData) => {
      console.log("Other news:", responseData);
      console.log("number of pages" + responseData.numberOfPages);
      setNumberOfPages(responseData?.numberOfPages);
      setOtherNews(responseData?.data);
    });
  }, [currentPageNumber]);

  useEffect(() => {
    console.log(numberOfPages);
  }, [numberOfPages]);

  return (
    <PageTemplate>
      <HomePageContainer>
        <SEOHeader>Najnovije aktuelnosti</SEOHeader>
        <SEOSubHeader>
          Pročitajte najnovije vesti, analize i dešavanja na portalu Ogledalo
          Društva – vašem izvoru za kulturu, društvo i istinu.
        </SEOSubHeader>
        <TopNewsCarousel news={topNews} />

        <SEOHeader>Ostale novosti</SEOHeader>
        <SEOSubHeader>
          U ostalim vestima pronađite sve važne informacije i događaje koji
          oblikuju naše društvo.
        </SEOSubHeader>
        {otherNews && numberOfPages && (
          <DocumentList
            documents={otherNews}
            onDocumentClick={(title, id, contentPath) =>
              navigate("/news/" + getDocumentUrlSegment(title, id), {
                state: {
                  id: id,
                  contentPath: contentPath,
                },
              })
            }
            limitPageNumbers={5}
            currentPageNumber={currentPageNumber}
            numberOfPages={numberOfPages}
            onPageChange={setCurrentPageNumber}
          />
        )}
      </HomePageContainer>
    </PageTemplate>
  );
};

export default HomePage;

const SEOHeader = styled.h1`
  width: 200px;
  height: 50px;
  text-indent: -9999px;
  position: absolute;
`;

const SEOSubHeader = styled.h2`
  width: 200px;
  height: 50px;
  text-indent: -9999px;
  position: absolute;
`;

const HomePageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
