import '@testing-library/jest-dom';

// Mock matchMedia for components using prefers-color-scheme or reduced-motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Basic IntersectionObserver mock for framer-motion whileInView animations
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  class IntersectionObserverMock {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] { return []; }
  }

  (window as any).IntersectionObserver = IntersectionObserverMock;
}

// Optional: stub scrollTo used in some components
if (typeof window !== 'undefined' && typeof window.scrollTo !== 'function') {
  (window as any).scrollTo = () => {};
}
