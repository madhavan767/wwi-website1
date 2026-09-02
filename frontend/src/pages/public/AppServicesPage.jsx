import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { CTASection } from '../../components/common/CTASection';
import { Smartphone, Apple, Layers, Cpu, Layout, HardDrive, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

export function AppServicesPage() {
  const platforms = [
    { icon: Smartphone, title: 'Native Android', desc: 'Java & Kotlin for optimal Android performance' },
    { icon: Apple, title: 'Native iOS', desc: 'Swift for seamless iPhone and iPad experiences' },
    { icon: Layers, title: 'Cross-Platform', desc: 'React Native & Flutter for multi-platform deployment' }
  ];

  const features = [
    { icon: Cpu, title: 'Native Performance', desc: 'Optimized for speed and responsiveness on every device' },
    { icon: Layout, title: 'Adaptive Design', desc: 'Beautiful interfaces that adapt to any screen size' },
    { icon: HardDrive, title: 'Scalable Architecture', desc: 'Built to grow with your user base' },
    { icon: WifiOff, title: 'Offline Capability', desc: 'Work seamlessly even without internet connection' }
  ];

  const appTypes = [
    { title: 'Business Applications', desc: 'Enterprise-grade apps for internal operations, CRM, inventory management, and workflow automation', tags: ['Employee Management', 'Sales Tracking', 'Inventory Systems'] },
    { title: 'Consumer Applications', desc: 'Engaging apps for end-users with focus on user experience and performance', tags: ['E-commerce Apps', 'Social Platforms', 'Entertainment Apps'] },
    { title: 'Educational Applications', desc: 'Learning platforms and educational tools for students and institutions', tags: ['E-learning Platforms', 'Course Management', 'Study Tools'] }
  ];

  const techList = ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Java', 'Firebase', 'GraphQL', 'REST APIs', 'SQLite', 'Realm'];

  return (
    <div className="space-y-16 pb-12">
      
      <PageHeader
        title="App Development"
        subtitle="We create powerful mobile applications for Android and iOS that deliver exceptional user experiences. From business solutions to consumer apps, we bring your mobile vision to life."
      />

      {/* Multi-Platform Expertise */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Multi-Platform Expertise</h2>
          <p className="text-sm text-gray-500 mt-2">Whether you need native performance or cross-platform efficiency, we've got you covered.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((p) => (
            <motion.div key={p.title} whileHover={{ y: -4 }} className="wwi-card p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-4">
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App Features We Excel At */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 py-16 rounded-3xl border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">App Features We Excel At</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((f) => (
            <div key={f.title} className="wwi-card p-6 flex items-start gap-4">
              <div className="p-3 bg-black text-white rounded-xl">
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{f.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Applications We Build */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Applications We Build</h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {appTypes.map((app) => (
            <div key={app.title} className="wwi-card p-6 space-y-3">
              <h3 className="text-lg font-bold text-gray-900">{app.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{app.desc}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {app.tags.map((t) => (
                  <span key={t} className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies & Tools */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-8">Technologies & Tools</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {techList.map((t) => (
            <span key={t} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-800 text-xs font-bold rounded-xl shadow-xs">
              {t}
            </span>
          ))}
        </div>
      </section>

      <CTASection
        title="Let's Build Your Next App"
        subtitle="Turn your app idea into reality with our expert development team."
        buttonText="Start Your Project"
      />

    </div>
  );
}
