import styled from "styled-components";
import ContextPopupModal from "../ContextPopupModal";
import { PopupMainContainer } from "../components/PopupMainContainer";
import PopupButtons from "../components/PopupButtons";
import { downloadPDFDocument } from "../../adapters/DocumentAdapter";

const DocumentSaveSuccessPopup = ({ documentId, zIndex, closePopup }) => {
  const onDownloadPDF = () => {
    downloadPDFDocument(documentId);
  };

  return (
    <ContextPopupModal zIndex={zIndex} onClose={closePopup}>
      <PopupMainContainer $width="300px">
        Success
        <LabelStyled>Document is saved successfully!</LabelStyled>
        <PopupButtons
          buttons={[
            {
              label: "Download PDF",
              onClick: onDownloadPDF,
              width: "40%",
            },
            {
              label: "Close",
              onClick: closePopup,
              width: "40%",
            },
          ]}
        />
      </PopupMainContainer>
    </ContextPopupModal>
  );
};

export default DocumentSaveSuccessPopup;

const LabelStyled = styled.label`
  width: 100%;
  text-align: start;
  margin-top: 1rem;
  font-style: italic;
  text-align: center;
  margin: 2rem;
  margin-top: 3rem;
`;
