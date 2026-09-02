import express from 'express';
import { loginAdmin, logoutAdmin, getAdminMe } from '../controllers/authController.js';
import { getAdminDashboardStats } from '../controllers/dashboardController.js';
import { getAdminBlogs, getAdminBlogById, createBlog, updateBlog, toggleBlogPublish, deleteBlog } from '../controllers/blogController.js';
import { getAdminCareers, getAdminCareerById, createCareer, updateCareer, toggleCareerStatus, deleteCareer } from '../controllers/careerController.js';
import { getAdminApplications, updateApplicationStatus, deleteApplication, downloadPrivateResume } from '../controllers/applicationController.js';
import { getAdminContactSubmissions, updateContactStatus, deleteContactSubmission } from '../controllers/contactController.js';
import { getAdminMediaList, uploadMediaFile, deleteMediaAsset } from '../controllers/mediaController.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { enforceNoIndexAdmin } from '../middleware/seoHeaders.js';
import { uploadMedia } from '../middleware/upload.js';
import { db } from '../services/dbStore.js';

const router = express.Router();

// Enforce X-Robots-Tag: noindex, nofollow on all admin routes
router.use(enforceNoIndexAdmin);

// Auth Routes (Unprotected login)
router.post('/login', loginAdmin);
router.post('/logout', requireAdminAuth, logoutAdmin);
router.get('/me', requireAdminAuth, getAdminMe);

// Protected Admin Dashboard
router.get('/dashboard', requireAdminAuth, getAdminDashboardStats);

// Protected Blog CMS
router.get('/blogs', requireAdminAuth, getAdminBlogs);
router.post('/blogs', requireAdminAuth, createBlog);
router.get('/blogs/:id', requireAdminAuth, getAdminBlogById);
router.put('/blogs/:id', requireAdminAuth, updateBlog);
router.delete('/blogs/:id', requireAdminAuth, deleteBlog);
router.post('/blogs/:id/publish', requireAdminAuth, (req, res, next) => { req.body.action = 'publish'; next(); }, toggleBlogPublish);
router.post('/blogs/:id/unpublish', requireAdminAuth, (req, res, next) => { req.body.action = 'unpublish'; next(); }, toggleBlogPublish);

// Protected Careers CMS
router.get('/careers', requireAdminAuth, getAdminCareers);
router.post('/careers', requireAdminAuth, createCareer);
router.get('/careers/:id', requireAdminAuth, getAdminCareerById);
router.put('/careers/:id', requireAdminAuth, updateCareer);
router.delete('/careers/:id', requireAdminAuth, deleteCareer);
router.post('/careers/:id/publish', requireAdminAuth, (req, res, next) => { req.body.status = 'published'; next(); }, toggleCareerStatus);
router.post('/careers/:id/close', requireAdminAuth, (req, res, next) => { req.body.status = 'closed'; next(); }, toggleCareerStatus);

// Protected Applications Management & Secure Private Resume Access
router.get('/applications', requireAdminAuth, getAdminApplications);
router.patch('/applications/:id/status', requireAdminAuth, updateApplicationStatus);
router.get('/applications/:id/resume', requireAdminAuth, downloadPrivateResume);
router.delete('/applications/:id', requireAdminAuth, deleteApplication);

// Protected Contact Submissions
router.get('/contact', requireAdminAuth, getAdminContactSubmissions);
router.patch('/contact/:id/status', requireAdminAuth, updateContactStatus);
router.delete('/contact/:id', requireAdminAuth, deleteContactSubmission);

// Protected Community Subscribers
router.get('/community', requireAdminAuth, async (req, res) => {
  try {
    const list = await db.getCommunitySubscribers();
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch community subscribers' });
  }
});
router.delete('/community/:id', requireAdminAuth, async (req, res) => {
  try {
    await db.deleteCommunitySubscriber(req.params.id);
    return res.status(200).json({ success: true, message: 'Subscriber removed' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to remove subscriber' });
  }
});

// Protected Media Management
router.get('/media', requireAdminAuth, getAdminMediaList);
router.post('/media', requireAdminAuth, uploadMedia, uploadMediaFile);
router.delete('/media/:id', requireAdminAuth, deleteMediaAsset);

export default router;
