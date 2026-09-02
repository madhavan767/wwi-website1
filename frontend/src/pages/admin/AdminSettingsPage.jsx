import React from 'react';
import { Settings, ShieldCheck, Database, HardDrive, Cpu } from 'lucide-react';

export function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">System & Security Settings</h1>
        <p className="text-xs text-gray-400 mt-0.5">Configuration & environment health for Work Wizards Innovations</p>
      </div>

      <div className="bg-[#14161a] border border-white/10 rounded-3xl p-6 space-y-6">
        
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security Controls
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-white">X-Robots-Tag Exclusion</div>
              <div className="text-[10px] text-emerald-400 font-mono">noindex, nofollow, noarchive</div>
              <p className="text-[11px] text-gray-400">All /v1/admin/* HTTP responses carry search engine exclusion headers.</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-white">Session Authentication</div>
              <div className="text-[10px] text-emerald-400 font-mono">HTTP-only Secure Cookie</div>
              <p className="text-[11px] text-gray-400">Admin tokens are signed and stored in HTTP-only cookies.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" /> Supabase Database
          </h2>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs font-bold text-white">Database Host</div>
            <div className="text-[10px] text-gray-300 font-mono">https://svbznhvhllzruuhocmkm.supabase.co</div>
            <p className="text-[11px] text-gray-400">Stores text metadata for blogs, career listings, candidates, and contact form submissions.</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-gray-400 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-purple-400" /> Cloudflare R2 Media Storage
          </h2>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs font-bold text-white">Bucket Name</div>
            <div className="text-[10px] text-gray-300 font-mono">wwi-media</div>
            <p className="text-[11px] text-gray-400">Stores media assets and private career resumes. Resumes are streamed securely via admin authorization.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
