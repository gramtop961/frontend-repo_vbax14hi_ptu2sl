import { nextId } from '../../lib/id';

export const noteHandlers = {
  // note add <text>
  add: ({ args, state }) => {
    if (!args) return { reply: 'Missing args. Example: note add Plan trip' };
    const note = { id: nextId('n_'), text: args, createdAt: Date.now() };
    return { reply: `Added note: ${args}`, effects: { notesAdd: note } };
  },

  // note list
  list: ({ state }) => {
    if (!state.notes.length) return { reply: 'No notes yet.' };
    const lines = state.notes.map((n, idx) => `${idx + 1}. ${n.text}`);
    return { reply: lines.join('\n') };
  },

  // note remove <id>
  remove: ({ args, state }) => {
    const id = parseInt(args, 10);
    if (!id || id < 1 || id > state.notes.length) return { reply: 'Missing or invalid id. Example: note remove 1' };
    const removed = state.notes[id - 1];
    return { reply: `Removed note ${id}.`, effects: { notesRemoveIndex: id - 1, removed } };
  },

  // note clear
  clear: () => ({ reply: 'Notes cleared.', effects: { confirmNotesClear: true } }),
};
