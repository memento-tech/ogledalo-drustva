import styled from "styled-components";

export const PopupMainContainer = styled.div`
  width: ${(props) =>
    // @ts-ignore
    props.$width
      ? // @ts-ignore
        props.$width
      : "auto"};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
  height: 100%;
  padding-top: 1rem;
  position: relative;
`;
