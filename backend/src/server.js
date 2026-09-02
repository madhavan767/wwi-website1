import './config/env.js';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';

import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://wwi.org.in',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true
}));

// Rate Limiting for admin auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many login attempts. Please try again later.' }
});

app.use('/api/v1/admin/login', authLimiter);

// Body Parsers & Cookies
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());

// Static Files Fallback for Local Uploads
const localUploadsDir = path.resolve('backend/uploads');
app.use('/api/media/local', express.static(localUploadsDir));

// Mount Backend API Routes under /api
app.use('/api', publicRoutes);
app.use('/api/v1/admin', adminRoutes);

// Root Status Page
app.get('/', (req, res) => {
  res.status(200).send(`
    <html>
      <head><title>WWI Backend API Server</title></head>
      <body style="font-family: system-ui, sans-serif; padding: 2rem; background: #0b0c0e; color: #fff;">
        <h2>⚡ Work Wizards Innovations Backend API</h2>
        <p>Status: <span style="color: #4ade80;">Active & Ready</span></p>
        <p>Public API: <code>/api</code> | Admin API: <code>/api/v1/admin</code></p>
      </body>
    </html>
  `);
});

// Centralized 404 Handler for APIs
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('[Backend Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 WWI Server running on http://localhost:${PORT}`);
  console.log(`📍 Public APIs: http://localhost:${PORT}/api`);
  console.log(`🔒 Private Admin APIs: http://localhost:${PORT}/api/v1/admin`);
  console.log(`==================================================\n`);
});
