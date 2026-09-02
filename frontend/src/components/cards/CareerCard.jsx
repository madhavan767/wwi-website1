import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CareerCard({ career }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="wwi-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight hover:text-black transition-colors">
          <Link to={`/careers/${career.slug}`}>{career.title}</Link>
        </h3>
        <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">{career.description}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 pt-1">
          <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            {career.location}
          </span>
          <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {career.experience}
          </span>
          {career.salary && (
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold">
              {career.salary}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
        <Link
          to={`/careers/${career.slug}`}
          className="flex-1 md:flex-initial px-5 py-2.5 bg-gray-100 text-gray-800 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors text-center"
        >
          View Details
        </Link>
        <Link
          to={`/careers/apply/${career.slug}`}
          className="flex-1 md:flex-initial px-6 py-2.5 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          Apply Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
