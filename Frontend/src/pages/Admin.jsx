import { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', brand: '', price: '', discountedPrice: '',
    category: '', stock: '', description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        discountedPrice: form.discountedPrice ? Number(form.discountedPrice) : undefined,
        stock: Number(form.stock),
      };
      
      await api.post('/products', payload);
      toast.success('Product created successfully!');
      setForm({ name: '', brand: '', price: '', discountedPrice: '', category: '', stock: '', description: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] px-6 lg:px-16 py-10 bg-zinc-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Package className="text-primary" size={28} />
          <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
        </div>

        <div className="bg-white border border-zinc-100 rounded-xl p-8 shadow-sm">
          <h2 className="text-lg font-bold mb-6 border-b pb-4">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Product Name *</label>
                <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark" />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Brand *</label>
                <input required type="text" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Category *</label>
                <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark">
                  <option value="">Select...</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="new">New</option>
                  <option value="tshirts">T-Shirts</option>
                  <option value="jeans">Jeans</option>
                  <option value="jackets">Jackets</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Price (₹) *</label>
                <input required type="number" min="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark" />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Discount Price (₹)</label>
                <input type="number" min="0" value={form.discountedPrice} onChange={e => setForm({...form, discountedPrice: e.target.value})} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Stock Quantity *</label>
              <input required type="number" min="0" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full xl:w-1/3 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark" />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Description</label>
              <textarea rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark" />
            </div>

            <button type="submit" disabled={loading} className="mt-4 px-8 py-3.5 bg-dark text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Plus size={18} /> Create Product</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
