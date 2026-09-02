import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Edit, Trash2, Globe, Eye, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminBlogs();
      setBlogs(res.data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      if (currentStatus === 'published') {
        await api.unpublishBlog(id);
      } else {
        await api.publishBlog(id);
      }
      fetchBlogs();
    } catch (err) {
      alert('Failed to change publish status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await api.deleteBlog(id);
        fetchBlogs();
      } catch (err) {
        alert('Failed to delete blog.');
      }
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Blog CMS</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and publish blog articles to the website</p>
        </div>

        <Link
          to="/v1/admin/blogs/create"
          className="px-5 py-2.5 bg-white text-black font-extrabold text-xs rounded-full hover:bg-gray-200 flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Create Blog Post
        </Link>
      </div>

      {/* Blogs Table */}
      <div className="bg-[#14161a] border border-white/10 rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-gray-400">Loading blog catalog...</div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400 space-y-2">
            <FileText className="w-8 h-8 mx-auto text-gray-600" />
            <p>No blog posts found. Click "Create Blog Post" to publish your first article!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Title & Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{b.title}</div>
                      <span className="inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 bg-white/10 text-gray-300 rounded-md">
                        {b.category}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 font-medium">{b.author || 'WWI Team'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        b.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(b.published_at || b.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        to={`/blogs/${b.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 font-semibold inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                      <button
                        onClick={() => handleTogglePublish(b.id, b.status)}
                        className={`px-3 py-1.5 rounded-lg font-semibold inline-flex items-center gap-1 ${
                          b.status === 'published' ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                        }`}
                      >
                        {b.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <Link
                        to={`/v1/admin/blogs/edit/${b.id}`}
                        className="px-3 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 font-semibold inline-flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(b.id)}
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
