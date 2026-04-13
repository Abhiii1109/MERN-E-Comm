import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, LogOut, Package } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';

const NAV_LINKS = [
  { label: 'NEW IN', to: '/shop/new' },
  { label: 'MEN', to: '/shop/men' },
  { label: 'WOMEN', to: '/shop/women' },
  { label: 'TRENDING', to: '/shop/trending' },
  { label: 'WINTER WEAR', to: '/shop/winter' },
  { label: 'ACCESSORIES', to: '/shop/accessories' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const userRef = useRef(null);

  const totalItems = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { user, logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); setUserMenuOpen(false); }, [location.pathname]);
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);
  useEffect(() => {
    const fn = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) { navigate(`/shop?search=${encodeURIComponent(query.trim())}`); setSearchOpen(false); setQuery(''); }
  };

  return (
    <>
      {/* Top strip */}
      <div className="bg-dark text-white text-center py-2 px-4 text-xs tracking-wide">
        🔥 <span className="font-bold text-primary-light">MEGA SALE LIVE</span> — Get Flat 50% OFF on 500+ Styles
        <span className="hidden sm:inline"> | Use Code: <span className="font-bold">LUXE50</span></span>
      </div>

      <nav className={`sticky top-0 z-50 bg-white border-b border-zinc-100 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="w-full px-4 lg:px-8">
          {/* Top row */}
          <div className="flex items-center h-16 gap-6">
            {/* Mobile menu */}
            <button className="lg:hidden p-2 -ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="shrink-0" id="nav-logo">
              <span className="text-2xl font-black tracking-tight text-dark">LUXE</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`px-3.5 py-2 text-[13px] font-bold tracking-wide rounded-md transition-colors
                    ${location.pathname === link.to ? 'text-primary bg-rose-50' : 'text-zinc-600 hover:text-dark hover:bg-zinc-50'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md ml-auto">
              <div className="relative w-full group">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search for t-shirts, jeans, dresses..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-full text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  id="nav-search"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto md:ml-4">
              <button className="md:hidden p-2.5 text-zinc-600" onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={20} />
              </button>

              <Link to="/wishlist" className="relative p-2.5 text-zinc-600 hover:text-primary transition-colors" id="nav-wishlist">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2.5 text-zinc-600 hover:text-primary transition-colors" id="nav-cart">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {isAuthenticated() ? (
                <div className="relative" ref={userRef}>
                  <button className="p-2.5 text-zinc-600 hover:text-primary transition-colors" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    <User size={20} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-zinc-100 rounded-xl shadow-2xl overflow-hidden animate-fade-up z-50">
                      <div className="flex items-center gap-3 p-4 border-b border-zinc-100">
                        <div className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
                        <div>
                          <p className="text-sm font-semibold truncate">{user?.name}</p>
                          <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
                        </div>
                      </div>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"><User size={16} /> My Profile</Link>
                      <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"><Package size={16} /> My Orders</Link>
                      {user?.isAdmin && (
                        <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-zinc-100">
                           <Package size={16} /> Admin Panel
                        </Link>
                      )}
                      <button onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-zinc-100"><LogOut size={16} /> Sign Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center gap-2 ml-2 px-5 py-2 bg-dark text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors" id="nav-login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden border-t border-zinc-100 p-3 animate-fade-up">
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-full px-4">
              <Search size={16} className="text-zinc-400" />
              <input ref={searchRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="flex-1 py-2.5 bg-transparent text-sm outline-none" />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-zinc-400"><X size={16} /></button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-[calc(64px+32px)] bg-white z-50 overflow-y-auto animate-fade-up lg:hidden">
          <div className="p-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)} className="py-4 text-base font-bold text-zinc-800 border-b border-zinc-100 hover:text-primary transition-colors">{link.label}</Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              {!isAuthenticated() ? (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="text-center py-3 bg-dark text-white font-semibold rounded-lg">Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="text-center py-3 border-2 border-zinc-200 font-semibold rounded-lg hover:border-dark transition-colors">Create Account</Link>
                </>
              ) : (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="py-3 text-zinc-600 font-medium">My Profile</Link>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="py-3 text-zinc-600 font-medium">My Orders</Link>
                  {user?.isAdmin && (
                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="py-3 text-red-600 font-bold">Admin Panel</Link>
                  )}
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="py-3 text-red-500 font-medium text-left">Sign Out</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
