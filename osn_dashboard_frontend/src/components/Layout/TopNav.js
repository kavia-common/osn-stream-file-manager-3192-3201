import React from 'react';
import Badge from '../Common/Badge';

/**
 * Top navigation with brand and theme toggle.
 */
const TopNav = ({ onThemeToggle, darkMode, currentSection }) => {
  return (
    <nav
      className="topnav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'linear-gradient(180deg, rgba(37,99,235,0.06), rgba(255,255,255,0))',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(4px)',
      }}
      aria-label="Top Navigation"
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            aria-hidden
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--primary)',
              boxShadow: 'var(--shadow-sm)',
            }}
          />
          <div>
            <div style={{ fontWeight: 700 }}>OSN Stream Manager</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Ocean Professional
              <span className="sr-only"> theme</span>
            </div>
          </div>
        </div>

        <div aria-hidden style={{ flex: 1 }} />

        <Badge color="secondary" label={currentSection} />

        <button
          onClick={onThemeToggle}
          className="button"
          aria-label={`Toggle ${darkMode ? 'light' : 'dark'} mode`}
          title="Toggle theme"
          style={{ background: darkMode ? 'var(--secondary)' : 'var(--primary)' }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
