import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../icons/CloseIcon";

const PopupModal = ({
  isOpen,
  onClose,
  closable = true,
  maxWidth = -1,
  children,
  blur = false,
}) => {
  const [width, setWidth] = useState(maxWidth);
  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setWidth(maxWidth);
  }, [maxWidth]);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (modalRef.current) {
      if (modalOpen) {
        document.body.style.overflow = "hidden";
        modalRef.current.style.display = "flex";
      } else {
        document.body.style.overflow = "auto";
        modalRef.current.style.display = "none";
      }

      // modalRef.current.addEventListener
    }
  }, [modalOpen]);

  const handleClose = (e) => {
    if (onClose) {
      document.body.style.overflow = "auto";
      modalRef.current.style.display = "none";
      onClose(e);
    }
  };

  return (
    <Backdrop
      ref={modalRef}
      // @ts-ignore
      $blur={blur}
      onClick={handleClose}
    >
      <StyledModal
        // @ts-ignore
        $maxWidth={width}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            handleClose();
          }
        }}
      >
        {closable && (
          <CloseButton onClick={handleClose}>
            <CloseIcon color="black" lineWidth="2" />
          </CloseButton>
        )}
        <Content onClick={(event) => event.stopPropagation()}>
          {children}
        </Content>
      </StyledModal>
    </Backdrop>
  );
};

export default PopupModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: none; /* Modal will be hidden by default */
  justify-content: center;
  align-items: center;
  backdrop-filter: ${(props) =>
    // @ts-ignore
    props.$blur ? "blur(5px)" : "none"};
`;

const StyledModal = styled.div`
  background: white;
  position: relative;
  z-index: 1002;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  max-width: ${(props) => {
    // @ts-ignore
    return props.$maxWidth > 0 ? props.$maxWidth + "px" : "700px";
  }};
  width: 100%;
  overflow-y: scroll;
  max-height: 90vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    scale: 1.2;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
