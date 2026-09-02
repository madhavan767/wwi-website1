import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-28 text-center space-y-6">
      <div className="w-16 h-16 bg-gray-100 text-black font-black text-2xl rounded-2xl flex items-center justify-center mx-auto">
        404
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Page Not Found</h1>
      <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <div>
        <Link
          to="/"
          className="px-8 py-3.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-all inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
