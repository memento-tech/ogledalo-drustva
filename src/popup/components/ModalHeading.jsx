const { default: styled } = require("styled-components");

const ModalHeading = styled.h3`
  font-size: ${(props) => props.theme.fonts.large};
  font-weight: ${(props) => props.theme.fonts.inBetween};
  margin-bottom: 1rem;
`;

export default ModalHeading;
