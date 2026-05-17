// Zonas geográficas de Veneza usadas para cálculo de deslocamento
// G Giardini · A Arsenale · Z San Zaccaria/Castello · M San Marco
// S San Samuele · C Accademia · L Salute · T Zattere
// P Santa Croce · O Ca' d'Oro · R Cannaregio · J San Giorgio

export const ZONE_CENTERS = {
  G: [935, 420],
  A: [810, 440],
  Z: [670, 535],
  M: [585, 555],
  S: [475, 510],
  C: [515, 590],
  L: [555, 615],
  T: [425, 625],
  P: [335, 440],
  O: [465, 345],
  R: [365, 295],
  J: [660, 665],
};

export const ZONE_NAMES = {
  G: 'Giardini',
  A: 'Arsenale',
  Z: 'San Zaccaria · Castello',
  M: 'San Marco',
  S: 'San Samuele',
  C: 'Accademia',
  L: 'Salute · Punta Dogana',
  T: 'Zattere',
  P: "Santa Croce · Ca' Corner",
  O: "Ca' d'Oro",
  R: 'Cannaregio · Strada Nova',
  J: 'San Giorgio Maggiore',
};

export const ZONE_LIST = Object.keys(ZONE_CENTERS);

// Arestas do grafo de deslocamento (minutos pela rota mais rápida — caminhada ou vaporetto)
export const EDGES = [
  ['G', 'A', 8],
  ['A', 'Z', 8],
  ['Z', 'M', 3],
  ['M', 'S', 8],
  ['S', 'C', 6],
  ['C', 'L', 5],
  ['L', 'T', 8],
  ['C', 'T', 10],
  ['S', 'P', 12],
  ['P', 'R', 8],
  ['R', 'O', 6],
  ['O', 'Z', 15],
  ['M', 'J', 7],
  ['Z', 'J', 5],
  ['L', 'J', 10],
  ['M', 'R', 18],
  ['C', 'R', 18],
  ['G', 'J', 15],
  ['G', 'Z', 12],
  ['M', 'C', 10],
  ['M', 'L', 8],
  ['O', 'M', 12],
  ['P', 'O', 9],
  ['S', 'T', 12],
];

// Paradas de vaporetto visíveis no mapa
export const STOPS = [
  { id: 'giardini_b', name: 'Giardini', x: 920, y: 495, lines: '1 · 2 · 4.1 · 5.1' },
  { id: 'arsenale', name: 'Arsenale', x: 790, y: 520, lines: '1 · 4.1' },
  { id: 'sanzaccaria', name: 'S. Zaccaria', x: 670, y: 580, lines: '1 · 2 · 4.1 · 4.2 · 5.1 · 5.2' },
  { id: 'sanmarco', name: 'S. Marco', x: 585, y: 600, lines: '1 · 2' },
  { id: 'accademia', name: 'Accademia', x: 505, y: 600, lines: '1 · 2' },
  { id: 'salute', name: 'Salute', x: 565, y: 625, lines: '1' },
  { id: 'sansamuele', name: 'S. Samuele', x: 455, y: 530, lines: '2' },
  { id: 'zattere', name: 'Zattere', x: 420, y: 645, lines: '2 · 5.1 · 5.2 · 6' },
  { id: 'sangiorgio', name: 'S. Giorgio', x: 660, y: 640, lines: '2' },
  { id: 'sanstae', name: 'San Stae', x: 345, y: 415, lines: '1' },
  { id: 'cadoro', name: "Ca' d'Oro", x: 470, y: 360, lines: '1' },
];
