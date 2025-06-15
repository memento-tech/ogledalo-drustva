import { useEffect } from "react";
import SendwichIcon from "./SendwichIcon";
import styled from "styled-components";
import { defaultTheme } from "../themes/DefaultTheme";

const NavMenu = ({ open, children, changeNavPopupOpen }) => {
  useEffect(() => {
    const handleWindowResize = () => {
      window.innerWidth > 800 && changeNavPopupOpen(false);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [changeNavPopupOpen]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);

  return (
    <>
      <SendwichIcon
        clicked={open}
        onClick={() => changeNavPopupOpen(!open)}
        color={defaultTheme.colors.primary}
      />
      {open && <NavPopup>{children}</NavPopup>}
      {open && <WholeScreenHolder onClick={() => changeNavPopupOpen(!open)} />}
    </>
  );
};

export default NavMenu;

const WholeScreenHolder = styled.div`
  position: fixed;
  top: 3rem;
  left: 0;
  height: calc(100vh - 3rem);
  width: 100vw;
  background-color: #43434333;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  pointer-events: auto;
`;

const NavPopup = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  left: 100%;
  top: 0;
  transform: translateX(-100%) translateY(3rem);
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: rgb(38, 57, 77, 0.9) 0px 20px 30px -10px;
  z-index: 1000;
  overflow-y: scroll;
`;
