import { v4 as uuidv4 } from 'uuid';
import { log } from '../utils/logger';

// Simple in-memory store
const store = {
  files: [],
};

// Seed with a couple of items
const ensureSeed = () => {
  if (store.files.length > 0) return;
  store.files.push(
    { id: uuidv4(), title: 'Sample Video', type: 'video', language: 'en', bitrate: 3200, duration: 180, size: 10485760, createdAt: Date.now() - 86400000 },
    { id: uuidv4(), title: 'Arabic Audio', type: 'audio', language: 'ar', bitrate: 192, duration: 240, size: 2048576, createdAt: Date.now() - 43200000 }
  );
};

// Minimal router/interceptor
const handle = async (url, init = {}) => {
  const u = new URL(url, window.location.origin);
  if (!u.pathname.startsWith('/files')) return null;

  const method = (init.method || 'GET').toUpperCase();
  const parts = u.pathname.split('/').filter(Boolean); // ['files', ':id?']
  const id = parts[1];

  ensureSeed();

  if (method === 'GET' && parts.length === 1) {
    // filters
    const q = u.searchParams.get('q') || '';
    const type = u.searchParams.get('type') || '';
    const language = u.searchParams.get('language') || '';
    let data = store.files.slice().sort((a, b) => b.createdAt - a.createdAt);
    if (q) {
      const lq = q.toLowerCase();
      data = data.filter((f) => (f.title || '').toLowerCase().includes(lq) || (f.id || '').includes(lq));
    }
    if (type) data = data.filter((f) => f.type === type);
    if (language) data = data.filter((f) => f.language === language);
    return ok(data);
  }

  if (method === 'GET' && id) {
    const item = store.files.find((f) => f.id === id);
    return item ? ok(item) : notFound();
  }

  if (method === 'POST' && parts.length === 1) {
    // multipart => file and fields
    const body = init.body;
    let title = 'Untitled';
    let type = 'video';
    let language = 'en';
    let bitrate = '';
    let duration = '';
    if (body && typeof body.get === 'function') {
      title = body.get('title') || body.get('name') || title;
      type = body.get('type') || type;
      language = body.get('language') || language;
      bitrate = body.get('bitrate') || '';
      duration = body.get('duration') || '';
    }
    const idNew = uuidv4();
    const size = 1024 * (Math.floor(Math.random() * 5000) + 100);
    const created = {
      id: idNew, title, type, language,
      bitrate: bitrate ? Number(bitrate) : undefined,
      duration: duration ? Number(duration) : undefined,
      size, createdAt: Date.now()
    };
    store.files.unshift(created);
    return createdResponse(created, 201);
  }

  if (method === 'PATCH' && id) {
    const idx = store.files.findIndex((f) => f.id === id);
    if (idx === -1) return notFound();
    let patch = {};
    if (init.body) {
      try { patch = JSON.parse(init.body); } catch { patch = {}; }
    }
    store.files[idx] = { ...store.files[idx], ...patch };
    return ok(store.files[idx]);
  }

  if (method === 'DELETE' && id) {
    const before = store.files.length;
    store.files = store.files.filter((f) => f.id !== id);
    if (store.files.length === before) return notFound();
    return createdResponse({}, 204);
  }

  return null;
};

const ok = (data) => createdResponse(data, 200);
const notFound = () => createdResponse({ message: 'Not found' }, 404);
const createdResponse = (data, status) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json' }
});

let installed = false;

// PUBLIC_INTERFACE
export const initMockServerIfNeeded = (env, flags = []) => {
  /** Intercepts fetch when no API base configured or 'mockApi' flag on. */
  const shouldMock = !env.apiBase || flags.includes('mockApi');
  if (!shouldMock || installed) {
    return;
  }
  installed = true;
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input.url;
    try {
      const res = await handle(url, init);
      if (res) {
        log.info('[mockApi] handled', init?.method || 'GET', url);
        return res;
      }
    } catch (e) {
      log.error('[mockApi] error', e);
    }
    return originalFetch(input, init);
  };
  log.info('[mockApi] Mock server installed.');
};

export default initMockServerIfNeeded;
