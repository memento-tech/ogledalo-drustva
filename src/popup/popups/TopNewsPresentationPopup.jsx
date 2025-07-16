import styled from "styled-components";
import TopNewsCarousel from "../../components/TopNewsCarousel";
import ContextPopupModal from "../ContextPopupModal";
import { PopupMainContainer } from "../components/PopupMainContainer";

const TopNewsPresentationPopup = ({ zIndex, closePopup, newsData }) => {
  return (
    <ContextPopupModal zIndex={zIndex} onClose={closePopup}>
      <PopupMainContainer $width="70vw">
        Top News Presentation Popup
        <Label>
          This is how the end user will see this news in top news on Home Page
        </Label>
        <TopNewsCarousel news={newsData} presentational={true} />
      </PopupMainContainer>
    </ContextPopupModal>
  );
};

export default TopNewsPresentationPopup;

const Label = styled.p`
  color: gray;
  font-size: ${(props) => props.theme.fonts.small};
  padding: 0;
  margin: 0;
`;
