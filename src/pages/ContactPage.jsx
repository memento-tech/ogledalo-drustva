import styled from "styled-components";
import ContactUsForm from "../components/ContactUsForm";
import PageTemplate from "./PageTemplate";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import { useEffect } from "react";

const ContactPage = () => {
  useEffect(() => {
    logEvent(analytics, "page_view", {
      firebase_screen: "ContactPage",
    });
  }, []);

  return (
    <PageTemplate>
      <PageContainer>
        <Title>Kontaktirajte nas!</Title>
        <SubTitle>
          Imate pitanje, sugestiju ili želite da podelite svoje mišljenje?
        </SubTitle>
        <Text>
          Tu smo da vas saslušamo. Bilo da imate preporuku, komentar, želite da
          podelite priču, prijavite problem ili nas pohvalite – slobodno nam
          pišite putem formulara ispod.
        </Text>
        <Text>Odgovorićemo vam u najkraćem mogućem roku.</Text>
        <SubTitle>Hvala što ste deo Ogledala društva.</SubTitle>
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

const Title = styled.h1`
  margin-top: 2rem;
  font-size: ${(props) => props.theme.fonts.logo};
`;

const SubTitle = styled.h3`
  font-size: ${(props) => props.theme.fonts.title};
`;

const Text = styled.p`
  width: 600px;
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: ${(props) => props.theme.fonts.medium};

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 95%;
  }
`;
