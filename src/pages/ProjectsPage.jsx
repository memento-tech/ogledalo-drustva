import styled from "styled-components";
import { exampleNews } from "../assets/exampleData";
import OtherNews from "../components/OtherNews";
import ProjectsList from "../components/ProjectsList";
import PageTemplate from "./PageTemplate";

const projectsExample = [
  {
    title: "Test project title",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    img: "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png",
    contractor: "Opstina Arandjelovac",
  },
  {
    title: "Test project title",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    img: undefined,
    contractor: "Opstina Arandjelovac",
  },
  {
    title: "Test project title",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    img: "https://image-processor-storage.s3.us-west-2.amazonaws.com/images/866759932dc5358cee86f6552d1250f2/inside-bubble-spheres.jpg",
    contractor: "Opstina Arandjelovac",
  },
];

const ProjectsPage = () => {
  return (
    <PageTemplate>
      <ProjectsList projectsData={projectsExample} />
      <Divider />
      <OtherNewsTitle>Najnovije vesti</OtherNewsTitle>
      <OtherNews news={exampleNews} limit={3} />
    </PageTemplate>
  );
};

export default ProjectsPage;

const OtherNewsTitle = styled.h3`
  width: 100%;
  text-align: center;
  margin: 0;
`;

const Divider = styled.hr`
  margin: 3rem;

  height: 3px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(13, 8, 96, 1) 0%,
    #0a3b65 11%,
    #0691aa 31%,
    #03aac7 100%
  );
`;
