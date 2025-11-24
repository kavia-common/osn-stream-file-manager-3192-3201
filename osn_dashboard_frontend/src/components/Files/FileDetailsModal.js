import React, { useEffect, useState } from 'react';
import Modal from '../Common/Modal';
import { formatDuration } from '../../utils/formatters';

/**
 * Modal for viewing and editing file metadata.
 */
const FileDetailsModal = ({ open, file, onClose, onUpdate }) => {
  const [form, setForm] = useState({ title: '', language: '', bitrate: '', duration: '' });

  useEffect(() => {
    if (file) {
      setForm({
        title: file.title || '',
        language: file.language || '',
        bitrate: file.bitrate || '',
        duration: file.duration || '',
      });
    }
  }, [file]);

  if (!open || !file) return null;

  const submit = async (e) => {
    e.preventDefault();
    await onUpdate(file.id, {
      title: form.title,
      language: form.language,
      bitrate: form.bitrate,
      duration: form.duration,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="File details">
      <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>ID: {file.id}</div>
      <form onSubmit={submit} style={{ marginTop: 12, display: 'grid', gap: 10 }}>
        <div>
          <label className="label" htmlFor="fd-title">Title</label>
          <input id="fd-title" className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          <div>
            <label className="label" htmlFor="fd-language">Language</label>
            <select id="fd-language" className="select" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
              <option value="">Any</option>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="fd-bitrate">Bitrate (kbps)</label>
            <input id="fd-bitrate" className="input" type="number" value={form.bitrate} onChange={(e) => setForm({ ...form, bitrate: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="fd-duration">Duration (sec)</label>
            <input id="fd-duration" className="input" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            {form.duration && <div style={{ color: 'var(--text-muted)' }}>≈ {formatDuration(Number(form.duration || 0))}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="button" type="submit">Save</button>
          <button className="button secondary" type="button" onClick={onClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default FileDetailsModal;
