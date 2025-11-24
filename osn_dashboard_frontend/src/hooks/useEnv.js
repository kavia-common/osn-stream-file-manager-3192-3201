const readFlags = (raw) => {
  if (!raw) return [];
  try {
    // allow comma-separated or JSON array
    if (raw.trim().startsWith('[')) return JSON.parse(raw);
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
};

export const getEnv = () => {
  const apiBase = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';
  const wsUrl = process.env.REACT_APP_WS_URL || '';
  const featureFlags = readFlags(process.env.REACT_APP_FEATURE_FLAGS || '');
  const logLevel = process.env.REACT_APP_LOG_LEVEL || 'info';
  const frontendUrl = process.env.REACT_APP_FRONTEND_URL || '';
  return { apiBase, wsUrl, featureFlags, logLevel, frontendUrl };
};

// PUBLIC_INTERFACE
export const useEnv = () => {
  /** Read environment once at runtime */
  const env = getEnv();
  return { env, featureFlags: env.featureFlags };
};
