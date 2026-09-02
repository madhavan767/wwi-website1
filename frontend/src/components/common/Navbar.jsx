import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  const isCurrent = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Official WWI Logo Header */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Work Wizards Innovations Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-gray-900">
            Work Wizards <span className="text-gray-500 font-medium">Innovations</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
          <Link
            to="/"
            className={`hover:text-black transition-colors ${isCurrent('/') ? 'text-black font-semibold' : ''}`}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <button
              className={`flex items-center gap-1.5 hover:text-black transition-colors py-2 ${
                location.pathname.startsWith('/services') ? 'text-black font-semibold' : ''
              }`}
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {servicesDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-50 space-y-1"
                >
                  <Link
                    to="/services/web"
                    className="block px-4 py-2.5 text-sm rounded-xl hover:bg-gray-100 font-medium text-gray-800 transition-colors"
                  >
                    Web Services
                    <span className="block text-xs text-gray-500 font-normal">Custom websites & web apps</span>
                  </Link>
                  <Link
                    to="/services/app"
                    className="block px-4 py-2.5 text-sm rounded-xl hover:bg-gray-100 font-medium text-gray-800 transition-colors"
                  >
                    App Development
                    <span className="block text-xs text-gray-500 font-normal">Native iOS, Android & Cross-Platform</span>
                  </Link>
                  <Link
                    to="/services/maintenance"
                    className="block px-4 py-2.5 text-sm rounded-xl hover:bg-gray-100 font-medium text-gray-800 transition-colors"
                  >
                    Maintenance & Support
                    <span className="block text-xs text-gray-500 font-normal">Technical updates & monitoring</span>
                  </Link>
                  <Link
                    to="/services/social-sphere"
                    className="block px-4 py-2.5 text-sm rounded-xl hover:bg-gray-100 font-medium text-gray-800 transition-colors"
                  >
                    The Social Sphere
                    <span className="block text-xs text-gray-500 font-normal">AI-Powered social media growth</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Standalone Products Section Link */}
          <Link
            to="/products"
            className={`hover:text-black transition-colors ${isCurrent('/products') ? 'text-black font-semibold' : ''}`}
          >
            Products
          </Link>

          <Link
            to="/about"
            className={`hover:text-black transition-colors ${isCurrent('/about') ? 'text-black font-semibold' : ''}`}
          >
            About Us
          </Link>

          <Link
            to="/careers"
            className={`hover:text-black transition-colors ${isCurrent('/careers') ? 'text-black font-semibold' : ''}`}
          >
            Careers
          </Link>

          <Link
            to="/contact"
            className={`hover:text-black transition-colors ${isCurrent('/contact') ? 'text-black font-semibold' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all flex items-center gap-1.5 shadow-sm"
          >
            Get In Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-6 space-y-3"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-900 border-b border-gray-100"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-900 border-b border-gray-100"
            >
              Products
            </Link>
            
            <div className="py-2 space-y-2 border-b border-gray-100">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Services</span>
              <Link to="/services/web" onClick={() => setMobileMenuOpen(false)} className="block pl-3 py-1.5 text-sm text-gray-700">Web Services</Link>
              <Link to="/services/app" onClick={() => setMobileMenuOpen(false)} className="block pl-3 py-1.5 text-sm text-gray-700">App Development</Link>
              <Link to="/services/maintenance" onClick={() => setMobileMenuOpen(false)} className="block pl-3 py-1.5 text-sm text-gray-700">Maintenance & Support</Link>
              <Link to="/services/social-sphere" onClick={() => setMobileMenuOpen(false)} className="block pl-3 py-1.5 text-sm text-gray-700">The Social Sphere</Link>
            </div>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-900 border-b border-gray-100"
            >
              About Us
            </Link>

            <Link
              to="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-900 border-b border-gray-100"
            >
              Careers
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-900 border-b border-gray-100"
            >
              Contact
            </Link>

            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-black text-white text-center font-semibold rounded-full block"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
