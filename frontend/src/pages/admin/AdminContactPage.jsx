import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Phone, Building } from 'lucide-react';
import { api } from '../../services/api';

export function AdminContactPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminContacts();
      setContacts(res.data || []);
    } catch (err) {
      console.error('Error fetching contact submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateContactStatus(id, newStatus);
      fetchContacts();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this contact inquiry?')) {
      try {
        await api.deleteContact(id);
        fetchContacts();
      } catch (err) {
        alert('Failed to delete contact inquiry.');
      }
    }
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Contact Messages</h1>
        <p className="text-xs text-gray-400 mt-0.5">Manage customer inquiries submitted via website forms</p>
      </div>

      <div className="bg-[#14161a] border border-white/10 rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-gray-400">Loading contact submissions...</div>
        ) : contacts.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400 space-y-2">
            <Mail className="w-8 h-8 mx-auto text-gray-600" />
            <p>No contact messages received yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Sender Info</th>
                  <th className="p-4">Subject & Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Received Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{c.name}</div>
                      <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3" /> {c.email}</div>
                      {c.phone && <div className="text-[10px] text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" /> {c.phone}</div>}
                      {c.company && <div className="text-[10px] text-gray-400 flex items-center gap-1"><Building className="w-3 h-3" /> {c.company}</div>}
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-white mb-0.5">{c.subject}</div>
                      <div className="text-gray-300 text-[11px] leading-relaxed line-clamp-3">{c.message}</div>
                    </td>
                    <td className="p-4">
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className="px-2.5 py-1 bg-[#1e2026] border border-white/10 rounded-lg text-[10px] font-extrabold uppercase text-white focus:outline-none"
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="in_progress">IN PROGRESS</option>
                        <option value="resolved">RESOLVED</option>
                      </select>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
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
