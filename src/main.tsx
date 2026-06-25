import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

const THEME_KEY = 'portfolio-theme';

type Theme = 'light' | 'dark';

// eslint-disable-next-line react-refresh/only-export-components
const ThemeProvider = () => {
  // ── Author signature — printed to console on every load ──────────────────
  // This is an intentional attribution marker. Removing it violates LICENSE.
  useEffect(() => {
    const styles = {
      title:  'color:#a855f7;font-size:14px;font-weight:700;',
      body:   'color:#e2e8f0;font-size:11px;',
      link:   'color:#818cf8;font-size:11px;text-decoration:underline;',
      warn:   'color:#f97316;font-size:10px;',
    };
    console.groupCollapsed('%c⚡ Animated 3D Portfolio', styles.title);
    console.log('%cBuilt & designed by Nithin K R', styles.body);
    console.log('%cGitHub  › %chttps://github.com/NITHINKR06', styles.body, styles.link);
    console.log('%cLive    › %chttps://nithinkr.vercel.app',   styles.body, styles.link);
    console.log('%cLicense › Attribution required. See /LICENSE', styles.body);
    console.log('%c⚠ If this is not nithinkr.vercel.app, the author has not authorised this deployment.', styles.warn);
    console.groupEnd();
  }, []);

  const [theme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

// --- Attribution Protection ---
// If the metadata is stripped from data/portfolio.ts, the app subtly breaks.
import { portfolioData } from './data/portfolio';
if ((portfolioData as any).__PORTFOLIO_META__?.author !== 'Nithin K R') {
  console.error("Invalid application state: core metadata missing.");
  // Introduce a subtle layout break
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--vh', '50vh');
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider />
  </StrictMode>
);
