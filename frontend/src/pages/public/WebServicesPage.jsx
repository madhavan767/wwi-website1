import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { CTASection } from '../../components/common/CTASection';
import { Code, Layout, Zap, Search, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WebServicesPage() {
  const techStack = [
    { title: 'React.js', desc: 'Modern UI library for dynamic interfaces' },
    { title: 'Node.js', desc: 'Server-side JavaScript runtime' },
    { title: 'Express.js', desc: 'Fast, minimalist web framework' },
    { title: 'Python', desc: 'Versatile backend & AI programming' },
    { title: 'Tailwind CSS', desc: 'Utility-first CSS framework' },
    { title: 'TypeScript', desc: 'Type-safe JavaScript' }
  ];

  const deliverables = [
    { icon: Code, title: 'Clean Code Architecture', desc: 'Well-structured, maintainable code following industry best practices' },
    { icon: Layout, title: 'Modern Design', desc: 'Beautiful, responsive designs that work flawlessly on all devices' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Optimized performance for exceptional user experience' },
    { icon: Search, title: 'SEO Optimized', desc: 'Built with search engine optimization in mind' }
  ];

  const processSteps = [
    { step: '01', title: 'Discovery', desc: 'We understand your business goals and target audience' },
    { step: '02', title: 'Design', desc: 'Create stunning mockups and interactive prototypes' },
    { step: '03', title: 'Development', desc: 'Build with high-end frameworks and modern technologies' },
    { step: '04', title: 'Testing', desc: 'Rigorous quality assurance and cross-device testing' },
    { step: '05', title: 'Launch', desc: 'Deploy and monitor your web application live' },
    { step: '06', title: 'Support', desc: 'Ongoing maintenance, updates, and optimization' }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      <PageHeader
        title="Web Services"
        subtitle="We craft exceptional web experiences using cutting-edge technologies and frameworks. From concept to deployment, we deliver high-performance web solutions tailored to your business needs."
      />

      {/* High-End Technologies Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">High-End Technologies</h2>
          <p className="text-sm text-gray-500 mt-2">We leverage the most powerful and modern frameworks to build robust, scalable web applications.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {techStack.map((t) => (
            <motion.div key={t.title} whileHover={{ y: -3 }} className="wwi-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
              </div>
              <p className="text-xs text-gray-500">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Deliver */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 py-16 rounded-3xl border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">What We Deliver</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {deliverables.map((item) => (
            <div key={item.title} className="wwi-card p-6 flex items-start gap-4">
              <div className="p-3 bg-black text-white rounded-xl">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Development Process (6 Steps) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Development Process</h2>
          <p className="text-sm text-gray-500 mt-2">A proven methodology that ensures quality and timely delivery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((s) => (
            <div key={s.step} className="wwi-card p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-black text-white font-extrabold text-sm rounded-xl flex items-center justify-center flex-shrink-0">
                {s.step}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to Build Your Web Presence?"
        subtitle="Let's create something amazing together with cutting-edge technology."
        buttonText="Get In Touch"
      />

    </div>
  );
}
