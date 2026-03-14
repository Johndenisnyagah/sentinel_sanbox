/**
 * AlertModal component.
 * Displays a detailed investigative report for a selected security alert.
 * Features premium animations including a center-expanding top bar and
 * hover-sensitive detail cells.
 */
import React from 'react';
import { X, ShieldAlert, Clock, Cpu, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertModal = ({ alert, onClose }) => {
  // Guard clause for early returns if no alert is selected
  if (!alert) return null;

  // Flattening alert properties for clean mapping into the detail grid
  const details = [
    { label: 'Alert Type', value: alert.type },
    { label: 'Source IP', value: alert.source_ip || alert.ip || 'N/A' },
    { label: 'Severity', value: alert.severity, highlight: true },
    { label: 'Detection Rule', value: alert.rule_name || 'Automatic' },
    { label: 'Packets Detected', value: alert.packets_detected ?? 'N/A' },
    { label: 'Time Window', value: alert.time_window || 'N/A' },
    { label: 'Timestamp', value: alert.time || alert.timestamp || 'N/A' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose} // Closing modal when clicking the backdrop
      >
        {/* Semi-transparent blur backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={e => e.stopPropagation()} // Preventing event bubbling to backdrop
          // group/modal allows descendants to react to global modal hover (e.g., top bar expansion)
          className="relative w-full max-w-lg bg-bg-card border border-border p-6 shadow-2xl overflow-hidden group/modal"
        >
          {/* 
            Premium animated top bar:
            Expands from the center point to full width on parent hover 
          */}
          <div 
            className="absolute top-0 left-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover/modal:w-full group-hover/modal:left-0 transition-all duration-700 ease-out"
          ></div>

          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="text-primary w-5 h-5" />
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Alert Investigation</h3>
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-primary hover:bg-primary/5 transition-all duration-300 p-1.5 border border-border hover:border-primary hover:rotate-90"
            >
              <X size={14} />
            </button>
          </div>

          {/* Alert Type Banner */}
          <div className="mb-6 p-4 border-l-4 border-primary bg-primary/5 relative overflow-hidden group/banner">
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/banner:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
            <div className="text-[15px] font-bold text-text-primary relative uppercase">{alert.type}</div>
            <div className="text-[12px] text-text-secondary mt-1.5 leading-relaxed relative">
              {alert.description || 'Heuristic detection triggered by anomalous system/network behavior.'}
            </div>
          </div>

          {/* Metrics & Parameters Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {details.map(d => (
              <div 
                key={d.label} 
                className="bg-bg-main p-3 border border-border-light hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group/cell"
              >
                <div className="text-[10px] text-text-muted uppercase tracking-widest mb-1.5 group-hover/cell:text-primary transition-colors">
                  {d.label}
                </div>
                <div className={`text-[13px] font-bold transition-colors ${d.highlight ? 'text-primary' : 'text-text-primary group-hover/cell:text-primary'}`}>
                  {d.value}
                </div>
              </div>
            ))}
          </div>

          {/* Forensic Data: Ports Accessed */}
          {alert.ports_accessed && alert.ports_accessed.length > 0 && (
            <div className="mb-2">
              <div className="text-[11px] text-text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                <Network size={10} className="text-primary" />
                Targeted Ports
              </div>
              <div className="flex flex-wrap gap-2">
                {alert.ports_accessed.map(port => (
                  <span 
                    key={port} 
                    className="text-[11px] font-mono bg-primary/10 text-primary px-2 py-0.5 border border-primary/20 font-bold hover:bg-primary hover:text-white hover:scale-110 transition-all cursor-crosshair"
                  >
                    {port}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Forensic Label / Footer */}
          <div className="text-center text-[10px] text-text-muted uppercase tracking-[0.4em] mt-8 pt-4 border-t border-border-light opacity-60">
            SENTINEL_SANDBOX // INVESTIGATION_CORE
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlertModal;
