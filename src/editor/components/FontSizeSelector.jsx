import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const fontSizes = ["10", "12", "14", "16", "18"];

const FontSizeSelector = ({ editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState("16");
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editor]);

  useEffect(() => {
    if (editor) {
      const activeSize = editor.getAttributes("fontSize").size;
      if (activeSize) {
        setCurrentSize(activeSize.replace("px", ""));
      } else {
        setCurrentSize("16");
      }
    }
  }, [editor?.state]);

  const handleFontSizeChange = (size) => {
    editor.chain().focus().setFontSize(`${size}px`).run();
    setCurrentSize(size);
    setIsOpen(false);
  };

  if (!editor) return null;

  return (
    <DropdownWrapper ref={dropdownRef}>
      <TriggerButton onClick={() => setIsOpen((prev) => !prev)}>
        <div>{currentSize}</div>
      </TriggerButton>
      {isOpen && (
        <DropdownList>
          {fontSizes.map((size) => (
            <DropdownItem key={size} onClick={() => handleFontSizeChange(size)}>
              {size}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default FontSizeSelector;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TriggerButton = styled.div`
  box-sizing: border-box;
  min-width: 1.5rem;
  min-height: 1.5rem;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid black;
  text-decoration: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 110%;
  left: -1px;
  background-color: #eeeeee;
  border: 1px solid black;
  border-radius: 5px;
  z-index: 10;
  width: 25px;
`;

const DropdownItem = styled.div`
  padding: 4px 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
