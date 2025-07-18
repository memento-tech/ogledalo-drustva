import styled from "styled-components";
import ContextPopupModal from "../ContextPopupModal";
import { PopupMainContainer } from "../components/PopupMainContainer";
import PopupButtons from "../components/PopupButtons";
import { downloadPDFDocument } from "../../adapters/DocumentAdapter";
import { useState } from "react";
import { usePopups } from "../PopupContext";
import LoadingOverlay from "../../components/LoadingOverlay";
import InfoPopup from "./InfoPopup";

const DocumentSaveSuccessPopup = ({
  documentId,
  zIndex,
  closePopup,
  documentTitle,
}) => {
  const { addPopup } = usePopups();
  const [loading, setLoading] = useState(false);

  const onDownloadPDF = () => {
    setLoading(true);

    downloadPDFDocument(documentId).then((data) => {
      const blob = new Blob([data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      let documentName = documentTitle.replaceAll(" ", "_");
      link.download = documentName + ".pdf";
      link.click();

      setLoading(false);

      addPopup((key, zIndex, closePopup) => (
        <InfoPopup
          key={key}
          zIndex={zIndex}
          closePopup={closePopup}
          onConfirm={undefined}
          title={"PDF Download Finished"}
          description={"Your PDF copy of document is downloaded."}
        />
      ));
    });
  };

  return (
    <ContextPopupModal zIndex={zIndex} onClose={closePopup}>
      {loading && <LoadingOverlay masked={true} />}
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
