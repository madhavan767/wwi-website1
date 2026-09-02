import express from 'express';
import { getPublicBlogs, getPublicBlogBySlug } from '../controllers/blogController.js';
import { getPublicCareers, getPublicCareerBySlug } from '../controllers/careerController.js';
import { submitApplication } from '../controllers/applicationController.js';
import { submitContactForm } from '../controllers/contactController.js';
import { uploadResume } from '../middleware/upload.js';
import { db } from '../services/dbStore.js';
import { r2Service } from '../services/r2Service.js';
import path from 'path';

const router = express.Router();

// Public Blog Routes
router.get('/blogs', getPublicBlogs);
router.get('/blogs/:slug', getPublicBlogBySlug);

// Public Career Routes
router.get('/careers', getPublicCareers);
router.get('/careers/:slug', getPublicCareerBySlug);

// User Form Submissions
router.post('/applications', uploadResume, submitApplication);
router.post('/contact', submitContactForm);

// Community Email Signups
router.post('/community/join', async (req, res) => {
  try {
    const { email, role_interest } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }
    const subscriber = await db.createCommunitySubscriber(email, role_interest || 'Developer / Student');
    return res.status(201).json({
      success: true,
      message: 'Welcome to the WWI Community! You have successfully subscribed for updates.',
      data: subscriber
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to join community.' });
  }
});

// Stream Media Directly from Cloudflare R2 to Public Users
router.get('/media/r2/*', async (req, res) => {
  try {
    const r2Key = req.params[0];
    if (!r2Key) {
      return res.status(404).send('Media key not provided');
    }

    const fileData = await r2Service.getFileStream(r2Key);
    res.setHeader('Content-Type', fileData.contentType || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    if (fileData.contentLength) {
      res.setHeader('Content-Length', fileData.contentLength);
    }

    if (fileData.stream.pipe) {
      fileData.stream.pipe(res);
    } else {
      const byteArray = await fileData.stream.transformToByteArray();
      res.send(Buffer.from(byteArray));
    }
  } catch (error) {
    console.error('R2 Media Stream Error:', error);
    res.status(404).send('Image not found in R2 storage');
  }
});

// System Healthcheck
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    company: 'Work Wizards Innovations Pvt. Ltd.'
  });
});

// Dynamic sitemap.xml generator
router.get('/sitemap.xml', async (req, res) => {
  try {
    const blogs = await db.getBlogs({ status: 'published' });
    const careers = await db.getCareers({ status: 'published' });

    const baseUrl = 'https://wwi.org.in';
    const staticPages = ['', '/about', '/services/web', '/services/app', '/services/maintenance', '/services/social-sphere', '/products', '/careers', '/blogs', '/community', '/contact'];

    let urls = staticPages.map(p => `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p === '' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n');

    blogs.forEach(b => {
      urls += `\n  <url>\n    <loc>${baseUrl}/blogs/${b.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    });

    careers.forEach(c => {
      urls += `\n  <url>\n    <loc>${baseUrl}/careers/${c.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

// Dynamic robots.txt generator
router.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *\nDisallow: /v1/admin/\nDisallow: /v1/admin/*\nAllow: /\n\nSitemap: https://wwi.org.in/sitemap.xml\n`;
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robots);
});

export default router;
