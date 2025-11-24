import React from 'react';

/**
 * Small colored badge for statuses/labels.
 */
const Badge = ({ color = 'primary', label }) => {
  const styles = {
    primary: { background: 'rgba(37,99,235,0.12)', color: 'var(--primary)' },
    secondary: { background: 'rgba(245,158,11,0.18)', color: '#9a6700' },
    neutral: { background: 'rgba(0,0,0,0.06)', color: 'var(--text-primary)' },
  }[color] || {};
  return (
    <span
      style={{
        ...styles,
        padding: '6px 10px',
        fontSize: 12,
        borderRadius: 999,
        border: '1px solid var(--border)',
      }}
    >
      {label}
    </span>
  );
};

export default Badge;
