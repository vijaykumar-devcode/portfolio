import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MDEditor from '@uiw/react-md-editor';
import { Modal } from '../../components/ui/Modal.js';
import { Button } from '../../components/ui/Button.js';
import { Input } from '../../components/ui/Input.js';
import { ImageUpload } from '../../components/ui/ImageUpload.js';
import { TagInput } from '../../components/ui/Badge.js';
import { useCreateBlog, useUpdateBlog } from '../../services/blogService.js';
import type { Blog } from '../../types/index.js';

const schema = z.object({
  title: z.string().min(2, 'Title required'),
  slug: z.string().min(2, 'Slug required').regex(/^[a-z0-9-]+$/, 'Slug: lowercase, numbers, hyphens only'),
  content: z.string().min(20, 'Content is required'),
  coverImage: z.string().min(1, 'Cover image required'),
  isPublished: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog?: Blog | null;
}

export function BlogFormModal({ isOpen, onClose, blog }: BlogFormModalProps) {
  const isEditing = !!blog;
  const [tags, setTags] = React.useState<string[]>([]);
  const { mutateAsync: createBlog, isPending: isCreating } = useCreateBlog();
  const { mutateAsync: updateBlog, isPending: isUpdating } = useUpdateBlog();
  const isPending = isCreating || isUpdating;

  const { register, handleSubmit, setValue, watch, reset, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { isPublished: false, content: '' },
  });

  const coverImage = watch('coverImage');
  const isPublished = watch('isPublished');

  useEffect(() => {
    if (blog) {
      reset({ title: blog.title, slug: blog.slug, content: blog.content, coverImage: blog.coverImage, isPublished: blog.isPublished });
      setTags(blog.tags);
    } else {
      reset({ isPublished: false });
      setTags([]);
    }
  }, [blog, reset]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      setValue('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  };

  const onSubmit = async (data: FormValues) => {
    const payload = { ...data, tags };
    try {
      if (isEditing && blog) {
        await updateBlog({ id: blog._id, ...payload });
      } else {
        await createBlog(payload);
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Blog Post' : 'New Blog Post'} size="xl">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text mb-1 block">Title *</label>
            <Input {...register('title', { onChange: handleTitleChange })} placeholder="My Blog Post Title" error={errors.title?.message} />
          </div>
          <div>
            <label className="text-sm font-medium text-text mb-1 block">Slug *</label>
            <Input {...register('slug')} placeholder="my-blog-post-title" error={errors.slug?.message} />
          </div>
        </div>

        <ImageUpload label="Cover Image *" value={coverImage} onChange={(url) => setValue('coverImage', url)} />
        {errors.coverImage && <p className="text-xs text-red-500">{errors.coverImage.message}</p>}

        <TagInput label="Tags" tags={tags} onChange={setTags} placeholder="React, TypeScript, Tutorial..." />

        <div>
          <label className="text-sm font-medium text-text mb-1 block">Content * (Markdown supported)</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <div data-color-mode="light" className="rounded-md border border-border overflow-hidden">
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  preview="edit"
                  height={400}
                />
              </div>
            )}
          />
          {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            onClick={() => setValue('isPublished', !isPublished)}
            className={`w-11 h-6 rounded-full transition-colors relative ${isPublished ? 'bg-primary' : 'bg-border'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${isPublished ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
          <span className="text-sm font-medium text-text">
            {isPublished ? 'Published (visible to public)' : 'Draft (private)'}
          </span>
        </label>

        <div className="flex justify-end gap-3 pt-2 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
