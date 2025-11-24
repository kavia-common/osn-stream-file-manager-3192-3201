import React, { useMemo, useState } from 'react';
import FileCard from './FileCard';
import FileDetailsModal from './FileDetailsModal';

/**
 * Files listing with basic pagination and filters controls.
 */
const FileList = ({ files = [], pagination, onDelete, onUpdate, onPageChange, filters, onFiltersChange, onRefresh }) => {
  const [selected, setSelected] = useState(null);
  const page = pagination?.page || 1;
  const pageSize = pagination?.pageSize || 20;
  const total = pagination?.total || files.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));

  const pagedFiles = useMemo(() => {
    if (pagination?.server) return files;
    const start = (page - 1) * pageSize;
    return files.slice(start, start + pageSize);
  }, [files, page, pageSize, pagination]);

  return (
    <div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          <div>
            <label className="label" htmlFor="q">Search</label>
            <input id="q" className="input" value={filters.q || ''} onChange={(e) => onFiltersChange({ ...filters, q: e.target.value })} placeholder="Title or name..." />
          </div>
          <div>
            <label className="label" htmlFor="type">Type</label>
            <select id="type" className="select" value={filters.type || ''} onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}>
              <option value="">All</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="subtitle">Subtitles</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="lang">Language</label>
            <select id="lang" className="select" value={filters.language || ''} onChange={(e) => onFiltersChange({ ...filters, language: e.target.value })}>
              <option value="">Any</option>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div style={{ alignSelf: 'end' }}>
            <button className="button" onClick={onRefresh}>Refresh</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {pagedFiles.map((f) => (
          <FileCard
            key={f.id}
            file={f}
            onOpen={() => setSelected(f)}
            onDelete={() => onDelete(f.id)}
          />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
        <button className="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">Prev</button>
        <span aria-live="polite">Page {page} of {pages}</span>
        <button className="button" disabled={page >= pages} onClick={() => onPageChange(page + 1)} aria-label="Next page">Next</button>
      </div>

      <FileDetailsModal
        open={!!selected}
        file={selected}
        onClose={() => setSelected(null)}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default FileList;
