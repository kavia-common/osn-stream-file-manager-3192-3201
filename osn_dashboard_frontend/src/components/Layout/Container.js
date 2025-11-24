import React from 'react';

/**
 * Content container with padding and max width.
 */
const Container = ({ children }) => {
  return (
    <main
      role="main"
      style={{
        padding: 20,
        minHeight: 'calc(100vh - 58px)',
        background: 'var(--bg-app)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div>
    </main>
  );
};

export default Container;
