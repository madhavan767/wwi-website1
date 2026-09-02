import { r2Service } from '../services/r2Service.js';
import { db } from '../services/dbStore.js';
import crypto from 'crypto';
import path from 'path';

export const getAdminMediaList = async (req, res) => {
  try {
    const list = await db.getMediaList();
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch media assets' });
  }
};

export const uploadMediaFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'No media file provided.' });
    }

    const folder = req.body.folder || 'blogs';
    const ext = path.extname(file.originalname).toLowerCase() || '.webp';
    const r2Key = `${folder}/${crypto.randomUUID()}${ext}`;

    // Upload directly to Cloudflare R2 Bucket
    const { key, url } = await r2Service.uploadFile(r2Key, file.buffer, file.mimetype);

    // Also compute public backend stream fallback URL
    const publicStreamUrl = `/api/media/r2/${key}`;

    const mediaRecord = await db.recordMediaUpload({
      r2_key: key,
      filename: file.originalname,
      mime_type: file.mimetype,
      size: file.size,
      uploaded_by: req.admin?.id || null
    });

    return res.status(201).json({
      success: true,
      message: 'Media uploaded to Cloudflare R2 successfully',
      data: {
        id: mediaRecord.id,
        r2_key: key,
        url: url || publicStreamUrl,
        public_stream_url: publicStreamUrl,
        filename: file.originalname
      }
    });
  } catch (error) {
    console.error('Media upload error:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload media to Cloudflare R2' });
  }
};

export const deleteMediaAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const r2Key = await db.deleteMedia(id);
    if (r2Key) {
      await r2Service.deleteFile(r2Key);
    }
    return res.status(200).json({ success: true, message: 'Media asset deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete media asset' });
  }
};
