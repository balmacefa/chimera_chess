import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-text-main font-display antialiased">
      <header className="sticky top-0 z-50 w-full border-b border-border-dark bg-background-dark/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded bg-primary text-white">
                <span className="material-symbols-outlined text-xl">chess</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Chimera Chess</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Home</Link>
              <Link to="/variants" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Variants</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="hidden sm:inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-text-main hover:bg-surface-dark transition-colors">
                Log In
              </button>
              <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Outlet />
      </main>

      <footer className="border-t border-border-dark bg-background-dark py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">© 2026 Chimera Chess. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-primary transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
