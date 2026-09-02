import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { CTASection } from '../../components/common/CTASection';
import { api } from '../../services/api';
import { Users, Code, GraduationCap, Sparkles, Send, CheckCircle2, Linkedin, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export function CommunityPage() {
  const [email, setEmail] = useState('');
  const [roleInterest, setRoleInterest] = useState('Developer / Engineering');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      await api.joinCommunity({ email, role_interest: roleInterest });
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err.message || 'Failed to join community. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const socialChannels = [
    { name: 'LinkedIn', desc: 'Professional networking, company announcements & career insights', icon: Linkedin, url: 'https://www.linkedin.com/company/workwizardsinnovations', color: 'hover:border-blue-500 hover:text-blue-600' },
    { name: 'Instagram', desc: 'Company culture, event highlights & behind-the-scenes', icon: Instagram, url: 'https://www.instagram.com/workwizardsinnovations/', color: 'hover:border-pink-500 hover:text-pink-600' },
    { name: 'Facebook', desc: 'Community announcements & educational updates', icon: Facebook, url: 'https://www.facebook.com/workwizardsinnovations', color: 'hover:border-blue-700 hover:text-blue-700' },
    { name: 'X (Twitter)', desc: 'Tech news, product updates, and developer discussions', icon: Twitter, url: 'https://x.com/workwizards26', color: 'hover:border-sky-400 hover:text-sky-500' },
    { name: 'YouTube', desc: 'Product demos, developer tutorials & tech research showcases', icon: Youtube, url: 'https://www.youtube.com/@WorkWizardsInnovations', color: 'hover:border-red-600 hover:text-red-600' }
  ];

  return (
    <div className="space-y-20 pb-12">
      
      <PageHeader
        title="WWI Tech Community"
        subtitle="Connecting developers, students, creators, and technology enthusiasts building the next generation of software."
      />

      {/* Community Pillars */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -4 }} className="wwi-card p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">For Developers</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Access modern code architectures, collaborate on tech initiatives, and explore full-stack development best practices.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="wwi-card p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-2">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">For Students</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Gain mentorship, access Knora learning tools, and unlock career opportunities through our hiring partners.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="wwi-card p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">For Creators</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Leverage AI content creation tools, join The Social Sphere growth ecosystem, and showcase your digital products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Media Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Connect Across Platforms</h2>
          <p className="text-sm text-gray-500 mt-2">Follow our official channels to stay engaged with the WWI ecosystem</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialChannels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              className={`wwi-card p-6 flex flex-col justify-between group border border-gray-200 transition-all ${channel.color}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900 group-hover:text-black">{channel.name}</span>
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                    <channel.icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{channel.desc}</p>
              </div>

              <div className="pt-4 text-xs font-bold text-black flex items-center gap-1 group-hover:gap-2 transition-all mt-4">
                Join Channel →
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Community Newsletter Signup Form */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-white">
            <Users className="w-6 h-6" />
          </div>
          
          <h2 className="text-3xl font-extrabold tracking-tight">Join the Community Updates</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Get exclusive invites to dev workshops, student mentorship sessions, product launches, and community events.
          </p>

          {submitted ? (
            <div className="p-4 bg-emerald-900/50 text-emerald-300 text-xs font-bold rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Welcome to the WWI Community! Your email has been saved.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              {error && <div className="p-3 bg-red-900/50 text-red-300 text-xs font-semibold rounded-xl">{error}</div>}

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full bg-white text-gray-900 font-semibold placeholder-gray-500 text-xs focus:outline-none border border-gray-300"
                />

                <select
                  value={roleInterest}
                  onChange={(e) => setRoleInterest(e.target.value)}
                  className="px-4 py-3 rounded-full bg-white text-gray-900 font-semibold text-xs focus:outline-none border border-gray-300"
                >
                  <option value="Developer / Engineering" className="bg-white text-gray-900 font-semibold py-2">Developer</option>
                  <option value="Student / Learner" className="bg-white text-gray-900 font-semibold py-2">Student</option>
                  <option value="Creator / Brand" className="bg-white text-gray-900 font-semibold py-2">Creator</option>
                  <option value="Tech Enthusiast" className="bg-white text-gray-900 font-semibold py-2">Enthusiast</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white text-black font-extrabold text-xs rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Joining...' : 'Join WWI Community'}
              </button>
            </form>
          )}
        </div>
      </section>

      <CTASection />

    </div>
  );
}
