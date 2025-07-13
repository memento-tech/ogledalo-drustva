import { NodeViewWrapper } from "@tiptap/react";
import styled from "styled-components";
import { useRef } from "react";

const ResizableWrapper = ({ node, updateAttributes, children }) => {
  const resizerRef = useRef(null);

  const startResize = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = resizerRef.current.offsetWidth;

    const doDrag = (moveEvent) => {
      const newWidth = startWidth + moveEvent.clientX - startX;
      updateAttributes({ width: `${newWidth}px` });
    };

    const stopDrag = () => {
      window.removeEventListener("mousemove", doDrag);
      window.removeEventListener("mouseup", stopDrag);
    };

    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  return (
    <NodeViewWrapper as="div">
      <ResizeContainer ref={resizerRef} $width={node.attrs.width}>
        {children}
        <ResizeHandle onMouseDown={startResize} />
      </ResizeContainer>
    </NodeViewWrapper>
  );
};

export default ResizableWrapper;

const ResizeContainer = styled.div`
  position: relative;
  width: ${({ $width }) => $width};
  max-width: 100%;
  display: inline-block;
`;

const ResizeHandle = styled.div`
  position: absolute;
  right: -5px;
  bottom: 10px;
  width: 10px;
  height: 10px;
  background: gray;
  cursor: ew-resize;
  border-radius: 50%;
`;
