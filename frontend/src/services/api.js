const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim() !== '')
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')
  : (import.meta.env.PROD ? 'https://wwi-website1afafaaeef.vercel.app' : '');

async function fetchAPI(endpoint, options = {}) {
  const defaultHeaders = {
    'Accept': 'application/json'
  };

  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const token = localStorage.getItem('wwi_admin_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    },
    credentials: 'include'
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `HTTP error! Status: ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error [${endpoint}]:`, err);
    throw err;
  }
}

export const api = {
  // Public APIs
  getBlogs: () => fetchAPI('/api/blogs'),
  getBlogBySlug: (slug) => fetchAPI(`/api/blogs/${slug}`),
  getCareers: () => fetchAPI('/api/careers'),
  getCareerBySlug: (slug) => fetchAPI(`/api/careers/${slug}`),
  submitApplication: (formData) => fetchAPI('/api/applications', { method: 'POST', body: formData }),
  submitContact: (payload) => fetchAPI('/api/contact', { method: 'POST', body: JSON.stringify(payload) }),
  joinCommunity: (payload) => fetchAPI('/api/community/join', { method: 'POST', body: JSON.stringify(payload) }),

  // Admin Auth APIs
  adminLogin: (credentials) => fetchAPI('/api/v1/admin/login', { method: 'POST', body: JSON.stringify(credentials) }),
  adminLogout: () => fetchAPI('/api/v1/admin/logout', { method: 'POST' }),
  adminMe: () => fetchAPI('/api/v1/admin/me'),

  // Admin Dashboard Stats
  getAdminStats: () => fetchAPI('/api/v1/admin/dashboard'),

  // Admin Blogs CRUD
  getAdminBlogs: () => fetchAPI('/api/v1/admin/blogs'),
  getAdminBlogById: (id) => fetchAPI(`/api/v1/admin/blogs/${id}`),
  createBlog: (data) => fetchAPI('/api/v1/admin/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id, data) => fetchAPI(`/api/v1/admin/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id) => fetchAPI(`/api/v1/admin/blogs/${id}`, { method: 'DELETE' }),
  publishBlog: (id) => fetchAPI(`/api/v1/admin/blogs/${id}/publish`, { method: 'POST' }),
  unpublishBlog: (id) => fetchAPI(`/api/v1/admin/blogs/${id}/unpublish`, { method: 'POST' }),

  // Admin Careers CRUD
  getAdminCareers: () => fetchAPI('/api/v1/admin/careers'),
  getAdminCareerById: (id) => fetchAPI(`/api/v1/admin/careers/${id}`),
  createCareer: (data) => fetchAPI('/api/v1/admin/careers', { method: 'POST', body: JSON.stringify(data) }),
  updateCareer: (id, data) => fetchAPI(`/api/v1/admin/careers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCareer: (id) => fetchAPI(`/api/v1/admin/careers/${id}`, { method: 'DELETE' }),
  publishCareer: (id) => fetchAPI(`/api/v1/admin/careers/${id}/publish`, { method: 'POST' }),
  closeCareer: (id) => fetchAPI(`/api/v1/admin/careers/${id}/close`, { method: 'POST' }),

  // Admin Applications
  getAdminApplications: () => fetchAPI('/api/v1/admin/applications'),
  updateApplicationStatus: (id, status) => fetchAPI(`/api/v1/admin/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteApplication: (id) => fetchAPI(`/api/v1/admin/applications/${id}`, { method: 'DELETE' }),
  getResumeUrl: (id) => `${API_BASE_URL}/api/v1/admin/applications/${id}/resume`,

  // Admin Contact
  getAdminContacts: () => fetchAPI('/api/v1/admin/contact'),
  updateContactStatus: (id, status) => fetchAPI(`/api/v1/admin/contact/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteContact: (id) => fetchAPI(`/api/v1/admin/contact/${id}`, { method: 'DELETE' }),

  // Admin Community
  getAdminCommunity: () => fetchAPI('/api/v1/admin/community'),
  deleteCommunitySub: (id) => fetchAPI(`/api/v1/admin/community/${id}`, { method: 'DELETE' }),

  // Admin Media
  getAdminMedia: () => fetchAPI('/api/v1/admin/media'),
  uploadMedia: (formData) => fetchAPI('/api/v1/admin/media', { method: 'POST', body: formData }),
  deleteMedia: (id) => fetchAPI(`/api/v1/admin/media/${id}`, { method: 'DELETE' })
};
