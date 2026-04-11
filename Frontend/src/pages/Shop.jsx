import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { api } from '../lib/api';
import ProductCard from '../components/ProductCard';

const ALL_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  _id: `shop-${i + 1}`,
  name: ['Oversized Graphic Tee', 'Slim Fit Chinos', 'Floral Maxi Dress', 'Classic Denim Jacket', 'Cargo Joggers', 'Cropped Hoodie', 'Pleated Midi Skirt', 'Linen Blend Shirt', 'Ribbed Tank Top', 'Wide-leg Trousers', 'Bomber Jacket', 'Knit Sweater'][i],
  brand: ['LUXE Originals', 'Urban Edge', 'LUXE Women', 'Denim Co.', 'Street Style', 'LUXE Active', 'LUXE Women', 'LUXE Men', 'Basics', 'LUXE Women', 'Street Style', 'Winter Co.'][i],
  price: [1499, 2499, 3499, 3999, 1999, 2299, 2799, 1899, 799, 2999, 4499, 2699][i],
  discountedPrice: [799, 1499, 1999, 2499, 999, null, 1699, 1199, 499, null, 2999, 1799][i],
  rating: [4.5, 4.3, 4.8, 4.7, 4.2, 4.6, 4.4, 4.1, 4.0, 4.5, 4.8, 4.3][i],
  numReviews: [2840, 612, 5210, 1890, 439, 3120, 892, 340, 1200, 780, 2100, 560][i],
  isNew: i < 3,
  stock: i === 5 ? 0 : 10,
  category: ['men', 'men', 'women', 'men', 'men', 'women', 'women', 'men', 'women', 'women', 'men', 'men'][i],
  images: [
    ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80'],
    ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80'],
    ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80'],
    ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80'],
    ['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80'],
    ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80'],
    ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80'],
    ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80'],
    ['https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&q=80'],
    ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80'],
    ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80'],
    ['https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80'],
  ][i],
}));

const CATS = [
  { label: 'All', value: '' },
  { label: 'Men', value: 'men' },
  { label: 'Women', value: 'women' },
  { label: 'New In', value: 'new' },
  { label: 'T-Shirts', value: 'tshirts' },
  { label: 'Jeans', value: 'jeans' },
  { label: 'Jackets', value: 'jackets' },
];

export default function Shop() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCat, setSelectedCat] = useState(category || '');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const { data } = useQuery({
    queryKey: ['products', selectedCat, sort, search],
    queryFn: () => api.get(`/products?category=${selectedCat}&sort=${sort}&search=${search}`),
    retry: false,
  });

  const products = useMemo(() => {
    let list = data?.products || ALL_PRODUCTS;
    if (selectedCat === 'new') list = list.filter(p => p.isNew);
    else if (selectedCat) list = list.filter(p => p.category === selectedCat);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    list = list.filter(p => (p.discountedPrice || p.price) >= priceRange[0] && (p.discountedPrice || p.price) <= priceRange[1]);
    if (sort === 'price-asc') list = [...list].sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
    if (sort === 'price-desc') list = [...list].sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [data, selectedCat, sort, search, priceRange]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-zinc-50 border-b border-zinc-100 px-6 lg:px-16 py-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
          {selectedCat ? CATS.find(c => c.value === selectedCat)?.label || 'Shop' : 'All Products'}
        </h1>
        <p className="text-sm text-zinc-400">{products.length} products found</p>
      </div>

      {/* Filters bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-zinc-100 px-6 lg:px-16 py-3 flex items-center gap-3 overflow-x-auto">
        {/* Category pills */}
        {CATS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setSelectedCat(value)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-colors border
              ${selectedCat === value ? 'bg-dark text-white border-dark' : 'bg-white text-zinc-600 border-zinc-200 hover:border-dark hover:text-dark'}`}
          >
            {label}
          </button>
        ))}

        <div className="w-px h-6 bg-zinc-200 mx-2 hidden md:block" />

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-full px-3 ml-auto">
          <Search size={14} className="text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-transparent py-2 text-xs outline-none w-40"
          />
          {search && <button onClick={() => setSearch('')}><X size={12} className="text-zinc-400" /></button>}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="hidden md:block py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-full text-xs font-medium text-zinc-600 outline-none cursor-pointer"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Products */}
      <div className="px-6 lg:px-16 py-10">
        {products.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <span className="text-5xl">👀</span>
            <h3 className="text-xl font-bold">No products found</h3>
            <p className="text-sm text-zinc-400">Try changing your filters or search term</p>
            <button onClick={() => { setSelectedCat(''); setSearch(''); }} className="px-6 py-2.5 bg-dark text-white text-sm font-bold rounded-full">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
