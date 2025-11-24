import { useState } from 'react';
import * as api from '../api/endpoints';
import { log } from '../utils/logger';

/**
 * Manage upload lifecycle.
 */
export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  // PUBLIC_INTERFACE
  const upload = async ({ file, meta }) => {
    /** Upload a single .ts file with metadata via API */
    setUploading(true);
    setLastResult(null);
    try {
      const res = await api.createFile({ file, meta });
      setLastResult(res);
      return res;
    } catch (e) {
      log.error('upload error', e);
      throw e;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, upload, lastResult };
};
