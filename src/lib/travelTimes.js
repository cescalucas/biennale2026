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

// Minutos entre a zona-âncora escolhida pelo visitante e uma zona qualquer.
// Devolve null quando não dá para calcular, para que a interface simplesmente
// não mostre o tique em vez de mostrar um número inventado.
export function minutesFrom(anchorZone, zone) {
  if (!anchorZone || !zone) return null;
  const row = TIME[anchorZone];
  if (!row) return null;
  const m = row[zone];
  return Number.isFinite(m) ? m : null;
}

// Maior distância possível na malha — usado para escalar a régua de minutos.
export const MAX_MINUTES = Math.max(
  ...ZONE_LIST.flatMap((a) => ZONE_LIST.map((b) => TIME[a][b])).filter(Number.isFinite)
);
