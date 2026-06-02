import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { DarkModeToggle } from '../components/DarkModeToggle';
import { syllabus } from '../data/syllabus';
import { 
  GraduationCap, 
  BrainCircuit, 
  Calculator, 
  Cloud, 
  BookOpen, 
  ArrowRight, 
  ChevronRight,
  CheckCircle2,
  Calendar,
  Lock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 relative overflow-hidden font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 dark:bg-violet-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-pink-500/5 dark:bg-fuchsia-500/10 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-900/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 dark:bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-600/10">
            <GraduationCap size={22} />
          </div>
          <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
            Second Sem Math
          </span>
        </div>

        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <button
            onClick={() => navigate('/auth')}
            className="px-4 py-2 text-sm font-semibold border border-zinc-250 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/auth', { state: { isSignUp: true } })}
            className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:text-black dark:hover:bg-zinc-250 text-white rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-6 pt-16 pb-24 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-violet-500/10 text-indigo-600 dark:text-violet-400 border border-indigo-100 dark:border-violet-500/20 mb-6">
          <Calendar size={12} /> Syllabus: BS-M201 (Theory, CSE/IT)
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-700 dark:from-white dark:via-white dark:to-zinc-400 bg-clip-text text-transparent leading-[1.15]">
          Crack MAKAUT Engineering Math <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
            With Confidence and AI
          </span>
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Unlock interactive study notes, AI-generated custom quizzes with full solutions, distribution calculators, and cloud progress tracking built specifically for your curriculum.
        </p>

        {/* Animated "Sign Up to Study" Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={() => navigate('/auth', { state: { isSignUp: true } })}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-white/20 transition-all duration-300 hover:scale-105 active:scale-98 cursor-pointer overflow-hidden animate-pulse-slow"
          >
            {/* Glowing Hover Layer */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 transition-opacity" />
            
            <span>Sign Up to Study</span>
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Mock UI Showcase */}
        <div className="bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 md:p-6 shadow-2xl backdrop-blur-sm max-w-4xl mx-auto relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800/80 pb-4 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-2 font-mono">mathsnotesbysrijeet.vercel.app/dashboard</span>
            </div>
            <Lock size={12} className="text-zinc-400" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-2xl border border-zinc-150 dark:border-zinc-900">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-violet-400 uppercase tracking-widest block mb-1">Interactive Study</span>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Bivariate Distributions</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">Study expectation, covariance, Bayes' theorem, and conditional densities.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-2xl border border-zinc-150 dark:border-zinc-900">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-450 uppercase tracking-widest block mb-1">Real-time Statistics</span>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Syllabus Completion</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">Dynamic tracker updates as you complete topics and practice exams.</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-2xl border border-zinc-150 dark:border-zinc-900">
              <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest block mb-1">AI Diagnostics</span>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Gemini Practice Quiz</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">Instant custom test paper generation with full solutions and grading.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-100/50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-900 py-24 z-10 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Study Smarter, Not Harder
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl mx-auto">
              Everything you need to secure an O-grade in engineering mathematics, consolidated in one dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex gap-4 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-violet-400 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">AI Quiz Generator</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Generates custom MCQ and Short Answer quizzes using Gemini AI based specifically on MAKAUT exam structures. Shows step-by-step math breakdowns for every answer.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex gap-4 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-violet-400 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Calculator size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Interactive Calculators</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Verify your homework answers and build mathematical intuition. Visualize Probability Mass Functions (PMF) and build Cumulative Distribution Functions (CDF) step-by-step.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex gap-4 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-violet-400 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Cloud size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Cloud Progress Sync</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Never lose your quiz history or unit status checkmarks. Everything is synced to your profile via a secure Supabase cloud database instance.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex gap-4 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-violet-400 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Last Night Revision Plan</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Time-managed schedule checklist mapping out which formulas and proofs to review in the crucial 24 hours leading up to your Semester Exam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Breakdown Overview */}
      <section className="max-w-5xl mx-auto px-6 py-24 z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Curriculum Overview
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl mx-auto">
            BS-M201 Mathematics IIA course modules included in the study portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {syllabus.map((unit) => (
            <div 
              key={unit.id}
              className="bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-850 p-5 rounded-2xl flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">Unit {unit.number}</span>
                <h4 className="font-bold text-zinc-900 dark:text-white text-base mt-0.5">{unit.title}</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-150 dark:border-zinc-850">
                  {unit.topics.length} topics
                </span>
                <ChevronRight size={16} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-5xl mx-auto px-6 pb-24 z-10 relative">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">
          {/* Glowing element inside banner */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none" />
          
          <h3 className="text-3xl font-extrabold mb-4">Ready to start studying?</h3>
          <p className="text-indigo-100 max-w-lg mx-auto mb-8 text-base">
            Create a free account to track your study progress, generate practice quizzes, and access full engineering formula sheets instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/auth', { state: { isSignUp: true } })}
              className="px-8 py-3.5 bg-white text-indigo-600 hover:bg-zinc-100 font-bold rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <span className="text-sm text-indigo-150 flex items-center gap-1.5">
              <CheckCircle2 size={16} /> No credit card required
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 py-8 px-6 text-center text-xs text-zinc-500 dark:text-zinc-650 z-10 relative">
        <p>&copy; {new Date().getFullYear()} Second Semester Mathematics Study Portal. Built for engineering students.</p>
      </footer>
    </div>
  );
};
