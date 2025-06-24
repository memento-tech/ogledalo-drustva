import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { exampleNews } from "../assets/exampleData";
import OtherNews from "../components/OtherNews";
import styled from "styled-components";
import LoadingOverlay from "../components/LoadingOverlay";
import DocumentMarkdown from "../components/DocumentMarkdown";
import PageTemplate from "./PageTemplate";
import { enhanceCarousels } from "../components/CarouselEnhancer";

const DocumentPage = () => {
  const [searchParams] = useSearchParams();
  const [visibleDocument, setVisibleDocument] = useState();
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
          setVisibleDocument(text);
          setLoading(false);
        });
    } else {
      setErrorMessage("News not found");
      setLoading(false);
    }

    enhanceCarousels();
  }, []);

  return (
    <PageTemplate>
      <MainNewsContainer>
        {loading && <LoadingOverlay />}
        {!loading && <DocumentMarkdown markdownText={visibleDocument} />}
      </MainNewsContainer>
      <Divider />
      <OtherNewsTitle>Ostale vesti</OtherNewsTitle>
      <OtherNews news={exampleNews} limit={3} />
    </PageTemplate>
  );
};

export default DocumentPage;

const MainNewsContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 60vh;
`;

const OtherNewsTitle = styled.h3`
  width: 100%;
  text-align: center;
  margin: 0;
`;

const Divider = styled.hr`
  margin: 3rem;

  height: 3px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(13, 8, 96, 1) 0%,
    #0a3b65 11%,
    #0691aa 31%,
    #03aac7 100%
  );
`;
