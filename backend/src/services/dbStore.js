import { supabase } from '../config/supabase.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const inMemory = {
  admins: [
    {
      id: 'admin-uuid-001',
      email: 'admin@wwi.org.in',
      password_hash: bcrypt.hashSync('WWI_Admin#2026!', 10),
      created_at: new Date().toISOString()
    }
  ],
  sessions: [],
  blogs: [
    {
      id: 'blog-1',
      title: 'Building Knora: An AI-Powered Learning Platform',
      slug: 'building-knora-ai-powered-learning-platform',
      category: 'PRODUCT',
      excerpt: 'Knora is an ambitious initiative by Work Wizards Innovations aimed at redefining digital education through Artificial Intelligence.',
      content: '<p>Knora is an ambitious initiative by Work Wizards Innovations aimed at redefining digital education through Artificial Intelligence. Designed as a comprehensive learning platform, Knora brings smart learning tools, adaptive study schedules, and AI-driven insights directly to students.</p><h2>The Core Vision</h2><p>Modern education demands personalized pacing. Knora tracks mastery rather than mere completion time, providing targeted problem sets and instant explanations.</p><h3>Key Highlights</h3><ul><li><strong>Adaptive Study Schedules:</strong> Custom routines created by AI according to student progress.</li><li><strong>Instant Explanations:</strong> Break down complex STEM problems step-by-step.</li><li><strong>Comprehensive Resources:</strong> Access thousands of curated practice questions and notes.</li></ul>',
      cover_image_key: 'blogs/knora-banner.webp',
      author: 'WWI Team',
      status: 'published',
      published_at: new Date('2026-02-15').toISOString(),
      seo_title: 'Building Knora: AI Learning Platform | Work Wizards Innovations',
      seo_description: 'Discover how Knora uses AI to revolutionize personalized education.',
      created_at: new Date('2026-02-15').toISOString()
    },
    {
      id: 'blog-2',
      title: 'Meet the Team Behind Work Wizards Innovations',
      slug: 'meet-the-team-behind-work-wizards-innovations',
      category: 'TEAM BEHIND WWI',
      excerpt: 'Meet the passionate minds driving Work Wizards Innovations from student entrepreneurs to technology visionaries.',
      content: '<p>Work Wizards Innovations was born out of a shared passion for engineering elegant, scalable software solutions. Led by CEO Venkat Nalla and CTO Santhosh Boppudi, our team combines technical rigor with forward-thinking design.</p><p>We believe in building products that create real value for businesses, educational institutions, and learners worldwide.</p>',
      cover_image_key: 'blogs/team-photo.webp',
      author: 'WWI Team',
      status: 'published',
      published_at: new Date('2026-02-20').toISOString(),
      seo_title: 'Meet the WWI Team | Leadership & Culture',
      seo_description: 'Learn about the leadership team behind Work Wizards Innovations.',
      created_at: new Date('2026-02-20').toISOString()
    },
    {
      id: 'blog-3',
      title: 'Our Vision for AI and Technology in India',
      slug: 'our-vision-for-ai-and-technology-in-india',
      category: 'BLOG',
      excerpt: 'Artificial Intelligence is transforming industries worldwide, and India is poised to become a global leader in AI-driven innovation.',
      content: '<p>India has a vibrant technology ecosystem. At Work Wizards Innovations, we believe AI integration into everyday business tools and education will unlock tremendous productivity across enterprises and startups alike.</p>',
      cover_image_key: 'blogs/ai-future.webp',
      author: 'Venkat Nalla',
      status: 'published',
      published_at: new Date('2026-02-28').toISOString(),
      seo_title: 'Our Vision for AI and Tech in India | WWI',
      seo_description: 'Exploring India\'s role in global AI innovation and software engineering.',
      created_at: new Date('2026-02-28').toISOString()
    },
    {
      id: 'blog-4',
      title: 'Welcome to Work Wizards Innovations',
      slug: 'welcome-to-work-wizards-innovations',
      category: 'DAILY',
      excerpt: 'Work Wizards Innovations Private Limited (WWI) is an educational research and EdTech company building the future of software.',
      content: '<p>Official announcement: Work Wizards Innovations Private Limited is dedicated to building innovative digital solutions that empower businesses and professionals.</p>',
      cover_image_key: 'blogs/welcome.webp',
      author: 'WWI Editorial',
      status: 'published',
      published_at: new Date('2026-01-10').toISOString(),
      seo_title: 'Welcome to Work Wizards Innovations',
      seo_description: 'Official launch announcement for WWI Pvt. Ltd.',
      created_at: new Date('2026-01-10').toISOString()
    }
  ],
  careers: [
    {
      id: 'career-1',
      title: 'Contract-Based Educator - Knora',
      slug: 'contract-based-educator-knora',
      department: 'Education & Content',
      location: 'Remote (India)',
      employment_type: 'Contract',
      experience: '0-1 Yrs',
      salary: '₹10,000 - ₹15,000 per completed course',
      description: 'Create industry-ready courses for Knora and become an official educator.',
      responsibilities: [
        'Curate structured curriculum for software development and AI tools',
        'Record high-quality video modules and code walkthroughs',
        'Review student projects and provide constructive feedback'
      ],
      requirements: [
        'Strong background in Computer Science or technical domain',
        'Excellent verbal communication in English / Hindi',
        'Prior teaching or mentoring experience is a plus'
      ],
      skills: ['React', 'JavaScript', 'Node.js', 'Content Creation'],
      custom_fields: [
        { id: 'f1', label: 'Primary Subject Expertise', type: 'dropdown', options: ['Full Stack Development', 'Data Structures & Algorithms', 'AI & Machine Learning', 'UI/UX Design'], required: true },
        { id: 'f2', label: 'Sample Video/Demo Teaching Link', type: 'text', placeholder: 'https://youtube.com/... or Google Drive link', required: false }
      ],
      status: 'published',
      deadline: new Date('2026-12-31').toISOString(),
      created_at: new Date('2026-02-01').toISOString()
    },
    {
      id: 'career-2',
      title: 'Full Stack JavaScript Engineer',
      slug: 'full-stack-javascript-engineer',
      department: 'Engineering',
      location: 'Remote / Hyderabad',
      employment_type: 'Full-Time',
      experience: '1-3 Yrs',
      salary: 'Competitive',
      description: 'Build modern web applications, scalable REST APIs, and integration with Supabase and Cloudflare R2.',
      responsibilities: [
        'Develop frontend interfaces using React, Tailwind CSS, and Motion',
        'Architect Node.js/Express APIs and database schemas',
        'Optimize application performance and write unit tests'
      ],
      requirements: [
        'Proficiency in modern JavaScript (ES6+), React, and Node.js',
        'Experience with PostgreSQL / Supabase databases',
        'Solid understanding of Web Security & RESTful API design'
      ],
      skills: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
      custom_fields: [
        { id: 'f3', label: 'GitHub Profile URL', type: 'text', placeholder: 'https://github.com/username', required: true },
        { id: 'f4', label: 'Are you comfortable working remotely?', type: 'checkbox', required: true }
      ],
      status: 'published',
      deadline: new Date('2026-12-31').toISOString(),
      created_at: new Date('2026-02-10').toISOString()
    }
  ],
  applications: [],
  contact_submissions: [],
  community_subscribers: [
    {
      id: 'comm-1',
      email: 'developer@example.com',
      role_interest: 'Full Stack Dev',
      created_at: new Date('2026-02-25').toISOString()
    },
    {
      id: 'comm-2',
      email: 'student@university.edu',
      role_interest: 'Student Enthusiast',
      created_at: new Date('2026-02-27').toISOString()
    }
  ],
  media: []
};

export const db = {
  // Admin Operations
  async findAdminByEmail(email) {
    if (supabase) {
      const { data, error } = await supabase.from('admins').select('*').eq('email', email).single();
      if (!error && data) return data;
    }
    return inMemory.admins.find(a => a.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async createSession(adminId, token, expiresAt) {
    if (supabase) {
      const { data, error } = await supabase.from('sessions').insert({
        admin_id: adminId,
        token,
        expires_at: expiresAt
      }).select().single();
      if (!error && data) return data;
    }
    const session = { id: crypto.randomUUID(), admin_id: adminId, token, expires_at: expiresAt, created_at: new Date().toISOString() };
    inMemory.sessions.push(session);
    return session;
  },

  async getSessionByToken(token) {
    if (supabase) {
      const { data, error } = await supabase.from('sessions').select('*, admins(*)').eq('token', token).single();
      if (!error && data) return data;
    }
    const session = inMemory.sessions.find(s => s.token === token);
    if (!session) return null;
    if (new Date(session.expires_at) < new Date()) return null;
    const admin = inMemory.admins.find(a => a.id === session.admin_id);
    return { ...session, admins: admin };
  },

  async deleteSession(token) {
    if (supabase) {
      await supabase.from('sessions').delete().eq('token', token);
    }
    inMemory.sessions = inMemory.sessions.filter(s => s.token !== token);
  },

  // Blogs Operations
  async getBlogs({ status = null, limit = 50 } = {}) {
    if (supabase) {
      let query = supabase.from('blogs').select('*').order('created_at', { ascending: false }).limit(limit);
      if (status) query = query.eq('status', status);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    let list = inMemory.blogs;
    if (status) list = list.filter(b => b.status === status);
    return list.slice(0, limit);
  },

  async getBlogBySlug(slug) {
    if (supabase) {
      const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
      if (!error && data) return data;
    }
    return inMemory.blogs.find(b => b.slug === slug) || null;
  },

  async getBlogById(id) {
    if (supabase) {
      const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
      if (!error && data) return data;
    }
    return inMemory.blogs.find(b => b.id === id) || null;
  },

  async createBlog(blogData) {
    const newBlog = {
      id: crypto.randomUUID(),
      ...blogData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('blogs').insert(newBlog).select().single();
      if (!error && data) return data;
    }
    inMemory.blogs.unshift(newBlog);
    return newBlog;
  },

  async updateBlog(id, updates) {
    const updatedPayload = { ...updates, updated_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('blogs').update(updatedPayload).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const idx = inMemory.blogs.findIndex(b => b.id === id);
    if (idx !== -1) {
      inMemory.blogs[idx] = { ...inMemory.blogs[idx], ...updatedPayload };
      return inMemory.blogs[idx];
    }
    return null;
  },

  async deleteBlog(id) {
    if (supabase) {
      await supabase.from('blogs').delete().eq('id', id);
    }
    inMemory.blogs = inMemory.blogs.filter(b => b.id !== id);
    return true;
  },

  // Careers Operations
  async getCareers({ status = null } = {}) {
    if (supabase) {
      let query = supabase.from('careers').select('*').order('created_at', { ascending: false });
      if (status) query = query.eq('status', status);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    let list = inMemory.careers;
    if (status) list = list.filter(c => c.status === status);
    return list;
  },

  async getCareerBySlug(slug) {
    if (supabase) {
      const { data, error } = await supabase.from('careers').select('*').eq('slug', slug).single();
      if (!error && data) return data;
    }
    return inMemory.careers.find(c => c.slug === slug) || null;
  },

  async getCareerById(id) {
    if (supabase) {
      const { data, error } = await supabase.from('careers').select('*').eq('id', id).single();
      if (!error && data) return data;
    }
    return inMemory.careers.find(c => c.id === id) || null;
  },

  async createCareer(careerData) {
    const newCareer = {
      id: crypto.randomUUID(),
      ...careerData,
      custom_fields: careerData.custom_fields || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('careers').insert(newCareer).select().single();
      if (!error && data) return data;
    }
    inMemory.careers.unshift(newCareer);
    return newCareer;
  },

  async updateCareer(id, updates) {
    const updatedPayload = { ...updates, updated_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('careers').update(updatedPayload).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const idx = inMemory.careers.findIndex(c => c.id === id);
    if (idx !== -1) {
      inMemory.careers[idx] = { ...inMemory.careers[idx], ...updatedPayload };
      return inMemory.careers[idx];
    }
    return null;
  },

  async deleteCareer(id) {
    if (supabase) {
      await supabase.from('careers').delete().eq('id', id);
    }
    inMemory.careers = inMemory.careers.filter(c => c.id !== id);
    return true;
  },

  // Applications Operations
  async getApplications() {
    if (supabase) {
      const { data, error } = await supabase.from('applications').select('*, careers(title)').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return inMemory.applications;
  },

  async getApplicationById(id) {
    if (supabase) {
      const { data, error } = await supabase.from('applications').select('*').eq('id', id).single();
      if (!error && data) return data;
    }
    return inMemory.applications.find(a => a.id === id) || null;
  },

  async createApplication(appData) {
    const newApp = {
      id: crypto.randomUUID(),
      status: 'new',
      answers: appData.answers || {},
      consent_agreed: appData.consent_agreed ?? true,
      ...appData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('applications').insert(newApp).select().single();
      if (!error && data) return data;
    }
    inMemory.applications.unshift(newApp);
    return newApp;
  },

  async updateApplicationStatus(id, status) {
    const updates = { status, updated_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('applications').update(updates).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const idx = inMemory.applications.findIndex(a => a.id === id);
    if (idx !== -1) {
      inMemory.applications[idx] = { ...inMemory.applications[idx], ...updates };
      return inMemory.applications[idx];
    }
    return null;
  },

  async deleteApplication(id) {
    if (supabase) {
      await supabase.from('applications').delete().eq('id', id);
    }
    inMemory.applications = inMemory.applications.filter(a => a.id !== id);
    return true;
  },

  // Community Subscribers Operations
  async getCommunitySubscribers() {
    if (supabase) {
      const { data, error } = await supabase.from('community_subscribers').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return inMemory.community_subscribers;
  },

  async createCommunitySubscriber(email, roleInterest = 'Developer / Student') {
    const newSub = {
      id: crypto.randomUUID(),
      email,
      role_interest: roleInterest,
      created_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('community_subscribers').insert(newSub).select().single();
      if (!error && data) return data;
    }
    const existing = inMemory.community_subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (!existing) {
      inMemory.community_subscribers.unshift(newSub);
    }
    return newSub;
  },

  async deleteCommunitySubscriber(id) {
    if (supabase) {
      await supabase.from('community_subscribers').delete().eq('id', id);
    }
    inMemory.community_subscribers = inMemory.community_subscribers.filter(s => s.id !== id);
    return true;
  },

  // Contact Submissions Operations
  async getContactSubmissions() {
    if (supabase) {
      const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return inMemory.contact_submissions;
  },

  async createContactSubmission(contactData) {
    const newSubmission = {
      id: crypto.randomUUID(),
      status: 'new',
      ...contactData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('contact_submissions').insert(newSubmission).select().single();
      if (!error && data) return data;
    }
    inMemory.contact_submissions.unshift(newSubmission);
    return newSubmission;
  },

  async updateContactStatus(id, status) {
    const updates = { status, updated_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('contact_submissions').update(updates).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const idx = inMemory.contact_submissions.findIndex(c => c.id === id);
    if (idx !== -1) {
      inMemory.contact_submissions[idx] = { ...inMemory.contact_submissions[idx], ...updates };
      return inMemory.contact_submissions[idx];
    }
    return null;
  },

  async deleteContactSubmission(id) {
    if (supabase) {
      await supabase.from('contact_submissions').delete().eq('id', id);
    }
    inMemory.contact_submissions = inMemory.contact_submissions.filter(c => c.id !== id);
    return true;
  },

  // Media Metadata Operations
  async getMediaList() {
    if (supabase) {
      const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });
      if (!error && data) return data;
    }
    return inMemory.media;
  },

  async recordMediaUpload(mediaData) {
    const newMedia = {
      id: crypto.randomUUID(),
      ...mediaData,
      created_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('media').insert(newMedia).select().single();
      if (!error && data) return data;
    }
    inMemory.media.unshift(newMedia);
    return newMedia;
  },

  async deleteMedia(id) {
    let r2_key = null;
    if (supabase) {
      const { data } = await supabase.from('media').select('r2_key').eq('id', id).single();
      if (data) r2_key = data.r2_key;
      await supabase.from('media').delete().eq('id', id);
    }
    const item = inMemory.media.find(m => m.id === id);
    if (item) r2_key = item.r2_key;
    inMemory.media = inMemory.media.filter(m => m.id !== id);
    return r2_key;
  },

  // Dashboard Aggregates
  async getDashboardStats() {
    const blogs = await this.getBlogs();
    const careers = await this.getCareers();
    const apps = await this.getApplications();
    const contacts = await this.getContactSubmissions();
    const community = await this.getCommunitySubscribers();
    const media = await this.getMediaList();

    return {
      total_blogs: blogs.length,
      published_blogs: blogs.filter(b => b.status === 'published').length,
      active_careers: careers.filter(c => c.status === 'published').length,
      total_applications: apps.length,
      new_applications: apps.filter(a => a.status === 'new').length,
      unread_contacts: contacts.filter(c => c.status === 'new').length,
      total_community: community.length,
      total_media: media.length,
      recent_blogs: blogs.slice(0, 5),
      recent_applications: apps.slice(0, 5),
      recent_contacts: contacts.slice(0, 5),
      recent_community: community.slice(0, 5)
    };
  }
};
