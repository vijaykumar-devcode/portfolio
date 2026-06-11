import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../components/ui/Modal.js';
import { Button } from '../../components/ui/Button.js';
import { Input } from '../../components/ui/Input.js';
import { ImageUpload } from '../../components/ui/ImageUpload.js';
import { TagInput } from '../../components/ui/Badge.js';
import { useCreateProject, useUpdateProject } from '../../services/projectService.js';
import type { Project } from '../../types/index.js';

const schema = z.object({
  title: z.string().min(2, 'Title required'),
  slug: z.string().min(2, 'Slug required').regex(/^[a-z0-9-]+$/, 'Slug: lowercase, numbers, hyphens only'),
  shortDescription: z.string().min(10, 'Short description required'),
  fullDescription: z.string().min(20, 'Full description required'),
  coverImage: z.string().min(1, 'Cover image required'),
  githubLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  liveDemo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  challenges: z.string().optional(),
  learnings: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
}

export function ProjectFormModal({ isOpen, onClose, project }: ProjectFormModalProps) {
  const isEditing = !!project;
  const [techStack, setTechStack] = React.useState<string[]>([]);
  const [features, setFeatures] = React.useState<string[]>([]);

  const { mutateAsync: createProject, isPending: isCreating } = useCreateProject();
  const { mutateAsync: updateProject, isPending: isUpdating } = useUpdateProject();
  const isPending = isCreating || isUpdating;

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const coverImage = watch('coverImage');

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        coverImage: project.coverImage,
        githubLink: project.githubLink || '',
        liveDemo: project.liveDemo || '',
        challenges: project.challenges || '',
        learnings: project.learnings || '',
      });
      setTechStack(project.techStack);
      setFeatures(project.features);
    } else {
      reset({});
      setTechStack([]);
      setFeatures([]);
    }
  }, [project, reset]);

  const onSubmit = async (data: FormValues) => {
    const payload = { ...data, techStack, features };
    try {
      if (isEditing && project) {
        await updateProject({ id: project._id, ...payload });
      } else {
        await createProject(payload);
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isEditing) {
      setValue('slug', value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Project' : 'New Project'} size="xl">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text mb-1 block">Title *</label>
            <Input {...register('title', { onChange: handleTitleChange })} placeholder="My Awesome Project" error={errors.title?.message} />
          </div>
          <div>
            <label className="text-sm font-medium text-text mb-1 block">Slug *</label>
            <Input {...register('slug')} placeholder="my-awesome-project" error={errors.slug?.message} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1 block">Short Description *</label>
          <Input {...register('shortDescription')} placeholder="A brief one-liner for the project card" error={errors.shortDescription?.message} />
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1 block">Full Description *</label>
          <textarea
            {...register('fullDescription')}
            rows={4}
            placeholder="Detailed explanation of the project..."
            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          />
          {errors.fullDescription && <p className="mt-1 text-xs text-red-500">{errors.fullDescription.message}</p>}
        </div>

        <ImageUpload
          label="Cover Image *"
          value={coverImage}
          onChange={(url) => setValue('coverImage', url)}
        />
        {errors.coverImage && <p className="text-xs text-red-500">{errors.coverImage.message}</p>}

        <TagInput label="Tech Stack" tags={techStack} onChange={setTechStack} placeholder="React, Node.js, MongoDB..." />
        <TagInput label="Features" tags={features} onChange={setFeatures} placeholder="User authentication, Real-time updates..." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text mb-1 block">GitHub Link</label>
            <Input {...register('githubLink')} placeholder="https://github.com/..." error={errors.githubLink?.message} />
          </div>
          <div>
            <label className="text-sm font-medium text-text mb-1 block">Live Demo</label>
            <Input {...register('liveDemo')} placeholder="https://yourproject.com" error={errors.liveDemo?.message} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1 block">Challenges</label>
          <textarea
            {...register('challenges')}
            rows={2}
            placeholder="What challenges did you face?"
            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1 block">Learnings</label>
          <textarea
            {...register('learnings')}
            rows={2}
            placeholder="What did you learn from this project?"
            className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
