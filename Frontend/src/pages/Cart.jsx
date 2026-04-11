import { Link } from 'react-router-dom';
import { ShoppingBag, Minus, Plus, X, Trash2, Tag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, subtotal } = useCartStore();
  const sub = subtotal();
  const shipping = sub > 999 ? 0 : 99;
  const tax = Math.round(sub * 0.18);
  const total = sub + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6">
        <ShoppingBag size={56} strokeWidth={1} className="text-zinc-300" />
        <h2 className="text-2xl font-black">Your bag is empty</h2>
        <p className="text-sm text-zinc-400">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="px-8 py-3 bg-dark text-white text-sm font-bold rounded-full hover:bg-zinc-800 transition-colors">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 lg:px-16 py-10">
      <h1 className="text-3xl font-black tracking-tight mb-8">Shopping Bag <span className="text-zinc-400 font-medium text-lg">({items.length} items)</span></h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
        {/* Items */}
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item._id} className="flex gap-5 p-5 bg-white border border-zinc-100 rounded-xl hover:shadow-md transition-shadow">
              <Link to={`/product/${item._id}`} className="w-24 h-28 md:w-28 md:h-32 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                <img src={item.images?.[0] || `https://picsum.photos/seed/${item._id}/120/150`} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase">{item.brand}</p>
                    <Link to={`/product/${item._id}`} className="text-sm font-semibold hover:text-primary transition-colors">{item.name}</Link>
                    {item.selectedSize && <p className="text-xs text-zinc-400 mt-1">Size: {item.selectedSize}</p>}
                  </div>
                  <button onClick={() => removeItem(item._id)} className="p-1 text-zinc-300 hover:text-red-500 transition-colors self-start"><X size={18} /></button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="inline-flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-zinc-50"><Minus size={12} /></button>
                    <span className="w-10 text-center text-xs font-bold border-x border-zinc-200">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-zinc-50"><Plus size={12} /></button>
                  </div>
                  <p className="text-base font-bold">₹{((item.discountedPrice || item.price) * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white border border-zinc-100 rounded-xl p-6 lg:sticky lg:top-28">
          <h3 className="text-lg font-bold mb-5">Order Summary</h3>

          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-4 mb-5">
            <Tag size={14} className="text-zinc-400" />
            <input type="text" placeholder="Enter coupon code" className="flex-1 py-3 bg-transparent text-sm outline-none" />
            <button className="text-xs font-bold text-primary">Apply</button>
          </div>

          <div className="flex flex-col gap-3 text-sm mb-4">
            <div className="flex justify-between text-zinc-500"><span>Subtotal</span><span>₹{sub.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-zinc-500">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-zinc-500"><span>GST (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
            <div className="h-px bg-zinc-100 my-1" />
            <div className="flex justify-between text-lg font-black"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          </div>

          {shipping === 0 && (
            <p className="text-xs text-center text-green-600 bg-green-50 rounded-lg py-2.5 mb-4 font-semibold">🎉 You qualify for free shipping!</p>
          )}

          <Link to="/checkout" className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors">
            Proceed to Checkout <ArrowRight size={16} />
          </Link>

          <Link to="/shop" className="block text-center mt-4 text-xs text-zinc-400 hover:text-primary transition-colors">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
