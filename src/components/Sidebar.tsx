import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calculator, 
  BrainCircuit, 
  GraduationCap, 
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { syllabus } from '../data/syllabus';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, isCollapsed = false }) => {
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>(() => {
    // Expand Unit 1 by default for a friendly open feel
    return { 'unit-1-basic-probability': true };
  });

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Formula Sheet', path: '/formulas', icon: BookOpen },
    { name: 'Practice', path: '/practice', icon: Calculator },
    { name: 'AI Quiz', path: '/quiz', icon: BrainCircuit },
    { name: 'Revision Plan', path: '/revision-plan', icon: FileText },
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
      <aside 
        className={`fixed top-0 left-0 z-30 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 transform transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Pinned Top Header */}
        <div className="p-4 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-900 shrink-0">
          <GraduationCap className="text-indigo-600 dark:text-violet-400 shrink-0" size={28} />
          {!isCollapsed && (
            <h1 className="font-bold text-lg text-zinc-900 dark:text-white leading-tight animate-in fade-in duration-200">
              Second Sem<br/>Math
            </h1>
          )}
        </div>
        
        {/* Pinned Core Menu items */}
        <div className="p-4 border-b border-zinc-150 dark:border-zinc-900 shrink-0 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20 font-semibold' 
                    : 'text-zinc-650 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-zinc-200 border border-transparent'
                } ${isCollapsed ? 'justify-center px-0 w-12 h-12 mx-auto' : ''}`
              }
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon size={20} className="shrink-0" />
              {!isCollapsed && <span className="animate-in fade-in duration-200">{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Scrollable Topics Section (group by Unit with collapsible drop downs) */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar animate-in fade-in duration-300">
            <div>
              <p className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Syllabus Subtopics</p>
            </div>
            
            <div className="space-y-1">
              {syllabus.map((unit) => {
                const isExpanded = !!expandedUnits[unit.id];
                
                return (
                  <div key={unit.id} className="space-y-0.5">
                    {/* Unit Dropdown Header Button */}
                    <button
                      onClick={() => toggleUnit(unit.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-colors cursor-pointer group"
                    >
                      <span className="truncate pr-1 group-hover:text-indigo-600 dark:group-hover:text-violet-400">
                        Unit {unit.number}: {unit.title}
                      </span>
                      {isExpanded ? (
                        <ChevronDown size={14} className="text-zinc-450 shrink-0" />
                      ) : (
                        <ChevronRight size={14} className="text-zinc-450 shrink-0" />
                      )}
                    </button>

                    {/* Subtopics Expanded List */}
                    {isExpanded && (
                      <div className="pl-3 border-l border-zinc-150 dark:border-zinc-800/80 ml-4 py-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
                        {unit.topics.map((topic, i) => {
                          if (topic.topicId) {
                            return (
                              <NavLink
                                key={i}
                                to={`/topic/${topic.topicId}`}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => 
                                  `block px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                    isActive 
                                      ? 'bg-zinc-100 text-indigo-600 dark:bg-zinc-900 dark:text-violet-400 font-semibold' 
                                      : 'text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900/40 hover:text-zinc-850 dark:hover:text-zinc-200'
                                  }`
                                }
                              >
                                {topic.name}
                              </NavLink>
                            );
                          } else {
                            return (
                              <span 
                                key={i} 
                                className="block px-3 py-1.5 text-xs text-zinc-400 dark:text-zinc-650 select-none font-sans"
                                title="Topic details coming soon"
                              >
                                {topic.name}
                              </span>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
