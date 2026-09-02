import './config/env.js';

import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { enforceNoIndexAdmin } from './middleware/seoHeaders.js';

const app = express();

// Security Headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Comprehensive CORS Middleware (Handles Preflight OPTIONS & Dynamic Origins)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Rate Limiting for admin auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many login attempts. Please try again later.' }
});

app.use('/api/v1/admin/login', authLimiter);
app.use('/v1/admin/login', authLimiter);

// Body Parsers & Cookie Parser
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());

// Unauthenticated Health Check Routes
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'WWI Backend',
    status: 'healthy'
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'WWI Backend API',
    status: 'healthy'
  });
});

// Mount Public Routes
app.use('/api', publicRoutes);

// Mount Admin Routes with Strict noindex SEO Headers & Protection
app.use('/api/v1/admin', enforceNoIndexAdmin, adminRoutes);
app.use('/v1/admin', enforceNoIndexAdmin, adminRoutes);

// Root Status Landing Page
app.get('/', (req, res) => {
  res.status(200).send(`
    <html>
      <head><title>WWI Backend API Server</title></head>
      <body style="font-family: system-ui, sans-serif; padding: 2rem; background: #0b0c0e; color: #fff;">
        <h2>⚡ Work Wizards Innovations Backend API</h2>
        <p>Status: <span style="color: #4ade80;">Active & Healthy</span></p>
        <p>Public API: <code>/api</code> | Admin API: <code>/v1/admin</code> | Health: <code>/health</code></p>
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

export default app;
