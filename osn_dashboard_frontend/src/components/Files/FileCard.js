import React from 'react';
import Badge from '../Common/Badge';
import { formatBytes, formatDuration } from '../../utils/formatters';

/**
 * Small card with file quick info.
 */
const FileCard = ({ file, onOpen, onDelete }) => {
  return (
    <div className="card" role="group" aria-label={`File ${file.title || file.name || file.id}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 8 }}>
        <div>
          <div style={{ fontWeight: 600 }}>{file.title || file.name || 'Untitled'}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{file.id}</div>
        </div>
        <Badge color="primary" label={file.type || 'unknown'} />
      </div>
      <div style={{ marginTop: 8, display: 'grid', gap: 4, fontSize: 14, color: 'var(--text-muted)' }}>
        {file.language && <div>Language: {file.language}</div>}
        {'duration' in file && file.duration !== undefined && file.duration !== '' && (
          <div>Duration: {formatDuration(Number(file.duration || 0))}</div>
        )}
        {'size' in file && file.size && <div>Size: {formatBytes(file.size)}</div>}
        {'bitrate' in file && file.bitrate && <div>Bitrate: {file.bitrate} kbps</div>}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="button" onClick={onOpen} aria-label="Open details">Details</button>
        <button className="button secondary" onClick={onDelete} aria-label="Delete file">Delete</button>
      </div>
    </div>
  );
};

export default FileCard;
