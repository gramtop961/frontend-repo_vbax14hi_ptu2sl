import React, { useEffect, useRef, useState } from 'react';

export default function CommandInput({ onSubmit, lastCommand }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        textareaRef.current?.focus();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setValue('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        onSubmit(trimmed);
        setValue('');
      }
    } else if (e.key === 'ArrowUp') {
      if (!value.trim() && lastCommand) {
        e.preventDefault();
        setValue(lastCommand);
        // move caret to end
        requestAnimationFrame(() => {
          const el = textareaRef.current;
          el.selectionStart = el.selectionEnd = el.value.length;
        });
      }
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="jarvis-input" className="sr-only">Command input</label>
      <textarea
        id="jarvis-input"
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a command… (try: help)"
        rows={1}
        className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        aria-label="Type a command"
      />
      <p className="mt-2 text-[11px] text-neutral-500">Enter to run • Shift+Enter for newline • Ctrl/Cmd+K focus • Esc clear</p>
    </div>
  );
}
