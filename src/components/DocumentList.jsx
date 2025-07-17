import styled from "styled-components";
import PageNumbers from "./PageNumbers";
import { logEvent } from "firebase/analytics";

const DocumentList = ({
  documents = [],
  presentational = false,
  onDocumentClick,
  bluredImage = false,
  limitPageNumbers = 5,
  currentPageNumber = 0,
  numberOfPages = 0,
  onPageChange = () => {},
  renderExtra = () => <></>,
}) => {
  return (
    <Container $presentational={presentational}>
      {documents.map((documentData, index) => (
        <DocumentCard
          key={index}
          onClick={() => {
            logEvent(analytics, "user_interaction", {
              firebase_screen: "DocumentClicked:" + documentData.id,
            });
            onDocumentClick(
              documentData.title,
              documentData.id,
              documentData.contentPath
            );
          }}
          $presentational={presentational}
        >
          {bluredImage ? (
            <BluredDocumentTopImage src={documentData.topImage?.src} />
          ) : (
            <DocumentTopImage src={documentData.topImage?.src} />
          )}

          <DocumentTextContainer
            id="textContainer"
            $transformToLower={!bluredImage}
          >
            <DocumentTitle className="titleAndText">
              {documentData.title}
            </DocumentTitle>
            <DocumentText className="titleAndText">
              {documentData.description}
            </DocumentText>
            {renderExtra(documentData)}
            <ReadMoreText id="readMoreText">Read more...</ReadMoreText>
          </DocumentTextContainer>
        </DocumentCard>
      ))}
      <PageNumbers
        limitPageNumbers={limitPageNumbers}
        currentPageNumber={currentPageNumber}
        totalPageNumbers={numberOfPages}
        onPageChange={onPageChange}
      />
    </Container>
  );
};

export default DocumentList;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$presentational ? "1fr" : "1fr 1fr 1fr"};
  grid-gap: 2rem;
  grid-row-gap: 6rem;
  margin-top: 3rem;
  margin-bottom: 8rem;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
    grid-row-gap: 6.5rem;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DocumentCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colors.borderInactive};
  cursor: pointer;

  &:hover {
    scale: ${(props) => (props.$presentational ? "1" : "1.1")};
    @media screen and (min-width: ${(props) => props.theme.screen.medium}) {
      scale: 1;
    }

    .titleAndText {
      @media screen and (min-width: ${(props) => props.theme.screen.medium}) {
        display: none;
        visibility: hidden;
      }
    }
    #readMoreText {
      @media screen and (min-width: ${(props) => props.theme.screen.medium}) {
        display: block;
        visibility: visible;
      }
    }
    #textContainer {
      @media screen and (min-width: ${(props) => props.theme.screen.medium}) {
        bottom: unset;
      }
    }
  }

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    padding: 1px;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    max-width: 100%;
  }
`;

const DocumentTopImage = styled.img`
  min-width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
  overflow: hidden;
  opacity: 0.9;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    max-width: 95%;
    min-width: 95%;
    max-height: 95%;
  }
`;

const BluredDocumentTopImage = styled(DocumentTopImage)`
  opacity: 0.19;
`;

const DocumentTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #ffffffba;
  width: 90%;
  border-radius: 5px;
  bottom: ${(props) => (props.$transformToLower ? "-70px" : "unset")};
  padding: 1rem;
  box-sizing: border-box;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    bottom: ${(props) => (props.$transformToLower ? "-90px" : "0")};
    top: ${(props) => (props.$transformToLower ? "unset" : "5%")};
    padding: 0.5rem;
    max-height: ${(props) => (props.$transformToLower ? "unset" : "90%")};
  }
`;

const DocumentTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.theme.fonts.medium} !important;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    font-size: ${(props) => props.theme.fonts.medium} !important;
  }
`;

export const DocumentText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    padding: 0;
    margin-bottom: 0;
  }
`;

const ReadMoreText = styled.p`
  display: none;
  visibility: hidden;
`;
