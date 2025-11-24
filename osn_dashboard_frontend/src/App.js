import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import TopNav from './components/Layout/TopNav';
import Sidebar from './components/Layout/Sidebar';
import Container from './components/Layout/Container';
import UploadPanel from './components/Upload/UploadPanel';
import FileList from './components/Files/FileList';
import { useEnv } from './hooks/useEnv';
import { useFiles } from './hooks/useFiles';
import { initMockServerIfNeeded } from './mocks/mockServer';
import Spinner from './components/Common/Spinner';

/**
 * App root orchestrates layout and in-app "routing" between panels.
 * Sections: Dashboard (default), Uploads, All Files, Settings (placeholder)
 */
function App() {
  const [section, setSection] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const { env, featureFlags } = useEnv();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Initialize mock server in-memory fallback if no API base or mock flag on
  useEffect(() => {
    initMockServerIfNeeded(env, featureFlags);
  }, [env, featureFlags]);

  const {
    files, loading, error, pagination, filters,
    refresh, createFile, updateFile, deleteFile, setFilters, setPage
  } = useFiles();

  const content = useMemo(() => {
    switch (section) {
      case 'Uploads':
        return (
          <UploadPanel
            onUploaded={(created) => {
              // optimistic add by refreshing, since server (or mock) returns item
              refresh();
            }}
          />
        );
      case 'All Files':
        return (
          <>
            {loading && <Spinner label="Loading files..." />}
            {error && <div role="alert" aria-live="assertive" className="error-text">Error: {error}</div>}
            <FileList
              files={files}
              pagination={pagination}
              onDelete={async (id) => { await deleteFile(id); }}
              onUpdate={async (id, patch) => { await updateFile(id, patch); }}
              onPageChange={(p) => setPage(p)}
              filters={filters}
              onFiltersChange={(f) => setFilters(f)}
              onRefresh={refresh}
            />
          </>
        );
      case 'Settings':
        return (
          <div>
            <h2>Settings</h2>
            <p>Feature flags: {featureFlags.join(', ') || 'none'}</p>
            <p>API Base: {env.apiBase || 'mock (in-memory)'}</p>
            <p>WS URL: {env.wsUrl || 'not configured'}</p>
          </div>
        );
      default:
        return (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to OSN Stream File Manager</p>
            <div className="dashboard-cards">
              <div className="card">
                <h3>Total Files</h3>
                <p>{files.length}</p>
              </div>
              <div className="card">
                <h3>Filters</h3>
                <p>{Object.keys(filters).length} active</p>
              </div>
            </div>
          </div>
        );
    }
  }, [section, files, loading, error, pagination, filters, featureFlags, env, refresh, deleteFile, updateFile, setFilters, setPage]);

  return (
    <div className="app-root" style={{ background: 'var(--bg-app)' }}>
      <TopNav
        currentSection={section}
        onThemeToggle={() => setDarkMode((v) => !v)}
        darkMode={darkMode}
      />
      <div className="layout">
        <Sidebar
          current={section}
          onNavigate={setSection}
          items={[
            { key: 'Dashboard', label: 'Dashboard' },
            { key: 'Uploads', label: 'Uploads' },
            { key: 'All Files', label: 'All Files' },
            { key: 'Settings', label: 'Settings' },
          ]}
        />
        <Container>{content}</Container>
      </div>
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="live-region" />
    </div>
  );
}

export default App;
