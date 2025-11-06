import { evalSafe } from '../../lib/validate';
import { downloadJson } from '../../lib/download';

export const systemHandlers = {
  // help — list commands and examples
  help: {
    name: 'help',
    description: 'Show all commands',
    usage: 'help',
    handler: () => ({
      reply: [
        'Commands:',
        'help',
        'time',
        'date',
        'clear',
        'echo <text>',
        'calc <expr> (e.g., calc (2+3*4)-5)',
        'export',
        'note add <text> | note list | note remove <id> | note clear',
        'todo add <text> | todo list | todo toggle <id> | todo remove <id> | todo clear',
      ].join('\n'),
    }),
  },

  // time — local time (HH:MM, weekday)
  time: {
    name: 'time',
    description: 'Local time (HH:MM, weekday)',
    usage: 'time',
    handler: () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const weekday = d.toLocaleDateString(undefined, { weekday: 'long' });
      return { reply: `${hh}:${mm} (${weekday})` };
    },
  },

  // date — local date (YYYY-MM-DD)
  date: {
    name: 'date',
    description: 'Local date (YYYY-MM-DD)',
    usage: 'date',
    handler: () => {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return { reply: `${yyyy}-${mm}-${dd}` };
    },
  },

  // clear — clear chat history (UI will confirm)
  clear: {
    name: 'clear',
    description: 'Clear chat history',
    usage: 'clear',
    handler: ({ effects }) => ({ reply: 'History cleared.', effects: { ...effects, clearHistory: true } }),
  },

  // echo — return same text
  echo: {
    name: 'echo',
    description: 'Echo back text',
    usage: 'echo <text>',
    handler: ({ args }) => {
      if (!args) return { reply: 'Missing args. Example: echo hello' };
      return { reply: args };
    },
  },

  // calc — safe math
  calc: {
    name: 'calc',
    description: 'Evaluate basic math',
    usage: 'calc (2+3*4)-5',
    handler: ({ args }) => {
      if (!args) return { reply: 'Missing args. Example: calc (2+3*4)-5' };
      try {
        const v = evalSafe(args);
        return { reply: String(v) };
      } catch (e) {
        return { reply: 'Unsafe or invalid expression. Allowed: numbers and + - * / % ( )' };
      }
    },
  },

  // export — download JSON of all data
  export: {
    name: 'export',
    description: 'Download history, notes, todos as JSON',
    usage: 'export',
    handler: ({ state }) => {
      const payload = { history: state.history, notes: state.notes, todos: state.todos };
      const d = new Date();
      const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`;
      downloadJson(payload, `jarvis-export-${stamp}.json`);
      return { reply: 'Exported current data.' };
    },
  },
};
