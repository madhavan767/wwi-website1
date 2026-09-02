import { db } from '../services/dbStore.js';
import slugify from 'slugify';
import sanitizeHtml from 'sanitize-html';

export const getPublicBlogs = async (req, res) => {
  try {
    const blogs = await db.getBlogs({ status: 'published' });
    return res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch public blogs' });
  }
};

export const getPublicBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await db.getBlogBySlug(slug);
    if (!blog || blog.status !== 'published') {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // Get related posts
    const allBlogs = await db.getBlogs({ status: 'published' });
    const related = allBlogs.filter(b => b.id !== blog.id).slice(0, 3);

    return res.status(200).json({ success: true, data: blog, related });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch blog post' });
  }
};

// Admin Blog CRUD
export const getAdminBlogs = async (req, res) => {
  try {
    const blogs = await db.getBlogs();
    return res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch admin blogs' });
  }
};

export const getAdminBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await db.getBlogById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving blog' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, category, excerpt, content, cover_image_key, author, status, seo_title, seo_description } = req.body;
    if (!title || !excerpt || !content) {
      return res.status(400).json({ success: false, message: 'Title, excerpt, and content are required' });
    }

    const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now().toString().slice(-4);
    
    // Sanitize rich text HTML to prevent XSS
    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'u', 'blockquote', 'code', 'pre']),
      allowedAttributes: {
        '*': ['class', 'style', 'id'],
        'a': ['href', 'target', 'rel'],
        'img': ['src', 'alt', 'width', 'height']
      }
    });

    const blogPayload = {
      title,
      slug,
      category: category || 'General',
      excerpt,
      content: cleanContent,
      cover_image_key: cover_image_key || null,
      author: author || 'WWI Team',
      status: status || 'draft',
      published_at: status === 'published' ? new Date().toISOString() : null,
      seo_title: seo_title || title,
      seo_description: seo_description || excerpt
    };

    const newBlog = await db.createBlog(blogPayload);
    return res.status(201).json({ success: true, message: 'Blog created successfully', data: newBlog });
  } catch (error) {
    console.error('Create blog error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create blog post' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, excerpt, content, cover_image_key, author, status, seo_title, seo_description } = req.body;

    const existing = await db.getBlogById(id);
    if (!existing) return res.status(404).json({ success: false, message: 'Blog not found' });

    let updates = { ...req.body };
    if (content) {
      updates.content = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'u', 'blockquote', 'code', 'pre']),
        allowedAttributes: {
          '*': ['class', 'style', 'id'],
          'a': ['href', 'target', 'rel'],
          'img': ['src', 'alt', 'width', 'height']
        }
      });
    }

    if (status === 'published' && existing.status !== 'published') {
      updates.published_at = new Date().toISOString();
    }

    const updated = await db.updateBlog(id, updates);
    return res.status(200).json({ success: true, message: 'Blog updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update blog post' });
  }
};

export const toggleBlogPublish = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'publish' or 'unpublish'
    const blog = await db.getBlogById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });

    const newStatus = action === 'publish' ? 'published' : 'draft';
    const updates = {
      status: newStatus,
      published_at: action === 'publish' ? new Date().toISOString() : blog.published_at
    };

    const updated = await db.updateBlog(id, updates);
    return res.status(200).json({ success: true, message: `Blog ${newStatus} successfully`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to change blog publish status' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteBlog(id);
    return res.status(200).json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete blog post' });
  }
};
