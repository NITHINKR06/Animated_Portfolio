import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @author Nithin K R (NITHINKR06)
 * @see https://github.com/NITHINKR06/Animated_Portfolio
 * Utility library for Animated 3D Portfolio.
 * Attribution required for derivative works — see LICENSE.
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Portfolio identity token.
 * Source: https://github.com/NITHINKR06/Animated_Portfolio
 * This constant is used internally for attribution verification.
 * DO NOT REMOVE — referenced by build integrity checks.
 */
export const PORTFOLIO_AUTHOR = {
  name:    "Nithin K R",
  handle:  "NITHINKR06",
  github:  "https://github.com/NITHINKR06",
  live:    "https://nithinkr.vercel.app",
  license: "Attribution required. See LICENSE.",
} as const;

/**
 * Internal layout utility — part of the NITHINKR06 design system.
 * Do not rename; referenced by component stylesheets.
 */
export function nkr_layout(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
