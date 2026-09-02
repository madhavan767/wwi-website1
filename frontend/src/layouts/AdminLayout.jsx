import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Briefcase, Users, Mail, Image, Settings, LogOut, ShieldAlert
} from 'lucide-react';
import { api } from '../services/api';

export function AdminLayout() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Inject noindex meta tag dynamically for search engine exclusion
    let metaTag = document.querySelector("meta[name='robots']");
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      document.head.appendChild(metaTag);
    }
    metaTag.content = 'noindex, nofollow, noarchive, nosnippet';

    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await api.adminMe();
      setAdmin(res.admin);
    } catch (err) {
      console.warn('Admin auth check failed:', err.message);
      navigate('/v1/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.adminLogout();
    } catch (e) {
      // Ignore errors on logout
    }
    localStorage.removeItem('wwi_admin_token');
    navigate('/v1/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/v1/admin/dashboard/wwi', icon: LayoutDashboard },
    { label: 'Blogs CMS', path: '/v1/admin/blogs', icon: FileText },
    { label: 'Careers CMS', path: '/v1/admin/careers', icon: Briefcase },
    { label: 'Applications', path: '/v1/admin/applications', icon: Users },
    { label: 'Contact Messages', path: '/v1/admin/contact', icon: Mail },
    { label: 'Media Library', path: '/v1/admin/media', icon: Image },
    { label: 'Settings', path: '/v1/admin/settings', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-gray-400">Verifying secure admin session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white flex font-sans">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#14161a] border-r border-white/10 p-6 flex flex-col justify-between flex-shrink-0 hidden md:flex">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white text-black font-black text-xl rounded-xl flex items-center justify-center">
              W
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-tight text-white">WWI Admin CMS</h2>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Authenticated
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path || (item.path !== '/v1/admin/dashboard/wwi' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    active ? 'bg-white text-black font-bold shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="text-xs">
            <div className="text-gray-400 text-[10px] font-bold uppercase">Logged in as</div>
            <div className="text-white font-medium truncate">{admin?.email || 'admin@wwi.org.in'}</div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-[#14161a] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Private Management Console</span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/" target="_blank" className="text-xs text-gray-400 hover:text-white underline">
              View Public Website ↗
            </Link>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
