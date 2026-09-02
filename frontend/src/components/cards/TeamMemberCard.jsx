import React from 'react';
import { Linkedin, Mail, Instagram, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function TeamMemberCard({ member, reverse = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 py-8 border-b border-gray-200 last:border-b-0`}
    >
      {/* Perfectly Centered Member Photo Frame */}
      <div className="w-full md:w-1/3 flex-shrink-0">
        <div className="relative rounded-3xl overflow-hidden shadow-md bg-gray-100 aspect-[4/3] flex items-center justify-center">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Details */}
      <div className="w-full md:w-2/3 space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{member.name}</h3>
        <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
          {member.role} <span className="text-black">[{member.titleCode}]</span>
        </p>
        <p className="text-sm text-gray-600 leading-relaxed pt-1">
          {member.bio}
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-3 pt-3">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              title={`${member.name} LinkedIn`}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noreferrer"
              title={`${member.name} Instagram`}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {member.portfolio && (
            <a
              href={member.portfolio}
              target="_blank"
              rel="noreferrer"
              title={`${member.name} Portfolio`}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              title={`Email ${member.name}`}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
