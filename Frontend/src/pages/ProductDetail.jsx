import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingBag, Truck, ShieldCheck, RefreshCcw, Minus, Plus, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const MOCK = {
  _id: 'detail-1',
  name: 'Classic Denim Jacket',
  brand: 'Denim Co.',
  description: 'A timeless denim jacket crafted from premium 100% cotton denim. Features a classic collar, button-front closure, chest pockets, and side pockets. Perfect for layering in any season.',
  price: 3999,
  discountedPrice: 2499,
  rating: 4.7,
  numReviews: 1890,
  stock: 15,
  isNew: true,
  images: [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80',
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  features: ['100% Premium Cotton Denim', 'Classic Collar Design', 'Button-front Closure', 'Chest & Side Pockets', 'Machine Washable'],
};

const RELATED = Array.from({ length: 4 }, (_, i) => ({
  _id: `related-${i + 1}`,
  name: ['Slim Fit Chinos', 'Oversized Graphic Tee', 'Cargo Joggers', 'Linen Blend Shirt'][i],
  brand: ['Urban Edge', 'LUXE Originals', 'Street Style', 'LUXE Men'][i],
  price: [2499, 1499, 1999, 1899][i],
  discountedPrice: [1499, 799, 999, 1199][i],
  rating: [4.3, 4.5, 4.2, 4.1][i],
  numReviews: [612, 2840, 439, 340][i],
  stock: 10,
  images: [
    ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80'],
    ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80'],
    ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80'],
    ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80'],
  ][i],
}));

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('M');
  const [tab, setTab] = useState('desc');
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  const product = MOCK; // fallback
  const wishlisted = isWishlisted(product._id);
  const discount = Math.round(((product.price - product.discountedPrice) / product.price) * 100);

  const handleAdd = () => {
    addItem({ ...product, quantity: qty, selectedSize: size });
    toast.success(`Added to bag — Size ${size}`);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="px-6 lg:px-16 py-4 flex items-center gap-2 text-xs text-zinc-400 border-b border-zinc-100">
        <Link to="/" className="hover:text-dark transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-dark transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-zinc-700 font-medium">{product.name}</span>
      </div>

      {/* Main */}
      <div className="px-6 lg:px-16 py-10 grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Images */}
        <div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-100 mb-3">
            <img src={product.images[selectedImg]} alt={product.name} className="w-full h-full object-cover animate-fade-up" />
            {discount > 0 && <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-md">{discount}% OFF</span>}
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImg(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImg ? 'border-dark' : 'border-transparent hover:border-zinc-300'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-1">{product.brand}</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
              {product.rating} <Star size={10} fill="white" stroke="white" />
            </span>
            <span className="text-sm text-zinc-400">{product.numReviews.toLocaleString()} ratings</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-black">₹{product.discountedPrice?.toLocaleString('en-IN')}</span>
            <span className="text-lg text-zinc-400 line-through">₹{product.price?.toLocaleString('en-IN')}</span>
            <span className="text-sm font-bold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">{discount}% off</span>
          </div>

          <p className="text-xs font-semibold text-green-600 mb-6">Inclusive of all taxes</p>

          {/* Size */}
          <div className="mb-6">
            <p className="text-sm font-bold mb-3">Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`w-12 h-12 rounded-lg border-2 text-sm font-bold transition-colors
                    ${size === s ? 'border-dark bg-dark text-white' : 'border-zinc-200 text-zinc-600 hover:border-dark'}`}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="mb-6">
            <p className="text-sm font-bold mb-3">Quantity</p>
            <div className="inline-flex items-center border border-zinc-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50"><Minus size={14} /></button>
              <span className="w-12 text-center text-sm font-bold border-x border-zinc-200">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-zinc-50"><Plus size={14} /></button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mb-8">
            <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors">
              <ShoppingBag size={18} /> ADD TO BAG
            </button>
            <button onClick={() => { toggle(product); toast(wishlisted ? 'Removed' : 'Saved ❤️'); }}
              className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-colors ${wishlisted ? 'border-primary text-primary bg-rose-50' : 'border-zinc-200 text-zinc-400 hover:border-primary hover:text-primary'}`}
            ><Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} /></button>
            <button className="w-14 h-14 rounded-lg border-2 border-zinc-200 text-zinc-400 flex items-center justify-center hover:border-dark hover:text-dark transition-colors">
              <Share2 size={18} />
            </button>
          </div>

          {/* Trust */}
          <div className="flex flex-col gap-3 border-t border-zinc-100 pt-6">
            {[
              { icon: <Truck size={16} />, text: 'Free Delivery on orders above ₹999' },
              { icon: <ShieldCheck size={16} />, text: '100% Original Product Guarantee' },
              { icon: <RefreshCcw size={16} />, text: 'Easy 30-day return & exchange' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="text-green-500">{icon}</span> {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 lg:px-16 border-t border-zinc-100">
        <div className="flex border-b border-zinc-100">
          {[{ key: 'desc', label: 'Description' }, { key: 'features', label: 'Features' }, { key: 'reviews', label: `Reviews (${product.numReviews})` }].map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`py-4 px-6 text-sm font-semibold border-b-2 transition-colors ${tab === key ? 'border-dark text-dark' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}
            >{label}</button>
          ))}
        </div>
        <div className="py-8 max-w-3xl">
          {tab === 'desc' && <p className="text-sm text-zinc-600 leading-relaxed">{product.description}</p>}
          {tab === 'features' && (
            <ul className="flex flex-col gap-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-zinc-600"><span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> {f}</li>
              ))}
            </ul>
          )}
          {tab === 'reviews' && (
            <div className="flex flex-col gap-5">
              {[
                { name: 'Priya S.', rating: 5, text: 'Fits perfectly! The quality of denim is amazing for this price.', date: '2 weeks ago' },
                { name: 'Arjun P.', rating: 4, text: 'Great jacket but runs slightly large. I recommend sizing down.', date: '1 month ago' },
              ].map(({ name, rating, text, date }) => (
                <div key={name} className="bg-zinc-50 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">{name[0]}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{name}</p>
                      <div className="flex gap-0.5">{Array.from({ length: rating }).map((_, i) => <Star key={i} size={10} fill="#fbbf24" stroke="#fbbf24" />)}</div>
                    </div>
                    <span className="text-xs text-zinc-400">{date}</span>
                  </div>
                  <p className="text-sm text-zinc-600">{text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      <section className="py-16 px-6 lg:px-16 bg-zinc-50">
        <h2 className="text-2xl font-black tracking-tight mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {RELATED.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
