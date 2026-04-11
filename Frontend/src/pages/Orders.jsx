import { useQuery } from '@tanstack/react-query';
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { api } from '../lib/api';

const MOCK_ORDERS = [
  { _id: 'ORD001', createdAt: '2026-03-28T10:00:00Z', status: 'delivered', totalAmount: 2499, items: [{ name: 'Classic Denim Jacket', quantity: 1, price: 2499, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&q=80' }] },
  { _id: 'ORD002', createdAt: '2026-04-01T14:30:00Z', status: 'shipped', totalAmount: 2498, items: [{ name: 'Oversized Graphic Tee', quantity: 2, price: 799, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&q=80' }, { name: 'Cargo Joggers', quantity: 1, price: 999, image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=80&q=80' }] },
  { _id: 'ORD003', createdAt: '2026-04-08T09:15:00Z', status: 'processing', totalAmount: 1999, items: [{ name: 'Floral Maxi Dress', quantity: 1, price: 1999, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=80&q=80' }] },
];

const STATUS = {
  processing: { icon: <Clock size={12} />, label: 'Processing', cls: 'text-amber-600 bg-amber-50 border-amber-200' },
  shipped: { icon: <Truck size={12} />, label: 'Shipped', cls: 'text-blue-600 bg-blue-50 border-blue-200' },
  delivered: { icon: <CheckCircle size={12} />, label: 'Delivered', cls: 'text-green-600 bg-green-50 border-green-200' },
  cancelled: { icon: <XCircle size={12} />, label: 'Cancelled', cls: 'text-red-600 bg-red-50 border-red-200' },
};

export default function Orders() {
  const { data } = useQuery({ queryKey: ['my-orders'], queryFn: () => api.get('/orders/my'), retry: false });
  const orders = data?.orders || MOCK_ORDERS;

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Package size={56} strokeWidth={1} className="text-zinc-300" />
        <h2 className="text-2xl font-black">No orders yet</h2>
        <p className="text-sm text-zinc-400">Your order history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 lg:px-16 py-10">
      <h1 className="text-3xl font-black tracking-tight mb-8">My Orders</h1>
      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const s = STATUS[order.status] || STATUS.processing;
          return (
            <div key={order._id} className="bg-white border border-zinc-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between p-5 border-b border-zinc-100">
                <div>
                  <p className="text-sm font-bold font-mono">#{order._id}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold ${s.cls}`}>{s.icon} {s.label}</span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover bg-zinc-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">₹{item.price?.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between px-5 py-3 bg-zinc-50 border-t border-zinc-100">
                <p className="text-sm text-zinc-500">Total: <span className="font-bold text-dark">₹{order.totalAmount?.toLocaleString('en-IN')}</span></p>
                {order.status === 'shipped' && <button className="px-5 py-2 bg-dark text-white text-xs font-bold rounded-full">Track</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
