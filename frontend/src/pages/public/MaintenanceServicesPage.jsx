import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { CTASection } from '../../components/common/CTASection';
import { Wrench, ShieldAlert, Activity, Headset, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function MaintenanceServicesPage() {
  const managementAreas = [
    { icon: Wrench, title: 'Technical Maintenance', desc: 'Regular updates, bug fixes, and performance optimization to keep your systems running smoothly.' },
    { icon: ShieldAlert, title: 'Security Updates', desc: 'Proactive security monitoring and patches to protect against vulnerabilities.' },
    { icon: Activity, title: 'Performance Monitoring', desc: '24/7 monitoring and optimization to ensure peak performance.' },
    { icon: Headset, title: 'Technical Support', desc: 'Dedicated support team ready to resolve your tech issues quickly.' }
  ];

  const plans = [
    {
      name: 'Basic Support',
      desc: 'Ideal for: Small businesses with stable applications',
      features: [
        'Bug fixes and minor updates',
        'Email support (48hr response)',
        'Monthly performance reports',
        'Security patches'
      ]
    },
    {
      name: 'Premium Support',
      featured: true,
      desc: 'Ideal for: Growing businesses requiring active maintenance',
      features: [
        'Priority bug fixes and updates',
        '24/7 email & phone support',
        'Weekly performance monitoring',
        'Feature enhancements',
        'Database optimization'
      ]
    },
    {
      name: 'Enterprise Support',
      desc: 'Ideal for: Large organizations with mission-critical systems',
      features: [
        'Dedicated support team',
        'Real-time monitoring & alerts',
        'Immediate critical issue response',
        'Custom feature development',
        'Infrastructure management',
        'SLA guarantees'
      ]
    }
  ];

  const coverageItems = [
    'Application Updates & Patches',
    'Security Monitoring & Fixes',
    'Performance Optimization',
    'Uptime Monitoring',
    'Bug Fixing & Debugging',
    'Scalability Improvements'
  ];

  return (
    <div className="space-y-16 pb-12">
      
      <PageHeader
        title="Maintenance & Support"
        subtitle="We don't just build your digital solutions—we ensure they stay secure, performant, and up-to-date. Our pay-as-you-go model gives you full technical support without the burden of a full-time tech team."
      />

      {/* Complete Tech Management */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Complete Tech Management</h2>
          <p className="text-sm text-gray-500 mt-2">From routine maintenance to critical support, we handle all your technical needs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {managementAreas.map((item) => (
            <div key={item.title} className="wwi-card p-6 flex items-start gap-4">
              <div className="p-3 bg-black text-white rounded-xl">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flexible Support Plans */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Flexible Support Plans</h2>
          <p className="text-sm text-gray-500 mt-2">Choose the level of support that fits your needs with our pay-as-you-go model.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p) => (
            <motion.div
              key={p.name}
              whileHover={{ y: -4 }}
              className={`wwi-card p-8 flex flex-col justify-between ${p.featured ? 'border-2 border-black shadow-xl relative' : ''}`}
            >
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-extrabold tracking-wider uppercase px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                <p className="text-xs text-gray-500 mt-1 mb-6">{p.desc}</p>

                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="text-xs text-gray-700 flex items-center gap-2">
                      <Check className="w-4 h-4 text-black flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/contact"
                className={`w-full py-3 text-center text-xs font-bold rounded-full transition-all ${
                  p.featured ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Cover Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 py-16 rounded-3xl border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">What We Cover</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {coverageItems.map((item) => (
            <div key={item} className="p-4 bg-white rounded-xl border border-gray-200 text-xs font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Pay-As-You-Go Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="wwi-card p-8 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Pay-As-You-Go Pricing</h3>
          <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
            No long-term contracts or hidden fees. Pay only for the support and maintenance you need, when you need it. Scale up or down based on your requirements without any commitment.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-4 border-t border-gray-100 text-center">
            <div>
              <div className="text-lg font-extrabold text-black">No</div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase">Long-term Contracts</div>
            </div>
            <div>
              <div className="text-lg font-extrabold text-black">24/7</div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase">Monitoring Available</div>
            </div>
            <div>
              <div className="text-lg font-extrabold text-black">100%</div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase">Transparency</div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Technical Support?"
        subtitle="Let us handle your tech issues while you focus on growing your business."
        buttonText="Get Support Now"
      />

    </div>
  );
}
