import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe, Layout, Wrench, Package, Share2, Sparkles, ArrowRight,
  ShieldCheck, Zap, Layers, RefreshCw, Send, CheckCircle2, UserCheck, Phone, Mail, MapPin, Linkedin, Twitter, Instagram, Facebook, Youtube
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CTASection } from '../../components/common/CTASection';
import { KnoraResearchSection } from '../../components/sections/KnoraResearchSection';
import { api } from '../../services/api';

export function HomePage() {
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', company: '', subject: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.submitContact(formState);
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="pt-16 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Official WWI Logo Directly Above Hero Title */}
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/logo.png"
            alt="Work Wizards Innovations Official Logo"
            className="h-20 sm:h-28 w-auto object-contain mb-2 drop-shadow-md"
          />

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
            Work Wizards<br />
            <span className="text-gray-400">Innovations</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Innovating Web, Apps & Beyond.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/services/web"
              className="px-8 py-3.5 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all flex items-center gap-2 shadow-md"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. OUR SERVICES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Our Services</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">Comprehensive digital solutions designed to elevate your business</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Web Services */}
          <motion.div whileHover={{ y: -4 }} className="wwi-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Web Services</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Custom websites tailored for business and reach with modern design and functionality.
              </p>
            </div>
            <Link to="/services/web" className="inline-flex items-center gap-1.5 text-xs font-bold text-black mt-6 hover:gap-2 transition-all">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Card 2: App Development */}
          <motion.div whileHover={{ y: -4 }} className="wwi-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">App Development</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Native Android & iOS applications for business and personal use cases with seamless user experience.
              </p>
            </div>
            <Link to="/services/app" className="inline-flex items-center gap-1.5 text-xs font-bold text-black mt-6 hover:gap-2 transition-all">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Card 3: Maintenance & Support */}
          <motion.div whileHover={{ y: -4 }} className="wwi-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Maintenance & Support</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ongoing technical support for your website and apps to ensure optimal performance and reliability.
              </p>
            </div>
            <Link to="/services/maintenance" className="inline-flex items-center gap-1.5 text-xs font-bold text-black mt-6 hover:gap-2 transition-all">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Card 4: Our Products */}
          <motion.div whileHover={{ y: -4 }} className="wwi-card p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Products</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Innovative homegrown digital platforms designed to solve real-world problems and enhance productivity.
              </p>
            </div>
            <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-black mt-6 hover:gap-2 transition-all">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Card 5: The Social Sphere */}
          <motion.div whileHover={{ y: -4 }} className="wwi-card p-8 flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">The Social Sphere</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                AI-powered content creation & social media management to scale your brand presence efficiently.
              </p>
            </div>
            <Link to="/services/social-sphere" className="inline-flex items-center gap-1.5 text-xs font-bold text-black mt-6 hover:gap-2 transition-all">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 3. KNORA FLAGSHIP PRODUCT & EDTECH RESEARCH SHOWCASE */}
      <KnoraResearchSection />

      {/* 4. WHY CHOOSE US */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 py-16 rounded-3xl border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Why Choose Us</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">We deliver excellence through innovation, reliability, and unwavering commitment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="wwi-card p-6 flex items-start gap-4">
            <div className="p-3 bg-black text-white rounded-xl"><Zap className="w-5 h-5" /></div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Innovation</h3>
              <p className="text-sm text-gray-600 mt-1">Cutting-edge solutions that push the boundaries of what's possible in digital technology.</p>
            </div>
          </div>

          <div className="wwi-card p-6 flex items-start gap-4">
            <div className="p-3 bg-black text-white rounded-xl"><ShieldCheck className="w-5 h-5" /></div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Reliability</h3>
              <p className="text-sm text-gray-600 mt-1">Robust, tested, and dependable systems you can trust for your critical business needs.</p>
            </div>
          </div>

          <div className="wwi-card p-6 flex items-start gap-4">
            <div className="p-3 bg-black text-white rounded-xl"><Layers className="w-5 h-5" /></div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">AI Integration</h3>
              <p className="text-sm text-gray-600 mt-1">Harness the power of artificial intelligence to automate and enhance your workflows.</p>
            </div>
          </div>

          <div className="wwi-card p-6 flex items-start gap-4">
            <div className="p-3 bg-black text-white rounded-xl"><RefreshCw className="w-5 h-5" /></div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Long-Term Support</h3>
              <p className="text-sm text-gray-600 mt-1">Ongoing maintenance and updates to keep your digital assets performing at their best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT US SUMMARY */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">About Us</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="wwi-card p-8 sm:p-10 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Turning Ideas Into Digital Reality</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              At Work Wizards Innovations, we are a next-gen tech startup dedicated to building innovative digital solutions that empower businesses and professionals. Our expertise spans custom web development, mobile app creation, ongoing technical support, and launching our own suite of digital platforms that solve real-world problems.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all"
            >
              Get There <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-6">
            <div className="wwi-card p-6">
              <h4 className="text-lg font-bold text-gray-900">Our Mission</h4>
              <p className="text-sm text-gray-600 mt-2">To deliver cutting-edge digital solutions that drive innovation, efficiency, and growth for our clients and users.</p>
            </div>

            <div className="wwi-card p-6">
              <h4 className="text-lg font-bold text-gray-900">Our Vision</h4>
              <p className="text-sm text-gray-600 mt-2">To be the leading force in digital transformation, creating products and services that shape the future of technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. JOIN OUR TEAM SUMMARY */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 py-16 rounded-3xl border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Join Our Team</h2>
          <p className="text-sm text-gray-500 mt-2">Be part of the next generation of digital innovators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="wwi-card p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Why Work With Us?</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Work on cutting-edge technologies</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Flexible, remote-work options</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Continuous learning opportunities</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black" /> Collaborative team environment</li>
            </ul>
          </div>

          <div className="wwi-card p-8 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">We're Hiring!</h3>
              <p className="text-sm text-gray-600 mt-2">We're always looking for talented individuals to join our growing team. Explore open positions and start your journey with us.</p>
            </div>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all self-start mt-4"
            >
              Explore Careers at WWI <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. MAIN CTA */}
      <CTASection />

      {/* 8. GET IN TOUCH FORM */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Get In Touch</h2>
          <p className="text-sm text-gray-500 mt-2">Have a project in mind? Let's discuss how we can help bring your ideas to life.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-2 wwi-card p-8">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Received!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out to Work Wizards Innovations. Our team will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-xl">{error}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">EMAIL *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">PHONE</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">COMPANY</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">SUBJECT</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">MESSAGE *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className="wwi-card p-8 space-y-6 flex flex-col justify-between bg-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect With Us</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Follow us on social media to stay updated with our latest innovations and products.
              </p>

              <div className="space-y-3 font-medium text-xs text-gray-700">
                <a href="https://www.linkedin.com/company/workwizardsinnovations" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://www.instagram.com/workwizardsinnovations/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="https://www.facebook.com/workwizardsinnovations" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
                <a href="https://x.com/workwizards26" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Twitter className="w-4 h-4" /> X (Twitter)
                </a>
                <a href="https://www.youtube.com/@WorkWizardsInnovations" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Youtube className="w-4 h-4" /> YouTube
                </a>
                <a href="tel:+919618131779" className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Phone className="w-4 h-4" /> +91 96181 31779
                </a>
                <a href="mailto:official@wwi.org.in" className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Mail className="w-4 h-4" /> official@wwi.org.in
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
