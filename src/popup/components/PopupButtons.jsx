import ButtonOutlined from "../../components/ButtonOutlined";

const { default: styled } = require("styled-components");

const PopupButtons = ({ width = "100%", buttons }) => {
  return (
    <Container style={{ width: width }}>
      {buttons.map((button, index) => (
        <ButtonOutlined
          index={index}
          onClick={button.onClick}
          style={{ minWidth: button.width ? button.width : "" }}
          disabled={button.disabled ? "true" : ""}
        >
          {button.label}
        </ButtonOutlined>
      ))}
    </Container>
  );
};

export default PopupButtons;

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
