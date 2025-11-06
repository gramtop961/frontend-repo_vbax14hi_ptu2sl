import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

export default function MessageList({ items }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-neutral-600 text-sm py-12">
        <p className="mb-2">Welcome to Jarvis v1.</p>
        <p className="mb-2">Try these commands:</p>
        <div className="mt-3 space-y-1">
          <code className="block">help</code>
          <code className="block">note add Read a book</code>
          <code className="block">todo add Ship project</code>
          <code className="block">calc (2+3*4)-5</code>
          <code className="block">time</code>
        </div>
      </div>
    );
  }

  return (
    <div aria-live="polite" className="space-y-3">
      {items.map((m) => (
        <MessageItem key={m.id} item={m} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
