import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { exampleNews } from "../assets/exampleData";
import OtherNews from "../components/OtherNews";
import styled from "styled-components";

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
      setVisibleNews(selectedNews);
    } else {
      setErrorMessage("News not found");
    }

    setLoading(false);
  });

  return (
    <div>
      <div>Izabrana vest je {searchParams.get("id")}</div>
      <OtherNewsTitle>Procitaj i ostale vesti</OtherNewsTitle>
      <OtherNews news={exampleNews} limit={3} />
    </div>
  );
};

export default NewsPage;

const OtherNewsTitle = styled.h3`
  width: 100%;
  text-align: center;
  margin: 0;
  margin-top: 3rem;
`;
