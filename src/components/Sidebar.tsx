import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calculator, BrainCircuit, GraduationCap, FileText } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Formula Sheet', path: '/formulas', icon: BookOpen },
    { name: 'Practice', path: '/practice', icon: Calculator },
    { name: 'AI Quiz', path: '/quiz', icon: BrainCircuit },
    { name: 'Revision Plan', path: '/revision-plan', icon: FileText },
  ];

  const topicsList = [
    { name: 'Basic Probability', path: '/topic/basic-probability' },
    { name: 'Conditional Probability', path: '/topic/conditional-probability' },
    { name: 'Bayes Theorem', path: '/topic/bayes-theorem' },
    { name: 'PMF, PDF, CDF', path: '/topic/pmf-pdf-cdf' },
    { name: 'Expectation & Variance', path: '/topic/expectation-variance' },
    { name: 'Binomial Distribution', path: '/topic/binomial' },
    { name: 'Correlation', path: '/topic/correlation' },
    { name: 'Regression', path: '/topic/regression' },
    { name: 'Rank Correlation', path: '/topic/rank-correlation' },
    { name: 'Chebyshev\'s Inequality', path: '/topic/chebyshev-inequality' },
    { name: 'Poisson & Normal', path: '/topic/poisson-normal' },
    { name: 'Bivariate Distributions', path: '/topic/bivariate-distributions' },
    { name: 'Central Tendency & Moments', path: '/topic/central-tendency-moments' },
    { name: 'Curve Fitting', path: '/topic/curve-fitting' },
    { name: 'Large Sample Tests', path: '/topic/large-samples' },
    { name: 'Small Sample Tests', path: '/topic/small-samples' },
    { name: 'Chi-Square Tests', path: '/topic/chi-square-tests' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-900">
          <GraduationCap className="text-indigo-600 dark:text-violet-400" size={28} />
          <h1 className="font-bold text-lg text-zinc-900 dark:text-white leading-tight">Second Sem<br/>Math</h1>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20 font-medium' : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-200'}`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-6 pb-2">
            <p className="px-3 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Topics</p>
          </div>
          
          {topicsList.map((topic) => (
            <NavLink
              key={topic.name}
              to={topic.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-zinc-100 text-indigo-600 dark:bg-zinc-900 dark:text-violet-400 font-medium' : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900/50 hover:text-zinc-950 dark:hover:text-zinc-200'}`
              }
            >
              {topic.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};
