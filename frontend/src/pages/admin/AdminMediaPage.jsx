import React, { useState, useEffect } from 'react';
import { Image, Upload, Trash2, Copy, Check } from 'lucide-react';
import { api } from '../../services/api';

export function AdminMediaPage() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminMedia();
      setMediaList(res.data || []);
    } catch (err) {
      console.error('Error fetching media assets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'general');

      await api.uploadMedia(formData);
      fetchMedia();
    } catch (err) {
      alert('Failed to upload file to Cloudflare R2.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this media asset from R2?')) {
      try {
        await api.deleteMedia(id);
        fetchMedia();
      } catch (err) {
        alert('Failed to delete media asset.');
      }
    }
  };

  const handleCopyKey = (key, id) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Cloudflare R2 Media Library</h1>
          <p className="text-xs text-gray-400 mt-0.5">Upload and manage media objects stored in R2 bucket `wwi-media`</p>
        </div>

        <label className="px-5 py-2.5 bg-white text-black font-extrabold text-xs rounded-full hover:bg-gray-200 cursor-pointer flex items-center gap-1.5 shadow-md">
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading to R2...' : 'Upload Media to R2'}
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      <div className="bg-[#14161a] border border-white/10 rounded-3xl p-6">
        {loading ? (
          <div className="p-8 text-center text-xs text-gray-400">Loading media library...</div>
        ) : mediaList.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400 space-y-2">
            <Image className="w-8 h-8 mx-auto text-gray-600" />
            <p>No media files uploaded to R2 yet. Click "Upload Media to R2" to upload images!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaList.map((m) => (
              <div key={m.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="h-32 bg-black/40 rounded-xl overflow-hidden flex items-center justify-center relative">
                  <span className="text-[10px] text-gray-400 font-mono text-center p-2 break-all">{m.filename}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-white truncate">{m.filename}</div>
                  <div className="text-[10px] text-gray-400">Key: <code className="text-emerald-400">{m.r2_key}</code></div>
                  <div className="text-[10px] text-gray-500">{(m.size / 1024).toFixed(1)} KB</div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => handleCopyKey(m.r2_key, m.id)}
                    className="text-[10px] font-bold text-gray-300 hover:text-white flex items-center gap-1"
                  >
                    {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedId === m.id ? 'Copied Key!' : 'Copy R2 Key'}
                  </button>

                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
