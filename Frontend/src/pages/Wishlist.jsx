import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { items, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const moveToCart = (p) => { addItem(p); toggle(p); toast.success('Moved to bag!'); };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6">
        <Heart size={56} strokeWidth={1} className="text-zinc-300" />
        <h2 className="text-2xl font-black">Your wishlist is empty</h2>
        <p className="text-sm text-zinc-400">Save items you love and come back to them anytime.</p>
        <Link to="/shop" className="px-8 py-3 bg-dark text-white text-sm font-bold rounded-full">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 lg:px-16 py-10">
      <h1 className="text-3xl font-black tracking-tight mb-8">Wishlist <span className="text-zinc-400 font-medium text-lg">({items.length})</span></h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {items.map((p) => (
          <div key={p._id} className="group bg-white border border-zinc-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <Link to={`/product/${p._id}`} className="block aspect-[3/4] overflow-hidden bg-zinc-100">
              <img src={p.images?.[0] || `https://picsum.photos/seed/${p._id}/300/400`} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </Link>
            <div className="p-4">
              <p className="text-sm font-bold truncate">{p.brand}</p>
              <p className="text-xs text-zinc-500 truncate mt-0.5">{p.name}</p>
              <p className="text-base font-bold mt-2">₹{(p.discountedPrice || p.price)?.toLocaleString('en-IN')}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => moveToCart(p)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-dark text-white text-xs font-bold rounded-lg hover:bg-primary transition-colors">
                  <ShoppingBag size={13} /> Move to Bag
                </button>
                <button onClick={() => toggle(p)} className="w-10 h-10 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
