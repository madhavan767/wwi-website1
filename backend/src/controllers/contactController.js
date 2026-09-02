import { db } from '../services/dbStore.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required fields.' });
    }

    const submissionData = {
      name,
      email,
      phone: phone || null,
      company: company || null,
      subject: subject || 'General Inquiry',
      message
    };

    const newSubmission = await db.createContactSubmission(submissionData);
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get in touch with you shortly.',
      id: newSubmission.id
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({ success: false, message: 'Failed to record contact submission.' });
  }
};

// Admin Contact Management
export const getAdminContactSubmissions = async (req, res) => {
  try {
    const contacts = await db.getContactSubmissions();
    return res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch contact inquiries' });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'new', 'contacted', 'in_progress', 'resolved'
    const updated = await db.updateContactStatus(id, status);
    if (!updated) return res.status(404).json({ success: false, message: 'Contact record not found' });
    return res.status(200).json({ success: true, message: `Status updated to ${status}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update contact inquiry status' });
  }
};

export const deleteContactSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteContactSubmission(id);
    return res.status(200).json({ success: true, message: 'Contact submission deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete contact submission' });
  }
};
