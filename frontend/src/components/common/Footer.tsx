
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand & Bio */}
          <div className="md:col-span-6 lg:col-span-5">
            <Link to="/" className="text-2xl font-black tracking-tight text-text mb-4 inline-block hover:opacity-80 transition-opacity">
              Vijay Kumar
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-8 max-w-sm">
              A Computer Science Engineering student passionate about full-stack development, scalable web applications, and creating intuitive user experiences through modern technologies.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow">
                <FaLinkedin size={18} />
              </a>
              <a href="mailto:vijay230101150@gmail.com" aria-label="Send an email" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary hover:bg-primary/5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-3 lg:col-start-8">
            <h3 className="font-semibold text-text mb-5 text-sm tracking-wider uppercase opacity-80">Quick Links</h3>
            <ul className="space-y-3.5">
              <li><Link to="/projects" className="text-muted text-sm hover:text-primary hover:translate-x-1 inline-block transition-transform duration-200">Projects</Link></li>
              <li><Link to="/blogs" className="text-muted text-sm hover:text-primary hover:translate-x-1 inline-block transition-transform duration-200">Blogs</Link></li>
              <li><Link to="/certificates" className="text-muted text-sm hover:text-primary hover:translate-x-1 inline-block transition-transform duration-200">Certificates</Link></li>
              <li><Link to="/contact" className="text-muted text-sm hover:text-primary hover:translate-x-1 inline-block transition-transform duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Resources & Admin */}
          <div className="md:col-span-3 lg:col-span-2">
             <h3 className="font-semibold text-text mb-5 text-sm tracking-wider uppercase opacity-80">Resources</h3>
             <ul className="space-y-3.5">
               <li>
                 <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-muted text-sm hover:text-primary transition-colors">
                   Download CV
                 </a>
               </li>
               <li>
                 <Link to="/admin/login" className="inline-flex items-center gap-1.5 text-muted text-sm hover:text-primary transition-colors group">
                   <Lock size={14} className="group-hover:opacity-80 transition-opacity" /> Admin Login
                 </Link>
               </li>
             </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Vijay.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted">
            Built with <span className="text-red-200 animate-pulse">❤️</span> using the MERN stack
          </div>
        </div> */}
      </div>
    </footer>
  );
}
