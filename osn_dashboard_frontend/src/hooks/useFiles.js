import { useCallback, useEffect, useState } from 'react';
import * as api from '../api/endpoints';
import { log } from '../utils/logger';

/**
 * Manage files listing, pagination, filters, and CRUD.
 */
export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20, total: 0, server: false });
  const [filters, setFilters] = useState({ q: '', type: '', language: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...filters,
      };
      const res = await api.listFiles(params);
      // Support both array or paginated response
      if (Array.isArray(res)) {
        setFiles(res);
        setPagination((p) => ({ ...p, total: res.length, server: false }));
      } else {
        setFiles(res.items || res.data || []);
        setPagination({
          page: res.page || pagination.page,
          pageSize: res.pageSize || pagination.pageSize,
          total: res.total || (res.items ? res.items.length : 0),
          server: true,
        });
      }
    } catch (e) {
      log.error('listFiles error', e);
      setError(e.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  useEffect(() => { refresh(); }, [refresh]);

  const setPage = (page) => setPagination((p) => ({ ...p, page }));

  const createFile = async (payload) => {
    const res = await api.createFile(payload);
    await refresh();
    return res;
  };

  const updateFile = async (id, patch) => {
    const res = await api.updateFile(id, patch);
    await refresh();
    return res;
  };

  const deleteFile = async (id) => {
    await api.deleteFile(id);
    await refresh();
  };

  return {
    files, loading, error, pagination, filters,
    refresh, createFile, updateFile, deleteFile, setFilters, setPage
  };
};
