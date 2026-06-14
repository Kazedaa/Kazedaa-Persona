import { projects } from "./data/portfolioData";
import P5CardGridPage from "./P5CardGridPage";

export default function ProjectsPage() {
  return (
    <P5CardGridPage 
      title="PROJECTS"
      items={projects}
      cardLinkText="VIEW >"
      modalLinkText="VIEW PROJECT >"
    />
  );
}
