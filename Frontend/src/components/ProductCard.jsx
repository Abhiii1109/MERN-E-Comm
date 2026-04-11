import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const [loaded, setLoaded] = useState(false);
  const [adding, setAdding] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product._id);

  const discount = product.price && product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;
  const displayPrice = product.discountedPrice || product.price;

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem(product);
    toast.success('Added to bag!');
    setTimeout(() => setAdding(false), 800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    toast(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist ❤️');
  };

  return (
    <div className="group relative">
      {/* Image */}
      <Link to={`/product/${product._id}`} className="block relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-100">
        {!loaded && <div className="absolute inset-0 bg-zinc-100 animate-pulse" />}
        <img
          src={product.images?.[0] || `https://picsum.photos/seed/${product._id}/400/530`}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isNew && <span className="px-2.5 py-1 bg-dark text-white text-[10px] font-bold tracking-wider rounded-sm">NEW</span>}
          {discount > 0 && <span className="px-2.5 py-1 bg-primary text-white text-[10px] font-bold tracking-wider rounded-sm">{discount}% OFF</span>}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-zinc-100 transition-all hover:scale-110 ${wishlisted ? 'text-primary' : 'text-zinc-400 hover:text-primary'}`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Sold out */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="px-6 py-2 bg-dark text-white text-xs font-bold tracking-widest">SOLD OUT</span>
          </div>
        )}

        {/* Quick Add */}
        {product.stock > 0 && (
          <button
            onClick={handleCart}
            className={`absolute bottom-0 left-0 right-0 py-3 text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2
              ${adding ? 'bg-green-500 text-white translate-y-0' : 'bg-dark/90 text-white translate-y-full group-hover:translate-y-0'}`}
          >
            <ShoppingBag size={14} />
            {adding ? 'ADDED ✓' : 'ADD TO BAG'}
          </button>
        )}
      </Link>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <Link to={`/product/${product._id}`}>
          {product.brand && <p className="text-sm font-bold text-zinc-900 truncate">{product.brand}</p>}
          <p className="text-[13px] text-zinc-500 truncate mt-0.5 group-hover:text-zinc-700 transition-colors">{product.name}</p>
        </Link>

        {product.rating != null && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="inline-flex items-center gap-1 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {product.rating} <Star size={8} fill="white" stroke="white" />
            </span>
            <span className="text-[11px] text-zinc-400">{product.numReviews || 0}</span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-zinc-900">₹{displayPrice?.toLocaleString('en-IN')}</span>
          {discount > 0 && (
            <>
              <span className="text-sm text-zinc-400 line-through">₹{product.price?.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold text-primary">{discount}% off</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
