import { getEnv } from '../hooks/useEnv';

const levels = ['silent', 'error', 'warn', 'info', 'debug', 'trace'];
const envLevel = (getEnv().logLevel || 'info').toLowerCase();
const idx = Math.max(0, levels.indexOf(envLevel));

const should = (lvl) => levels.indexOf(lvl) <= idx;

export const log = {
  error: (...a) => should('error') && console.error(...a),
  warn: (...a) => should('warn') && console.warn(...a),
  info: (...a) => should('info') && console.info(...a),
  debug: (...a) => should('debug') && console.debug(...a),
  trace: (...a) => should('trace') && console.debug('[trace]', ...a),
};

export default log;
