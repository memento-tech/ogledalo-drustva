import styled from "styled-components";
import AdminPageTemplate from "./AdminPageTemplate";
import ButtonOutlined from "../../components/ButtonOutlined";

const AdminSettingsPage = () => {
  return (
    <AdminPageTemplate>
      <Container>
        <PartContainer>
          General Information
          <InputContainer>
            <Label>Catch Phrase:</Label>
            <InputStyled />
          </InputContainer>
          <ButtonOutlined>Save</ButtonOutlined>
        </PartContainer>
        <PartContainer>
          Contact information
          <InputContainer>
            <Label>Address:</Label>
            <InputStyled />
          </InputContainer>
          <InputContainer>
            <Label>Phone Number:</Label>
            <InputStyled />
          </InputContainer>
          <InputContainer>
            <Label>Email:</Label>
            <InputStyled />
          </InputContainer>
          <ButtonOutlined>Save</ButtonOutlined>
        </PartContainer>
        <PartContainer>
          Links Information
          <InputContainer>
            <Label>Facebook:</Label>
            <InputStyled />
          </InputContainer>
          <InputContainer>
            <Label>Instagram:</Label>
            <InputStyled />
          </InputContainer>
          <InputContainer>
            <Label>LinkedIn:</Label>
            <InputStyled />
          </InputContainer>
          <InputContainer>
            <Label>Twitter:</Label>
            <InputStyled />
          </InputContainer>
          <ButtonOutlined>Save</ButtonOutlined>
        </PartContainer>
      </Container>
    </AdminPageTemplate>
  );
};

export default AdminSettingsPage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  gap: 1rem;
  padding-bottom: 2rem;
  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    box-sizing: border-box;
    margin: 0;
    width: 100%;
    margin-top: 2rem;
    overflow: hidden;
  }
`;

const PartContainer = styled.div`
  width: 60%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    box-sizing: border-box;
    width: 90%;
    padding: 1rem 0;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    flex-direction: column;
  }
`;

const Label = styled.p`
  box-sizing: border-box;
  width: 20%;
  text-align: end;
  padding-left: 1rem;
  margin: 0;
  font-size: ${(props) => props.theme.fonts.small};

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 100%;
    text-align: start;
  }
`;

const InputStyled = styled.input`
  box-sizing: border-box;
  width: calc(80% - 1rem);
  color: ${(props) => props.theme.colors.textPrimary};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  outline: none;
  background-color: transparent;
  transition: border-color 0.3s ease;
  margin-left: 1rem;
  font-family: inherit;
  font-size: ${(props) => props.theme.fonts.small};
  transform: translateY(-3px);

  &:focus {
    border-color: rgba(36, 91, 150, 0.97);
  }

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: auto;
    margin-right: 1rem;
  }
`;
