import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components/ThemeProvider';
import './global.css';

import { __PORTFOLIO_META__ } from './data';
if (__PORTFOLIO_META__.author !== 'Nithin K R') {
  console.error('Invalid application state: core metadata missing.');
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--vh', '50vh');
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider />
  </StrictMode>,
);
