import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { api } from '../../services/api';
import { MapPin, Clock, Briefcase, DollarSign, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export function CareerDetailPage() {
  const { slug } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCareerDetails();
  }, [slug]);

  const fetchCareerDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getCareerBySlug(slug);
      setCareer(res.data);
    } catch (err) {
      setError(err.message || 'Position not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-24 text-gray-400 text-sm font-medium">Loading position details...</div>;
  }

  if (error || !career) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Career Position Not Found</h2>
        <p className="text-xs text-gray-500">{error || 'The requested job opening could not be located.'}</p>
        <Link to="/careers" className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full inline-block">
          Back to All Openings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      
      <PageHeader
        title={career.title}
        subtitle={`${career.department} • ${career.location} • ${career.employment_type}`}
        backText="Back to Careers"
        backLink="/careers"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white rounded-2xl border border-gray-200">
              <span className="text-[10px] font-extrabold uppercase text-gray-400">Department</span>
              <div className="text-xs font-bold text-gray-900 mt-1">{career.department}</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-200">
              <span className="text-[10px] font-extrabold uppercase text-gray-400">Location</span>
              <div className="text-xs font-bold text-gray-900 mt-1">{career.location}</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-200">
              <span className="text-[10px] font-extrabold uppercase text-gray-400">Experience</span>
              <div className="text-xs font-bold text-gray-900 mt-1">{career.experience}</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-gray-200">
              <span className="text-[10px] font-extrabold uppercase text-gray-400">Compensation</span>
              <div className="text-xs font-bold text-emerald-700 mt-1">{career.salary || 'Competitive'}</div>
            </div>
          </div>

          {/* About the Role */}
          <div className="wwi-card p-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-900">About the Role</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{career.description}</p>
          </div>

          {/* Responsibilities */}
          {career.responsibilities?.length > 0 && (
            <div className="wwi-card p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Key Responsibilities</h3>
              <ul className="space-y-2.5 text-xs text-gray-700">
                {career.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {career.requirements?.length > 0 && (
            <div className="wwi-card p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Requirements & Qualifications</h3>
              <ul className="space-y-2.5 text-xs text-gray-700">
                {career.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Required */}
          {career.skills?.length > 0 && (
            <div className="wwi-card p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-800 text-xs font-bold rounded-xl">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Apply CTA Box */}
        <div className="space-y-6">
          <div className="wwi-card p-8 space-y-6 sticky top-28 bg-white">
            <h3 className="text-xl font-bold text-gray-900">Ready to Apply?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Complete our 3-step application wizard to submit your credentials, experience, and resume.
            </p>

            <Link
              to={`/careers/apply/${career.slug}`}
              className="w-full py-4 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              Apply Now for this Role
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Official WWI Hiring Portal</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>3-Step Quick Application Process</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
