import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Check, Sparkles, Phone, Mail, BarChart3, Users, Zap, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function SocialSpherePage() {
  const entryPlan = {
    title: 'Social Media Maintenance Plan',
    desc: 'For businesses that already have content and need professional management support.',
    price1: '₹1,999/mo',
    price1Sub: 'Up to 4 social media handles',
    price2: '₹2,499/mo',
    price2Sub: '5 or more handles',
    features: [
      'Social media handle management (handling provided content)',
      'Maintenance of Meta Ads, Google Adsense & Adestra',
      'Dedicated support hours',
      'Regular posting & account activity management',
      'Basic engagement handling'
    ]
  };

  const allInclusivePlans = [
    {
      name: 'WWI ESSENTIAL',
      price: '₹5,499',
      period: '/month',
      features: [
        'Account/handle management (up to 4 handles)',
        'Ad platform management (AdSense, Meta Ads, Adestra)',
        'Lead handling',
        '24/7 support available',
        '12 static creatives',
        '4 story creatives',
        '2 AI-generated videos/reels',
        'Caption writing & hashtag strategy',
        'Content scheduling',
        'Basic profile optimization',
        'Monthly performance report',
        'AI Image-based branded content'
      ]
    },
    {
      name: 'WWI GROWTH',
      price: '₹7,999',
      period: '/month',
      popular: true,
      features: [
        'Management of 6 social media platforms',
        'Ad platform management (AdSense, Meta Ads, Adestra)',
        'Lead handling',
        '24/7 support available',
        '16-20 posts/month',
        '9-12 story creatives',
        '4 AI-generated short videos/reels',
        'Creative design & caption writing',
        'Monthly content calendar',
        'Competitor analysis',
        'Basic engagement management',
        'Monthly analytics report',
        'AI Visuals + typography video content'
      ]
    },
    {
      name: 'WWI PREMIUM BRAND',
      price: '₹11,999',
      period: '/month',
      features: [
        'Ad platform management (AdSense, Meta Ads, Adestra)',
        'Unlimited social media platforms',
        'Lead handling',
        '24/7 priority support',
        '20-30 posts/month',
        '12-20 story creatives',
        '6-8 AI-generated reels/videos',
        'Premium branded creative designs',
        'Motion graphics content',
        'Typography campaign videos',
        'Advanced audience engagement support',
        'Detailed performance reporting',
        'Campaign strategy & creative planning'
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* Standard Service Page Header */}
      <PageHeader
        title="The Social Sphere"
        subtitle="AI-Powered Content Creation & Social Media Management designed to help businesses scale their digital presence with consistent content, ad management, and audience engagement."
      />

      {/* Feature Icons Bar (Replaced Emojis with Lucide Icons) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs font-bold text-gray-800 flex items-center justify-center gap-2 shadow-2xs">
            <Sparkles className="w-4 h-4 text-black" /> AI Content Engine
          </div>
          <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs font-bold text-gray-800 flex items-center justify-center gap-2 shadow-2xs">
            <BarChart3 className="w-4 h-4 text-black" /> Analytics Telemetry
          </div>
          <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs font-bold text-gray-800 flex items-center justify-center gap-2 shadow-2xs">
            <Users className="w-4 h-4 text-black" /> Audience Engagement
          </div>
          <div className="p-4 bg-white rounded-2xl border border-gray-200 text-xs font-bold text-gray-800 flex items-center justify-center gap-2 shadow-2xs">
            <Zap className="w-4 h-4 text-black" /> 24/7 Dedicated Support
          </div>
        </div>
      </section>

      {/* Choose Your Plan */}
      <section id="plans" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Service Plans & Pricing</h2>
          <p className="text-sm text-gray-500 mt-2">Flexible plans designed for every stage of your brand's growth</p>
        </div>

        {/* Entry Level Plan */}
        <div className="max-w-4xl mx-auto mb-16">
          <span className="block text-center text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-4">ENTRY-LEVEL SERVICE PLAN</span>
          <div className="wwi-card p-8 bg-gray-50/50">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{entryPlan.title}</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-md">{entryPlan.desc}</p>
              </div>
              <Link to="/contact" className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all flex items-center gap-1.5">
                Contact For Service <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <div className="text-xl font-extrabold text-black">{entryPlan.price1}</div>
                <div className="text-[10px] text-gray-400 font-semibold">{entryPlan.price1Sub}</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <div className="text-xl font-extrabold text-black">{entryPlan.price2}</div>
                <div className="text-[10px] text-gray-400 font-semibold">{entryPlan.price2Sub}</div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-gray-700">
              {entryPlan.features.map(f => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-black flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All Inclusive Plans Grid */}
        <div className="max-w-7xl mx-auto">
          <span className="block text-center text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-8">ALL-INCLUSIVE SERVICE PLANS</span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allInclusivePlans.map((p) => (
              <motion.div
                key={p.name}
                whileHover={{ y: -4 }}
                className={`wwi-card p-8 flex flex-col justify-between ${p.popular ? 'border-2 border-black shadow-xl relative' : ''}`}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-extrabold tracking-wider uppercase px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xs font-extrabold tracking-wider text-gray-400 uppercase">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900">{p.price}</span>
                    <span className="text-xs font-bold text-gray-500">{p.period}</span>
                  </div>

                  <ul className="space-y-2.5 my-8 text-xs text-gray-700">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className={`w-full py-3 text-center text-xs font-bold rounded-full transition-all flex items-center justify-center gap-1.5 ${
                    p.popular ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Contact For Service <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Contact Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-black text-white rounded-3xl p-10 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">WWI Enterprise Social Management</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
            For large businesses, agencies, and custom requirements—reach out directly to our dedicated engineering & growth team.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a href="tel:+919618131779" className="px-5 py-2.5 bg-white/10 rounded-full text-xs font-semibold text-white flex items-center gap-2 hover:bg-white/20">
              <Phone className="w-3.5 h-3.5" /> +91 96181 31779
            </a>
            <a href="tel:+919492033686" className="px-5 py-2.5 bg-white/10 rounded-full text-xs font-semibold text-white flex items-center gap-2 hover:bg-white/20">
              <Phone className="w-3.5 h-3.5" /> +91 94920 33686
            </a>
            <a href="mailto:thesocialsphere@wwi.org.in" className="px-5 py-2.5 bg-white text-black rounded-full text-xs font-bold flex items-center gap-2 hover:bg-gray-200">
              <Mail className="w-3.5 h-3.5" /> thesocialsphere@wwi.org.in
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
