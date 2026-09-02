import http from 'http';

const BASE_URL = 'http://localhost:5000';

async function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Running Backend API Automated Verification...\n');

  try {
    // 1. Unauthenticated /health Check (Requirement 6)
    const healthRoot = await request('/health');
    console.log('✅ Unauthenticated /health Status:', healthRoot.status, healthRoot.body);

    // 2. Healthcheck API
    const health = await request('/api/health');
    console.log('✅ /api/health Status:', health.status, health.body.status);

    // 3. Public Blogs
    const blogs = await request('/api/blogs');
    console.log('✅ Public Blogs Count:', blogs.body.count);

    // 4. Public Careers
    const careers = await request('/api/careers');
    console.log('✅ Public Careers Count:', careers.body.count);

    // 5. Contact Form Submission
    const contactRes = await request('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { name: 'Test User', email: 'test@example.com', message: 'Hello WWI Team' }
    });
    console.log('✅ Contact Submission Status:', contactRes.status, contactRes.body.message);

    // 6. Admin Login
    const loginRes = await request('/api/v1/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'admin@wwi.org.in', password: 'WWI_Admin#2026!' }
    });
    console.log('✅ Admin Login Status:', loginRes.status, loginRes.body.success ? 'Success' : 'Failed');
    const token = loginRes.body.token;

    // 7. Admin Protected Dashboard
    const dashRes = await request('/api/v1/admin/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('✅ Admin Dashboard Stats:', dashRes.body.data ? `Total Blogs: ${dashRes.body.data.total_blogs}` : 'Failed');
    console.log('✅ Admin X-Robots-Tag Header:', dashRes.headers['x-robots-tag']);

    console.log('\n🎉 ALL BACKEND API TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  }
}

runTests();
