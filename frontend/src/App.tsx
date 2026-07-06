import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from './lib/axios.js';

// Layouts
import { PublicLayout } from './components/common/PublicLayout.js';
import { AdminLayout } from './components/admin/AdminLayout.js';

// Public Pages (lazy loaded)
import Home from './pages/public/Home.js';
const ProjectDetail = React.lazy(() => import('./pages/public/ProjectDetail.js'));
const Blogs = React.lazy(() => import('./pages/public/Blogs.js'));
const BlogDetail = React.lazy(() => import('./pages/public/BlogDetail.js'));

// Admin Pages (lazy loaded)
const AdminLogin = React.lazy(() => import('./pages/admin/Login.js'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard.js'));
const AdminProjects = React.lazy(() => import('./pages/admin/AdminProjects.js'));
const AdminBlogs = React.lazy(() => import('./pages/admin/AdminBlogs.js'));
const AdminCertificates = React.lazy(() => import('./pages/admin/AdminCertificates.js'));
const AdminMessages = React.lazy(() => import('./pages/admin/AdminMessages.js'));
const AdminSkills = React.lazy(() => import('./pages/admin/AdminSkills.js'));
const AdminNotifications = React.lazy(() => import('./pages/admin/AdminNotifications.js'));

// Page transition wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }} 
    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
    exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }} 
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    api.get('/auth/me')
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return isAuth ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

function App() {
  const location = useLocation();

  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="projects/:slug" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
            <Route path="blogs" element={<PageWrapper><Blogs /></PageWrapper>} />
            <Route path="blogs/:slug" element={<PageWrapper><BlogDetail /></PageWrapper>} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="projects" element={<PageWrapper><AdminProjects /></PageWrapper>} />
            <Route path="blogs" element={<PageWrapper><AdminBlogs /></PageWrapper>} />
            <Route path="certificates" element={<PageWrapper><AdminCertificates /></PageWrapper>} />
            <Route path="messages" element={<PageWrapper><AdminMessages /></PageWrapper>} />
            <Route path="skills" element={<PageWrapper><AdminSkills /></PageWrapper>} />
            <Route path="notifications" element={<PageWrapper><AdminNotifications /></PageWrapper>} />
          </Route>

          {/* 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-background text-text">
              <span className="text-primary font-semibold tracking-widest uppercase mb-4">
                Error 404
              </span>

              <h1 className="text-7xl md:text-8xl font-black mb-4">
                Lost in the
                <span className="text-primary"> Code</span>
              </h1>

              <p className="max-w-md text-muted text-lg mb-8">
                The page you're looking for doesn't exist or may have been moved.
              </p>

              <div className="flex gap-4">
                <Link
                  to="/"
                  className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition inline-block"
                >
                  Back Home
                </Link>
              </div>

              <div className="mt-16 text-8xl font-black text-primary/10 select-none">
                404
              </div>
            </div>
          } />
        </Routes>
      </AnimatePresence>
    </React.Suspense>
  );
}

export default App;
