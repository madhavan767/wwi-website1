import { db } from '../services/dbStore.js';
import { r2Service } from '../services/r2Service.js';
import crypto from 'crypto';
import path from 'path';

export const submitApplication = async (req, res) => {
  try {
    const {
      career_id,
      name,
      email,
      phone,
      current_role,
      portfolio_url,
      experience_years,
      education_level,
      institution,
      notice_period,
      cover_letter,
      answers,
      consent_agreed
    } = req.body;

    const file = req.file;

    if (!name || !email || !file) {
      return res.status(400).json({ success: false, message: 'Name, email, and resume file are required.' });
    }

    // Generate unique R2 key for private resume storage
    const ext = path.extname(file.originalname).toLowerCase() || '.pdf';
    const resumeKey = `careers/resumes/${crypto.randomUUID()}${ext}`;

    // Upload resume to Cloudflare R2 / Private Storage
    await r2Service.uploadFile(resumeKey, file.buffer, file.mimetype);

    let parsedAnswers = {};
    if (answers) {
      try {
        parsedAnswers = typeof answers === 'string' ? JSON.parse(answers) : answers;
      } catch (e) {
        parsedAnswers = {};
      }
    }

    // Save detailed 3-step application metadata to Supabase / Database
    const appData = {
      career_id: career_id || null,
      name,
      email,
      phone: phone || null,
      current_role: current_role || null,
      portfolio_url: portfolio_url || null,
      experience_years: experience_years || null,
      education_level: education_level || null,
      institution: institution || null,
      notice_period: notice_period || null,
      cover_letter: cover_letter || null,
      resume_key: resumeKey,
      answers: parsedAnswers,
      consent_agreed: consent_agreed === 'true' || consent_agreed === true,
      status: 'new'
    };

    const newApp = await db.createApplication(appData);
    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Our talent acquisition team will review your application.',
      application_id: newApp.id
    });
  } catch (error) {
    console.error('Application submission error:', error);
    return res.status(500).json({ success: false, message: 'Failed to process job application. Please try again.' });
  }
};

// Admin Applications Management
export const getAdminApplications = async (req, res) => {
  try {
    const apps = await db.getApplications();
    return res.status(200).json({ success: true, count: apps.length, data: apps });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await db.updateApplicationStatus(id, status);
    if (!updated) return res.status(404).json({ success: false, message: 'Application not found' });
    return res.status(200).json({ success: true, message: `Application status updated to ${status}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update application status' });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await db.getApplicationById(id);
    if (app && app.resume_key) {
      await r2Service.deleteFile(app.resume_key);
    }
    await db.deleteApplication(id);
    return res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete application' });
  }
};

export const downloadPrivateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await db.getApplicationById(id);
    if (!app || !app.resume_key) {
      return res.status(404).json({ success: false, message: 'Resume file not found' });
    }

    const fileData = await r2Service.getFileStream(app.resume_key);
    
    res.setHeader('Content-Type', fileData.contentType || 'application/pdf');
    if (fileData.contentLength) {
      res.setHeader('Content-Length', fileData.contentLength);
    }
    const downloadName = `Resume_${app.name.replace(/\s+/g, '_')}_${app.id.slice(0, 6)}${path.extname(app.resume_key)}`;
    res.setHeader('Content-Disposition', `inline; filename="${downloadName}"`);

    if (fileData.stream.pipe) {
      fileData.stream.pipe(res);
    } else {
      const byteArray = await fileData.stream.transformToByteArray();
      res.send(Buffer.from(byteArray));
    }
  } catch (error) {
    console.error('Download resume error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve resume from private storage' });
  }
};
