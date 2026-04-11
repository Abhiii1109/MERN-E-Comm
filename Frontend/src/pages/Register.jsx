import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, User, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuthStore();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success('Account created! Welcome to LUXE!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[85vh] grid lg:grid-cols-2">
      {/* Visual */}
      <div className="hidden lg:block relative">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" alt="Fashion" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-white/90 text-lg italic leading-relaxed">&ldquo;Fashion is the armor to survive the reality of everyday life.&rdquo;</p>
          <p className="text-primary-light text-sm font-semibold mt-3">— Bill Cunningham</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16">
        <Link to="/" className="text-2xl font-black tracking-tight mb-10">LUXE</Link>
        <h1 className="text-3xl font-black tracking-tight mb-2">Create Account</h1>
        <p className="text-sm text-zinc-400 mb-10">Join LUXE and start shopping</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-md">
          <div>
            <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="text" placeholder="John Doe" className={`w-full pl-10 pr-4 py-3 bg-zinc-50 border rounded-lg text-sm outline-none transition-colors ${errors.name ? 'border-red-400' : 'border-zinc-200 focus:border-dark'}`}
                {...register('name', { required: 'Required', minLength: { value: 2, message: 'Too short' } })} />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="email" placeholder="hello@example.com" className={`w-full pl-10 pr-4 py-3 bg-zinc-50 border rounded-lg text-sm outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-zinc-200 focus:border-dark'}`}
                {...register('email', { required: 'Required', pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Invalid email' } })} />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters" className={`w-full pl-10 pr-10 py-3 bg-zinc-50 border rounded-lg text-sm outline-none transition-colors ${errors.password ? 'border-red-400' : 'border-zinc-200 focus:border-dark'}`}
                {...register('password', { required: 'Required', minLength: { value: 6, message: 'Min 6 chars' } })} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type={showPass ? 'text' : 'password'} placeholder="Re-enter password" className={`w-full pl-10 pr-4 py-3 bg-zinc-50 border rounded-lg text-sm outline-none transition-colors ${errors.confirm ? 'border-red-400' : 'border-zinc-200 focus:border-dark'}`}
                {...register('confirm', { required: 'Required', validate: (v) => v === password || 'Passwords do not match' })} />
            </div>
            {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm.message}</p>}
          </div>

          <button type="submit" disabled={isLoading} className="py-3.5 bg-dark text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50">
            {isLoading ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-zinc-400 mt-8">Already have an account? <Link to="/login" className="text-primary font-semibold">Sign In</Link></p>
      </div>
    </div>
  );
}
