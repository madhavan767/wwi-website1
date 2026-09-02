import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { TeamMemberCard } from '../../components/cards/TeamMemberCard';
import { CTASection } from '../../components/common/CTASection';
import { ExternalLink } from 'lucide-react';

export function AboutPage() {
  const leadership = [
    {
      name: 'Nalla Venkat',
      role: 'Founder & Chief Executive Officer',
      titleCode: 'CEO',
      bio: 'Nalla Venkat is the founder of Work Wizards Innovations and the visionary behind the company\'s mission and long-term strategy. He leads the organization by defining its direction, identifying new opportunities, and driving innovation across all projects. Venkat focuses on building strong partnerships, guiding the development of new technologies, and ensuring that the company continuously evolves to meet future industry demands.',
      image: '/team/venkat.jpg',
      linkedin: 'https://www.linkedin.com/in/nallavenkat/',
      instagram: 'https://www.instagram.com/venkatnalla_7/',
      portfolio: 'https://venkatnalla.in',
      email: 'venkat@wwi.org.in'
    },
    {
      name: 'Santhosh Boppudi',
      role: 'Co-Founder & Chief Technology Officer',
      titleCode: 'CTO',
      bio: 'Santhosh Boppudi leads the technological development at Work Wizards Innovations. As CTO, he is responsible for designing the company\'s technical architecture, overseeing software development, and ensuring that the products are built using efficient and scalable frameworks. He plays a key role in transforming ideas into functional digital platforms and maintaining the technological backbone of the organization.',
      image: '/team/santhosh.jpg',
      linkedin: 'https://www.linkedin.com/in/santhoshboppudi/',
      instagram: 'https://www.instagram.com/boppudi.wwi/',
      portfolio: 'https://santhoshboppudi.in',
      email: 'santhosh@wwi.org.in'
    },
    {
      name: 'Govinda Sai Ram Thammisetty',
      role: 'Chief Operating Officer',
      titleCode: 'COO',
      bio: 'Govinda Sai Ram Thammisetty manages the operational structure of the company. As COO, he ensures that projects are executed efficiently and that team coordination remains smooth across all activities. He focuses on operational planning, resource management, and maintaining the workflow required to deliver successful products and services.',
      image: '/team/govind.jpg',
      linkedin: 'https://www.linkedin.com/in/govinda-sai-ram/',
      instagram: 'https://www.instagram.com/ram.wwi/',
      email: 'govinda@wwi.org.in'
    },
    {
      name: 'Charan Teja Rajanala',
      role: 'Chief Marketing Officer',
      titleCode: 'CMO',
      bio: 'Charan Teja Rajanala is responsible for the marketing strategy and brand development of Work Wizards Innovations. As CMO, he focuses on promoting the company\'s products, expanding market reach, and building a strong brand presence. His work involves digital marketing strategies, partnership outreach, and ensuring that the company\'s innovations reach the right audience.',
      image: '/team/charan.jpg',
      linkedin: 'https://www.linkedin.com/in/rajanalacharanteja/',
      instagram: 'https://www.instagram.com/charan.wwi/',
      email: 'charan@wwi.org.in'
    },
    {
      name: 'Prudhvi Duvvu',
      role: 'Chief Financial Officer',
      titleCode: 'CFO',
      bio: 'Prudhvi Duvvu oversees the financial planning and management of Work Wizards Innovations. As CFO, he is responsible for managing financial resources, budgeting, and ensuring sustainable financial growth. He plays an important role in maintaining financial stability while supporting the company\'s expansion and long-term business strategy.',
      image: '/team/prudhvi.jpg',
      linkedin: 'https://www.linkedin.com/in/prudhviduvvu/',
      instagram: 'https://www.instagram.com/prudhvi.wwi/',
      email: 'prudhvi@wwi.org.in'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      <PageHeader
        title="Our Story & Team"
        subtitle="The passionate leaders behind Work Wizards Innovations, committed to driving digital transformation and delivering excellence."
      />

      {/* Leadership Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Meet the Leadership</h2>
        </div>

        <div className="space-y-4">
          {leadership.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} reverse={index % 2 === 1} />
          ))}
        </div>
      </section>

      {/* Our Partners Section (Full Rectangular Banner Cards) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 bg-gray-50 rounded-3xl border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Partners</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">Collaborating with brands that share our vision for innovation and growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Partner 1: Vaivaanith */}
          <a
            href="https://vaivaanith.com"
            target="_blank"
            rel="noreferrer"
            className="group relative rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="h-44 sm:h-52 w-full bg-[#f4f7fa] flex items-center justify-center p-6 border-b border-gray-100">
              <img
                src="/partners/vaivaanith.png"
                alt="Vaivaanith Logo"
                className="w-full h-full object-contain max-h-36 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex items-center justify-between bg-white">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                  Vaivaanith <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">PROMOTIONAL PARTNER</span>
              </div>
              <span className="px-4 py-1.5 bg-black text-white text-xs font-bold rounded-full group-hover:bg-gray-800 transition-colors">
                Visit Website
              </span>
            </div>
          </a>

          {/* Partner 2: Mentneo */}
          <a
            href="https://mentneo.com"
            target="_blank"
            rel="noreferrer"
            className="group relative rounded-3xl border border-gray-800 bg-black text-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="h-44 sm:h-52 w-full bg-black flex items-center justify-center p-6 border-b border-gray-800">
              <img
                src="/partners/mentneo.png"
                alt="Mentneo Logo"
                className="w-full h-full object-contain max-h-36 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex items-center justify-between bg-black">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  Mentneo <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">HIRING PARTNER</span>
              </div>
              <span className="px-4 py-1.5 bg-white text-black text-xs font-bold rounded-full group-hover:bg-gray-200 transition-colors">
                Visit Website
              </span>
            </div>
          </a>

        </div>
      </section>

      <CTASection />

    </div>
  );
}
