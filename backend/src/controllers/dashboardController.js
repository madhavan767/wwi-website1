import { db } from '../services/dbStore.js';

export const getAdminDashboardStats = async (req, res) => {
  try {
    const stats = await db.getDashboardStats();
    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch admin dashboard statistics' });
  }
};
