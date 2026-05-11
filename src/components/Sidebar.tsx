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
      <aside className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-dark-card border-r border-slate-200 dark:border-dark-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex items-center gap-2 border-b border-slate-200 dark:border-dark-border">
          <GraduationCap className="text-primary-600 dark:text-primary-400" size={28} />
          <h1 className="font-bold text-lg text-slate-800 dark:text-slate-100 leading-tight">BSM201 CA3<br/>Revision</h1>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 font-medium' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-6 pb-2">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Topics</p>
          </div>
          
          {topicsList.map((topic) => (
            <NavLink
              key={topic.name}
              to={topic.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-slate-100 text-primary-700 dark:bg-slate-800 dark:text-primary-400 font-medium' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`
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
