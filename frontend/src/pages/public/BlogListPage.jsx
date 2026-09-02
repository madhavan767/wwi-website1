import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { BlogCard } from '../../components/cards/BlogCard';
import { api } from '../../services/api';
import { Search, Calendar, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.getBlogs();
      setBlogs(res.data || []);
    } catch (err) {
      console.error('Error loading blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter & sort by date (newest first)
  const filteredBlogs = blogs
    .filter(b => {
      const matchQuery = !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchQuery;
    })
    .sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at));

  return (
    <div className="space-y-12 pb-16">
      
      <PageHeader
        title="Articles & Insights"
        subtitle="Exploring software engineering, AI innovations, design paradigms, and company updates from Work Wizards Innovations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search Input Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black shadow-sm"
            />
          </div>
        </div>

        {/* Articles Grid (Sorted Date-wise) */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm font-medium">Loading articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="wwi-card p-12 text-center text-gray-500 space-y-3">
            <FileText className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-base font-bold text-gray-800">No articles found.</p>
            <p className="text-xs text-gray-500">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
