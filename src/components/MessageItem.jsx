import React from 'react';

function formatTime(ts) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

export default function MessageItem({ item }) {
  const isUser = item.role === 'user';
  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-lg border text-sm leading-relaxed px-3 py-2 whitespace-pre-wrap break-words ${isUser ? 'bg-white border-neutral-200 text-neutral-900' : 'bg-white border-neutral-200 text-neutral-900'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-neutral-700">{isUser ? 'You' : 'Jarvis'}</span>
          <span className="text-[11px] text-neutral-500" aria-label="timestamp">{formatTime(item.timestamp)}</span>
        </div>
        <div aria-live="polite">{item.content}</div>
      </div>
    </div>
  );
}
