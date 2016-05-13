import React from 'react';

export default function Overlay({ dark, children, transparent, show, ...props }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        zIndex: transparent ? 'inherit' : 9998,
        display: show ? 'block' : 'none',
        backgroundColor: transparent ? 'none' : (dark? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, .8)'),
        overflow: 'scroll',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
