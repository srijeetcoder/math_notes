import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calculator, 
  BrainCircuit, 
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { syllabus } from '../data/syllabus';
import { useUser } from '../context/UserContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, isCollapsed = false }) => {
  const { syllabusProgress } = useUser();
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

  const getUnitStatusColor = (unitId: string) => {
    const status = syllabusProgress[unitId] || 'Pending';
    if (status === 'Completed') return 'bg-emerald-500';
    if (status === 'In Progress') return 'bg-indigo-500 dark:bg-[#22d3ee]';
    return 'bg-zinc-300 dark:bg-zinc-700';
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
          className="fixed inset-0 bg-[#07111f]/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen bg-white/90 dark:bg-[#07111f]/90 backdrop-blur-md border-r border-zinc-200 dark:border-[#1e293b] transform transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Pinned Top Header */}
        <div className="p-4 flex items-center gap-2 border-b border-zinc-200 dark:border-[#1e293b] shrink-0">
          <img src="/favicon.png" alt="Logo" className="w-7 h-7 object-contain shrink-0" />
          {!isCollapsed && (
            <h1 className="font-extrabold text-sm tracking-wide text-[#0f172a] dark:text-[#f8fafc] leading-tight uppercase animate-in fade-in duration-200">
              Midnight<br/><span className="text-[#4f46e5] dark:text-[#22d3ee]">Calculus</span>
            </h1>
          )}
        </div>
        
        {/* Pinned Core Menu items */}
        <div className="p-4 border-b border-zinc-150 dark:border-[#1e293b] shrink-0 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 border ${
                  isActive 
                    ? 'bg-indigo-50/80 text-[#4f46e5] border-indigo-200/50 dark:bg-cyan-500/5 dark:text-[#22d3ee] dark:border-cyan-500/30 dark:shadow-[0_0_12px_rgba(34,211,238,0.15)] font-semibold' 
                    : 'text-[#475569] hover:bg-zinc-50 dark:text-[#94a3b8] dark:hover:bg-[#0f1b2e] hover:text-[#0f172a] dark:hover:text-[#f8fafc] border-transparent'
                } ${isCollapsed ? 'justify-center px-0 w-12 h-12 mx-auto' : ''}`
              }
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon size={20} className="shrink-0" />
              {!isCollapsed && <span className="animate-in fade-in duration-200 text-sm">{item.name}</span>}
            </NavLink>
          ))}
        </div>
 
        {/* Scrollable Topics Section (group by Unit with collapsible drop downs) */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar animate-in fade-in duration-300">
            <div>
              <p className="px-3 text-[10px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase tracking-widest">Syllabus Subtopics</p>
            </div>
            
            <div className="space-y-1">
              {syllabus.map((unit) => {
                const isExpanded = !!expandedUnits[unit.id];
                
                return (
                  <div key={unit.id} className="space-y-0.5">
                    {/* Unit Dropdown Header Button */}
                    <button
                      onClick={() => toggleUnit(unit.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl hover:bg-zinc-50 dark:hover:bg-[#0f1b2e]/50 text-[#0f172a] dark:text-[#f8fafc] font-bold text-xs transition-colors cursor-pointer group"
                    >
                      <span className="truncate pr-1 group-hover:text-[#4f46e5] dark:group-hover:text-[#22d3ee] flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${getUnitStatusColor(unit.id)}`} />
                        Unit {unit.number}: {unit.title.split(':')[0]}
                      </span>
                      {isExpanded ? (
                        <ChevronDown size={14} className="text-[#475569] dark:text-[#94a3b8] shrink-0" />
                      ) : (
                        <ChevronRight size={14} className="text-[#475569] dark:text-[#94a3b8] shrink-0" />
                      )}
                    </button>
 
                    {/* Subtopics Expanded List */}
                    {isExpanded && (
                      <div className="pl-3 border-l border-zinc-200 dark:border-[#1e293b] ml-4 py-1 space-y-1 animate-in slide-in-from-top-1 duration-200">
                        {unit.topics.map((topic, i) => {
                          if (topic.topicId) {
                            return (
                              <NavLink
                                key={i}
                                to={`/topic/${topic.topicId}`}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => 
                                  `block px-3 py-1.5 rounded-lg text-xs transition-all ${
                                    isActive 
                                      ? 'bg-zinc-100 text-[#4f46e5] dark:bg-[#0f1b2e] dark:text-[#22d3ee] font-semibold border-l-2 border-indigo-500 dark:border-cyan-400' 
                                      : 'text-[#475569] hover:bg-zinc-50 dark:text-[#94a3b8] dark:hover:bg-[#0f1b2e]/40 hover:text-[#0f172a] dark:hover:text-[#f8fafc]'
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
                                className="block px-3 py-1.5 text-xs text-zinc-400 dark:text-[#94a3b8]/50 select-none font-sans"
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
