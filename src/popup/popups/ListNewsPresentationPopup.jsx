import styled from "styled-components";
import ContextPopupModal from "../ContextPopupModal";
import { PopupMainContainer } from "../components/PopupMainContainer";
import DocumentList from "../../components/DocumentList";

const ListNewsPresentationPopup = ({ zIndex, closePopup, newsData }) => {
  return (
    <ContextPopupModal zIndex={zIndex} onClose={closePopup}>
      <PopupMainContainer $width="25vw">
        List News Presentation Popup
        <Label>
          This is how the end user will see this news in list news on Home Page
        </Label>
        <DocumentList
          documents={newsData}
          onDocumentClick={() => {}}
          presentational={true}
        />
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
