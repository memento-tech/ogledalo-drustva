import styled from "styled-components";
import ContextPopupModal from "../ContextPopupModal";
import { PopupMainContainer } from "../components/PopupMainContainer";
import DocumentList from "../../components/DocumentList";

const ListProjectsPresentationPopup = ({ zIndex, closePopup, projectData }) => {
  return (
    <ContextPopupModal zIndex={zIndex} onClose={closePopup}>
      <PopupMainContainer $width="25vw">
        List News Presentation Popup
        <Label>
          This is how the end user will see this news in list news on Home Page
        </Label>
        {projectData && (
          <DocumentList
            documents={[projectData]}
            onDocumentClick={() => {}}
            bluredImage={true}
            presentational={true}
          />
        )}
      </PopupMainContainer>
    </ContextPopupModal>
  );
};

export default ListProjectsPresentationPopup;

const Label = styled.p`
  color: gray;
  font-size: ${(props) => props.theme.fonts.small};
  padding: 0;
  margin: 0;
`;
