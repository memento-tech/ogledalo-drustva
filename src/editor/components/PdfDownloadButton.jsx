import { useRef } from "react";
import generatePDF from "react-to-pdf";
import styled from "styled-components";
import DownloadIcon from "../../icons/DownloadIcon";

const PdfDownloadButton = ({ children }) => {
  const targetRef = useRef();

  const handleDownload = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    generatePDF(targetRef, {
      filename: "page.pdf",
      page: {
        margin: 20,
      },
    });
  };

  return (
    <Wrapper>
      <IconContainer onClick={handleDownload}>
        <DownloadIcon height={20} />
      </IconContainer>
      <PDFContent ref={targetRef}>{children}</PDFContent>
    </Wrapper>
  );
};

export default PdfDownloadButton;

const IconContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 10px;
  z-index: 100000;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const Wrapper = styled.div`
  height: 100%;
`;

const PDFContent = styled.div`
  background: white;
  color: black;
  line-height: 1.6;
  font-size: 16px;
  height: 100%;
`;
