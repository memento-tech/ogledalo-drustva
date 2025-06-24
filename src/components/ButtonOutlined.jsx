import styled from "styled-components";

const ButtonOutlined = styled.button`
  position: relative;
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.secondary};
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  padding: 2px 5px;
  transition: all 0.1s linear;
  font-weight: bold;
  min-width: 10rem;
  margin-top: 5px;
  cursor: pointer;

  a {
    text-decoration: none;
  }

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.white};
    transition: all 0.1s linear;

    &:disabled {
      color: ${(props) => props.theme.colors.primary};
      border-color: ${(props) => props.theme.colors.borderInactive};
      background: ${(props) => props.theme.colors.borderInactive};
      cursor: auto;
    }
  }

  &:disabled {
    color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.borderInactive};
    border-color: ${(props) => props.theme.colors.borderInactive};
    cursor: auto;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    font-size: ${(props) => props.theme.fonts.small};
  }
`;

export default ButtonOutlined;
