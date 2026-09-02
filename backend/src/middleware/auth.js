import { db } from '../services/dbStore.js';

export const requireAdminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.wwi_admin_session || req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Admin session required' });
    }

    const sessionData = await db.getSessionByToken(token);
    if (!sessionData) {
      res.clearCookie('wwi_admin_session');
      return res.status(401).json({ success: false, message: 'Session expired or invalid. Please login again.' });
    }

    req.admin = sessionData.admins || { id: sessionData.admin_id, email: 'admin@wwi.org.in' };
    req.sessionToken = token;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ success: false, message: 'Authentication verification failed' });
  }
};
