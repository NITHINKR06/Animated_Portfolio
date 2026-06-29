import { useState, useEffect, useCallback } from 'react';

export function useTypewriter(words: string[], { typeSpeed = 80, deleteSpeed = 50, pause = 2000 } = {}) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = words[wordIdx];
    if (isDeleting) {
      setText(current.substring(0, text.length - 1));
    } else {
      setText(current.substring(0, text.length + 1));
    }
  }, [text, wordIdx, isDeleting, words]);

  useEffect(() => {
    const current = words[wordIdx];
    if (!current) return;

    if (!isDeleting && text === current) {
      const timeout = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timeout);
    }
    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timeout);
  }, [text, wordIdx, isDeleting, words, typeSpeed, deleteSpeed, pause, tick]);

  return text;
}
