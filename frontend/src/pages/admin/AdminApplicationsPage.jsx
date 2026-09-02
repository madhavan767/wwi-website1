import React, { useState, useEffect } from 'react';
import { Users, FileDown, Trash2, Mail, Phone } from 'lucide-react';
import { api } from '../../services/api';

export function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminApplications();
      setApplications(res.data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateApplicationStatus(id, newStatus);
      fetchApplications();
    } catch (err) {
      alert('Failed to update candidate status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete candidate application record?')) {
      try {
        await api.deleteApplication(id);
        fetchApplications();
      } catch (err) {
        alert('Failed to delete application.');
      }
    }
  };

  const handleDownloadResume = (id) => {
    const resumeUrl = api.getResumeUrl(id);
    window.open(resumeUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Career Applications</h1>
        <p className="text-xs text-gray-400 mt-0.5">Review job candidate submissions and securely download private resumes</p>
      </div>

      <div className="bg-[#14161a] border border-white/10 rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-gray-400">Loading candidate applications...</div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400 space-y-2">
            <Users className="w-8 h-8 mx-auto text-gray-600" />
            <p>No job applications received yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Resume</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{app.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{app.cover_letter ? `"${app.cover_letter.slice(0, 50)}..."` : 'No cover letter'}</div>
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="flex items-center gap-1"><Mail className="w-3 h-3 text-gray-400" /> {app.email}</div>
                      {app.phone && <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400"><Phone className="w-3 h-3" /> {app.phone}</div>}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDownloadResume(app.id)}
                        className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded-lg font-bold text-[10px] uppercase flex items-center gap-1"
                      >
                        <FileDown className="w-3.5 h-3.5" /> Download Resume
                      </button>
                    </td>
                    <td className="p-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="px-2.5 py-1 bg-[#1e2026] border border-white/10 rounded-lg text-[10px] font-extrabold uppercase text-white focus:outline-none"
                      >
                        <option value="new">NEW</option>
                        <option value="reviewing">REVIEWING</option>
                        <option value="shortlisted">SHORTLISTED</option>
                        <option value="rejected">REJECTED</option>
                        <option value="hired">HIRED</option>
                      </select>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 font-semibold flex items-center gap-1 ml-auto"
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
