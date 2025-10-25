// src/services/logger.js
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

class Logger {
  constructor() {
    this.level =
      import.meta.env.VITE_ENABLE_LOGGING === 'true' &&
      import.meta.env.DEV
        ? LOG_LEVELS.DEBUG
        : LOG_LEVELS.WARN;
  }

  setLevel(level) {
    this.level = LOG_LEVELS[level] ?? LOG_LEVELS.INFO;
  }

  debug(...args) {
    if (this.level <= LOG_LEVELS.DEBUG) {
      console.log('[DEBUG]', new Date().toISOString(), ...args);
    }
  }

  info(...args) {
    if (this.level <= LOG_LEVELS.INFO) {
      console.log('[INFO]', new Date().toISOString(), ...args);
    }
  }

  warn(...args) {
    if (this.level <= LOG_LEVELS.WARN) {
      console.warn('[WARN]', new Date().toISOString(), ...args);
    }
  }

  error(...args) {
    if (this.level <= LOG_LEVELS.ERROR) {
      console.error('[ERROR]', new Date().toISOString(), ...args);
    }
  }

  group(label) {
    if (this.level <= LOG_LEVELS.DEBUG) {
      console.group(label);
    }
  }

  groupEnd() {
    if (this.level <= LOG_LEVELS.DEBUG) {
      console.groupEnd();
    }
  }
}

export const logger = new Logger();