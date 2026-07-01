import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, LogIn, LogOut, Cloud, ChevronDown, Trash2, Search, ChevronRight } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { Sidebar } from './Sidebar';
import { useUser } from '../context/UserContext';
import { topics } from '../data/topics';
import { syllabus } from '../data/syllabus';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile, logout, deleteAccount } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Search bar state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Collapsed state for desktop sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true';
  });

  const toggleSidebar = () => {
    const val = !sidebarCollapsed;
    setSidebarCollapsed(val);
    localStorage.setItem('sidebar-collapsed', String(val));
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = topics.filter(t => 
      t.title.toLowerCase().includes(q.toLowerCase()) ||
      t.conceptExplanation.toLowerCase().includes(q.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/dashboard') {
      return [{ name: 'Dashboard', path: '/dashboard' }];
    }
    if (path === '/formulas') {
      return [{ name: 'Dashboard', path: '/dashboard' }, { name: 'Formula Sheet', path: '/formulas' }];
    }
    if (path === '/practice') {
      return [{ name: 'Dashboard', path: '/dashboard' }, { name: 'Practice', path: '/practice' }];
    }
    if (path === '/quiz') {
      return [{ name: 'Dashboard', path: '/dashboard' }, { name: 'AI Quiz', path: '/quiz' }];
    }
    if (path === '/revision-plan') {
      return [{ name: 'Dashboard', path: '/dashboard' }, { name: 'Revision Plan', path: '/revision-plan' }];
    }
    if (path.startsWith('/topic/')) {
      const topicId = path.split('/topic/')[1];
      const topic = topics.find(t => t.id === topicId);
      
      const searchParams = new URLSearchParams(location.search);
      const subtopicNameRaw = searchParams.get('subtopic');
      const subtopicName = subtopicNameRaw ? decodeURIComponent(subtopicNameRaw) : null;
      const unitNum = searchParams.get('unit');
      
      let unit = null;
      if (unitNum) {
        unit = syllabus.find(u => u.number === parseInt(unitNum));
      }
      if (!unit && subtopicName) {
        unit = syllabus.find(u => u.topics.some(t => t.name === subtopicName && t.topicId === topicId));
      }
      if (!unit) {
        unit = syllabus.find(u => u.topics.some(t => t.topicId === topicId));
      }

      if (topic && unit) {
        return [
          { name: 'Dashboard', path: '/dashboard' },
          { name: `Unit ${unit.number}`, path: '/dashboard' },
          { name: subtopicName || topic.title, path: `/topic/${topicId}${location.search}` }
        ];
      }
    }
    return [];
  };

  const crumbs = getBreadcrumbs();

  const getInitials = () => {
    const name = (profile?.full_name || user?.user_metadata?.full_name) as string | undefined;
    if (name) {
      return name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#07111f] text-zinc-900 dark:text-[#f8fafc] flex relative overflow-hidden">
      {/* Background Math grid */}
      <div className="fixed inset-0 math-grid pointer-events-none z-0" />
      
      {/* Floating Math Symbols */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.03] dark:opacity-[0.015] text-[#0f172a] dark:text-[#22d3ee] font-mono text-8xl">
        <span className="absolute top-[10%] left-[5%]">∫</span>
        <span className="absolute top-[30%] right-[8%]">∑</span>
        <span className="absolute bottom-[20%] left-[15%]">π</span>
        <span className="absolute bottom-[10%] right-[18%]">x²</span>
        <span className="absolute top-[65%] left-[45%]">∂y/∂x</span>
        <span className="absolute top-[15%] left-[50%]">√2</span>
        <span className="absolute bottom-[45%] right-[25%]">∞</span>
      </div>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} isCollapsed={sidebarCollapsed} />
      
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative z-10 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#07111f]/80 backdrop-blur-md border-b border-zinc-200 dark:border-[#1e293b] px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button 
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[#475569] dark:text-[#94a3b8] cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            {/* Desktop collapse toggle */}
            <button 
              className="hidden lg:flex p-2 -ml-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[#475569] dark:text-[#94a3b8] cursor-pointer"
              onClick={toggleSidebar}
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu size={24} />
            </button>
            <div className="font-bold text-lg lg:hidden text-[#0f172a] dark:text-[#f8fafc]">Midnight Calculus</div>
          </div>

          {/* Search bar for Topics */}
          {user && (
            <div className="relative hidden md:block w-64 lg:w-80 z-50" ref={searchRef}>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] dark:text-[#94a3b8] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-zinc-100 dark:bg-[#0f1b2e] border border-zinc-200 dark:border-[#1e293b] rounded-xl text-sm text-[#0f172a] dark:text-[#f8fafc] placeholder-[#475569] dark:placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-violet-500 focus:border-transparent transition-all shadow-sm"
                />
              </div>
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white dark:bg-[#0f1b2e] border border-zinc-200 dark:border-[#1e293b] rounded-xl shadow-lg z-50 py-2">
                  {searchResults.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        navigate(`/topic/${topic.id}`);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm text-zinc-700 dark:text-[#f8fafc] transition-colors border-b border-zinc-100 dark:border-[#1e293b]/50 last:border-b-0"
                    >
                      <div className="font-semibold">{topic.title}</div>
                      <div className="text-xs text-[#475569] dark:text-[#94a3b8] truncate">{topic.conceptExplanation.replace(/\$/g, '')}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4">
            <DarkModeToggle />
            
            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-zinc-150 dark:hover:bg-[#0f1b2e] transition-colors border border-zinc-200 dark:border-[#1e293b] cursor-pointer text-sm font-medium"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-600/10">
                    {getInitials()}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate text-[#475569] dark:text-[#94a3b8]">
                    {profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className="text-[#475569] dark:text-[#94a3b8] shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#0f1b2e] border border-zinc-200 dark:border-[#1e293b] rounded-2xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-[#1e293b] mb-2">
                      <p className="text-xs font-semibold text-zinc-400 dark:text-[#94a3b8] uppercase tracking-wider">Signed in as</p>
                      <p className="font-bold text-[#0f172a] dark:text-white truncate mt-0.5 text-sm">
                        {profile?.full_name || user.user_metadata?.full_name || 'Student'}
                      </p>
                      <p className="text-xs text-[#475569] dark:text-[#94a3b8] truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <div className="px-2 py-1 space-y-1">
                      <div className="flex items-center gap-2 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-xl border border-emerald-500/10 mb-2">
                        <Cloud size={14} className="shrink-0" />
                        <span>Cloud Sync Active</span>
                      </div>

                      <button
                        onClick={async () => {
                          setDropdownOpen(false);
                          await logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-zinc-700 dark:text-[#94a3b8] hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-transparent transition-colors text-left text-sm font-semibold cursor-pointer"
                      >
                        <LogOut size={16} className="text-[#475569]" />
                        <span>Sign Out</span>
                      </button>

                      <button
                        onClick={async () => {
                          setDropdownOpen(false);
                          if (window.confirm("Are you absolutely sure you want to delete your account? This action is permanent and will delete all your synced data.")) {
                            try {
                              await deleteAccount();
                              navigate('/');
                            } catch (err) {
                              alert("Failed to delete account. Please ensure the Supabase RPC function is configured.");
                            }
                          }
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-500/5 hover:border-red-500/10 border border-transparent transition-colors text-left text-sm font-semibold cursor-pointer"
                      >
                        <Trash2 size={16} />
                        <span>Delete Account</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-650 hover:bg-indigo-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white rounded-xl font-semibold shadow-sm text-sm transition-all active:scale-95 cursor-pointer"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full relative z-10 flex flex-col">
          {/* Breadcrumbs */}
          {crumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-xs text-[#475569] dark:text-[#94a3b8] mb-6 bg-white/40 dark:bg-[#0f1b2e]/30 px-3.5 py-2 rounded-xl border border-zinc-200/50 dark:border-[#1e293b]/50 backdrop-blur-sm self-start inline-flex shadow-sm">
              {crumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronRight size={12} className="shrink-0 text-zinc-400" />}
                  {idx === crumbs.length - 1 ? (
                    <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc] truncate max-w-[180px] sm:max-w-xs">{crumb.name}</span>
                  ) : (
                    <Link to={crumb.path} className="hover:text-indigo-600 dark:hover:text-[#22d3ee] transition-colors">{crumb.name}</Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

