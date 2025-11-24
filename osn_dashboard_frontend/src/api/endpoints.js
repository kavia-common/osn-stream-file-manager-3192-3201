/**
 * Public API for files CRUD.
 */
import client from './client';

// PUBLIC_INTERFACE
export const listFiles = async (params = {}) => {
  /** GET /files with optional query params */
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.append(k, v);
  });
  return client.get(`/files${qs.toString() ? `?${qs.toString()}` : ''}`);
};

// PUBLIC_INTERFACE
export const getFile = async (id) => {
  /** GET /files/:id */
  return client.get(`/files/${encodeURIComponent(id)}`);
};

// PUBLIC_INTERFACE
export const createFile = async ({ file, meta }) => {
  /** POST /files (multipart) */
  const form = new FormData();
  form.append('file', file);
  if (meta) {
    Object.keys(meta).forEach((k) => form.append(k, meta[k]));
  }
  return client.post('/files', form);
};

// PUBLIC_INTERFACE
export const updateFile = async (id, patch) => {
  /** PATCH /files/:id */
  return client.patch(`/files/${encodeURIComponent(id)}`, patch);
};

// PUBLIC_INTERFACE
export const deleteFile = async (id) => {
  /** DELETE /files/:id */
  return client.delete(`/files/${encodeURIComponent(id)}`);
};
