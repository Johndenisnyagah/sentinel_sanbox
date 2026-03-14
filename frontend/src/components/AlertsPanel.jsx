/**
 * AlertsPanel component.
 * Displays a prioritized list of security threats detected by the system.
 * Alerts are color-coded by severity (CRITICAL, HIGH, MEDIUM, LOW).
 */
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mapping of severity levels to Tailwind CSS brand colors and styles
const severityStyles = {
  CRITICAL: { border: 'border-severity-critical', bg: 'bg-severity-critical/5', badge: 'bg-severity-critical text-white border-severity-critical' },
  HIGH:     { border: 'border-severity-high', bg: 'bg-severity-high/5', badge: 'bg-severity-high text-white border-severity-high' },
  MEDIUM:   { border: 'border-severity-medium', bg: 'bg-severity-medium/5', badge: 'bg-severity-medium text-white border-severity-medium' },
  LOW:      { border: 'border-severity-low', bg: 'bg-severity-low/5', badge: 'bg-severity-low text-white border-severity-low' },
};

const AlertsPanel = ({ alerts, onAlertClick }) => {
  // Aggregate count for high-priority items
  const criticalCount = alerts.filter(a => a.severity === 'CRITICAL' || a.severity === 'HIGH').length;

  return (
    <div className="cyber-panel h-full flex flex-col">
      {/* Header with Counters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-primary w-4 h-4" />
          <h2 className="text-[13px] font-bold text-text-primary uppercase tracking-wider">Live Alerts</h2>
        </div>
        <div className="flex gap-2 text-[11px]">
          <span className="tag tag-primary">ACTIVE: {criticalCount}</span>
          <span className="tag tag-dark">TOTAL: {alerts.length}</span>
        </div>
      </div>

      {/* Scrollable Alert List */}
      <div className="flex-grow overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
        <AnimatePresence initial={false}>
          {alerts.map((alert, idx) => {
            const style = severityStyles[alert.severity] || severityStyles.LOW;
            return (
              <motion.div
                key={alert.id || alert.time + idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                onClick={() => onAlertClick(alert)}
                // Custom alert-card class handles the premium slide-in arrow animation on hover
                className={`alert-card p-2.5 border-l-2 ${style.border} ${style.bg} flex justify-between items-center cursor-pointer pr-8 transition-colors hover:bg-white`}
              >
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-text-primary truncate uppercase">{alert.type}</div>
                  <div className="text-[11px] text-text-muted truncate">
                    {alert.source_ip || alert.ip} · {alert.time || alert.timestamp}
                  </div>
                </div>
                {/* Severity Badge */}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 border ${style.badge} shrink-0 ml-2`}>
                  {alert.severity}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Empty State */}
        {alerts.length === 0 && (
          <div className="text-center py-16 text-[10px] text-text-muted italic tracking-widest">
            NO ACTIVE THREATS
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;
