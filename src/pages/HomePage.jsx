import styled from "styled-components";
import TopNewsCarousel from "../components/TopNewsCarousel";
import OtherNews from "../components/OtherNews";

const news = [
  {
    id: "1",
    img: "https://media.istockphoto.com/id/1389157460/photo/newspaper-and-digital-tablet-on-wooden-table.webp?s=1024x1024&w=is&k=20&c=P_V3EhDOn-jdB5cCA771B5lvW0XWQnsVuXBI2Ioyg_g=",
    topTitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    topDescription:
      "Dicta, vel. Aspernatur explicabo aliquid veritatis voluptates, blanditiis distinctio consequatur exercitationem ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: "2",
    img: "https://media.istockphoto.com/id/1413735503/photo/social-media-social-media-marketing-thailand-social-media-engagement-post-structure.webp?s=1024x1024&w=is&k=20&c=hoho5UxFMxRK4u2AmtYl2i-psyyZROlXRrqsGfx1LSw=",
    topTitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    topDescription:
      "Dicta, vel. Aspernatur explicabo aliquid veritatis voluptates, blanditiis distinctio consequatur exercitationem ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    topTitle:
      "Saepe tenetur corporis a laboriosam. Repudiandae, ducimus voluptatem.",
    topDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe tenetur corporis a laboriosam. Repudiandae, ducimus voluptatem similique cum optio, dicta alias quibusdam soluta aut est sit recusandae id ipsa repellendus!",
  },
  {
    id: "4",
    img: "https://png.pngtree.com/png-vector/20191121/ourmid/pngtree-blue-bird-vector-or-color-illustration-png-image_2013004.jpg",
    topTitle:
      "Optio, dicta alias quibusdam soluta aut est sit recusandae id ipsa repellendus.",
    topDescription:
      "Saepe tenetur corporis a laboriosam. Repudiandae, ducimus voluptatem similique cum optio, dicta alias quibusdam soluta aut est sit recusandae id ipsa repellendus! Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: "5",
    img: "https://media.istockphoto.com/id/1413735503/photo/social-media-social-media-marketing-thailand-social-media-engagement-post-structure.webp?s=1024x1024&w=is&k=20&c=hoho5UxFMxRK4u2AmtYl2i-psyyZROlXRrqsGfx1LSw=",
    topTitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    topDescription:
      "Dicta, vel. Aspernatur explicabo aliquid veritatis voluptates, blanditiis distinctio consequatur exercitationem ratione. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    topTitle:
      "Saepe tenetur corporis a laboriosam. Repudiandae, ducimus voluptatem.",
    topDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe tenetur corporis a laboriosam. Repudiandae, ducimus voluptatem similique cum optio, dicta alias quibusdam soluta aut est sit recusandae id ipsa repellendus!",
  },
  {
    id: "7",
    img: "https://png.pngtree.com/png-vector/20191121/ourmid/pngtree-blue-bird-vector-or-color-illustration-png-image_2013004.jpg",
    topTitle:
      "Optio, dicta alias quibusdam soluta aut est sit recusandae id ipsa repellendus.",
    topDescription:
      "Saepe tenetur corporis a laboriosam. Repudiandae, ducimus voluptatem similique cum optio, dicta alias quibusdam soluta aut est sit recusandae id ipsa repellendus! Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];
const HomePage = () => {
  return (
    <HomePageContainer>
      <TopNewsCarousel news={news} />
      <OtherNews news={news} />
    </HomePageContainer>
  );
};

export default HomePage;

const HomePageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
