import { nextId } from '../../lib/id';

export const todoHandlers = {
  // todo add <text>
  add: ({ args }) => {
    if (!args) return { reply: 'Missing args. Example: todo add Ship project' };
    const todo = { id: nextId('t_'), text: args, done: false, createdAt: Date.now() };
    return { reply: `Added todo: ${args}`, effects: { todosAdd: todo } };
  },

  // todo list
  list: ({ state }) => {
    if (!state.todos.length) return { reply: 'No todos yet.' };
    const lines = state.todos.map((t, idx) => `${idx + 1}. [${t.done ? 'x' : ' '}] ${t.text}`);
    return { reply: lines.join('\n') };
  },

  // todo toggle <id>
  toggle: ({ args, state }) => {
    const id = parseInt(args, 10);
    if (!id || id < 1 || id > state.todos.length) return { reply: 'Missing or invalid id. Example: todo toggle 1' };
    return { reply: `Toggled todo ${id}.`, effects: { todosToggleIndex: id - 1 } };
  },

  // todo remove <id>
  remove: ({ args, state }) => {
    const id = parseInt(args, 10);
    if (!id || id < 1 || id > state.todos.length) return { reply: 'Missing or invalid id. Example: todo remove 1' };
    return { reply: `Removed todo ${id}.`, effects: { todosRemoveIndex: id - 1 } };
  },

  // todo clear
  clear: () => ({ reply: 'Todos cleared.', effects: { confirmTodosClear: true } }),
};
