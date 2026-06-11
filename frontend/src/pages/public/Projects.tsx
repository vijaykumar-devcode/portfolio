
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useProjects } from '../../services/projectService.js';
import { Button } from '../../components/ui/Button.js';

const SkeletonCard = () => (
  <div className="bg-surface rounded-xl border border-border overflow-hidden animate-pulse">
    <div className="h-48 bg-border"></div>
    <div className="p-5">
      <div className="h-5 bg-border rounded mb-2"></div>
      <div className="h-4 bg-border rounded w-3/4 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-border rounded-full"></div>
        <div className="h-6 w-16 bg-border rounded-full"></div>
      </div>
    </div>
  </div>
);

export default function Projects() {
  const { data: projects, isLoading, isError } = useProjects();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-4xl font-bold text-text mb-2">Projects</h1>
        <p className="text-muted mb-12">A showcase of things I've built.</p>
      </motion.div>

      {isError && (
        <div className="text-center py-20">
          <p className="text-red-500 font-medium">Failed to load projects. Please try again.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : projects?.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface rounded-xl border border-border overflow-hidden group hover:shadow-lg hover:border-primary transition-all duration-300"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-text mb-1">{project.title}</h3>
                  <p className="text-muted text-sm mb-3 line-clamp-2">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Link to={`/projects/${project.slug}`}>
                      <Button size="sm" variant="primary" className="gap-1 cursor-pointer" >
                        Details <ArrowRight size={14} />
                      </Button>
                    </Link>
                    <div className="flex gap-3">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="text-muted hover:text-primary transition-colors">
                          <FaGithub size={18} />
                        </a>
                      )}
                      {project.liveDemo && (
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="text-muted hover:text-primary transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>

      {!isLoading && projects?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted">No projects found yet.</p>
        </div>
      )}
    </section>
  );
}
