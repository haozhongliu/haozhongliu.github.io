import Image from "next/image";
import { Project } from "../modules/research";

export function ProjectCard({ project }: { project: Project }) {
  const body = (
    <div className="projectCard">
      <div className="projectImageContainer">
        <Image
          src={project.image}
          alt={project.title}
          width={240}
          height={160}
          className="projectImage"
        />
      </div>
      <div className="projectInfo">
        <h4 className="projectTitle">{project.title}</h4>
        <p className="projectDescription">{project.description}</p>
      </div>
    </div>
  );

  if (!project.url) {
    return body;
  }

  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="projectCardLink">
      {body}
    </a>
  );
}
