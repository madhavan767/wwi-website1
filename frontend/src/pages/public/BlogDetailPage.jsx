import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BlogCard } from '../../components/cards/BlogCard';
import { api } from '../../services/api';
import { getImageUrl } from '../../utils/imageHelper';
import { Calendar, User, Check, Copy, Twitter, Linkedin, MessageSquare, ArrowLeft } from 'lucide-react';

export function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getBlogBySlug(slug);
      setBlog(res.data);
      setRelated(res.related || []);

      if (res.data) {
        document.title = `${res.data.seo_title || res.data.title} | Work Wizards Innovations`;
      }
    } catch (err) {
      setError(err.message || 'Failed to load blog post.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/blogs');
    }
  };

  const handleCopySlugUrl = () => {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const readingTime = blog?.content
    ? Math.max(1, Math.ceil(blog.content.replace(/<[^>]+>/g, '').split(/\s+/).length / 200))
    : 3;

  if (loading) {
    return <div className="text-center py-24 text-gray-400 text-sm font-medium">Loading article...</div>;
  }

  if (error || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Blog Article Not Found</h2>
        <p className="text-xs text-gray-500">{error || 'The requested article could not be located.'}</p>
        <button onClick={handleBack} className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full inline-block">
          Back
        </button>
      </div>
    );
  }

  const coverUrl = getImageUrl(blog.cover_image_key);

  return (
    <article className="pt-8 pb-20">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <button onClick={handleBack} className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Top Meta & Share Toolbar (Without Category) */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 text-xs font-semibold text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-gray-900">
              <User className="w-4 h-4 text-gray-400" />
              {blog.author}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              {new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500 font-normal">{readingTime} min read</span>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySlugUrl}
              className="px-3.5 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:bg-black hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Link!' : 'Copy Slug URL'}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors"
              title="Share on X / Twitter"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${blog.title} - ${window.location.href}`)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors"
              title="Share on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 1. Cover Image Graphic Banner (Clean, image only) */}
        {coverUrl && (
          <div className="rounded-3xl bg-gray-100 overflow-hidden border border-gray-200 shadow-md">
            <img
              src={coverUrl}
              alt={blog.title}
              className="w-full h-auto max-h-[500px] object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        {/* 2. Main Title (BIG BOLD LETTERS BELOW THE IMAGE) */}
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight pt-2">
          {blog.title}
        </h1>

        {/* 3. Description / Excerpt (BELOW THE TITLE) */}
        {blog.excerpt && (
          <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed pb-4 border-b border-gray-200">
            {blog.excerpt}
          </p>
        )}

        {/* 4. Full Article Body */}
        <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-sans prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-black prose-a:underline prose-img:rounded-2xl prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-4 prose-blockquote:italic pt-2"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-16 border-t border-gray-200 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">More Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rel => (
                <BlogCard key={rel.id} blog={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
