import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-[120px] md:text-[180px] font-black leading-none bg-gradient-to-br from-primary to-amber-500 bg-clip-text text-transparent">404</h1>
        <p className="text-2xl font-black mt-2 mb-3">Page not found</p>
        <p className="text-sm text-zinc-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="px-8 py-3 bg-dark text-white text-sm font-bold rounded-full hover:bg-zinc-800 transition-colors">Back to Home</Link>
      </div>
    </div>
  );
}
