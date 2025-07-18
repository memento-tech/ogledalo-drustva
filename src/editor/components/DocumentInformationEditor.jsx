import styled from "styled-components";
import ArrowIcon from "../../icons/ArrowIcon";
import { useEffect, useState } from "react";
import ImageUploadIcon from "../../icons/ImageUploadIcon";
import { usePopups } from "../../popup/PopupContext";
import UploadImagesPopup from "../../popup/popups/UploadImagesPopup";
import ButtonOutlined from "../../components/ButtonOutlined";
import TopNewsPresentationPopup from "../../popup/popups/TopNewsPresentationPopup";
import ListNewsPresentationPopup from "../../popup/popups/ListNewsPresentationPopup";
import ListProjectsPresentationPopup from "../../popup/popups/ListProjectsPresentationPopup";

const s = [
  {
    id: "1",
    img: "https://media.istockphoto.com/id/1389157460/photo/newspaper-and-digital-tablet-on-wooden-table.webp?s=1024x1024&w=is&k=20&c=P_V3EhDOn-jdB5cCA771B5lvW0XWQnsVuXBI2Ioyg_g=",
    topTitle: "Globalne stope inflacije pokazuju znake stabilizacije",
    topDescription:
      "Nakon burne 2024. godine, ekonomisti izveštavaju o sporom, ali stabilnom padu globalne inflacije, što uliva nadu u stabilniju 2025. godinu.",
  },
];
const DocumentInformationEditor = ({
  infoOpen,
  setInfoOpen,
  documentInfo,
  onDocumentInfoChange,
  resetSignal,
  error,
}) => {
  const { addPopup } = usePopups();

  const [id, setId] = useState();
  const [isNews, setIsNews] = useState(true);
  const [publishStatus, setPublishStatus] = useState("DRAFT");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topImage, setTopImage] = useState();
  const [isTopNews, setIsTopNews] = useState(true);
  const [projectDonator, setProjectDonator] = useState("");
  const [publishDate, setPublishDate] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setPublishDate(getTomorrowDateISO());

    if (documentInfo) {
      setId(documentInfo.id || undefined);
      setIsNews(documentInfo.isNews || true);
      setPublishStatus(documentInfo.publishStatus || "DRAFT");
      setTitle(documentInfo.title || "");
      setDescription(documentInfo.description || "");
      setTopImage(documentInfo.topImage || undefined);
      setIsTopNews(documentInfo.isTopNews || true);
      setProjectDonator(documentInfo.projectDonator || "");
      setPublishDate(documentInfo.publishDate);
    }
  }, []);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    setId(undefined);
    setIsNews(true);
    setPublishStatus("DRAFT");
    setTitle("");
    setDescription("");
    setTopImage(undefined);
    setIsTopNews(true);
    setProjectDonator("");

    if (documentInfo) {
      setId(documentInfo.id || undefined);
      setIsNews(documentInfo.isNews || true);
      setPublishStatus(documentInfo.publishStatus || "DRAFT");
      setTitle(documentInfo.title || "");
      setDescription(documentInfo.description || "");
      setTopImage(documentInfo.topImage || undefined);
      setIsTopNews(documentInfo.isTopNews || true);
      setProjectDonator(documentInfo.projectDonator || "");
    }
  }, [resetSignal]);

  useEffect(() => {
    onDocumentInfoChange({
      id: id,
      documentType: isNews ? "NEWS" : "PROJECT",
      title,
      description,
      subDescription: projectDonator,
      publishStatus,
      publishDate: publishStatus === "PUBLISH_ON_DATE" ? publishDate : null,
      topImage,
      isTopNews,
    });
  }, [isNews, publishStatus, title, description, topImage, isTopNews]);

  const openImageUploadPopup = () => {
    addPopup((key, zIndex, closePopup) => (
      <UploadImagesPopup
        key={key}
        onSubmit={(data) => {
          if (!data && data.length > 0) return;
          setTopImage(data[0]);
        }}
        zIndex={zIndex}
        closePopup={closePopup}
        oneImageOnly={true}
        presetImages={[topImage]}
      />
    ));
  };

  const handleTopNewsPresentationPopup = () => {
    addPopup((key, zIndex, closePopup) => (
      <TopNewsPresentationPopup
        key={key}
        zIndex={zIndex}
        closePopup={closePopup}
        newsData={[
          {
            topImage: {
              src: topImage && topImage.src,
            },
            title: title,
            description: description,
          },
        ]}
      />
    ));
  };

  const handleListNewsPresentationPopup = () => {
    addPopup((key, zIndex, closePopup) => (
      <ListNewsPresentationPopup
        key={key}
        zIndex={zIndex}
        closePopup={closePopup}
        newsData={[
          {
            topImage: {
              src: topImage && topImage.src,
            },
            title: title,
            description: description,
          },
        ]}
      />
    ));
  };

  const handleListProjectsPresentationPopup = () => {
    addPopup((key, zIndex, closePopup) => (
      <ListProjectsPresentationPopup
        key={key}
        zIndex={zIndex}
        closePopup={closePopup}
        projectData={{
          topImage: {
            src: topImage && topImage.src,
          },
          title,
          description,
          projectDonator,
        }}
      />
    ));
  };

  const getTomorrowDateISO = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <Container $infoOpen={infoOpen}>
      <Title>{isNews ? "News" : "Project"} information</Title>

      <MainContainer>
        <LeftContainer>
          <SelectContainer style={{ marginBottom: "1rem" }}>
            <RadioGroup style={{ justifyContent: "center", width: "100%" }}>
              <label>
                <input
                  type="radio"
                  name="newsOrProject"
                  value="yes"
                  checked={isNews}
                  onChange={() => setIsNews(true)}
                />
                News
              </label>
              <label>
                <input
                  type="radio"
                  name="newsOrProject"
                  value="no"
                  checked={!isNews}
                  onChange={() => setIsNews(false)}
                />
                Project
              </label>
            </RadioGroup>
          </SelectContainer>

          <ErrorLabel>{errorMessage}</ErrorLabel>

          <InputContainer>
            <label>Title</label>
            <InputStyled
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <label>Description</label>
            <TextAreaStyled
              rows={5}
              required
              maxLength={300}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputContainer>

          {!isNews && (
            <InputContainer>
              <label>Main donator</label>
              <InputStyled
                placeholder="Project main donator"
                value={projectDonator}
                onChange={(e) => setProjectDonator(e.target.value)}
              />
            </InputContainer>
          )}

          <SelectContainer>
            <label>Publish status:</label>
            <select
              value={publishStatus}
              onChange={(e) => setPublishStatus(e.target.value)}
            >
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISH NOW</option>
              <option value="PUBLISH_ON_DATE">PUBLISH ON DATE</option>
            </select>
          </SelectContainer>

          {publishStatus === "PUBLISH_ON_DATE" && (
            <SelectContainer>
              <label>Publish date: </label>
              <input
                type="date"
                min={getTomorrowDateISO()}
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </SelectContainer>
          )}
          {isNews && (
            <SelectContainer>
              <label>Include in Top News:</label>
              <RadioGroup>
                <label>
                  <input
                    type="radio"
                    name="topNews"
                    value="yes"
                    checked={isTopNews}
                    onChange={() => setIsTopNews(true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="topNews"
                    value="no"
                    checked={!isTopNews}
                    onChange={() => setIsTopNews(false)}
                  />
                  No
                </label>
              </RadioGroup>
            </SelectContainer>
          )}

          <PresentationButtonContainer>
            {isNews && (
              <ButtonOutlined onClick={handleTopNewsPresentationPopup}>
                View Top News Presentation
              </ButtonOutlined>
            )}
            <ButtonOutlined
              onClick={
                isNews
                  ? handleListNewsPresentationPopup
                  : handleListProjectsPresentationPopup
              }
            >
              View List {isNews ? "News" : "Project"} Presentation
            </ButtonOutlined>
          </PresentationButtonContainer>
        </LeftContainer>
        <ImageContainer
          onClick={() => (topImage ? () => {} : openImageUploadPopup())}
          $withCursor={topImage}
        >
          {topImage && (
            <>
              <TopCarouselImage src={topImage.src} />
              <EditButton onClick={openImageUploadPopup}>✏️</EditButton>
            </>
          )}
          {!topImage && (
            <>
              <ImageUploadIcon height={30} />
              <p>
                Upload {isNews ? "news" : "project"} top image. Top image will
                be shown on home page and other small format views.
              </p>
            </>
          )}
        </ImageContainer>
      </MainContainer>

      <ArrowIconContainer
        onClick={() => setInfoOpen(!infoOpen)}
        $infoOpen={infoOpen}
      >
        <ArrowIcon height={20} />
      </ArrowIconContainer>
    </Container>
  );
};

export default DocumentInformationEditor;

const Container = styled.div`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  margin-left: 40px;
  border-bottom: 1px solid black;
  border-radius: 10px;
  width: calc(100% - 40px);
  padding-bottom: 2rem;
  background-color: white;
  z-index: 998;
  height: 480px;

  transform: translateY(${(props) => (props.$infoOpen ? "0" : "-450px")});
  transition: transform 1s ease;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    box-sizing: border-box;
    width: calc(100% - 40px);
    height: 100%;
    padding-bottom: 2rem;
    justify-content: start;
    align-items: center;
    transform: translateY(
      ${(props) => (props.$infoOpen ? "0" : "calc(-100% + 30px)")}
    );
  }
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 100%;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    box-sizing: border-box;
    flex-direction: column;
    position: absolute;
    background-color: white;
    gap: 1rem;
    justify-content: center;
    height: auto;
    width: 90%;
    margin: auto;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  gap: 10px;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 60%;
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 390px;
  text-align: center;
  cursor: ${(props) => (props.$withCursor ? "default" : "pointer")};

  p {
    font-size: 12px;
    width: 50%;
    font-style: italic;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 100%;
    min-height: 200px;
    max-height: 200px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const Title = styled.p`
  align-self: center;
  font-size: 18px;
  margin: 0;

  margin-bottom: 1rem;
`;

const ArrowIconContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  align-self: center;
  transform: rotate(${(props) => (props.$infoOpen ? "90deg" : "-90deg")});
  transition: transform 1s ease;
  cursor: pointer;
`;

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;

  select {
    padding: 4px 6px;
    border-radius: 4px;
    border: 1px solid #aaa;
    font-size: 12px;
    cursor: pointer;
  }
`;

const TopCarouselImage = styled.img`
  width: 80%;
  height: 90%;
  object-fit: cover;
  border-radius: 10px;
  transition: opacity 0.5s ease;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px 6px;
  font-size: 12px;
  &:hover {
    background: #eee;
  }
`;

const PresentationButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: auto;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    flex-direction: column;
  }
`;

const TextAreaStyled = styled.textarea`
  width: 100%;
  color: ${(props) => props.theme.colors.textPrimary};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.borderInactive};
  outline: none;
  background-color: transparent;
  transition: border-color 0.3s ease;
  font-family: inherit;
  font-size: inherit;
  resize: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.border};
  }
`;

const InputStyled = styled.input`
  width: 100%;
  color: ${(props) => props.theme.colors.textPrimary};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  outline: none;
  background-color: transparent;
  transition: border-color 0.3s ease;
  font-family: inherit;
  font-size: inherit;

  &:focus {
    border-color: rgba(36, 91, 150, 0.97);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 0.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    font-size: 14px;
    cursor: pointer;
  }

  input[type="radio"] {
    cursor: pointer;
  }
`;

const ErrorLabel = styled.p`
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: red;
  margin: 0;
  transform: translateY(-20px);
`;
