import styled from "styled-components";
import ArrowIcon from "../../icons/ArrowIcon";
import { useState } from "react";
import ImageUploadIcon from "../../icons/ImageUploadIcon";
import { usePopups } from "../../popup/PopupContext";
import UploadImagesPopup from "../../popup/popups/UploadImagesPopup";

const NewsInformationEditor = ({ infoOpen, setInfoOpen }) => {
  const [publishOption, setPublishOption] = useState("draft");
  const [topImages, setTopImages] = useState();
  const { addPopup } = usePopups();
  const [index, setIndex] = useState(0);

  const openImagesUploadPopup = () => {
    addPopup((key, zIndex, closePopup) => (
      <UploadImagesPopup
        key={key}
        onSubmit={(data) => {
          if (!data) return;
          setTopImages(data);
        }}
        zIndex={zIndex}
        closePopup={closePopup}
        oneImageOnly={false}
        presetImages={topImages}
      />
    ));
  };

  const handleDotClick = (i) => setIndex(i);

  return (
    <Container $infoOpen={infoOpen}>
      <Title>News information</Title>

      <MainContainer>
        <LeftContainer>
          <InputContainer>
            <label>News title: </label>
            <input placeholder="Title" />
          </InputContainer>

          <InputContainer>
            <label>Top description: </label>
            <input placeholder="Top description" />
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
            <InputContainer>
              <label>Publish date: </label>
              <input type="date" />
            </InputContainer>
          )}
        </LeftContainer>
        <ImageContainer
          onClick={() =>
            topImages && topImages.length > 0
              ? () => {}
              : openImagesUploadPopup()
          }
          $withCursor={topImages && topImages.length > 0}
        >
          {topImages && topImages.length > 0 && (
            <>
              <TopCarouselImage src={topImages[index].src} />
              <EditButton onClick={openImagesUploadPopup}>✏️</EditButton>
              {topImages.length > 1 && (
                <DotsContainer>
                  {topImages.map((_, i) => (
                    <Dot
                      key={i}
                      active={i === index}
                      onClick={() => handleDotClick(i)}
                    />
                  ))}
                </DotsContainer>
              )}
            </>
          )}
          {(!topImages || topImages.length === 0) && (
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
  height: 400px;

  transform: translateY(${(props) => (props.$infoOpen ? "0" : "-370px")});
  transition: transform 1s ease;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 10px;
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
  height: 300px;
  text-align: center;
  cursor: ${(props) => (props.$withCursor ? "default" : "pointer")};

  p {
    font-size: 12px;
    width: 50%;
    font-style: italic;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

  select {
    padding: 4px 6px;
    border-radius: 4px;
    border: 1px solid #aaa;
    font-size: 14px;
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

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "black" : "#ccc")};
  cursor: pointer;
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
