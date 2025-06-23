import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Tooltip from "./Tooltip";

const ToolbarButtonWithTooltip = ({
  label,
  children,
  onClick,
  className,
  withBorder = true,
}) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (visible && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2 - 13,
        left: rect.right + 10,
      });
    }
  }, [visible]);

  return (
    <>
      <ButtonWrapper
        ref={ref}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={onClick}
        className={className}
        $withBorder={withBorder}
      >
        {children}
      </ButtonWrapper>
      <Tooltip visible={visible} position={position}>
        {label}
      </Tooltip>
    </>
  );
};

export default ToolbarButtonWithTooltip;

const ButtonWrapper = styled.button`
  position: relative;
  box-sizing: border-box;
  min-width: 1.5rem;
  min-height: 1.5rem;
  border-radius: 50%;
  background-color: #ffffff;
  border: ${(props) => (props.$withBorder ? "1px solid black" : "none")};
  text-decoration: none;
  padding: 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  &:hover > span {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) scale(1);
  }
`;
