import React, { useCallback, useRef, useState } from 'react';
import { useUpload } from '../../hooks/useUpload';
import { formatDuration } from '../../utils/formatters';
import Badge from '../Common/Badge';

/**
 * Upload panel with DnD zone and metadata form for .ts files.
 */
const UploadPanel = ({ onUploaded }) => {
  const inputRef = useRef(null);
  const [localError, setLocalError] = useState('');
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({
    title: '',
    type: 'video',
    language: 'en',
    bitrate: '',
    duration: '',
  });

  const { uploading, upload, lastResult } = useUpload();

  const validateFile = (f) => {
    if (!f) return 'Please select a file';
    if (!/\.ts$/i.test(f.name)) return 'Only .ts files are allowed';
    return '';
  };

  const pickFile = (e) => {
    const f = e.target.files?.[0];
    const err = validateFile(f);
    setLocalError(err);
    if (!err) setFile(f);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer?.files?.[0];
    const err = validateFile(f);
    setLocalError(err);
    if (!err) setFile(f);
  }, []);

  const stop = (e) => { e.preventDefault(); e.stopPropagation(); };

  const submit = async (e) => {
    e.preventDefault();
    const err = validateFile(file);
    setLocalError(err);
    if (err) return;
    const payload = { file, meta: {
      title: meta.title.trim(),
      type: meta.type,
      language: meta.language,
      bitrate: meta.bitrate ? String(meta.bitrate) : '',
      duration: meta.duration ? String(meta.duration) : '',
    }};
    const res = await upload(payload);
    if (res && onUploaded) onUploaded(res);
  };

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Upload .ts file</h2>
      <div
        onDrop={handleDrop}
        onDragEnter={stop}
        onDragOver={stop}
        onDragLeave={stop}
        role="region"
        aria-label="Drag and drop upload area"
        tabIndex={0}
        style={{
          border: '2px dashed var(--border)',
          borderRadius: 12,
          padding: 24,
          textAlign: 'center',
          background: 'rgba(37,99,235,0.03)',
          outline: 'none',
        }}
      >
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>Drag and drop your .ts file here</p>
        <p aria-hidden style={{ margin: '8px 0', color: 'var(--text-muted)' }}>or</p>
        <button
          className="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Choose file"
          type="button"
        >
          Choose file
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".ts,video/mp2t"
          onChange={pickFile}
          style={{ display: 'none' }}
        />
        {file && (
          <div style={{ marginTop: 12 }}>
            <Badge color="primary" label={`Selected: ${file.name} (${Math.round(file.size/1024)} KB)`} />
          </div>
        )}
      </div>

      <form onSubmit={submit} style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        <div>
          <label className="label" htmlFor="title">Title</label>
          <input id="title" className="input" value={meta.title} onChange={(e) => setMeta({ ...meta, title: e.target.value })} required />
        </div>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          <div>
            <label className="label" htmlFor="type">Type</label>
            <select id="type" className="select" value={meta.type} onChange={(e) => setMeta({ ...meta, type: e.target.value })}>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
              <option value="subtitle">Subtitles</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="language">Language</label>
            <select id="language" className="select" value={meta.language} onChange={(e) => setMeta({ ...meta, language: e.target.value })}>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="bitrate">Bitrate (kbps)</label>
            <input id="bitrate" className="input" type="number" min="0" value={meta.bitrate}
              onChange={(e) => setMeta({ ...meta, bitrate: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="duration">Duration (sec)</label>
            <input id="duration" className="input" type="number" min="0" value={meta.duration}
              onChange={(e) => setMeta({ ...meta, duration: e.target.value })} />
          </div>
        </div>

        {meta.duration && (
          <div style={{ color: 'var(--text-muted)' }}>Readable duration: {formatDuration(Number(meta.duration || 0))}</div>
        )}

        {localError && <div className="error-text" role="alert" aria-live="assertive">{localError}</div>}

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="button" type="submit" disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
          <button
            className="button secondary"
            type="button"
            onClick={() => { setFile(null); setLocalError(''); setMeta({ title: '', type: 'video', language: 'en', bitrate: '', duration: '' }); }}
          >
            Reset
          </button>
        </div>

        {lastResult && (
          <div aria-live="polite" style={{ marginTop: 8 }}>
            <Badge color="secondary" label={`Uploaded: ${lastResult.title || lastResult.name || lastResult.id}`} />
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadPanel;
