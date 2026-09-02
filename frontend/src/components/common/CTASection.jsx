import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTASection({
  title = "Ready to Transform Your Digital Presence?",
  subtitle = "Join forces with Work Wizards Innovations and bring your vision to life.",
  buttonText = "Get In Touch",
  buttonLink = "/contact",
  secondaryButtonText = null,
  secondaryButtonLink = null
}) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-black text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Innovating Web, Apps & Beyond</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={buttonLink}
            className="px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 text-sm shadow-md"
          >
            {buttonText}
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {secondaryButtonText && secondaryButtonLink && (
            <Link
              to={secondaryButtonLink}
              className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
