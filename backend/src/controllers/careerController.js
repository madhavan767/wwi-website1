import { db } from '../services/dbStore.js';
import slugify from 'slugify';

export const getPublicCareers = async (req, res) => {
  try {
    const careers = await db.getCareers({ status: 'published' });
    return res.status(200).json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch active careers' });
  }
};

export const getPublicCareerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const career = await db.getCareerBySlug(slug);
    if (!career || career.status !== 'published') {
      return res.status(404).json({ success: false, message: 'Career position not found' });
    }
    return res.status(200).json({ success: true, data: career });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch career details' });
  }
};

// Admin Career CRUD
export const getAdminCareers = async (req, res) => {
  try {
    const careers = await db.getCareers();
    return res.status(200).json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch admin career list' });
  }
};

export const getAdminCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await db.getCareerById(id);
    if (!career) return res.status(404).json({ success: false, message: 'Career position not found' });
    return res.status(200).json({ success: true, data: career });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving career position' });
  }
};

export const createCareer = async (req, res) => {
  try {
    const { title, department, location, employment_type, experience, salary, description, responsibilities, requirements, skills, deadline, status } = req.body;
    if (!title || !department || !description) {
      return res.status(400).json({ success: false, message: 'Title, department, and description are required' });
    }

    const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now().toString().slice(-4);
    
    const careerPayload = {
      title,
      slug,
      department: department || 'Engineering',
      location: location || 'Remote (India)',
      employment_type: employment_type || 'Full-Time',
      experience: experience || '0-2 Yrs',
      salary: salary || 'Competitive',
      description,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : (responsibilities ? [responsibilities] : []),
      requirements: Array.isArray(requirements) ? requirements : (requirements ? [requirements] : []),
      skills: Array.isArray(skills) ? skills : (skills ? [skills] : []),
      status: status || 'draft',
      deadline: deadline || null
    };

    const newCareer = await db.createCareer(careerPayload);
    return res.status(201).json({ success: true, message: 'Career position created successfully', data: newCareer });
  } catch (error) {
    console.error('Create career error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create career position' });
  }
};

export const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await db.getCareerById(id);
    if (!career) return res.status(404).json({ success: false, message: 'Career position not found' });

    const updated = await db.updateCareer(id, req.body);
    return res.status(200).json({ success: true, message: 'Career updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update career position' });
  }
};

export const toggleCareerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'published', 'closed', 'draft'
    const career = await db.getCareerById(id);
    if (!career) return res.status(404).json({ success: false, message: 'Career position not found' });

    const updated = await db.updateCareer(id, { status });
    return res.status(200).json({ success: true, message: `Career status changed to ${status}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to toggle career status' });
  }
};

export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteCareer(id);
    return res.status(200).json({ success: true, message: 'Career position deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete career position' });
  }
};
