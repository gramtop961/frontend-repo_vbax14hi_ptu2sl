import { systemHandlers } from './handlers/system';
import { noteHandlers } from './handlers/note';
import { todoHandlers } from './handlers/todo';

// Registry maps top-level command → metadata + dispatcher
export const registry = {
  help: systemHandlers.help,
  time: systemHandlers.time,
  date: systemHandlers.date,
  clear: systemHandlers.clear,
  echo: systemHandlers.echo,
  calc: systemHandlers.calc,
  export: systemHandlers.export,
  note: {
    name: 'note',
    description: 'Manage notes',
    usage: 'note add <text> | note list | note remove <id> | note clear',
    handler: ({ args, state }) => {
      const [sub, ...rest] = args.trim().split(/\s+/);
      const subArgs = args.slice(sub?.length || 0).trim();
      const map = noteHandlers;
      const fn = map[sub];
      if (!fn) return { reply: 'Unknown command. Type ‘help’ to see what I can do.' };
      return fn({ args: subArgs, state });
    },
  },
  todo: {
    name: 'todo',
    description: 'Manage todos',
    usage: 'todo add <text> | todo list | todo toggle <id> | todo remove <id> | todo clear',
    handler: ({ args, state }) => {
      const [sub, ...rest] = args.trim().split(/\s+/);
      const subArgs = args.slice(sub?.length || 0).trim();
      const map = todoHandlers;
      const fn = map[sub];
      if (!fn) return { reply: 'Unknown command. Type ‘help’ to see what I can do.' };
      return fn({ args: subArgs, state });
    },
  },
};

export function runCommand(input, state) {
  const [cmd, ...rest] = input.trim().split(/\s+/);
  const args = input.trim().slice(cmd.length).trim();
  const entry = registry[cmd?.toLowerCase()];
  if (!entry || !entry.handler) {
    return { reply: 'Unknown command. Type ‘help’ to see what I can do.' };
  }
  return entry.handler({ args, state, effects: {} });
}
