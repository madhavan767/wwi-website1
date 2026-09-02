import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { api } from '../../services/api';
import { User, Briefcase, FileText, Upload, CheckCircle2, ArrowRight, ArrowLeft, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function CareerApplyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(Boolean(slug));
  const [currentStep, setCurrentStep] = useState(1);

  // 3-Step Form State
  const [formState, setFormState] = useState({
    // Step 1: Personal & Professional
    name: '',
    email: '',
    phone: '',
    current_role: '',
    portfolio_url: '',

    // Step 2: Experience, Education & Custom Fields
    experience_years: '0-1 Yrs',
    education_level: 'Bachelor\'s Degree',
    institution: '',
    answers: {},

    // Step 3: Contact & Consent
    notice_period: 'Immediate (0-15 Days)',
    cover_letter: '',
    termsAgreed: false,
    consentAgreed: false
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchCareer();
    }
  }, [slug]);

  const fetchCareer = async () => {
    try {
      setLoading(true);
      const res = await api.getCareerBySlug(slug);
      setCareer(res.data);
    } catch (err) {
      console.error('Error loading position:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomAnswerChange = (fieldId, value) => {
    setFormState(prev => ({
      ...prev,
      answers: { ...prev.answers, [fieldId]: value }
    }));
  };

  const validateStep1 = () => {
    if (!formState.name.trim() || !formState.email.trim() || !formState.phone.trim()) {
      setError('Please fill in your Name, Email, and Phone number to proceed.');
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep2 = () => {
    if (!resumeFile) {
      setError('Please attach your resume file (PDF, DOC, or DOCX) to proceed.');
      return false;
    }

    // Check required custom fields
    if (career?.custom_fields?.length > 0) {
      for (const field of career.custom_fields) {
        if (field.required && !formState.answers[field.id]) {
          setError(`Please complete the required field: "${field.label}"`);
          return false;
        }
      }
    }

    setError(null);
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.termsAgreed || !formState.consentAgreed) {
      setError('Please accept both terms and privacy consent checkboxes to submit your application.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('career_id', career?.id || '');
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('phone', formState.phone);
      formData.append('current_role', formState.current_role);
      formData.append('portfolio_url', formState.portfolio_url);
      formData.append('experience_years', formState.experience_years);
      formData.append('education_level', formState.education_level);
      formData.append('institution', formState.institution);
      formData.append('notice_period', formState.notice_period);
      formData.append('cover_letter', formState.cover_letter);
      formData.append('answers', JSON.stringify(formState.answers));
      formData.append('consent_agreed', 'true');
      formData.append('resume', resumeFile);

      await api.submitApplication(formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit job application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-24 text-gray-400 text-sm font-medium">Loading position application...</div>;
  }

  return (
    <div className="space-y-10 pb-16">
      
      <PageHeader
        title={career ? `Apply for ${career.title}` : 'General Career Application'}
        subtitle={career ? `${career.department} • ${career.location}` : 'Submit your credentials for upcoming openings at Work Wizards Innovations'}
        backText="Back to Careers"
        backLink={career ? `/careers/${career.slug}` : '/careers'}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 -z-0"></div>
            
            {/* Step 1 */}
            <div className={`relative z-10 flex flex-col items-center gap-1.5`}>
              <div className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                currentStep >= 1 ? 'bg-black text-white shadow-md' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-600">Personal</span>
            </div>

            {/* Step 2 */}
            <div className={`relative z-10 flex flex-col items-center gap-1.5`}>
              <div className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                currentStep >= 2 ? 'bg-black text-white shadow-md' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-600">Experience & Resume</span>
            </div>

            {/* Step 3 */}
            <div className={`relative z-10 flex flex-col items-center gap-1.5`}>
              <div className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                currentStep >= 3 ? 'bg-black text-white shadow-md' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-600">Consent & Submit</span>
            </div>
          </div>
        </div>

        {/* Application Card Container */}
        <div className="wwi-card p-8 sm:p-10 bg-white">
          
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">Application Submitted!</h2>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you for applying to Work Wizards Innovations. Our Talent Acquisition team will review your application and resume carefully.
              </p>
              <div className="pt-4">
                <Link to="/careers" className="px-8 py-3 bg-black text-white text-xs font-bold rounded-full inline-block">
                  Return to Careers Overview
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* STEP 1: Personal & Professional Details */}
              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Step 1: Personal & Professional Details</h3>
                    <p className="text-xs text-gray-500">Provide your contact details and professional background</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Venkat Nalla"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">PHONE NUMBER *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">CURRENT DESIGNATION / ROLE</label>
                      <input
                        type="text"
                        placeholder="e.g. Software Engineer / Student"
                        value={formState.current_role}
                        onChange={(e) => setFormState({ ...formState, current_role: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">PORTFOLIO / LINKEDIN URL</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={formState.portfolio_url}
                        onChange={(e) => setFormState({ ...formState, portfolio_url: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all flex items-center gap-2 shadow-md"
                    >
                      Next Step: Experience & Resume
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Experience, Education, Resume & Custom Fields */}
              {currentStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Step 2: Experience, Education & Resume</h3>
                    <p className="text-xs text-gray-500">Provide your background, resume file, and role-specific details</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">YEARS OF EXPERIENCE</label>
                      <select
                        value={formState.experience_years}
                        onChange={(e) => setFormState({ ...formState, experience_years: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      >
                        <option value="0-1 Yrs" className="bg-white text-gray-900 font-semibold py-2">0-1 Yrs (Fresher / Entry)</option>
                        <option value="1-3 Yrs" className="bg-white text-gray-900 font-semibold py-2">1-3 Yrs</option>
                        <option value="3-5 Yrs" className="bg-white text-gray-900 font-semibold py-2">3-5 Yrs</option>
                        <option value="5+ Yrs" className="bg-white text-gray-900 font-semibold py-2">5+ Yrs (Senior)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">HIGHEST EDUCATION LEVEL</label>
                      <select
                        value={formState.education_level}
                        onChange={(e) => setFormState({ ...formState, education_level: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                      >
                        <option value="Bachelor's Degree" className="bg-white text-gray-900 font-semibold py-2">Bachelor's Degree (B.Tech / B.E / B.Sc)</option>
                        <option value="Master's Degree" className="bg-white text-gray-900 font-semibold py-2">Master's Degree (M.Tech / M.Sc / MCA)</option>
                        <option value="High School / Diploma" className="bg-white text-gray-900 font-semibold py-2">High School / Diploma</option>
                        <option value="Other" className="bg-white text-gray-900 font-semibold py-2">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">COLLEGE / UNIVERSITY / INSTITUTION</label>
                    <input
                      type="text"
                      placeholder="e.g. JNTU Hyderabad / IIT Hyderabad"
                      value={formState.institution}
                      onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* Resume Upload Box */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">RESUME / CV (PDF, DOC, DOCX - MAX 10MB) *</label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-black transition-colors bg-gray-50/50">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      {resumeFile ? (
                        <div className="text-xs font-bold text-emerald-700">
                          ✓ Selected: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      ) : (
                        <p className="text-xs text-gray-600 font-medium">
                          Click or drag and drop your resume file here
                        </p>
                      )}
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => e.target.files && e.target.files[0] && setResumeFile(e.target.files[0])}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Dynamic Custom Fields defined by Admin */}
                  {career?.custom_fields?.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Role Specific Questions</h4>
                      {career.custom_fields.map((field) => (
                        <div key={field.id}>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            {field.label} {field.required ? '*' : ''}
                          </label>

                          {field.type === 'text' && (
                            <input
                              type="text"
                              required={field.required}
                              placeholder={field.placeholder || ''}
                              value={formState.answers[field.id] || ''}
                              onChange={(e) => handleCustomAnswerChange(field.id, e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black"
                            />
                          )}

                          {field.type === 'dropdown' && (
                            <select
                              required={field.required}
                              value={formState.answers[field.id] || ''}
                              onChange={(e) => handleCustomAnswerChange(field.id, e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-black"
                            >
                              <option value="" className="bg-white text-gray-900 font-semibold py-2">Select Option...</option>
                              {field.options?.map((opt) => (
                                <option key={opt} value={opt} className="bg-white text-gray-900 font-semibold py-2">{opt}</option>
                              ))}
                            </select>
                          )}

                          {field.type === 'checkbox' && (
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Boolean(formState.answers[field.id])}
                                onChange={(e) => handleCustomAnswerChange(field.id, e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                              />
                              Yes, I confirm
                            </label>
                          )}

                          {field.type === 'textarea' && (
                            <textarea
                              rows={3}
                              required={field.required}
                              placeholder={field.placeholder || ''}
                              value={formState.answers[field.id] || ''}
                              onChange={(e) => handleCustomAnswerChange(field.id, e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full hover:bg-gray-200 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all flex items-center gap-2 shadow-md"
                    >
                      Next Step: Consent & Submit
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Contact Details & Consent Messages */}
              {currentStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Step 3: Contact & Consent Confirmation</h3>
                    <p className="text-xs text-gray-500">Final review and agreement before submission</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">NOTICE PERIOD / AVAILABILITY</label>
                    <select
                      value={formState.notice_period}
                      onChange={(e) => setFormState({ ...formState, notice_period: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    >
                      <option value="Immediate (0-15 Days)" className="bg-white text-gray-900 font-semibold py-2">Immediate (0-15 Days)</option>
                      <option value="30 Days" className="bg-white text-gray-900 font-semibold py-2">30 Days</option>
                      <option value="60 Days" className="bg-white text-gray-900 font-semibold py-2">60 Days</option>
                      <option value="Student / Flexible" className="bg-white text-gray-900 font-semibold py-2">Student / Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">COVER LETTER / ADDITIONAL NOTES</label>
                    <textarea
                      rows={4}
                      placeholder="Share anything else about your experience, motivation, or availability..."
                      value={formState.cover_letter}
                      onChange={(e) => setFormState({ ...formState, cover_letter: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {/* Consents & Agreements */}
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                    <label className="flex items-start gap-3 text-xs text-gray-800 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formState.termsAgreed}
                        onChange={(e) => setFormState({ ...formState, termsAgreed: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black mt-0.5"
                      />
                      <span>
                        I accept the <strong>Work Wizards Innovations Terms of Service</strong> and agree that all provided details are true and accurate. *
                      </span>
                    </label>

                    <label className="flex items-start gap-3 text-xs text-gray-800 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formState.consentAgreed}
                        onChange={(e) => setFormState({ ...formState, consentAgreed: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black mt-0.5"
                      />
                      <span>
                        I consent to Work Wizards Innovations processing my personal data and resume for recruitment purposes in accordance with the <strong>Privacy Policy</strong>. *
                      </span>
                    </label>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full hover:bg-gray-200 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-4 bg-black text-white text-xs font-extrabold rounded-full hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {submitting ? 'Submitting Application...' : 'Submit Application'}
                    </button>
                  </div>
                </motion.div>
              )}

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
