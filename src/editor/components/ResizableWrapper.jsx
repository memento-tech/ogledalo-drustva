import { NodeViewWrapper } from "@tiptap/react";
import styled from "styled-components";
import { useRef } from "react";
import ResizeIcon from "../../icons/ResizeIcon";

const ResizableWrapper = ({ node, updateAttributes, children }) => {
  const resizerRef = useRef(null);

  const startResize = (e, direction) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = resizerRef.current.offsetWidth;
    const startHeight = resizerRef.current.offsetHeight;

    const doDrag = (moveEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;

      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (direction.includes("right")) {
        newWidth = startWidth + dx;
      } else if (direction.includes("left")) {
        newWidth = startWidth - dx;
      }

      if (direction.includes("bottom")) {
        newHeight = startHeight + dy;
      } else if (direction.includes("top")) {
        newHeight = startHeight - dy;
      }

      updateAttributes({
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      });
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
      <ResizeContainer
        ref={resizerRef}
        $width={node.attrs.width}
        $height={node.attrs.height}
      >
        {children}

        <ResizeHandle
          position="top-left"
          cursor="nwse-resize"
          onMouseDown={(e) => startResize(e, "top-left")}
          style={{ rotate: "180deg" }}
        >
          <ResizeIcon height={20} />
        </ResizeHandle>

        <ResizeHandle
          position="top-right"
          cursor="nesw-resize"
          onMouseDown={(e) => startResize(e, "top-right")}
          style={{ rotate: "270deg" }}
        >
          <ResizeIcon height={20} />
        </ResizeHandle>

        <ResizeHandle
          position="bottom-left"
          cursor="nesw-resize"
          onMouseDown={(e) => startResize(e, "bottom-left")}
          style={{ rotate: "90deg" }}
        >
          <ResizeIcon height={20} />
        </ResizeHandle>

        <ResizeHandle
          position="bottom-right"
          cursor="nwse-resize"
          onMouseDown={(e) => startResize(e, "bottom-right")}
        >
          <ResizeIcon height={20} />
        </ResizeHandle>
      </ResizeContainer>
    </NodeViewWrapper>
  );
};

export default ResizableWrapper;

const ResizeContainer = styled.div`
  position: relative;
  width: ${({ $width }) => $width || "auto"};
  height: ${({ $height }) => $height || "auto"};
  max-width: 100%;
  display: inline-block;
`;

const positionMap = {
  "top-left": { top: "-7px", left: "-7px" },
  "top-right": { top: "-7px", right: "-7px" },
  "bottom-left": { bottom: "-7px", left: "-7px" },
  "bottom-right": { bottom: "-7px", right: "-7px" },
};

const ResizeHandle = styled.div.attrs(({ position }) => ({
  style: positionMap[position],
}))`
  position: absolute;
  cursor: ${({ cursor }) => cursor};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
