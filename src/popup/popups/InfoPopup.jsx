import styled from "styled-components";
import ContextPopupModal from "../ContextPopupModal";
import PopupButtons from "../components/PopupButtons";
import { PopupMainContainer } from "../components/PopupMainContainer";
import { useEffect, useState } from "react";

const InfoPopup = ({
  zIndex,
  closePopup,
  onConfirm,
  title,
  description,
  error,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const getButtons = () => {
    var buttons = [];

    if (onConfirm) {
      buttons.push({
        label: "Confirm",
        onClick: onConfirm,
        width: "40%",
      });
    }

    buttons.push({
      label: "Close",
      onClick: closePopup,
      width: "40%",
    });

    return buttons;
  };

  return (
    <ContextPopupModal zIndex={zIndex} onClose={closePopup}>
      <PopupMainContainer $width="300px">
        {title}
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <LabelStyled>{description}</LabelStyled>
        <PopupButtons buttons={getButtons()} />
      </PopupMainContainer>
    </ContextPopupModal>
  );
};

export default InfoPopup;

const ErrorMessage = styled.p`
  width: 100%;
  font-size: 13px;
  color: red;
  text-align: center;
`;

const LabelStyled = styled.label`
  width: 100%;
  text-align: start;
  margin-top: 1rem;
  font-style: italic;
  text-align: center;
  margin: 2rem;
  margin-top: 3rem;
`;
