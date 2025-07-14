import styled from "styled-components";
import PageTemplate from "./PageTemplate";
import { useEffect, useState } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { getOtherNews } from "../adapters/NewsAdapter";
import { getProjects } from "../adapters/ProjectsAdapter";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import DocumentList, { DocumentText } from "../components/DocumentList";
import { useNavigate } from "react-router";
import { getDocumentUrlSegment } from "../adapters/DocumentAdapter";

const ProjectsPage = () => {
  let navigate = useNavigate();
  const [loadingOtherNews, setLoadingOtherNews] = useState(true);
  const [otherNews, setOtherNews] = useState();

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  const [projects, setProjects] = useState();
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    getProjects(currentPageNumber, 12).then((pageData) => {
      if (pageData) {
        setProjects(pageData.data);
        setNumberOfPages(pageData.numberOfPages);
      }

      setLoadingProjects(false);
    });

    getOtherNews(1, 3, true).then((otherNewsResponse) => {
      setOtherNews(otherNewsResponse?.data);
      setLoadingOtherNews(false);
    });

    logEvent(analytics, "page_view", {
      firebase_screen: "ProjectsPage",
    });
  }, []);

  return (
    <PageTemplate>
      <ProjectsContainer>
        {loadingProjects && <LoadingOverlay />}
        {projects && (
          <DocumentList
            documents={projects}
            onDocumentClick={(id, contentPath) =>
              navigate("/project?id=" + id, {
                state: {
                  id: id,
                  contentPath: contentPath,
                },
              })
            }
            bluredImage={true}
            limitPageNumbers={5}
            currentPageNumber={currentPageNumber}
            totalPageNumbers={numberOfPages}
            onPageChange={setCurrentPageNumber}
            renderExtra={(projectData) => (
              <DocumentText>{projectData.subDescription}</DocumentText>
            )}
          />
        )}
      </ProjectsContainer>
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

export default ProjectsPage;

const ProjectsContainer = styled.div`
  width: 100%;
  min-height: 40vh;
`;

const OtherNewsTitle = styled.h3`
  width: 100%;
  text-align: center;
  margin: 0;
`;

const OtherNewsContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 40vh;
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
