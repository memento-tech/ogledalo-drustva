import styled from "styled-components";
import ArrowIcon from "../../icons/ArrowIcon";
import { useEffect, useState } from "react";
import ImageUploadIcon from "../../icons/ImageUploadIcon";
import { usePopups } from "../../popup/PopupContext";
import UploadImagesPopup from "../../popup/popups/UploadImagesPopup";
import ButtonOutlined from "../../components/ButtonOutlined";
import TopNewsPresentationPopup from "../../popup/popups/TopNewsPresentationPopup";
import ListNewsPresentationPopup from "../../popup/popups/ListNewsPresentationPopup";

const s = [
  {
    id: "1",
    img: "https://media.istockphoto.com/id/1389157460/photo/newspaper-and-digital-tablet-on-wooden-table.webp?s=1024x1024&w=is&k=20&c=P_V3EhDOn-jdB5cCA771B5lvW0XWQnsVuXBI2Ioyg_g=",
    topTitle: "Globalne stope inflacije pokazuju znake stabilizacije",
    topDescription:
      "Nakon burne 2024. godine, ekonomisti izveštavaju o sporom, ali stabilnom padu globalne inflacije, što uliva nadu u stabilniju 2025. godinu.",
  },
];
const NewsInformationEditor = ({ infoOpen, setInfoOpen }) => {
  const [publishOption, setPublishOption] = useState("draft");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topImage, setTopImage] = useState();
  const { addPopup } = usePopups();
  const [isTopNews, setIsTopNews] = useState(true);

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
            img: topImage && topImage.src,
            topTitle: title,
            topDescription: description,
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
            img: topImage && topImage.src,
            topTitle: title,
            topDescription: description,
          },
        ]}
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
      <Title>News information</Title>

      <MainContainer>
        <LeftContainer>
          <InputContainer>
            <label>News title: </label>
            <InputStyled
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <label>Top description: </label>
            <TextAreaStyled
              rows={5}
              required
              maxLength={300}
              placeholder="Top description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputContainer>

          <SelectContainer>
            <label>Publish status:</label>
            <select
              value={publishOption}
              onChange={(e) => setPublishOption(e.target.value)}
            >
              <option value="draft">DRAFT</option>
              <option value="now">PUBLISH NOW</option>
              <option value="onDate">PUBLISH ON DATE</option>
            </select>
          </SelectContainer>

          {publishOption === "onDate" && (
            <SelectContainer>
              <label>Publish date: </label>
              <input type="date" min={getTomorrowDateISO()} />
            </SelectContainer>
          )}
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

          <PresentationButtonContainer>
            <ButtonOutlined onClick={handleTopNewsPresentationPopup}>
              View Top News Presentation
            </ButtonOutlined>
            <ButtonOutlined onClick={handleListNewsPresentationPopup}>
              View List News Presentation
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
                Upload news top image. Top image/carousel will be shown on home
                page and other small format news views.
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

export default NewsInformationEditor;

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
  z-index: 1000;
  height: 450px;

  transform: translateY(${(props) => (props.$infoOpen ? "0" : "-420px")});
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
  justify-content: space-between;
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
  width: 30%;
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
  max-height: 360px;
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
