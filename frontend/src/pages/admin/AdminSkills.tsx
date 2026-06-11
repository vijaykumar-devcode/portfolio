import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAdminSkills, useCreateSkill, useUpdateSkill, useDeleteSkill, useToggleSkillVisibility, type Skill } from '../../services/skillService.js';
import { Button } from '../../components/ui/Button.js';
import { Input } from '../../components/ui/Input.js';
import { Modal } from '../../components/ui/Modal.js';

const skillSchema = z.object({
  category: z.string().min(2, 'Category must be at least 2 characters'),
  icon: z.string().min(1, 'Icon identifier is required'),
  color: z.string().min(1, 'Color classes are required'),
  items: z.string().min(1, 'At least one item is required (comma separated)'),
  isVisible: z.boolean(),
});

type SkillFormData = z.infer<typeof skillSchema>;

export default function AdminSkills() {
  const { data: skills, isLoading } = useAdminSkills();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();
  const toggleVisibility = useToggleSkillVisibility();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
  });

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setValue('category', skill.category);
      setValue('icon', skill.icon);
      setValue('color', skill.color);
      setValue('items', skill.items.join(', '));
      setValue('isVisible', skill.isVisible);
    } else {
      setEditingSkill(null);
      reset({ isVisible: true });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
    reset();
  };

  const onSubmit = async (data: SkillFormData) => {
    const formattedData = {
      ...data,
      items: data.items.split(',').map(item => item.trim()).filter(Boolean),
    };

    if (editingSkill) {
      await updateSkill.mutateAsync({ id: editingSkill._id, data: formattedData });
    } else {
      await createSkill.mutateAsync(formattedData);
    }
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill category?')) {
      await deleteSkill.mutateAsync(id);
    }
  };

  const handleToggleVisibility = async (id: string) => {
    await toggleVisibility.mutateAsync(id);
  };

  if (isLoading) return <div>Loading skills...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text">Skills</h1>
          <p className="text-sm text-muted">Manage your technical skills and tech stack</p>
        </div>
        <Button onClick={() => openModal()} className="gap-2">
          <Plus size={16} /> Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills?.map((skill) => (
          <div
            key={skill._id}
            className={`bg-surface border ${skill.isVisible ? 'border-border' : 'border-red-500/30 opacity-75'} rounded-2xl p-6 relative group`}
          >
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleToggleVisibility(skill._id)}
                className="p-1.5 bg-background text-text rounded-md hover:bg-border transition-colors"
                title={skill.isVisible ? "Hide Skill" : "Show Skill"}
              >
                {skill.isVisible ? <Eye size={16} /> : <EyeOff size={16} className="text-red-500" />}
              </button>
              <button
                onClick={() => openModal(skill)}
                className="p-1.5 bg-background text-blue-500 rounded-md hover:bg-border transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(skill._id)}
                className="p-1.5 bg-background text-red-500 rounded-md hover:bg-border transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mb-4">
              <span className="text-xs font-medium px-2 py-1 bg-background rounded border border-border">
                Icon: {skill.icon}
              </span>
            </div>
            <h3 className="font-semibold text-text mb-3">{skill.category} {!skill.isVisible && <span className="text-xs text-red-500 ml-2">(Hidden)</span>}</h3>
            <div className="flex flex-wrap gap-1.5">
              {skill.items.map((item) => (
                <span key={item} className="text-xs px-2 py-1 bg-background border border-border rounded-md text-muted">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingSkill ? 'Edit Skill' : 'Add Skill'} size="md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Category Name *</label>
            <Input {...register('category')} placeholder="e.g. Frontend" error={errors.category?.message} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text mb-1">Icon Identifier *</label>
            <Input {...register('icon')} placeholder="e.g. Code2, Server, Database" error={errors.icon?.message} />
            <p className="text-xs text-muted mt-1">Available icons: Code2, Palette, Server, Database, GitBranch, Wrench, Network, Smartphone</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Color Classes (Tailwind) *</label>
            <Input {...register('color')} placeholder="e.g. bg-blue-500/10 text-blue-500" error={errors.color?.message} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Tech Stack (comma separated) *</label>
            <textarea
              {...register('items')}
              rows={3}
              placeholder="React, TypeScript, Tailwind CSS"
              className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            {errors.items && <p className="mt-1 text-xs text-red-500">{errors.items.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="isVisible" {...register('isVisible')} className="rounded border-border bg-background text-primary focus:ring-primary" />
            <label htmlFor="isVisible" className="text-sm font-medium text-text">Visible to public</label>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={createSkill.isPending || updateSkill.isPending}>
              {editingSkill ? 'Update Skill' : 'Create Skill'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
