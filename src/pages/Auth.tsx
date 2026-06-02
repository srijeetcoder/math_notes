import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSignUp, setIsSignUp] = useState(() => {
    return !!(location.state as any)?.isSignUp;
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Find redirect path (default is dashboard /)
  const from = (location.state as any)?.from?.pathname || '/';

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    if (!email || !password) {
      setErrorMsg('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (isSignUp && !fullName) {
      setErrorMsg('Please enter your full name.');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // Sign Up Flow
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            // Direct redirect back for verification if needed
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) throw error;

        if (data.user) {
          if (data.session) {
            // Sign out immediately because signUp auto-logs the user in when email confirmation is disabled
            await supabase.auth.signOut();
            setSuccessMsg('Account created successfully! Please sign in with your credentials.');
          } else {
            // Email confirmation required
            setSuccessMsg('Registration successful! Please check your email inbox to confirm your account, then sign in.');
          }
          setIsSignUp(false);
          setPassword('');
          setFullName('');
        }
      } else {
        // Sign In Flow
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setSuccessMsg('Logged in successfully!');
        setTimeout(() => navigate(from, { replace: true }), 1500);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-8 animate-in fade-in duration-500">
      
      {/* Back button */}
      <button 
        onClick={() => navigate('/')}
        className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors self-start max-w-xs group text-sm cursor-pointer"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      {/* Auth Card Container */}
      <div className="w-full max-w-md bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden relative backdrop-blur-md">
        
        {/* Glow Effects */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 dark:bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/5 dark:bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="p-8 relative z-10">
          
          {/* Brand Logo Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center shadow-lg mb-3 shadow-indigo-600/5">
              <img src="/favicon.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 text-center">
              {isSignUp 
                ? 'Register to sync your progress and quizzes across devices.' 
                : 'Sign in to access your saved notes and statistics.'}
            </p>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start gap-3 text-sm animate-in slide-in-from-top-2 duration-300">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-start gap-3 text-sm animate-in slide-in-from-top-2 duration-300">
              <CheckCircle size={18} className="shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 dark:focus:border-violet-500 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 dark:focus:border-violet-500 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">Password</label>
                {!isSignUp && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setErrorMsg('');
                      setSuccessMsg('');
                      if (!email) {
                        setErrorMsg('Please enter your email first, then click forgot password.');
                        return;
                      }
                      setLoading(true);
                      supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: `${window.location.origin}/reset-password`,
                      }).then(({ error }) => {
                        setLoading(false);
                        if (error) {
                          setErrorMsg(error.message);
                        } else {
                          setSuccessMsg('Password reset link sent to your email.');
                        }
                      });
                    }}
                    className="text-xs font-semibold text-indigo-600 dark:text-violet-400 hover:underline cursor-pointer"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 dark:focus:border-violet-500 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white rounded-2xl font-semibold shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          {/* Toggle Footer */}
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 text-center">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="font-bold text-indigo-600 dark:text-violet-400 hover:underline cursor-pointer"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
