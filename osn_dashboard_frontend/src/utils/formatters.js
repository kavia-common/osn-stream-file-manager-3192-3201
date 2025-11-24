export const formatBytes = (bytes = 0) => {
  if (!bytes || bytes < 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
};

// PUBLIC_INTERFACE
export const formatDuration = (sec = 0) => {
  /** Format seconds to H:MM:SS */
  if (!sec || sec < 0) return '0:00';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
};
