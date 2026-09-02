import './config/env.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

// Execute app.listen ONLY for local server execution (NOT inside Vercel Function runtime)
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 WWI Backend API Server running locally on http://localhost:${PORT}`);
    console.log(`📍 Health Check: http://localhost:${PORT}/health`);
    console.log(`📍 Public APIs: http://localhost:${PORT}/api`);
    console.log(`🔒 Private Admin APIs: http://localhost:${PORT}/v1/admin`);
    console.log(`==================================================\n`);
  });
}

export default app;
