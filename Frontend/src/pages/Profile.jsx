import { useState } from 'react';
import { User, Mail, Phone, Edit3, Save, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateProfile } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });

  const handleSave = async () => {
    try { await updateProfile(form); } catch {}
    setEditing(false);
    toast.success('Profile updated!');
  };

  return (
    <div className="min-h-screen px-6 lg:px-16 py-10">
      <h1 className="text-3xl font-black tracking-tight mb-8">My Profile</h1>
      <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start">
        {/* Avatar */}
        <div className="bg-white border border-zinc-100 rounded-xl p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
          <h2 className="text-lg font-bold">{user?.name || 'User'}</h2>
          <p className="text-xs text-zinc-400 mt-1">{user?.email}</p>
          <span className="mt-3 px-3 py-1 bg-rose-50 text-primary text-[10px] font-bold tracking-wide uppercase rounded-full">Member</span>
        </div>

        {/* Info */}
        <div className="bg-white border border-zinc-100 rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Personal Information</h3>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-primary transition-colors"><Edit3 size={14} /> Edit</button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 bg-dark text-white text-xs font-bold rounded-lg"><Save size={12} /> Save</button>
                <button onClick={() => setEditing(false)} className="p-2 text-zinc-400 hover:text-red-500"><X size={16} /></button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            {[
              { icon: <User size={16} />, label: 'Full Name', key: 'name', type: 'text' },
              { icon: <Mail size={16} />, label: 'Email', key: 'email', type: 'email' },
              { icon: <Phone size={16} />, label: 'Phone', key: 'phone', type: 'tel' },
            ].map(({ icon, label, key, type }) => (
              <div key={key}>
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-zinc-400 uppercase mb-2">
                  <span className="text-primary">{icon}</span> {label}
                </div>
                {editing ? (
                  <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full py-3 px-4 bg-zinc-50 border border-zinc-200 rounded-lg text-sm outline-none focus:border-dark" />
                ) : (
                  <p className="text-base font-medium">{form[key] || '—'}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
