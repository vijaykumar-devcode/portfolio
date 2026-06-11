
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';

export function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text transition-colors duration-300 pt-16">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
