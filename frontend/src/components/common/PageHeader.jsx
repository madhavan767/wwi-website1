import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function PageHeader({ title, subtitle, backText = "Back", backLink = "/" }) {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(backLink || '/');
    }
  };

  return (
    <div className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {backText && (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {backText}
          </button>
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight"
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-3 text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
