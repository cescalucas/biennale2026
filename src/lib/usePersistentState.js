import { useEffect, useState } from 'react';

const PREFIX = 'biennale:';

// useState que sobrevive a recarregamentos: grava no localStorage do aparelho.
// Falhas de leitura/escrita (modo privado, cota cheia) são ignoradas em silêncio.
export function usePersistentState(key, initial) {
  const storageKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) return JSON.parse(raw);
    } catch {}
    return typeof initial === 'function' ? initial() : initial;
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {}
  }, [storageKey, value]);
  return [value, setValue];
}
