import styled from "styled-components";
import ContactUsForm from "../components/ContactUsForm";
import PageTemplate from "./PageTemplate";

const ContactPage = () => {
  return (
    <PageTemplate>
      <PageContainer>
        <Title>Kontaktirajte nas!</Title>
        <Text>
          <b>
            Imate pitanje, sugestiju ili želite da podelite svoje mišljenje?
          </b>
        </Text>
        <Text>
          Tu smo da vas saslušamo. Bilo da imate preporuku, komentar, želite da
          podelite priču, prijavite problem ili nas pohvalite – slobodno nam
          pišite putem formulara ispod.
        </Text>
        <Text>Odgovorićemo vam u najkraćem mogućem roku.</Text>
        <Text>
          Hvala što ste deo <b>Ogledala društva.</b>
        </Text>
        <ContactUsForm />
      </PageContainer>
    </PageTemplate>
  );
};

export default ContactPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const Title = styled.h3`
  margin-top: 2rem;
`;

const Text = styled.p`
  width: 600px;
  margin: 0;
  margin-bottom: 0.5rem;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 95%;
  }
`;
