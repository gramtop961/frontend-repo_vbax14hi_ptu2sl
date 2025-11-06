import React, { useRef } from 'react';

export default function Header({ onImportJson, onClearHistory }) {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        onImportJson?.(data);
      } catch (err) {
        alert('Invalid JSON file.');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-20 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-neutral-900 tracking-tight">Jarvis v1</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleImportClick}
            className="inline-flex items-center rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-800 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            aria-label="Import data"
          >
            Import
          </button>
          <button
            type="button"
            onClick={onClearHistory}
            className="inline-flex items-center rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label="Clear history"
          >
            Clear History
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}
