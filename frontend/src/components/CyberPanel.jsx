import React from 'react';

const CyberPanel = ({ title, icon: Icon, children, h, className = "" }) => {
  return (
    <div className={`cyber-panel ${h ? `h-[${h}px]` : ''} ${className} flex flex-col`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-primary w-4 h-4" />}
          <h2 className="text-sm font-bold text-text-bright uppercase tracking-wider">{title}</h2>
        </div>
      </div>
      <div className="flex-grow overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default CyberPanel;
