import { ZONE_LIST, EDGES } from '../data/zones.js';

// Floyd-Warshall — calcula a matriz de menores distâncias entre as zonas
export function buildTimeMatrix() {
  const idx = Object.fromEntries(ZONE_LIST.map((z, i) => [z, i]));
  const N = ZONE_LIST.length;
  const m = Array.from({ length: N }, () => Array(N).fill(Infinity));
  for (let i = 0; i < N; i++) m[i][i] = 0;
  EDGES.forEach(([a, b, w]) => {
    m[idx[a]][idx[b]] = w;
    m[idx[b]][idx[a]] = w;
  });
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (m[i][k] + m[k][j] < m[i][j]) m[i][j] = m[i][k] + m[k][j];
      }
    }
  }
  const out = {};
  ZONE_LIST.forEach((a, i) => {
    out[a] = {};
    ZONE_LIST.forEach((b, j) => (out[a][b] = m[i][j]));
  });
  return out;
}

export const TIME = buildTimeMatrix();
