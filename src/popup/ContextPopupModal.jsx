import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../icons/CloseIcon";

function ContextPopupModal({
  closable = true,
  onClose = null,
  zIndex,
  children,
  height = undefined,
}) {
  const [isModalOpen, setModalOpen] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleEscKeyEvent = useCallback((event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyEvent, false);

    return () => {
      document.removeEventListener("keydown", handleEscKeyEvent, false);
    };
  }, [handleEscKeyEvent]);

  return (
    <StyledDialog
      ref={modalRef}
      style={{
        zIndex: zIndex,
        height: height ? height : "fit-content",
      }}
    >
      {closable && (
        <XCloseButton onClick={handleCloseModal}>
          <CloseIcon height={15} color={"black"} />
        </XCloseButton>
      )}
      <ContentContainer>{children}</ContentContainer>
    </StyledDialog>
  );
}

export default ContextPopupModal;

const StyledDialog = styled.dialog`
  text-align: center;

  border-radius: 10px;
  border: 0;
  box-shadow: 0 5px 30px 0 rgb(0 0 0 / 10%);

  background: ${(props) => props.theme.colors.white};

  animation: fadeIn 0.5s ease both;
  position: relative;
  overflow-y: scroll;
  max-height: 80%;

  &::backdrop {
    animation: fadeIn 0.5s ease both;
    background: ${(props) => props.theme.colors.backdrop};
    z-index: 2;
    backdrop-filter: blur(5px);
    transition: backdrop-filter 10s;
  }
`;

const XCloseButton = styled.button`
  float: right;
  scale: 1.5;
  position: absolute;
  right: 15px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    scale: 1.8;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
