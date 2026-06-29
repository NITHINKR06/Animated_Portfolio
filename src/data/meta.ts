export const __PORTFOLIO_META__ = (() => {
  const _author = 'Nithin K R';
  const _handle = 'NITHINKR06';
  if (!_author || !_handle) throw new Error('Portfolio author config missing');
  return {
    author: _author,
    handle: _handle,
    origin: 'https://github.com/NITHINKR06/Animated_Portfolio',
    version: '1.0.0',
  } as const;
})();
