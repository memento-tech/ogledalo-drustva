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
      <ProjectsContainer $loading={loadingProjects}>
        <HeadingContainer>
          <Title>Projekti</Title>
          <SubTitle>
            U okviru rubrike Projekti, portal Ogledalo društva donosi pregled
            aktivnosti i inicijativa koje sprovodimo ili pratimo u oblastima od
            posebnog društvenog značaja. Fokusirani smo na teme koje doprinose
            unapređenju kvaliteta života i većoj inkluziji – osobe sa
            invaliditetom, turizam, kultura, zdravstvo i prosveta.
          </SubTitle>

          <SubTitle>
            Kroz projekte promovišemo pozitivne primere, podržavamo lokalne
            zajednice i podstičemo dijalog o važnim društvenim pitanjima. Naša
            misija je da informišemo, inspirišemo i povežemo aktere koji rade na
            stvaranju ravnopravnijeg i pristupačnijeg društva za sve.
          </SubTitle>
        </HeadingContainer>

        {loadingProjects && <LoadingOverlay />}
        {projects && projects.length > 0 && (
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

        {!loadingProjects && !projects.length > 0 && (
          <NoProjectsText>Trenutno nema projekata</NoProjectsText>
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

const HeadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  margin-top: 2rem;
  font-size: ${(props) => props.theme.fonts.medium};
`;

const SubTitle = styled.h3`
  font-size: ${(props) => props.theme.fonts.small} !important;
  width: 80%;
  text-align: center;
  font-weight: 200;
`;

const ProjectsContainer = styled.div`
  width: 100%;
`;

const NoProjectsText = styled.p`
  margin-top: 2rem;
  width: 100%;
  text-align: center;
  font-style: italic;
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
