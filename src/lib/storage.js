const KEY_HISTORY = 'jarvis.history.v1';
const KEY_NOTES = 'jarvis.notes.v1';
const KEY_TODOS = 'jarvis.todos.v1';

export const keys = { HISTORY: KEY_HISTORY, NOTES: KEY_NOTES, TODOS: KEY_TODOS };

export function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

let timer;
export function writeDebounced(key, value, delay = 250) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore
    }
  }, delay);
}
