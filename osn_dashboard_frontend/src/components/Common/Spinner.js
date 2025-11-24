import React from 'react';

/**
 * Progress spinner with accessible label.
 */
const Spinner = ({ label = 'Loading...' }) => (
  <div role="status" aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div
      aria-hidden
      style={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        border: '3px solid rgba(37,99,235,0.25)',
        borderTopColor: 'var(--primary)',
        animation: 'spin 1s linear infinite',
      }}
    />
    <span>{label}</span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Spinner;
