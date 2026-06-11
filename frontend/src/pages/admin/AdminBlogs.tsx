import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useBlogs, useDeleteBlog, useUpdateBlog } from '../../services/blogService.js';
import { Button } from '../../components/ui/Button.js';
import { BlogFormModal } from '../../components/admin/BlogFormModal.js';
import type { Blog } from '../../types/index.js';

export default function AdminBlogs() {
  const { data: blogs, isLoading } = useBlogs();
  const { mutate: deleteBlog } = useDeleteBlog();
  const { mutate: updateBlog } = useUpdateBlog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) deleteBlog(id);
  };

  const togglePublish = (id: string, current: boolean) => updateBlog({ id, isPublished: !current });

  const handleEdit = (blog: Blog) => { setEditingBlog(blog); setIsModalOpen(true); };
  const handleAdd = () => { setEditingBlog(null); setIsModalOpen(true); };
  const handleClose = () => { setIsModalOpen(false); setEditingBlog(null); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text">Blog Posts</h1>
          <p className="text-muted mt-1">Create and manage your blog content.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={handleAdd}><Plus size={16} /> New Blog Post</Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-surface rounded-xl border border-border animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {blogs?.map((blog) => (
            <motion.div key={blog._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4">
              <img src={blog.coverImage} alt={blog.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text truncate">{blog.title}</h3>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{tag}</span>
                  ))}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${blog.isPublished ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="sm" variant="ghost" className="gap-1 text-muted hover:text-primary" onClick={() => togglePublish(blog._id, blog.isPublished)} title={blog.isPublished ? 'Unpublish' : 'Publish'}>
                  {blog.isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
                <Button size="sm" variant="ghost" className="gap-1 text-muted hover:text-primary" onClick={() => handleEdit(blog)}>
                  <Pencil size={14} /> Edit
                </Button>
                <Button size="sm" variant="ghost" className="gap-1 text-muted hover:text-red-500" onClick={() => handleDelete(blog._id)}>
                  <Trash2 size={14} /> Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && blogs?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted mb-4">No blog posts yet.</p>
          <Button variant="primary" className="gap-2" onClick={handleAdd}><Plus size={16} /> Write Your First Post</Button>
        </div>
      )}

      <BlogFormModal isOpen={isModalOpen} onClose={handleClose} blog={editingBlog} />
    </div>
  );
}
