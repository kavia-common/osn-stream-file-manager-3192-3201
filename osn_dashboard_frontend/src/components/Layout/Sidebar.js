import React from 'react';

/**
 * Sidebar with navigation items.
 */
const Sidebar = ({ items = [], current, onNavigate }) => {
  return (
    <aside
      style={{
        borderRight: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        minHeight: 'calc(100vh - 58px)',
      }}
      aria-label="Sidebar"
    >
      <nav aria-label="Primary">
        <ul>
          {items.map((it) => {
            const active = current === it.key;
            return (
              <li key={it.key}>
                <button
                  className="sidebar-item"
                  onClick={() => onNavigate(it.key)}
                  aria-current={active ? 'page' : undefined}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    border: 'none',
                    background: active ? 'rgba(37,99,235,0.1)' : 'transparent',
                    color: active ? 'var(--primary)' : 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                >
                  {it.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
