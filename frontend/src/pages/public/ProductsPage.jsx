import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { KnoraResearchSection } from '../../components/sections/KnoraResearchSection';
import { Check, Sparkles, FileText, Lock, Merge, Brain, Clock, BookOpen, Target, Bell, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductsPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Countdown timer state for Knora launch demo
  const [timeLeft, setTimeLeft] = useState({ days: 59, hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="space-y-20 pb-12">
      
      <PageHeader
        title="Our Products"
        subtitle="We design and develop our own innovative digital platforms that solve real-world problems. Each product is built with cutting-edge technology and user-centric design."
      />

      {/* HIGHLIGHTED PRODUCT 1: KNORA (FLAGSHIP EDTECH RESEARCH PLATFORM) */}
      <KnoraResearchSection />

      {/* PRODUCT 2: VIADOCS (Enterprise PDF & Document Management Suite) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 border border-gray-200 text-gray-900 rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-sm space-y-8"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Enterprise Suite • Now Live</span>
          </div>

          <div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">Viadocs</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 font-medium">The all-in-one PDF platform with AI-powered document creation</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Viadocs is our debut enterprise product—a comprehensive PDF management platform designed for students, professionals, and businesses who need powerful document tools at their fingertips.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-gray-800 bg-white border border-gray-200 p-3.5 rounded-xl shadow-2xs font-semibold">
                  <FileText className="w-4 h-4 text-emerald-600" /> Edit, Convert & Compress PDFs
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-800 bg-white border border-gray-200 p-3.5 rounded-xl shadow-2xs font-semibold">
                  <Lock className="w-4 h-4 text-emerald-600" /> Secure Digital Signatures
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-800 bg-white border border-gray-200 p-3.5 rounded-xl shadow-2xs font-semibold">
                  <Merge className="w-4 h-4 text-emerald-600" /> Merge & Split Documents
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-800 bg-white border border-gray-200 p-3.5 rounded-xl shadow-2xs font-semibold">
                  <Brain className="w-4 h-4 text-emerald-600" /> AI-Powered Document Creation
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="https://viadocs.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white font-bold rounded-full text-xs hover:bg-gray-800 transition-all shadow-md"
                >
                  Try Viadocs Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Graphic card side */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">All-In-One PDF Solution</h3>
              <p className="text-xs text-gray-600">Edit, convert, compress, and create PDFs with AI assistance. Everything you need in one powerful platform.</p>
              
              <div className="pt-2">
                <a
                  href="https://viadocs.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
                >
                  Visit viadocs.in <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* KNORA LAUNCH COUNTDOWN & UPDATE SIGNUP */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="wwi-card p-8 sm:p-14 space-y-8 bg-white border border-gray-200"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Platform Launch Roadmap</span>
          </div>

          <div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">KNORA PLATFORM</h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2 font-medium">A revolutionary student-centric platform designed to enhance learning and productivity</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Empowering Students & Researchers</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                KNORA combines smart learning tools, AI-powered cognitive insights, and struggle detection features to help graduating technical students achieve their academic and employment goals.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-gray-50 rounded-xl flex items-start gap-3 border border-gray-100">
                  <BookOpen className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Smart Learning Tools</h4>
                    <p className="text-[11px] text-gray-500">Personalized study plans and progress tracking</p>
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl flex items-start gap-3 border border-gray-100">
                  <Brain className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">AI-Powered Cognitive Insights</h4>
                    <p className="text-[11px] text-gray-500">Intelligent recommendations based on learning patterns</p>
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl flex items-start gap-3 border border-gray-100">
                  <Target className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Comprehensive Resources</h4>
                    <p className="text-[11px] text-gray-500">Curated educational content for software development & AI</p>
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl flex items-start gap-3 border border-gray-100">
                  <Clock className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Time & Struggle Management</h4>
                    <p className="text-[11px] text-gray-500">Built-in study timers and diagnostic bottleneck tools</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="bg-gray-900 text-white rounded-3xl p-8 text-center space-y-6 shadow-md">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Launching In</span>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 bg-white/10 rounded-xl">
                  <div className="text-2xl font-black">{timeLeft.days}</div>
                  <div className="text-[9px] text-gray-400 uppercase font-bold">DAYS</div>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <div className="text-2xl font-black">{timeLeft.hours}</div>
                  <div className="text-[9px] text-gray-400 uppercase font-bold">HOURS</div>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <div className="text-2xl font-black">{timeLeft.minutes}</div>
                  <div className="text-[9px] text-gray-400 uppercase font-bold">MINUTES</div>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <div className="text-2xl font-black">{timeLeft.seconds}</div>
                  <div className="text-[9px] text-gray-400 uppercase font-bold">SECONDS</div>
                </div>
              </div>

              <a
                href="https://knora.in"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-white text-black font-extrabold text-xs rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> Visit knora.in
              </a>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Our Product Philosophy */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 py-16 rounded-3xl border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Product Philosophy</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">We don't just build products—we create solutions that make a real difference.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="wwi-card p-8 text-center space-y-3 bg-white">
            <div className="text-3xl font-black text-black">01</div>
            <h3 className="text-lg font-bold text-gray-900">User-Centric</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Every feature is designed with users in mind.</p>
          </div>

          <div className="wwi-card p-8 text-center space-y-3 bg-white">
            <div className="text-3xl font-black text-black">02</div>
            <h3 className="text-lg font-bold text-gray-900">Innovation First</h3>
            <p className="text-xs text-gray-500 leading-relaxed">We leverage the latest technology to solve problems.</p>
          </div>

          <div className="wwi-card p-8 text-center space-y-3 bg-white">
            <div className="text-3xl font-black text-black">03</div>
            <h3 className="text-lg font-bold text-gray-900">Continuous Growth</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Regular updates and improvements based on feedback.</p>
          </div>
        </div>
      </section>

      {/* Stay Updated Newsletter */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-black text-white rounded-3xl p-10 text-center space-y-6">
          <Sparkles className="w-6 h-6 mx-auto text-emerald-400" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Stay Updated on Our Products</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            Be the first to know about new features, product launches, and exclusive updates.
          </p>

          {subscribed ? (
            <div className="p-4 bg-emerald-900/50 text-emerald-300 text-xs font-bold rounded-2xl max-w-sm mx-auto">
              ✓ Subscribed! We will keep you updated.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 rounded-full bg-white/10 text-white placeholder-gray-400 text-xs focus:outline-none border border-white/20"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-black font-bold text-xs rounded-full hover:bg-gray-200 transition-all flex-shrink-0"
              >
                Subscribe for Updates
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
