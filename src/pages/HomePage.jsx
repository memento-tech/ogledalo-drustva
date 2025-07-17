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
  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(() => {
    getTopNews().then((responseData) => setTopNews(responseData));
    getOtherNews(currentPageNumber).then((responseData) => {
      setOtherNews(responseData?.data);
      setNumberOfPages(responseData?.numberOfPages);
    });

    logEvent(analytics, "page_view", {
      firebase_screen: "HomePage",
    });
  }, []);
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
          totalPageNumbers={numberOfPages}
          onPageChange={setCurrentPageNumber}
        />
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
