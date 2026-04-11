import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCcw, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';

const MOCK_PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
  _id: `mock-${i + 1}`,
  name: ['Oversized Graphic Tee', 'Slim Fit Chinos', 'Floral Maxi Dress', 'Classic Denim Jacket', 'Cargo Joggers', 'Cropped Hoodie', 'Pleated Midi Skirt', 'Linen Blend Shirt'][i],
  brand: ['LUXE Originals', 'Urban Edge', 'LUXE Women', 'Denim Co.', 'Street Style', 'LUXE Active', 'LUXE Women', 'LUXE Men'][i],
  price: [1499, 2499, 3499, 3999, 1999, 2299, 2799, 1899][i],
  discountedPrice: [799, 1499, 1999, 2499, 999, null, 1699, 1199][i],
  rating: [4.5, 4.3, 4.8, 4.7, 4.2, 4.6, 4.4, 4.1][i],
  numReviews: [2840, 612, 5210, 1890, 439, 3120, 892, 340][i],
  isNew: i < 2,
  stock: i === 5 ? 0 : 10,
  category: ['men', 'men', 'women', 'men', 'men', 'women', 'women', 'men'][i],
  images: [
    [`https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80`],
    [`https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80`],
    [`https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80`],
    [`https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80`],
    [`https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80`],
    [`https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80`],
    [`https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80`],
    [`https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80`],
  ][i],
}));

const CATEGORIES = [
  { name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80', slug: 'tshirts' },
  { name: 'Jeans', img: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=300&q=80', slug: 'jeans' },
  { name: 'Dresses', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80', slug: 'dresses' },
  { name: 'Jackets', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80', slug: 'jackets' },
  { name: 'Hoodies', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&q=80', slug: 'hoodies' },
  { name: 'Activewear', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80', slug: 'activewear' },
];

export default function Home() {
  const { data } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => api.get('/products?featured=true&limit=8'),
    retry: false,
  });
  const products = data?.products || MOCK_PRODUCTS;

  return (
    <>
      {/* Hero — full width */}
      <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="Fashion collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative h-full flex items-center px-6 lg:px-16">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6">
              <Zap size={12} /> NEW COLLECTION 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Your Style.<br />
              <span className="text-primary-light">Your Story.</span>
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-md leading-relaxed">
              Discover clothing that speaks your language. Premium fabrics, bold designs, unbeatable prices.
            </p>
            <div className="flex gap-4 mt-8">
              <Link to="/shop/men" className="px-8 py-3.5 bg-white text-dark text-sm font-bold rounded-full hover:bg-zinc-100 transition-colors">
                SHOP MEN
              </Link>
              <Link to="/shop/women" className="px-8 py-3.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary-dark transition-colors">
                SHOP WOMEN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="bg-dark text-white py-3 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex gap-12 shrink-0 items-center text-xs font-semibold tracking-widest uppercase">
              <span>Free Delivery above ₹999</span> <span className="text-primary">★</span>
              <span>100% Original Products</span> <span className="text-primary">★</span>
              <span>Easy 30 Day Returns</span> <span className="text-primary">★</span>
              <span>COD Available</span> <span className="text-primary">★</span>
              <span>Flat 50% Off on First Order</span> <span className="text-primary">★</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="py-16 px-6 lg:px-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-2">Browse</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Shop by Category</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-bold text-zinc-500 hover:text-primary transition-colors">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(({ name, img, slug }) => (
            <Link key={slug} to={`/shop/${slug}`} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-100">
              <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-bold">{name}</p>
                <p className="text-white/60 text-xs mt-0.5 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ArrowRight size={12} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sale Banner */}
      <section className="px-6 lg:px-16 pb-16">
        <div className="relative grid md:grid-cols-2 items-center bg-zinc-950 rounded-2xl overflow-hidden min-h-[360px]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="p-10 lg:p-16 relative z-10">
            <span className="inline-block px-4 py-1.5 bg-primary text-white text-[11px] font-bold tracking-widest rounded-full mb-4">⚡ LIMITED TIME</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Up to<br /><span className="text-primary">70% OFF</span>
            </h2>
            <p className="text-zinc-400 mt-4 text-sm leading-relaxed max-w-sm">
              Don't miss our biggest sale. 500+ styles at prices you won't believe. Hurry, stock is limited!
            </p>
            <Link to="/shop?sale=true" className="inline-flex items-center gap-2 mt-6 px-7 py-3 bg-white text-dark text-sm font-bold rounded-full hover:bg-zinc-100 transition-colors">
              Shop the Sale <ArrowRight size={16} />
            </Link>
          </div>
          <div className="hidden md:block relative h-full">
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80" alt="Sale" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 px-6 lg:px-16 bg-zinc-50">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-2 flex items-center gap-1.5">
              <TrendingUp size={14} /> Trending Now
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Best Sellers</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-bold text-zinc-500 hover:text-primary transition-colors">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-16 px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          {[
            { icon: <Truck size={28} />, title: 'Free Shipping', desc: 'On all orders above ₹999' },
            { icon: <ShieldCheck size={28} />, title: '100% Authentic', desc: 'Genuine products guaranteed' },
            { icon: <RefreshCcw size={28} />, title: 'Easy Returns', desc: '30-day hassle-free returns' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-primary flex items-center justify-center">{icon}</div>
              <h3 className="text-sm font-bold">{title}</h3>
              <p className="text-xs text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 lg:px-16 bg-zinc-50">
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-2">Reviews</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">What Our Customers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Priya S.', text: 'The quality is INSANE for the price. Ordered 3 t-shirts and they fit perfectly. Will buy again 100%!', rating: 5, img: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'Rahul M.', text: "Best online clothing store I've tried. The denim jacket I got looks exactly like the photos. Delivery was fast too!", rating: 5, img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { name: 'Ananya K.', text: 'Love the variety! Returns were super smooth. Customer support helped me find the right size instantly.', rating: 4, img: 'https://randomuser.me/api/portraits/women/68.jpg' },
          ].map(({ name, text, rating, img }) => (
            <div key={name} className="bg-white border border-zinc-100 rounded-xl p-7 hover:shadow-lg transition-shadow duration-300">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, i) => <Star key={i} size={14} fill="#fbbf24" stroke="#fbbf24" />)}
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6">&ldquo;{text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold">{name}</p>
                  <p className="text-xs text-green-600 font-semibold">Verified Buyer ✓</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
