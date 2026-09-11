// Ensure window.fetch has both getter and setter in iframe environments where fetch is getter-only
try {
  if (typeof window !== 'undefined' && 'fetch' in window) {
    let currentFetch = window.fetch ? window.fetch.bind(window) : null;
    const desc = {
      get: () => currentFetch,
      set: (fn: typeof window.fetch) => {
        currentFetch = fn;
      },
      configurable: true,
      enumerable: true,
    };
    Object.defineProperty(window, 'fetch', desc);
    if (typeof Window !== 'undefined' && Window.prototype) {
      try {
        Object.defineProperty(Window.prototype, 'fetch', desc);
      } catch (_) {}
    }
  }
} catch (_) {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
