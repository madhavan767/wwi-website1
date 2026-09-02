import React from 'react';
import { Brain, Sparkles, CheckCircle2, ArrowRight, BookOpen, Target, Zap, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export function KnoraResearchSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-sm space-y-10"
      >
        {/* Top Badge & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
              <Brain className="w-4 h-4" /> Flagship EdTech Product & Research Lab
            </span>
          </div>

          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-2xs">
            Work Wizards Innovations Pvt. Ltd.
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Core Research Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 leading-tight">
              Knora <span className="text-gray-500 font-medium">— Engineering a New Evolution in EdTech</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              On the outside, <strong>Work Wizards Innovations</strong> is an enterprise IT & software engineering firm. But at our core, we operate an advanced <strong>EdTech Research Lab</strong> investigating the real-time conceptual struggles and skill-gap friction faced by graduating technical students.
            </p>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Traditional EdTech relies on passive video lectures. <strong>Knora</strong> is built from our original research into real-time student problem-solving patterns, creating an adaptive platform that diagnoses learning bottlenecks instantly and bridges the gap between college academia and industry readiness.
            </p>

            {/* Research Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-white border border-gray-200 rounded-2xl flex items-start gap-3 shadow-2xs">
                <Brain className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Real-Time Struggle Detection</h4>
                  <p className="text-[11px] text-gray-500">Identify exact logic & concept bottlenecks as students code.</p>
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-2xl flex items-start gap-3 shadow-2xs">
                <Target className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Adaptive Cognitive Pacing</h4>
                  <p className="text-[11px] text-gray-500">AI study paths tailored to individual learning speed.</p>
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-2xl flex items-start gap-3 shadow-2xs">
                <BookOpen className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Graduate Skill-Gap Resolution</h4>
                  <p className="text-[11px] text-gray-500">Direct alignment between university concepts & IT expectations.</p>
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-2xl flex items-start gap-3 shadow-2xs">
                <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Next-Gen EdTech Paradigm</h4>
                  <p className="text-[11px] text-gray-500">Shifting technical education from completion to true mastery.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://knora.in"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 bg-black text-white text-xs font-extrabold rounded-full hover:bg-gray-800 transition-all inline-flex items-center gap-2 shadow-md"
              >
                See About Knora
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="wwi-card p-8 bg-white border border-gray-200 space-y-6 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold rounded-md">
                Core Research Focus
              </span>
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Why WWI Researches EdTech</h3>
            
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Over 80% of technical graduates encounter severe struggle when transitioning into industry roles. Our research lab collects real-time telemetry on learning friction to transform how technical concepts are taught worldwide.
            </p>

            <div className="space-y-2.5 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Empowering graduating students with industry competence</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>AI-powered interactive problem solving & code review</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Dedicated research models for Indian & global university ecosystems</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-center">
              <a
                href="https://knora.in"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-black hover:underline flex items-center justify-center gap-1"
              >
                Visit knora.in <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="text-[10px] text-gray-500 mt-0.5">Flagship product by Work Wizards Innovations Pvt. Ltd.</div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
