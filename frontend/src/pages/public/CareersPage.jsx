import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CareerCard } from '../../components/cards/CareerCard';
import { api } from '../../services/api';
import { Globe, Clock, BookOpen, Heart, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CareersPage() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const res = await api.getCareers();
      setCareers(res.data || []);
    } catch (err) {
      console.error('Error fetching careers:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-20 pb-12">
      
      {/* Hero Header */}
      <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Join the company with the bold new vision.
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              At Work Wizards Innovations, we're shaping the future of digital solutions. Join us to build cutting-edge web and mobile platforms, work with emerging technologies, and solve real-world problems—all while growing your career in a collaborative, remote-first environment.
            </p>
            <div className="pt-2">
              <a href="#openings" className="px-6 py-3 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all inline-block">
                Job openings ↓
              </a>
            </div>
          </div>

          {/* Photo gallery preview */}
          <div className="w-full md:w-1/2 grid grid-cols-3 gap-3">
            <div className="rounded-2xl overflow-hidden shadow-sm h-36 bg-gray-200">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" alt="Team" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm h-36 bg-gray-200">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400" alt="Workspace" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm h-36 bg-gray-200">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400" alt="Collaboration" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Grounded and Ground-breaking Culture */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400">CAREERS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1">Grounded and ground-breaking.</h2>
          <p className="text-sm text-gray-500 mt-2">We're changing the paradigm every day, with curiosity, vision, and deep expertise.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="wwi-card p-8 space-y-2">
            <span className="text-xs font-bold text-gray-400">01</span>
            <h3 className="text-lg font-bold text-gray-900">Fueled by Curiosity</h3>
            <p className="text-xs text-gray-500 leading-relaxed">We encourage experimentation and creative problem-solving. Every idea matters, every voice is heard.</p>
          </div>

          <div className="wwi-card p-8 space-y-2">
            <span className="text-xs font-bold text-gray-400">02</span>
            <h3 className="text-lg font-bold text-gray-900">Move Fast, Build Smart</h3>
            <p className="text-xs text-gray-500 leading-relaxed">We ship with speed and precision, iterating quickly while maintaining high quality standards.</p>
          </div>

          <div className="wwi-card p-8 space-y-2">
            <span className="text-xs font-bold text-gray-400">03</span>
            <h3 className="text-lg font-bold text-gray-900">People First</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Flexible work, open culture, and genuine care for every team member's growth and wellbeing.</p>
          </div>

          <div className="wwi-card p-8 space-y-2">
            <span className="text-xs font-bold text-gray-400">04</span>
            <h3 className="text-lg font-bold text-gray-900">Grow Together</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Mentorship, learning budgets, and real ownership. Your career accelerates here.</p>
          </div>
        </div>
      </section>

      {/* Why Work at WWI Benefits */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 py-16 rounded-3xl border border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Why Work at WWI?</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          <div className="wwi-card p-6 flex flex-col items-center justify-center space-y-2">
            <Globe className="w-6 h-6 text-black" />
            <h3 className="text-xs font-bold text-gray-900">Remote First</h3>
          </div>
          <div className="wwi-card p-6 flex flex-col items-center justify-center space-y-2">
            <Clock className="w-6 h-6 text-black" />
            <h3 className="text-xs font-bold text-gray-900">Flexible Hours</h3>
          </div>
          <div className="wwi-card p-6 flex flex-col items-center justify-center space-y-2">
            <BookOpen className="w-6 h-6 text-black" />
            <h3 className="text-xs font-bold text-gray-900">Learning Budget</h3>
          </div>
          <div className="wwi-card p-6 flex flex-col items-center justify-center space-y-2">
            <Heart className="w-6 h-6 text-black" />
            <h3 className="text-xs font-bold text-gray-900">Team Events</h3>
          </div>
        </div>
      </section>

      {/* DYNAMIC OPEN POSITIONS */}
      <section id="openings" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Open Positions</h2>
          <p className="text-sm text-gray-500 mt-2">Find your next role and start building the future with us</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400 text-sm font-medium">Loading open positions...</div>
        ) : careers.length === 0 ? (
          <div className="wwi-card p-12 text-center text-gray-500 space-y-3">
            <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-base font-bold text-gray-800">No specific roles published at the moment.</p>
            <p className="text-xs text-gray-500">You can still send us a general application below!</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-5xl mx-auto">
            {careers.map((career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>
        )}

        {/* General Application Banner */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-black text-white rounded-3xl p-10 text-center space-y-4">
            <h3 className="text-2xl font-bold">Don't see your role?</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              We're always looking for talented people. Send us a general application and we'll reach out when a matching role opens up.
            </p>
            <div>
              <Link
                to="/careers/apply"
                className="px-8 py-3.5 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-all inline-flex items-center gap-2"
              >
                Open General Application →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
