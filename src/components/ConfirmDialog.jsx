import React from 'react';

export default function ConfirmDialog({ open, title = 'Are you sure?', description, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" onClick={onCancel} />
      <div role="dialog" aria-modal="true" aria-labelledby="confirm-title" className="relative z-10 w-full max-w-sm rounded-lg bg-white border border-neutral-200 shadow-lg p-4">
        <h2 id="confirm-title" className="text-sm font-medium text-neutral-900">{title}</h2>
        {description && <p className="mt-2 text-sm text-neutral-600">{description}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onCancel} className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-800 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-300">{cancelText}</button>
          <button onClick={onConfirm} className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300">{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
