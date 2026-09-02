import { db } from '../services/dbStore.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await db.findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    // Generate session token (7 days validity)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await db.createSession(admin.id, token, expiresAt);

    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('wwi_admin_session', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful',
      token, // Also send token for SPA Authorization header compatibility
      admin: {
        id: admin.id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server authentication error' });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    if (req.sessionToken) {
      await db.deleteSession(req.sessionToken);
    }
    res.clearCookie('wwi_admin_session');
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Logout failed' });
  }
};

export const getAdminMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin
  });
};
