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
        <TopNewsCarousel news={topNews} />
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

const HomePageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
