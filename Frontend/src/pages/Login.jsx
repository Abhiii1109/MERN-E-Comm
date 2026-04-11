import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-[85vh] grid lg:grid-cols-2">
      {/* Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16">
        <Link to="/" className="text-2xl font-black tracking-tight mb-10">LUXE</Link>
        <h1 className="text-3xl font-black tracking-tight mb-2">Welcome back</h1>
        <p className="text-sm text-zinc-400 mb-10">Sign in to your account to continue shopping</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-md">
          <div>
            <label className="text-xs font-semibold text-zinc-500 mb-1.5 block">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="email" placeholder="hello@example.com" className={`w-full pl-10 pr-4 py-3 bg-zinc-50 border rounded-lg text-sm outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-zinc-200 focus:border-dark'}`}
                {...register('email', { required: 'Required', pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Invalid email' } })}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-zinc-500">Password</label>
              <a href="#" className="text-xs font-semibold text-primary">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••" className={`w-full pl-10 pr-10 py-3 bg-zinc-50 border rounded-lg text-sm outline-none transition-colors ${errors.password ? 'border-red-400' : 'border-zinc-200 focus:border-dark'}`}
                {...register('password', { required: 'Required', minLength: { value: 6, message: 'Min 6 chars' } })}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isLoading} className="py-3.5 bg-dark text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50">
            {isLoading ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-zinc-400 mt-8">Don't have an account? <Link to="/register" className="text-primary font-semibold">Create one</Link></p>
      </div>

      {/* Visual */}
      <div className="hidden lg:block relative">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Fashion" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-white/90 text-lg italic leading-relaxed">&ldquo;Style is a way to say who you are without having to speak.&rdquo;</p>
          <p className="text-primary-light text-sm font-semibold mt-3">— Rachel Zoe</p>
        </div>
      </div>
    </div>
  );
}
