
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, BookOpen, Award, MessageSquare, Bell, LogOut, Code2 } from 'lucide-react';
import { cn } from '../ui/Button.js';
import api from '../../lib/axios.js';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
  { icon: BookOpen, label: 'Blogs', path: '/admin/blogs' },
  { icon: Award, label: 'Certificates', path: '/admin/certificates' },
  { icon: Code2, label: 'Skills', path: '/admin/skills' },
  { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post('/auth/logout');
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-surface border-r border-border flex flex-col fixed">
      <div className="p-6 border-b border-border">
        <Link to="/" className="text-xl font-bold text-primary">VIjay Kumar</Link>
        <p className="text-xs text-muted mt-1">Admin Dashboard</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              location.pathname === path
                ? 'bg-primary/10 text-primary'
                : 'text-muted hover:bg-background hover:text-text'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-background hover:text-red-500 transition-colors w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
