import { describe, it, expect } from 'vitest';
import {
  GAUGE_HALF,
  RAIL_TOP_Y,
  WHEEL_RADIUS,
  WHEEL_CENTER_Y,
  fitFontSize,
  wrapLines,
} from '../VandeBharat3DCanvas';

describe('Vande Bharat Broad-Gauge & Height Constants', () => {
  it('enforces exact 1676 mm Indian Railways Broad Gauge', () => {
    // 0.838 * 2 = 1.676 broad gauge
    expect(Number((GAUGE_HALF * 2).toFixed(3))).toBe(1.676);
  });

  it('aligns wheel center precisely with rail head top plus wheel radius', () => {
    expect(Number((WHEEL_CENTER_Y - RAIL_TOP_Y).toFixed(2))).toBe(WHEEL_RADIUS);
  });
});

describe('Vande Bharat Canvas Text Helpers', () => {
  // Mock 2D canvas context for measureText
  const mockCtx = {
    font: '',
    measureText: (text: string) => ({
      width: text.length * 10, // Deterministic mock: 10px per char
    }),
  } as unknown as CanvasRenderingContext2D;

  it('fitFontSize scales down when text exceeds maxWidth', () => {
    const text = 'VERY LONG PROJECT TITLE FOR VANDE BHARAT COACH DISPLAY';
    const startPx = 118;
    const minPx = 60;
    const maxWidth = 200;

    const size = fitFontSize(mockCtx, text, maxWidth, startPx, minPx, 'sans-serif', '900');
    expect(size).toBeLessThanOrEqual(startPx);
    expect(size).toBeGreaterThanOrEqual(minPx);
  });

  it('fitFontSize preserves startPx when text fits within maxWidth', () => {
    const text = 'SHORT';
    const startPx = 100;
    const minPx = 40;
    const maxWidth = 1000;

    const size = fitFontSize(mockCtx, text, maxWidth, startPx, minPx, 'sans-serif', '900');
    expect(size).toBe(startPx);
  });

  it('wrapLines splits text into max lines without overflow', () => {
    const text = 'One Two Three Four Five Six Seven Eight Nine Ten';
    const maxWidth = 150; // allows ~15 chars per line in mock
    const lines = wrapLines(mockCtx, text, maxWidth, 2);

    expect(lines.length).toBeLessThanOrEqual(2);
    expect(lines[0]).toBeDefined();
  });

  it('wrapLines appends ellipsis when text exceeds maxLines', () => {
    const text = 'Alpha Beta Gamma Delta Epsilon Zeta Eta Theta Iota Kappa Lambda';
    const maxWidth = 100;
    const lines = wrapLines(mockCtx, text, maxWidth, 2);

    expect(lines.length).toBe(2);
    expect(lines[1].endsWith('…')).toBe(true);
  });
});
