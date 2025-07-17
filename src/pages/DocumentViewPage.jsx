import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingOverlay from "../components/LoadingOverlay";
import PageTemplate from "./PageTemplate";
import { getNewsForId, getOtherNews } from "../adapters/NewsAdapter";
import DocumentRender from "../components/DocumentRender";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import DocumentList from "../components/DocumentList";
import { getDocumentUrlSegment } from "../adapters/DocumentAdapter";

const DocumentViewPage = () => {
  let navigate = useNavigate();
  const { titleId } = useParams();

  const [loadingOtherNews, setLoadingOtherNews] = useState(true);
  const [otherNews, setOtherNews] = useState();

  const id = titleId.substring(titleId.lastIndexOf("_withId_") + 8);

  useEffect(() => {
    getOtherNews(1, 3, true, id).then((otherNews) => {
      setOtherNews(otherNews.data);
      setLoadingOtherNews(false);
    });

    logEvent(analytics, "page_view", {
      firebase_screen: "DocumentViewPage",
    });
  }, [titleId]);

  return (
    <PageTemplate>
      <DocumentRender
        documentId={id}
        getValidDocumentForId={() => getNewsForId(id)}
        errorMessage={"No news were found with provided ID, please check URL"}
      />
      <Divider />
      <OtherNewsContainer>
        {loadingOtherNews && <LoadingOverlay />}
        {otherNews && (
          <>
            <OtherNewsTitle>Ostale vesti</OtherNewsTitle>
            <DocumentList
              documents={otherNews}
              onDocumentClick={(title, id, contentPath) =>
                navigate("/news/" + getDocumentUrlSegment(title, id), {
                  replace: true,
                  state: {
                    id: id,
                    contentPath: contentPath,
                  },
                })
              }
            />
          </>
        )}
      </OtherNewsContainer>
    </PageTemplate>
  );
};

export default DocumentViewPage;

const OtherNewsContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 40vh;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    margin-bottom: 7rem;
  }
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
