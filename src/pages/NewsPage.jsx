import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { exampleNews } from "../assets/exampleData";
import OtherNews from "../components/OtherNews";
import styled from "styled-components";
import LoadingOverlay from "../components/LoadingOverlay";
import NewsMarkdown from "../components/NewsMarkdown";
import PageTemplate from "./PageTemplate";

const NewsPage = () => {
  const [searchParams] = useSearchParams();
  const [visibleNews, setVisibleNews] = useState();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    var selectedNews = exampleNews.find(
      (newsData) => newsData.id === searchParams.get("id")
    );

    if (selectedNews) {
      fetch(
        "https://raw.githubusercontent.com/memento-tech/memento-tech-xml-to-csv-converter/main/README.md"
      )
        .then((response) => response.text())
        .then((text) => {
          setVisibleNews(text);
          setLoading(false);
        });
    } else {
      setErrorMessage("News not found");
      setLoading(false);
    }
  }, []);

  return (
    <PageTemplate>
      <MainNewsContainer>
        {loading && <LoadingOverlay />}
        {!loading && <NewsMarkdown markdownText={visibleNews} />}
      </MainNewsContainer>
      <OtherNewsTitle>Procitaj i ostale vesti</OtherNewsTitle>
      <OtherNews news={exampleNews} limit={3} />
    </PageTemplate>
  );
};

export default NewsPage;

const MainNewsContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 60vh;
`;

const OtherNewsTitle = styled.h3`
  width: 100%;
  text-align: center;
  margin: 0;
  margin-top: 3rem;
`;
