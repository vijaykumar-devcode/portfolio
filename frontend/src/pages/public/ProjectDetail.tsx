
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useProject } from '../../services/projectService.js';
import { Button } from '../../components/ui/Button.js';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, isError } = useProject(slug || '');

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-8 bg-surface rounded w-1/3 mb-8"></div>
        <div className="h-64 bg-surface rounded-xl mb-8"></div>
        <div className="space-y-3">
          <div className="h-4 bg-surface rounded"></div>
          <div className="h-4 bg-surface rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Project not found.</p>
        <Link to="/projects"><Button variant="outline" className="mt-4">Back to Projects</Button></Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link to="/projects" className="inline-flex items-center gap-1 text-muted hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <h1 className="text-4xl font-bold text-text mb-4">{project.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">{tech}</span>
        ))}
      </div>

      <img src={project.coverImage} alt={project.title} className="w-full rounded-xl mb-8 object-cover max-h-96" />

      <div className="flex gap-4 mb-8">
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2"><FaGithub size={16}/> GitHub</Button>
          </a>
        )}
        {project.liveDemo && (
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" className="gap-2"><ExternalLink size={16}/> Live Demo</Button>
          </a>
        )}
      </div>

      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-text mb-3">About the Project</h2>
        <p className="text-muted leading-relaxed mb-6">{project.fullDescription}</p>

        {project.features.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-text mb-3">Features</h2>
            <ul className="space-y-2 mb-6">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-muted">
                  <span className="text-primary mt-1">✓</span> {f}
                </li>
              ))}
            </ul>
          </>
        )}

        {project.challenges && (
          <>
            <h2 className="text-2xl font-bold text-text mb-3">Challenges</h2>
            <p className="text-muted leading-relaxed mb-6">{project.challenges}</p>
          </>
        )}

        {project.learnings && (
          <>
            <h2 className="text-2xl font-bold text-text mb-3">Learnings</h2>
            <p className="text-muted leading-relaxed mb-6">{project.learnings}</p>
          </>
        )}

        {project.screenshots.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-text mb-4">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.screenshots.map((s, i) => (
                <img key={i} src={s} alt={`Screenshot ${i + 1}`} className="rounded-lg w-full object-cover" />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
