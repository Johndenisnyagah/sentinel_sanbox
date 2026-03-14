/**
 * Header component for the Sentinel_Sandbox dashboard.
 * Displays the application title, visual branding, and global system status.
 */
import React from 'react';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-border gap-3">
      {/* Branding Section */}
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2">
          <Shield className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-[0.15em] text-text-primary uppercase">
            Sentinel<span className="text-primary">_</span>Sandbox
          </h1>
          <p className="text-[11px] text-text-muted uppercase tracking-widest">Intrusion Detection System · Dashboard</p>
        </div>
      </div>

      {/* Simulation Disclaimer Pill */}
      <div className="hidden lg:flex bg-primary/5 border border-primary/20 px-3 py-1 rounded-full items-center gap-2 group hover:bg-primary/10 transition-all duration-300 shadow-sm hover:shadow-md cursor-help">
        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
        <p className="text-[11px] font-bold text-primary uppercase tracking-[0.1em]">
          Simulation Mode <span className="text-text-secondary opacity-60 font-medium lowercase italic ml-1">— No live system scanning</span>
        </p>
      </div>

      {/* Global Metadata Section */}
      <div className="flex gap-6 text-[12px]">
        {/* Core Engine Status */}
        <div className="flex flex-col items-end">
          <span className="text-text-muted text-[10px] uppercase tracking-wider">Status</span>
          <span className="text-primary flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 bg-primary rounded-full pulse-dot"></span>
            OPERATIONAL
          </span>
        </div>

        {/* Network Context */}
        <div className="flex flex-col items-end border-l border-border pl-6">
          <span className="text-text-muted text-[10px] uppercase tracking-wider">Network</span>
          <span className="text-text-primary font-bold">SANDBOX_NET_01</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
