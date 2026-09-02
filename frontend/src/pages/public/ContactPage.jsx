import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Send, CheckCircle2, Phone, Mail, Linkedin, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { api } from '../../services/api';

export function ContactPage() {
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
    <div className="space-y-12 pb-16">
      
      <PageHeader
        title="Get In Touch"
        subtitle="Have a project in mind? Let's discuss how we can help bring your ideas to life."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-2 wwi-card p-8">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
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
                    rows={5}
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

          {/* Connect With Us Side */}
          <div className="wwi-card p-8 space-y-6 flex flex-col justify-between bg-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect With Us</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Follow us on social media to stay updated with our latest innovations and products.
              </p>

              <div className="space-y-3 font-medium text-xs text-gray-700">
                <a href="https://www.linkedin.com/company/workwizardsinnovations" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://www.instagram.com/workwizardsinnovations/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="https://www.facebook.com/workwizardsinnovations" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
                <a href="https://x.com/workwizards26" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Twitter className="w-4 h-4" /> X (Twitter)
                </a>
                <a href="https://www.youtube.com/@WorkWizardsInnovations" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Youtube className="w-4 h-4" /> YouTube
                </a>
                <a href="tel:+919618131779" className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Phone className="w-4 h-4" /> +91 96181 31779
                </a>
                <a href="mailto:official@wwi.org.in" className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:bg-black hover:text-white transition-all">
                  <Mail className="w-4 h-4" /> official@wwi.org.in
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
