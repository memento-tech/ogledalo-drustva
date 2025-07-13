import styled from "styled-components";
import coverImage from "../assets/cover-image.webp";
import logoLarge from "../assets/logo-512.png";
import founterImage from "../assets/founder-image.webp";
import PageTemplate from "./PageTemplate";
import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import { useEffect } from "react";

const AboutUsPage = () => {
  useEffect(() => {
    logEvent(analytics, "page_view", {
      firebase_screen: "AboutUsPage",
    });
  }, []);

  return (
    <PageTemplate>
      <LogoAndNameContainer>
        <Logo src={logoLarge} />
        Ogledalo Drustva
      </LogoAndNameContainer>
      <AboutUsContainer>
        <TextContainer>
          <Title>O nama...</Title>
          <Text>
            Veb portal Ogledalo društva kreiran je 2025 godine. Na portalu
            možete pročitati važne informacije koje se tiču društveno osetljivih
            grupa, socijalno-ekonomske kao i informacije iz oblasti kulture i
            turizma.
          </Text>
          <Text>
            Ideja o nastanku portala javila se ranijih godina, ali je tek sada
            ugledala svetlo dana, zahvaljujući podsticajnim sredstvima za
            samozapošljavanje koje dodeljuje NSZ.
          </Text>
          <Text>
            Osnovni kriterijum prilikom kreiranja sadržaja biće{" "}
            <b>nepristrasno i profesionalno informisanje.</b>
          </Text>
        </TextContainer>
        <AboutUsImage src={coverImage} />
      </AboutUsContainer>
      <FounterContainer>
        <FounderImage src={founterImage} />
        <TextContainer>
          <Title>Osnivač</Title>
          <Text>
            Snežana Žarković Dražić, diplomirani sociolog i osnivač portala
            Ogledalo društva, rođena je 1987.godine u Aleksandrovcu.
          </Text>
          <Text>
            Nakon sticanja diplome Filozofskog fakulteta u Nišu 2010-e godine,
            počinje sa radom u humanitarnoj organizaciji UG „Deca u srcu“ iz
            Aranđelovca, gde kroz realizaciju brojnih projekata i direktan rad
            sa korisnicima doprinosi boljem razumevanju osoba sa invaliditetom.
          </Text>
          <Text>
            Pored rada u Udruženju „Deca u srcu“ koji i dalje traje, svoje radno
            iskustvo upotupinila je radom u Centru za socijalni rad „Sava Ilić“
            iz Aranđelovca kroz rad na projketu „Dnevni boravak za decu sa
            smetnjama u razvoju“, zatim radom u Republičkom fondu za penzijsko i
            invalidsko osiguranje, kao i radom na loklanoj televiziji RTV
            Šumadija. Snežana se zalaže da problemi socijalno osetljivih grupa
            postanu vidljivi kako bi ih lakše prebrodili, kao i da invaliditet
            koji nije uvek vidljiv golim okom postane razumljiviji okolini, a
            sve u cilju razbijanja predrasuda i sprečavanja etiketiranja.
          </Text>
          <Text>
            Snežana Žarković Dražić, vođena idejom da o problemima treba
            govoriti javno i bez straha, napisala je tekst „MS i ja - put
            prihvatanja“, po kom je ove godine adaptirana predstava sa
            istoimenim nazivom.
          </Text>
        </TextContainer>
      </FounterContainer>
    </PageTemplate>
  );
};

export default AboutUsPage;

const LogoAndNameContainer = styled.div`
  width: 100%;
  font-size: ${(props) => props.theme.fonts.logo};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 2rem 0;
  font-weight: 600;
`;

const Logo = styled.img`
  width: 350px;

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 200px;
  }
`;

const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3rem;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 100%;
  }
`;

const Title = styled.h3`
  font-style: italic;
  font-weight: 400;
  margin-top: 0;
`;

const Text = styled.p`
  padding: 0;
  margin: 0.5rem 0;
`;

const AboutUsImage = styled.img`
  width: 60%;
  border-radius: 10px;
  margin-left: 1rem;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    width: 100%;
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: ${(props) => props.theme.screen.medium}) {
    width: 80%;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.cardBackground};
  box-sizing: border-box;
  padding: 10px;
`;

const FounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    flex-direction: column;
  }
`;

const FounderImage = styled.img`
  max-width: 270px;
  border-radius: 10px;
  margin-right: 1rem;

  @media screen and (max-width: ${(props) => props.theme.screen.small}) {
    margin: 0;
    margin-bottom: 1rem;
  }
`;
