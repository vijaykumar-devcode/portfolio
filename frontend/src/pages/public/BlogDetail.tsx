
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useBlog } from '../../services/blogService.js';
import { Button } from '../../components/ui/Button.js';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading, isError } = useBlog(slug || '');

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-8 bg-surface rounded w-2/3 mb-6"></div>
        <div className="h-52 bg-surface rounded-xl mb-8"></div>
        <div className="space-y-3">
          <div className="h-4 bg-surface rounded"></div>
          <div className="h-4 bg-surface rounded w-4/5"></div>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Blog post not found.</p>
        <Link to="/blogs"><Button variant="outline" className="mt-4">Back to Blogs</Button></Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <Link to="/blogs" className="inline-flex items-center gap-1 text-muted hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Blogs
      </Link>
      <h1 className="text-4xl font-bold text-text mb-4">{blog.title}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        {blog.tags.map((tag) => (
          <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"><Tag size={10} /> {tag}</span>
        ))}
      </div>
      <img src={blog.coverImage} alt={blog.title} className="w-full rounded-xl mb-8 object-cover max-h-72" />
      <div className="prose prose-lg dark:prose-invert max-w-none text-text leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
}
