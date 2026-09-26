// Ingressos oficiais da Bienal (Giardini + Arsenale).
// Fonte: labiennale.org (informações, prepare a visita, acreditação) — levantado em 26 set 2026.
export const BIENNALE_TICKETS = {
  ticketUrl: 'https://www.labiennale.org/en/tickets',
  website: 'https://www.labiennale.org/en/art/2026/information',
  verifiedAt: '26 set 2026',
  hours: [
    { label: 'Giardini', value: '9 mai – 27 set: 11h–19h (última entrada 18h45) · 29 set – 22 nov: 10h–18h (última entrada 17h45)' },
    { label: 'Arsenale', value: '9 mai – 27 set: 11h–19h, sextas e sábados até 20h · 29 set – 22 nov: 10h–18h (última entrada 17h45)' },
  ],
  closed: 'fechado às segundas, exceto 11 mai, 1 jun, 7 set e 16 nov 2026',
  closedDays: [1],
  prices: [
    { type: 'Inteira · 1 entrada Giardini + 1 entrada Arsenale (dias quaisquer)', price: '€30' },
    { type: 'Estudantes e/ou até 26 anos', price: '€16' },
    { type: 'Maiores de 65', price: '€20' },
    { type: 'Pessoas com deficiência (acompanhante grátis)', price: '€20' },
    { type: 'Convênios (FAI, ACI, COOP, TCI…)', price: '€26' },
    { type: 'Crianças 0–6 anos', price: 'grátis' },
    { type: 'Ingresso 3 dias consecutivos', price: '€40' },
    { type: 'Ingresso semanal (7 dias consecutivos)', price: '€50' },
    { type: 'Acreditação · temporada inteira, entradas ilimitadas', price: '€80' },
    { type: 'Acreditação · estudantes e/ou até 26 anos', price: '€45' },
  ],
  booking:
    'Venda somente online (Vivaticket, taxa de pré-venda €0,50). Sem horário marcado: um só ingresso cobre Giardini e Arsenale, mesmo em dias diferentes.',
  notes: [
    'Shuttle de barco Giardini ↔ Arsenale incluso no ingresso.',
    'Pavilhões nacionais fora das duas sedes (na cidade) têm entrada gratuita e não exigem este ingresso.',
    'Irlanda, Marrocos, Arábia Saudita e Omã ficam dentro do Arsenale em 2026: exigem o ingresso da Bienal.',
  ],
};
