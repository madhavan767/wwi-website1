import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../utils/imageHelper';

export function BlogCard({ blog }) {
  const imageUrl = getImageUrl(blog.cover_image_key);

  const formattedDate = new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <motion.div whileHover={{ y: -4 }} className="h-full">
      <Link to={`/blogs/${blog.slug}`} className="wwi-card overflow-hidden flex flex-col justify-between h-full group block cursor-pointer">
        <div className="space-y-4">
          {/* Cover Image Thumbnail (No Category Badge) */}
          <div className="h-52 bg-gray-900 overflow-hidden relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                WWI Article
              </div>
            )}
          </div>

          {/* Info Content */}
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-500">
              <span className="flex items-center gap-1.5 text-gray-900 font-bold">
                <User className="w-3.5 h-3.5 text-gray-400" />
                {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-gray-600">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {formattedDate}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-gray-900 leading-tight group-hover:text-black transition-colors">
              {blog.title}
            </h3>

            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-medium">
              {blog.excerpt}
            </p>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <div className="text-xs font-bold text-black group-hover:text-gray-700 flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Full Article
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
