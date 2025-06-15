import styled from "styled-components";
import ContactUsForm from "../components/ContactUsForm";

const ContactPage = () => {
  return (
    <PageContainer>
      <Title>Kontaktirajte nas!</Title>
      <Text>
        <b>Imate pitanje, sugestiju ili želite da podelite svoje mišljenje?</b>
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
  );
};

export default ContactPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h4`
  margin-top: 2rem;
  font-size: 20px;
`;

const Text = styled.p`
  width: 600px;
  margin: 0;
  margin-bottom: 0.5rem;
  text-align: center;
`;
