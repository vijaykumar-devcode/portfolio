
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';
import { AnimatedBackground } from './AnimatedBackground.js';

export function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen text-text transition-colors duration-300 pt-16 relative">
      <AnimatedBackground />
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
