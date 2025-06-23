import { createPortal } from "react-dom";
import styled from "styled-components";

const Tooltip = ({ children, position = { top: 0, left: 0 }, visible }) => {
  if (!visible) return null;

  return createPortal(
    <TooltipBox style={{ top: position.top, left: position.left }}>
      {children}
    </TooltipBox>,
    document.body
  );
};

export default Tooltip;

const TooltipBox = styled.div`
  position: absolute;
  background-color: #464646;
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 9999;
  pointer-events: none;
`;
