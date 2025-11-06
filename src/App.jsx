import React, { useEffect, useMemo, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import Header from './components/Header';
import MessageList from './components/MessageList';
import CommandInput from './components/CommandInput';
import ConfirmDialog from './components/ConfirmDialog';
import { nextId } from './lib/id';
import { keys, read, writeDebounced } from './lib/storage';
import { runCommand } from './core/registry';

export default function App() {
  const [history, setHistory] = useState(() => read(keys.HISTORY, []));
  const [notes, setNotes] = useState(() => read(keys.NOTES, []));
  const [todos, setTodos] = useState(() => read(keys.TODOS, []));

  const [confirm, setConfirm] = useState({ open: false, action: null, title: '', description: '' });

  // persist with debounce
  useEffect(() => writeDebounced(keys.HISTORY, history), [history]);
  useEffect(() => writeDebounced(keys.NOTES, notes), [notes]);
  useEffect(() => writeDebounced(keys.TODOS, todos), [todos]);

  const state = useMemo(() => ({ history, notes, todos }), [history, notes, todos]);

  const lastCommand = useMemo(() => {
    const last = [...history].reverse().find((h) => h.role === 'user');
    return last?.content || '';
  }, [history]);

  const pushMessage = (role, content) => {
    const item = { id: nextId('m_'), role, content, timestamp: Date.now() };
    setHistory((prev) => [...prev, item]);
  };

  const applyEffects = (effects) => {
    if (!effects) return;
    if (effects.clearHistory) {
      setConfirm({
        open: true,
        action: () => {
          setHistory([]);
          setConfirm({ open: false });
        },
        title: 'Clear history?',
        description: 'This removes all chat messages.'
      });
    }
    if (effects.confirmNotesClear) {
      setConfirm({
        open: true,
        action: () => {
          setNotes([]);
          setConfirm({ open: false });
        },
        title: 'Clear all notes?',
        description: 'This removes all notes.'
      });
    }
    if (effects.confirmTodosClear) {
      setConfirm({
        open: true,
        action: () => {
          setTodos([]);
          setConfirm({ open: false });
        },
        title: 'Clear all todos?',
        description: 'This removes all todos.'
      });
    }
    if (effects.notesAdd) setNotes((prev) => [...prev, effects.notesAdd]);
    if (Number.isInteger(effects.notesRemoveIndex)) setNotes((prev) => prev.filter((_, i) => i !== effects.notesRemoveIndex));
    if (effects.todosAdd) setTodos((prev) => [...prev, effects.todosAdd]);
    if (Number.isInteger(effects.todosRemoveIndex)) setTodos((prev) => prev.filter((_, i) => i !== effects.todosRemoveIndex));
    if (Number.isInteger(effects.todosToggleIndex)) setTodos((prev) => prev.map((t, i) => (i === effects.todosToggleIndex ? { ...t, done: !t.done } : t)));
  };

  const handleSubmit = (text) => {
    // user message
    pushMessage('user', text);
    // handle command
    const result = runCommand(text, { history, notes, todos });
    const reply = result.reply || '';
    applyEffects(result.effects);
    pushMessage('jarvis', reply);
  };

  const handleImportJson = (data) => {
    try {
      const imported = { history: data.history || [], notes: data.notes || [], todos: data.todos || [] };
      // merge with id conflict handling
      const ids = new Set();
      const merge = (arr, addFn) => {
        let count = 0;
        arr.forEach((item) => {
          const base = { ...item };
          if (!base.id || ids.has(base.id)) base.id = nextId('m_');
          ids.add(base.id);
          addFn(base);
          count += 1;
        });
        return count;
      };
      history.forEach((h) => ids.add(h.id));
      notes.forEach((n) => ids.add(n.id));
      todos.forEach((t) => ids.add(t.id));

      let hCount = 0, nCount = 0, tCount = 0;
      setHistory((prev) => {
        const next = [...prev];
        hCount = merge(imported.history, (x) => next.push(x));
        return next;
      });
      setNotes((prev) => {
        const next = [...prev];
        nCount = merge(imported.notes, (x) => next.push(x));
        return next;
      });
      setTodos((prev) => {
        const next = [...prev];
        tCount = merge(imported.todos, (x) => next.push(x));
        return next;
      });

      pushMessage('jarvis', `Imported ${hCount} messages, ${nCount} notes, ${tCount} todos.`);
    } catch (e) {
      alert('Failed to import JSON.');
    }
  };

  const handleClearHistoryClick = () => {
    setConfirm({
      open: true,
      action: () => {
        setHistory([]);
        setConfirm({ open: false });
      },
      title: 'Clear history?',
      description: 'This removes all chat messages.'
    });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header onImportJson={handleImportJson} onClearHistory={handleClearHistoryClick} />

      <main className="pt-16 pb-28">
        <section className="relative">
          <div className="h-48 w-full">
            <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-4">
          <div className="py-6">
            <MessageList items={history} />
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <CommandInput onSubmit={handleSubmit} lastCommand={lastCommand} />
        </div>
      </footer>

      <ConfirmDialog
        open={!!confirm.open}
        title={confirm.title}
        description={confirm.description}
        onCancel={() => setConfirm({ open: false })}
        onConfirm={() => confirm.action?.()}
      />
    </div>
  );
}
