import { useEffect, useState } from "react";
import styled from "styled-components";

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
const ProjectsList = ({ projectsData, presentational = false }) => {
  const [projects, setProjects] = useState(projectsData);

  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  if (projects && projects.length > 0) {
    return (
      <ProjectsContainer $presentational={presentational}>
        {projects &&
          projects.map((projectData, index) => (
            <ProjectCard key={index}>
              {projectData.img && <ProjectImage src={projectData.img} />}
              <h4>{projectData.title}</h4>
              <p>{projectData.description}</p>
              {projectData.projectDonator && (
                <ContractorText>
                  Donator:
                  <br />
                  {projectData.projectDonator}
                </ContractorText>
              )}
            </ProjectCard>
          ))}
      </ProjectsContainer>
    );
  }

  return <></>;
};

export default ProjectsList;

const ProjectsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$presentational ? "1fr" : "1fr 1fr 1fr"};
  grid-gap: 1rem;
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  padding: 4px;
  border: 1px solid ${(props) => props.theme.colors.borderInactive};
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProjectImage = styled.img`
  position: absolute;
  width: calc(100% - 15px);
  height: calc(100% - 15px);
  object-fit: cover;
  object-position: center;
  opacity: 0.19;
  border-radius: 10px;
`;

const ContractorText = styled.p`
  color: #525252;
  font-style: italic;
`;
