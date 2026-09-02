import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Eye, Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon, Code } from 'lucide-react';
import { api } from '../../services/api';
import { getImageUrl } from '../../utils/imageHelper';

const generateSlug = (text) => {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export function AdminBlogEditorPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    title: '',
    slug: '',
    category: 'BLOG',
    author: 'WWI Team',
    excerpt: '',
    content: '',
    cover_image_key: '',
    status: 'draft',
    seo_title: '',
    seo_description: ''
  });

  const [activeTab, setActiveTab] = useState('editor');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      fetchBlogDetails();
    }
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      const res = await api.getAdminBlogById(id);
      if (res.data) {
        setFormState(res.data);
      }
    } catch (err) {
      setError('Failed to load blog for editing.');
    }
  };

  const handleTitleChange = (val) => {
    setFormState(prev => ({
      ...prev,
      title: val,
      slug: prev.slug || generateSlug(val)
    }));
  };

  const handleImageUpload = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'blogs');
      const res = await api.uploadMedia(formData);
      
      const uploadedKey = res.data.r2_key || res.data.url;
      setFormState(prev => ({ ...prev, cover_image_key: uploadedKey }));
    } catch (err) {
      alert('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const insertFormatting = (prefix, suffix = '') => {
    const textarea = document.getElementById('blog-content-area');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end) || 'Text content';

    const replacement = `${prefix}${selected}${suffix}`;
    const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    setFormState(prev => ({ ...prev, content: newContent }));
  };

  const insertLink = () => {
    const url = prompt('Enter URL link target (e.g. https://wwi.org.in/products):');
    if (url) {
      insertFormatting(`<a href="${url}" target="_blank" rel="noreferrer">`, `</a>`);
    }
  };

  const insertImageTag = () => {
    const url = prompt('Enter Image URL or R2 Key:');
    if (url) {
      const resolvedUrl = getImageUrl(url);
      insertFormatting(`<img src="${resolvedUrl}" alt="Article image" class="my-4 rounded-2xl w-full" />`, ``);
    }
  };

  const handleSave = async (targetStatus) => {
    if (!formState.title || !formState.excerpt || !formState.content) {
      setError('Title, excerpt, and content body are required.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      ...formState,
      slug: formState.slug ? generateSlug(formState.slug) : generateSlug(formState.title),
      status: targetStatus || formState.status
    };

    try {
      if (isEditing) {
        await api.updateBlog(id, payload);
      } else {
        await api.createBlog(payload);
      }
      navigate('/v1/admin/blogs');
    } catch (err) {
      setError(err.message || 'Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  };

  const coverUrl = getImageUrl(formState.cover_image_key);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/v1/admin/blogs')}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blogs List
        </button>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-1 rounded-full flex gap-1">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                activeTab === 'editor' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              Write & Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                activeTab === 'preview' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" /> Preview Article
            </button>
          </div>

          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-5 py-2 bg-white/10 text-white text-xs font-bold rounded-full hover:bg-white/20 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-6 py-2 bg-white text-black text-xs font-extrabold rounded-full hover:bg-gray-200 flex items-center gap-1.5 shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Publish Blog
          </button>
        </div>
      </div>

      {activeTab === 'preview' ? (
        <div className="bg-white text-gray-900 rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400">ARTICLE PREVIEW</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{formState.title || 'Untitled Article'}</h1>
          <p className="text-lg text-gray-600 font-medium">{formState.excerpt}</p>
          {coverUrl && (
            <div className="h-64 rounded-2xl bg-gray-900 overflow-hidden relative">
              <img
                src={coverUrl}
                alt="Cover"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed pt-4 border-t border-gray-100"
            dangerouslySetInnerHTML={{ __html: formState.content || '<p className="text-gray-400">No article content written yet.</p>' }}
          />
        </div>
      ) : (
        <div className="bg-[#14161a] border border-white/10 rounded-3xl p-8 space-y-6">
          <h1 className="text-xl font-bold">{isEditing ? 'Edit Blog Article' : 'Create New Blog Article'}</h1>

          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">BLOG TITLE *</label>
              <input
                type="text"
                required
                value={formState.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Building Knora: AI-Powered Learning Platform"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-gray-500 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">CUSTOM SLUG URL *</label>
              <input
                type="text"
                required
                value={formState.slug}
                onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                placeholder="building-knora-ai-powered-learning-platform"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-emerald-400 placeholder-gray-500 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">CATEGORY *</label>
              <select
                value={formState.category}
                onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                className="w-full px-4 py-3 bg-[#1e2026] border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-white"
              >
                <option value="PRODUCT">PRODUCT</option>
                <option value="TEAM BEHIND WWI">TEAM BEHIND WWI</option>
                <option value="BLOG">BLOG</option>
                <option value="DAILY">DAILY</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">AUTHOR *</label>
              <input
                type="text"
                value={formState.author}
                onChange={(e) => setFormState({ ...formState, author: e.target.value })}
                placeholder="WWI Team"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-gray-500 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">COVER IMAGE (R2)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formState.cover_image_key}
                  onChange={(e) => setFormState({ ...formState, cover_image_key: e.target.value })}
                  placeholder="blogs/2026/image.webp"
                  className="flex-1 px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
                />
                <label className="px-3 py-3 bg-white/10 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-white/20 flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  {uploading ? '...' : 'Upload'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">EXCERPT (SHORT SUMMARY) *</label>
            <textarea
              rows={2}
              value={formState.excerpt}
              onChange={(e) => setFormState({ ...formState, excerpt: e.target.value })}
              placeholder="Brief 1-2 sentence summary..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
            />
          </div>

          {/* RICH TEXT FORMATTING TOOLBAR */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400">ARTICLE CONTENT (RICH TEXT HTML) *</label>
              <span className="text-[10px] text-gray-500">Use toolbar buttons to format text</span>
            </div>

            <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/30">
              {/* Toolbar */}
              <div className="bg-white/5 p-2 border-b border-white/10 flex flex-wrap items-center gap-1">
                <button type="button" onClick={() => insertFormatting('<strong>', '</strong>')} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Bold">
                  <Bold className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => insertFormatting('<em>', '</em>')} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Italic">
                  <Italic className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-white/10 mx-1"></div>
                <button type="button" onClick={() => insertFormatting('<h2>', '</h2>')} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Heading 2">
                  <Heading1 className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => insertFormatting('<h3>', '</h3>')} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Heading 3">
                  <Heading2 className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-white/10 mx-1"></div>
                <button type="button" onClick={() => insertFormatting('<ul>\n  <li>', '</li>\n</ul>')} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Unordered List">
                  <List className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => insertFormatting('<ol>\n  <li>', '</li>\n</ol>')} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Ordered List">
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => insertFormatting('<blockquote>', '</blockquote>')} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Blockquote">
                  <Quote className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-white/10 mx-1"></div>
                <button type="button" onClick={insertLink} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Insert Link">
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button type="button" onClick={insertImageTag} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Insert Image">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => insertFormatting('<pre><code>', '</code></pre>')} className="p-2 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Code Block">
                  <Code className="w-4 h-4" />
                </button>
              </div>

              {/* Text Area */}
              <textarea
                id="blog-content-area"
                rows={14}
                value={formState.content}
                onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                placeholder="Write your article content..."
                className="w-full p-4 bg-transparent border-0 text-xs font-mono text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {/* SEO Meta Fields */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-gray-300">SEO Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">SEO Title Tag</label>
                <input
                  type="text"
                  value={formState.seo_title}
                  onChange={(e) => setFormState({ ...formState, seo_title: e.target.value })}
                  placeholder="Custom SEO Title"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-400 mb-1">SEO Meta Description</label>
                <input
                  type="text"
                  value={formState.seo_description}
                  onChange={(e) => setFormState({ ...formState, seo_description: e.target.value })}
                  placeholder="Custom Meta Description"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
