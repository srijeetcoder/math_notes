import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogIn, LogOut, Cloud, ChevronDown, Trash2 } from 'lucide-react';
import { DarkModeToggle } from './DarkModeToggle';
import { Sidebar } from './Sidebar';
import { useUser } from '../context/UserContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile, logout, deleteAccount } = useUser();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} isCollapsed={sidebarCollapsed} />
      
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button 
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            {/* Desktop collapse toggle */}
            <button 
              className="hidden lg:flex p-2 -ml-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300 cursor-pointer"
              onClick={toggleSidebar}
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu size={24} />
            </button>
            <div className="font-semibold text-lg lg:hidden">Second Sem Math</div>
          </div>
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            
            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-zinc-150 dark:hover:bg-zinc-900 transition-colors border border-zinc-200 dark:border-zinc-800 cursor-pointer text-sm font-medium"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-600/10">
                    {getInitials()}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate text-zinc-700 dark:text-zinc-300">
                    {profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className="text-zinc-500 shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80 mb-2">
                      <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Signed in as</p>
                      <p className="font-bold text-zinc-900 dark:text-white truncate mt-0.5 text-sm">
                        {profile?.full_name || user.user_metadata?.full_name || 'Student'}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
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
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 border border-transparent transition-colors text-left text-sm font-semibold cursor-pointer"
                      >
                        <LogOut size={16} className="text-zinc-500" />
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
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white rounded-xl font-semibold shadow-sm text-sm transition-all active:scale-95 cursor-pointer"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

