import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { WebServicesPage } from './pages/public/WebServicesPage';
import { AppServicesPage } from './pages/public/AppServicesPage';
import { MaintenanceServicesPage } from './pages/public/MaintenanceServicesPage';
import { SocialSpherePage } from './pages/public/SocialSpherePage';
import { ProductsPage } from './pages/public/ProductsPage';
import { CareersPage } from './pages/public/CareersPage';
import { CareerDetailPage } from './pages/public/CareerDetailPage';
import { CareerApplyPage } from './pages/public/CareerApplyPage';
import { BlogListPage } from './pages/public/BlogListPage';
import { BlogDetailPage } from './pages/public/BlogDetailPage';
import { CommunityPage } from './pages/public/CommunityPage';
import { ContactPage } from './pages/public/ContactPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminBlogsPage } from './pages/admin/AdminBlogsPage';
import { AdminBlogEditorPage } from './pages/admin/AdminBlogEditorPage';
import { AdminCareersPage } from './pages/admin/AdminCareersPage';
import { AdminCareerEditorPage } from './pages/admin/AdminCareerEditorPage';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminContactPage } from './pages/admin/AdminContactPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayoutWrapper({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7f8fa]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayoutWrapper><HomePage /></PublicLayoutWrapper>} />
        <Route path="/about" element={<PublicLayoutWrapper><AboutPage /></PublicLayoutWrapper>} />
        <Route path="/services/web" element={<PublicLayoutWrapper><WebServicesPage /></PublicLayoutWrapper>} />
        <Route path="/services/app" element={<PublicLayoutWrapper><AppServicesPage /></PublicLayoutWrapper>} />
        <Route path="/services/maintenance" element={<PublicLayoutWrapper><MaintenanceServicesPage /></PublicLayoutWrapper>} />
        <Route path="/services/social-sphere" element={<PublicLayoutWrapper><SocialSpherePage /></PublicLayoutWrapper>} />
        <Route path="/products" element={<PublicLayoutWrapper><ProductsPage /></PublicLayoutWrapper>} />
        <Route path="/careers" element={<PublicLayoutWrapper><CareersPage /></PublicLayoutWrapper>} />
        <Route path="/careers/:slug" element={<PublicLayoutWrapper><CareerDetailPage /></PublicLayoutWrapper>} />
        <Route path="/careers/apply" element={<PublicLayoutWrapper><CareerApplyPage /></PublicLayoutWrapper>} />
        <Route path="/careers/apply/:slug" element={<PublicLayoutWrapper><CareerApplyPage /></PublicLayoutWrapper>} />
        <Route path="/blogs" element={<PublicLayoutWrapper><BlogListPage /></PublicLayoutWrapper>} />
        <Route path="/blogs/:slug" element={<PublicLayoutWrapper><BlogDetailPage /></PublicLayoutWrapper>} />
        <Route path="/community" element={<PublicLayoutWrapper><CommunityPage /></PublicLayoutWrapper>} />
        <Route path="/contact" element={<PublicLayoutWrapper><ContactPage /></PublicLayoutWrapper>} />

        {/* Private Admin Login */}
        <Route path="/v1/admin/login" element={<AdminLoginPage />} />

        {/* Private Admin CMS Application Routes */}
        <Route path="/v1/admin" element={<AdminLayout />}>
          <Route path="dashboard/wwi" element={<AdminDashboardPage />} />
          <Route path="blogs" element={<AdminBlogsPage />} />
          <Route path="blogs/create" element={<AdminBlogEditorPage />} />
          <Route path="blogs/edit/:id" element={<AdminBlogEditorPage />} />
          <Route path="careers" element={<AdminCareersPage />} />
          <Route path="careers/create" element={<AdminCareerEditorPage />} />
          <Route path="careers/edit/:id" element={<AdminCareerEditorPage />} />
          <Route path="applications" element={<AdminApplicationsPage />} />
          <Route path="contact" element={<AdminContactPage />} />
          <Route path="media" element={<AdminMediaPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<PublicLayoutWrapper><NotFoundPage /></PublicLayoutWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;
