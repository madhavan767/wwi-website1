import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plus, Edit, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { api } from '../../services/api';

export function AdminCareersPage() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminCareers();
      setCareers(res.data || []);
    } catch (err) {
      console.error('Error fetching careers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      if (currentStatus === 'published') {
        await api.closeCareer(id);
      } else {
        await api.publishCareer(id);
      }
      fetchCareers();
    } catch (err) {
      alert('Failed to change career status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this career position?')) {
      try {
        await api.deleteCareer(id);
        fetchCareers();
      } catch (err) {
        alert('Failed to delete career position.');
      }
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Careers CMS</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage open job positions and applications</p>
        </div>

        <Link
          to="/v1/admin/careers/create"
          className="px-5 py-2.5 bg-white text-black font-extrabold text-xs rounded-full hover:bg-gray-200 flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Create Career Position
        </Link>
      </div>

      <div className="bg-[#14161a] border border-white/10 rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-gray-400">Loading career listings...</div>
        ) : careers.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400 space-y-2">
            <Briefcase className="w-8 h-8 mx-auto text-gray-600" />
            <p>No job positions found. Click "Create Career Position" to add one!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Title & Department</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {careers.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{c.title}</div>
                      <span className="inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 bg-white/10 text-gray-300 rounded-md">
                        {c.department}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 font-medium">{c.location}</td>
                    <td className="p-4 text-gray-300">{c.employment_type}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        c.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(c.id, c.status)}
                        className={`px-3 py-1.5 rounded-lg font-semibold inline-flex items-center gap-1 ${
                          c.status === 'published' ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                        }`}
                      >
                        {c.status === 'published' ? 'Close Role' : 'Publish'}
                      </button>
                      <Link
                        to={`/v1/admin/careers/edit/${c.id}`}
                        className="px-3 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 font-semibold inline-flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 font-semibold inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
