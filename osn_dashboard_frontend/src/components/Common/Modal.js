import React, { useEffect, useRef } from 'react';

/**
 * Accessible modal dialog component.
 */
const Modal = ({ open, title, onClose, children, footer }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      const prev = document.activeElement;
      ref.current?.focus();
      return () => prev && prev.focus && prev.focus();
    }
  }, [open]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.35)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 50,
      }}
    >
      <div
        className="card"
        ref={ref}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(680px, 92vw)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 id="modal-title" style={{ margin: 0 }}>{title}</h3>
          <button className="button" onClick={onClose} aria-label="Close dialog">✕</button>
        </div>
        <div style={{ marginTop: 12 }}>{children}</div>
        {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
