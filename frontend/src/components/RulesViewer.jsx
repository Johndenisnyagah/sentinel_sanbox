/**
 * RulesViewer component.
 * Fetches and displays the active detection policies from the IDS engine.
 * Shows logical conditions and assigned severity levels for each rule.
 */
import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import axios from 'axios';

// Configuration for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Badge styling mapping for rule severities
const severityBadge = {
  CRITICAL: 'bg-severity-critical text-white border-severity-critical',
  HIGH: 'bg-severity-high text-white border-severity-high',
  MEDIUM: 'bg-severity-medium text-white border-severity-medium',
  LOW: 'bg-severity-low text-white border-severity-low',
};

const RulesViewer = () => {
  const [rules, setRules] = useState([]);

  /**
   * Fetch logic:
   * Retrieves the static list of detection rules from the backend on mount.
   */
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/rules`);
        setRules(res.data);
      } catch (e) {
        console.error('Failed to fetch rules', e);
      }
    };
    fetchRules();
  }, []);

  return (
    <div className="cyber-panel h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="text-primary w-4 h-4" />
        <h2 className="text-[13px] font-bold text-text-primary uppercase tracking-wider">Detection Rules</h2>
        <span className="ml-auto text-[11px] text-text-muted">{rules.length} policies active</span>
      </div>

      {/* Rules Table */}
      <div className="flex-grow">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-text-muted text-left border-b border-border">
              <th className="pb-2 pr-2 font-bold uppercase tracking-tighter">Rule Name</th>
              <th className="pb-2 pr-2 font-bold uppercase tracking-tighter">Condition Logic</th>
              <th className="pb-2 text-right font-bold uppercase tracking-tighter">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {rules.map(rule => (
              // 'rule-row' in index.css handles the slide-in/highlight on hover
              <tr key={rule.id} className="rule-row group transition-colors hover:bg-bg-main/30">
                <td className="py-2.5 pr-2 text-text-primary font-bold">{rule.name}</td>
                <td className="py-2.5 pr-2 text-text-secondary font-mono text-[11px]">
                  {rule.condition_text || `>${rule.threshold} ${rule.pattern} / ${rule.window}s`}
                </td>
                <td className="py-2.5 text-right">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 border inline-block ${severityBadge[rule.severity] || ''}`}>
                    {rule.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RulesViewer;
