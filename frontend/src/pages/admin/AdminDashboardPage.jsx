import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Users, Mail, Image, TrendingUp, Plus, ArrowRight, UserPlus } from 'lucide-react';
import { api } from '../../services/api';

export function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminStats();
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching admin dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-400 text-xs">Loading dashboard telemetry...</div>;
  }

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#14161a] border border-white/10 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Admin Overview</h1>
          <p className="text-xs text-gray-400 mt-1">Manage blogs, careers, candidates, community subscribers, and inquiries in real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/v1/admin/blogs/create" className="px-4 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> New Blog
          </Link>
          <Link to="/v1/admin/careers/create" className="px-4 py-2.5 bg-white/10 text-white text-xs font-semibold rounded-full hover:bg-white/20 flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> New Career
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#14161a] border border-white/10 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Blogs</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats?.total_blogs || 0}</div>
          <div className="text-[10px] text-emerald-400 font-semibold">{stats?.published_blogs || 0} Published</div>
        </div>

        <div className="bg-[#14161a] border border-white/10 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Careers</span>
            <Briefcase className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats?.active_careers || 0}</div>
          <div className="text-[10px] text-gray-400 font-semibold">Open Roles</div>
        </div>

        <div className="bg-[#14161a] border border-white/10 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Candidates</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats?.total_applications || 0}</div>
          <div className="text-[10px] text-purple-400 font-semibold">{stats?.new_applications || 0} New</div>
        </div>

        <div className="bg-[#14161a] border border-white/10 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Community</span>
            <UserPlus className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats?.total_community || 0}</div>
          <div className="text-[10px] text-pink-400 font-semibold">Devs & Students</div>
        </div>

        <div className="bg-[#14161a] border border-white/10 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Inquiries</span>
            <Mail className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{stats?.recent_contacts?.length || 0}</div>
          <div className="text-[10px] text-amber-400 font-semibold">{stats?.unread_contacts || 0} Unread</div>
        </div>
      </div>

      {/* Activity Streams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Applications */}
        <div className="bg-[#14161a] border border-white/10 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Recent Candidates</h3>
            <Link to="/v1/admin/applications" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats?.recent_applications?.length === 0 ? (
            <p className="text-xs text-gray-500 py-4 text-center">No applications received yet.</p>
          ) : (
            <div className="space-y-2">
              {stats?.recent_applications?.map((app) => (
                <div key={app.id} className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{app.name}</div>
                    <div className="text-[10px] text-gray-400">{app.email}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-bold rounded-md uppercase">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Community Email Subscribers */}
        <div className="bg-[#14161a] border border-white/10 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Community Subscribers</h3>
            <span className="text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">
              {stats?.total_community || 0} Total
            </span>
          </div>

          {stats?.recent_community?.length === 0 ? (
            <p className="text-xs text-gray-500 py-4 text-center">No community subscribers yet.</p>
          ) : (
            <div className="space-y-2">
              {stats?.recent_community?.map((sub) => (
                <div key={sub.id} className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{sub.email}</div>
                    <div className="text-[10px] text-gray-400">{sub.role_interest || 'Developer / Student'}</div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contact Inquiries */}
        <div className="bg-[#14161a] border border-white/10 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Contact Inquiries</h3>
            <Link to="/v1/admin/contact" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats?.recent_contacts?.length === 0 ? (
            <p className="text-xs text-gray-500 py-4 text-center">No contact inquiries received yet.</p>
          ) : (
            <div className="space-y-2">
              {stats?.recent_contacts?.map((contact) => (
                <div key={contact.id} className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white truncate max-w-[150px]">{contact.name}</div>
                    <div className="text-[10px] text-gray-400 truncate max-w-[150px]">{contact.email}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-md uppercase">
                    {contact.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
