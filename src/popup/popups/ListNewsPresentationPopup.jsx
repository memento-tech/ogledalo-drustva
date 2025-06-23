import styled from "styled-components";
import OtherNews from "../../components/OtherNews";
import ContextPopupModal from "../ContextPopupModal";
import { PopupMainContainer } from "../components/PopupMainContainer";

const ListNewsPresentationPopup = ({ zIndex, closePopup, newsData }) => {
  return (
    <ContextPopupModal zIndex={zIndex} onClose={closePopup}>
      <PopupMainContainer $width="25vw">
        List News Presentation Popup
        <Label>
          This is how the end user will see this news in list news on Home Page
        </Label>
        <OtherNews news={newsData} presentational={true} />
      </PopupMainContainer>
    </ContextPopupModal>
  );
};

export default ListNewsPresentationPopup;

const Label = styled.p`
  color: gray;
  font-size: ${(props) => props.theme.fonts.small};
  padding: 0;
  margin: 0;
`;
