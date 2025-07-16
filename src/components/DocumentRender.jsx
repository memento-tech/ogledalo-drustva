import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import LoadingOverlay from "./LoadingOverlay";
import { useLocation } from "react-router";
import { enhanceCarousels } from "./CarouselEnhancer";

const DocumentRender = ({
  documentId,
  getValidDocumentForId,
  errorMessage,
}) => {
  const location = useLocation();
  const contentPathId = location.state?.id;
  const contentPath = location.state?.contentPath;

  const contentContainerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [documentText, setDocumentText] = useState("");
  const [validContentPath, setValidContentPath] = useState();

  useEffect(() => {
    if (contentPathId === documentId) {
      setValidContentPath(contentPath);
    } else {
      getValidDocumentForId().then((documentData) => {
        if (documentData) {
          setValidContentPath(documentData.contentPath);
        } else {
          setLoading(false);
        }
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    fetch(validContentPath)
      .then((response) => response.text())
      .then((text) => {
        setDocumentText(text);
        setLoading(false);
      });
    enhanceCarousels();
  }, [validContentPath]);

  useEffect(() => {
    if (documentText && contentContainerRef.current) {
      contentContainerRef.current.innerHTML = documentText;
    }
  }, [documentText, contentContainerRef]);

  return (
    <MainDocumentContainer>
      {loading && <LoadingOverlay />}
      <ContentContainer ref={contentContainerRef} />
      {!documentText && !loading && errorMessage && (
        <ErrorMessageText>{errorMessage}</ErrorMessageText>
      )}
    </MainDocumentContainer>
  );
};

export default DocumentRender;

const MainDocumentContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 40vh;
  margin-top: 2rem;

  .carousel img {
    max-width: 100%;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const ErrorMessageText = styled.p`
  width: 100%;
  margin: auto;
  text-align: center;
  padding-top: 6rem;
`;
