import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useProjects, useDeleteProject } from '../../services/projectService.js';
import { Button } from '../../components/ui/Button.js';
import { ProjectFormModal } from '../../components/admin/ProjectFormModal.js';
import type { Project } from '../../types/index.js';

export default function AdminProjects() {
  const { data: projects, isLoading } = useProjects();
  const { mutate: deleteProject } = useDeleteProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) deleteProject(id);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text">Projects</h1>
          <p className="text-muted mt-1">Manage your portfolio projects.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={handleAdd}>
          <Plus size={16} /> New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-surface rounded-xl border border-border animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {projects?.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4"
            >
              <img src={project.coverImage} alt={project.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text truncate">{project.title}</h3>
                <p className="text-sm text-muted truncate">{project.shortDescription}</p>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors">
                    <FaGithub size={16} />
                  </a>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors">
                    <ExternalLink size={16} />
                  </a>
                )}
                <Button size="sm" variant="ghost" className="gap-1 text-muted hover:text-primary" onClick={() => handleEdit(project)}>
                  <Pencil size={14} /> Edit
                </Button>
                <Button size="sm" variant="ghost" className="gap-1 text-muted hover:text-red-500" onClick={() => handleDelete(project._id)}>
                  <Trash2 size={14} /> Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && projects?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted mb-4">No projects yet.</p>
          <Button variant="primary" className="gap-2" onClick={handleAdd}><Plus size={16} /> Add Your First Project</Button>
        </div>
      )}

      <ProjectFormModal isOpen={isModalOpen} onClose={handleClose} project={editingProject} />
    </div>
  );
}
