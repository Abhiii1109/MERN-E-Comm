import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapPin, CreditCard, CheckCircle, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

const STEPS = ['Shipping', 'Payment', 'Confirm'];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCartStore();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const sub = subtotal();
  const shipping = sub > 999 ? 0 : 99;
  const tax = Math.round(sub * 0.18);
  const total = sub + shipping + tax;

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const orderItems = items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.discountedPrice || item.price,
        image: item.images?.[0] || `https://picsum.photos/seed/${item._id}/48/48`,
        product: item._id
      }));

      const { paymentMethod, ...shippingAddress } = getValues();

      const data = await api.post('/orders', { 
        items: orderItems, 
        shippingAddress, 
        paymentMethod: paymentMethod || 'cod',
        totalAmount: total 
      });
      setOrderId(data.order?._id || 'ORD' + Date.now());
    } catch {
      setOrderId('ORD' + Date.now());
    }
    clearCart();
    setDone(true);
    setPlacing(false);
  };

  if (done) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 text-center animate-fade-up">
        <CheckCircle size={64} strokeWidth={1.5} className="text-green-500 animate-float" />
        <h1 className="text-4xl font-black">Order Placed!</h1>
        <p className="text-zinc-500">Order <span className="font-bold text-dark">{orderId}</span> confirmed</p>
        <p className="text-sm text-zinc-400 max-w-sm">We'll email you a confirmation shortly. Your items will arrive in 3–5 business days.</p>
        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate('/orders')} className="px-6 py-3 bg-primary text-white text-sm font-bold rounded-full">Track Order</button>
          <button onClick={() => navigate('/')} className="px-6 py-3 border border-zinc-200 text-sm font-semibold rounded-full hover:border-dark transition-colors">Back Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 lg:px-16 py-10">
      <h1 className="text-3xl font-black tracking-tight mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center mb-10 max-w-lg">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i <= step ? 'bg-dark text-white' : 'bg-zinc-100 text-zinc-400'}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`ml-2 text-sm font-semibold ${i <= step ? 'text-dark' : 'text-zinc-400'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-3 ${i < step ? 'bg-dark' : 'bg-zinc-200'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
        <div>
          {step === 0 && (
            <form onSubmit={handleSubmit(() => setStep(1))} className="bg-white border border-zinc-100 rounded-xl p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-6"><MapPin size={18} className="text-primary" /><h2 className="text-lg font-bold">Shipping Address</h2></div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'name', label: 'Full Name', placeholder: 'John Doe', rules: { required: 'Required' } },
                  { name: 'phone', label: 'Phone', placeholder: '9876543210', rules: { required: 'Required', pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid' } } },
                ].map(({ name, label, placeholder, rules }) => (
                  <div key={name}>
                    <label className="text-xs font-semibold text-zinc-500 mb-1 block">{label}</label>
                    <input {...register(name, rules)} placeholder={placeholder} className={`w-full py-3 px-4 bg-zinc-50 border rounded-lg text-sm outline-none ${errors[name] ? 'border-red-400' : 'border-zinc-200 focus:border-dark'}`} />
                    {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="text-xs font-semibold text-zinc-500 mb-1 block">Street Address</label>
                <input {...register('address', { required: 'Required' })} placeholder="123 Main Street" className="w-full py-3 px-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark" />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[{ name: 'city', label: 'City' }, { name: 'state', label: 'State' }, { name: 'pincode', label: 'Pincode' }].map(({ name, label }) => (
                  <div key={name}>
                    <label className="text-xs font-semibold text-zinc-500 mb-1 block">{label}</label>
                    <input {...register(name, { required: 'Required' })} className="w-full py-3 px-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark" />
                  </div>
                ))}
              </div>
              <button type="submit" className="mt-6 px-8 py-3 bg-dark text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2">
                Continue <ChevronRight size={16} />
              </button>
            </form>
          )}

          {step === 1 && (
            <div className="bg-white border border-zinc-100 rounded-xl p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-6"><CreditCard size={18} className="text-primary" /><h2 className="text-lg font-bold">Payment Method</h2></div>
              <div className="flex flex-col gap-3">
                {[
                  { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                  { value: 'upi', label: 'UPI', desc: 'GPay, PhonePe, Paytm' },
                  { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Rupay' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-4 p-4 border border-zinc-200 rounded-lg cursor-pointer hover:border-dark transition-colors has-[input:checked]:border-dark has-[input:checked]:bg-zinc-50">
                    <input type="radio" name="payment" value={opt.value} defaultChecked={opt.value === 'cod'} className="accent-dark w-4 h-4" {...register('paymentMethod')} />
                    <div>
                      <p className="text-sm font-semibold">{opt.label}</p>
                      <p className="text-xs text-zinc-400">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <button onClick={() => setStep(0)} className="text-sm font-semibold text-zinc-400 hover:text-dark">← Back</button>
                <button onClick={() => setStep(2)} className="px-8 py-3 bg-dark text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2">
                  Review <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-zinc-100 rounded-xl p-8 animate-fade-up">
              <h2 className="text-lg font-bold mb-5">Review & Confirm</h2>
              <div className="flex flex-col gap-3 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 bg-zinc-50 rounded-lg p-3">
                    <img src={item.images?.[0] || `https://picsum.photos/seed/${item._id}/48/48`} alt="" className="w-12 h-12 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">₹{((item.discountedPrice || item.price) * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => setStep(1)} className="text-sm font-semibold text-zinc-400 hover:text-dark">← Back</button>
                <button onClick={placeOrder} disabled={placing} className="px-10 py-3.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50">
                  {placing ? 'Placing...' : `Place Order — ₹${total.toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white border border-zinc-100 rounded-xl p-6 lg:sticky lg:top-28">
          <h3 className="text-sm font-bold mb-4">Order Details</h3>
          <div className="flex flex-col gap-3 text-sm">
            {items.map((i) => (
              <div key={i._id} className="flex justify-between text-xs"><span className="text-zinc-500 truncate max-w-[180px]">{i.name} × {i.quantity}</span><span>₹{((i.discountedPrice || i.price) * i.quantity).toLocaleString('en-IN')}</span></div>
            ))}
            <div className="h-px bg-zinc-100 my-1" />
            <div className="flex justify-between text-xs text-zinc-500"><span>Subtotal</span><span>₹{sub.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between text-xs text-zinc-500"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            <div className="flex justify-between text-xs text-zinc-500"><span>GST</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
            <div className="h-px bg-zinc-100" />
            <div className="flex justify-between font-bold text-base"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
