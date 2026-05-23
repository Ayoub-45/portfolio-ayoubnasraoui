import { getPayload } from 'payload';
import config from '@/payload.config';
import ProjectCard from './ProjectCard';
import FadeUp from "./FadeUp";

export default async function Projects() {
  // 1. Initialize the Payload querying engine
  const payload = await getPayload({ config });
  
  // 2. Fetch all project documents out of your container PostgreSQL instance
  const projectsData = await payload.find({ 
    collection: 'projects',
    sort: '-createdAt', // optional: sorts newest projects first
  });

  return (
    <section id="projects" className="px-8 md:px-16 py-24 max-w-6xl mx-auto">
      <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
        Work
      </p>
      <h2
        className="font-serif mb-12"
        style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400 }}
      >
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projectsData.docs.map((project, i) => (
        <FadeUp key={project.id} delay={i * 100}>
          <ProjectCard project={project} />
        </FadeUp>
      ))}
      </div>
    </section>
  );
}