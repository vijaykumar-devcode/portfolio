
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import { useBlogs } from '../../services/blogService.js';

export default function Blogs() {
  const { data: blogs, isLoading, isError } = useBlogs();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-text mb-2">Blog</h1>
        <p className="text-muted mb-12">Thoughts, guides, and learnings.</p>
      </motion.div>

      {isError && <p className="text-red-500">Failed to load blogs.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-surface rounded-xl border border-border overflow-hidden animate-pulse">
                <div className="h-40 bg-border" />
                <div className="p-5 space-y-2">
                  <div className="h-5 bg-border rounded" />
                  <div className="h-4 bg-border rounded w-2/3" />
                </div>
              </div>
            ))
          : blogs?.map((blog, i) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface rounded-xl border border-border overflow-hidden group hover:shadow-lg hover:border-primary transition-all duration-300"
              >
                <Link to={`/blogs/${blog.slug}`}>
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {blog.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full flex items-center gap-1">
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-text mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                    <p className="text-xs text-muted flex items-center gap-1">
                      <Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
      </div>

      {!isLoading && blogs?.length === 0 && (
        <div className="text-center py-20"><p className="text-muted">No blog posts found yet.</p></div>
      )}
    </section>
  );
}
