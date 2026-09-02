import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Facebook, Youtube, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-200">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Work Wizards Innovations Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="font-extrabold text-lg text-gray-900 tracking-tight">
                Work Wizards Innovations
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Innovating Web, Apps & Beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-black transition-colors">Products</Link></li>
              <li><Link to="/careers" className="hover:text-black transition-colors">Careers</Link></li>
              <li><Link to="/blogs" className="hover:text-black transition-colors">Blogs</Link></li>
              <li><Link to="/community" className="hover:text-black font-semibold text-black transition-colors">Community</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/services/web" className="hover:text-black transition-colors">Web Services</Link></li>
              <li><Link to="/services/app" className="hover:text-black transition-colors">App Development</Link></li>
              <li><Link to="/services/maintenance" className="hover:text-black transition-colors">Maintenance & Support</Link></li>
              <li><Link to="/services/social-sphere" className="hover:text-black transition-colors">The Social Sphere</Link></li>
            </ul>
          </div>

          {/* Legal & Connect */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Legal & Connect</h4>
            <ul className="space-y-2 text-sm font-medium text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-gray-600">
              <a
                href="https://www.linkedin.com/company/workwizardsinnovations"
                target="_blank"
                rel="noreferrer"
                title="WWI LinkedIn"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/workwizardsinnovations/"
                target="_blank"
                rel="noreferrer"
                title="WWI Instagram"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/workwizardsinnovations"
                target="_blank"
                rel="noreferrer"
                title="WWI Facebook"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/workwizards26"
                target="_blank"
                rel="noreferrer"
                title="WWI X (Twitter)"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@WorkWizardsInnovations"
                target="_blank"
                rel="noreferrer"
                title="WWI YouTube"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <p>© 2026 Work Wizards Innovations Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Innovating Web, Apps & Beyond <span className="inline-block w-1.5 h-1.5 rounded-full bg-black"></span>
          </p>
        </div>

      </div>
    </footer>
  );
}
