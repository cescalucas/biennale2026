import { useEffect, useRef } from 'react';
import { minutesFrom } from '../lib/travelTimes.js';

/* ═══════════════════════════════════════════════════════════════════════════
   O CAMPO VIVO
   ---------------------------------------------------------------------------
   Os 165 locais da Bienal como um só sistema. Não é fundo animado: cada
   partícula é um local real, e as três disposições são três verdades sobre
   o mesmo conjunto.

     geo    — onde as coisas estão, sobre a laguna
     raios  — a que distância estão de você, em anéis de minutos
     sedi   — a que sede pertencem

   Trocar de disposição, ou trocar o seu ponto de partida, reorganiza o campo
   com física de mola. A reorganização é a informação.
   ═════════════════════════════════════════════════════════════════════════ */

const AREA_TOKEN = {
  giardini: '--verde',
  arsenale: '--ottone',
  city: '--rosso',
  collateral: '--azzurro',
  parallel: '--text-2',
};

const AREA_ORDER = ['giardini', 'arsenale', 'city', 'collateral', 'parallel'];
const AREA_NAME = {
  giardini: 'Giardini',
  arsenale: 'Arsenale',
  city: 'Cidade',
  collateral: 'Colaterais',
  parallel: 'Museus',
};

// Caixa do mapa esquemático (viewBox 1100×720), recortada no que tem conteúdo.
const MAP = { x0: 260, x1: 1010, y0: 210, y1: 700 };

function readPalette() {
  const cs = getComputedStyle(document.documentElement);
  const get = (n, fb) => (cs.getPropertyValue(n) || '').trim() || fb;
  const ground = get('--ground', '#0f1c1e');
  // Luminância do fundo: no escuro a densidade acende (aditivo), no claro
  // ela adensa (multiplicativo). Somar luz sobre papel só apaga.
  const h = ground.replace('#', '');
  const [r, g, bl] = h.length >= 6 ? [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) : [15, 28, 30];
  const escuro = (0.2126 * r + 0.7152 * g + 0.0722 * bl) / 255 < 0.5;

  return {
    escuro,
    ground,
    text: get('--text', '#e9e5da'),
    text3: get('--text-3', '#8a9a96'),
    rule: get('--rule', '#29474a'),
    verde: get('--verde', '#7fbcaa'),
    area: Object.fromEntries(
      Object.entries(AREA_TOKEN).map(([k, tok]) => [k, get(tok, '#8a9a96')])
    ),
  };
}

/* ── Disposições ────────────────────────────────────────────────────────
   Cada uma devolve as guias e os rótulos que a tornam legível. Sem isso o
   campo é bonito e mudo; com isso é um diagrama que se move.
   ─────────────────────────────────────────────────────────────────────── */

// A sobreposição de texto come o canto esquerdo em telas largas. As três
// disposições se acomodam nessa caixa em vez de sumir atrás do título.
function caixa(w, h) {
  const largo = w > 900;
  const l = largo ? w * 0.37 : w * 0.04;
  const t = largo ? h * 0.06 : h * 0.30;
  const b = largo ? h * 0.9 : h * 0.94;
  return { l, r: w * 0.97, t, b, cx: (l + w * 0.97) / 2, cy: (t + b) / 2 };
}

function layoutGeo(parts, w, h) {
  const c = caixa(w, h);
  const mw = MAP.x1 - MAP.x0;
  const mh = MAP.y1 - MAP.y0;
  const s = Math.min((c.r - c.l) / mw, (c.b - c.t) / mh);
  const ox = c.cx - (mw * s) / 2 - MAP.x0 * s;
  const oy = c.cy - (mh * s) / 2 - MAP.y0 * s;
  parts.forEach((p) => {
    p.tx = ox + p.mx * s;
    p.ty = oy + p.my * s;
  });
  return { guides: [], annos: [] };
}

function layoutRings(parts, w, h, anchor) {
  const c = caixa(w, h);
  const R = Math.min(c.r - c.l, c.b - c.t) / 2;

  const byMin = new Map();
  parts.forEach((p) => {
    const m = minutesFrom(anchor, p.zone) ?? 0;
    p.min = m;
    if (!byMin.has(m)) byMin.set(m, []);
    byMin.get(m).push(p);
  });

  const maxMin = Math.max(...byMin.keys(), 1);
  const guides = [];
  const annos = [];
  const escala = [];

  byMin.forEach((group, m) => {
    const r = (m / maxMin) * R;
    const n = group.length;
    group.forEach((p, i) => {
      if (r === 0) {
        const a = i * 2.39996;
        const rr = Math.sqrt(i / n) * R * 0.12;
        p.tx = c.cx + Math.cos(a) * rr;
        p.ty = c.cy + Math.sin(a) * rr;
      } else {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2 + m * 0.11;
        const j = ((p.seed % 1) - 0.5) * 12;
        p.tx = c.cx + Math.cos(a) * (r + j);
        p.ty = c.cy + Math.sin(a) * (r + j);
      }
    });
    if (r > 0) {
      guides.push({ cx: c.cx, cy: c.cy, r });
      escala.push({ r, m, n });
    }
  });

  // Os intervalos de 7 a 16 min quase se tocam e os rótulos empilhavam. Eles
  // sobem por um eixo vertical único, com afastamento mínimo garantido.
  escala.sort((a, b) => a.r - b.r);
  let ultimo = Infinity;
  escala.forEach(({ r, m, n }) => {
    let y = c.cy - r;
    if (y > ultimo - 31) y = ultimo - 31;
    ultimo = y;
    annos.push({
      x: c.cx + 10,
      y,
      t: m + ' min',
      sub: n + (n > 1 ? ' locais' : ' local'),
      dim: true,
      tick: { x: c.cx, y0: c.cy - r, y1: y },
    });
  });

  annos.push({
    x: c.cx,
    y: c.cy + R * 0.13 + 24,
    t: 'você',
    sub: (byMin.get(0)?.length || 0) + ' locais aqui',
    center: true,
  });
  return { guides, annos, axis: { x: c.cx, y0: c.cy, y1: c.cy - R } };
}

function layoutSedi(parts, w, h) {
  const c = caixa(w, h);
  const buckets = Object.fromEntries(AREA_ORDER.map((a) => [a, []]));
  parts.forEach((p) => (buckets[p.area] || buckets.parallel).push(p));

  // Duas fileiras: cinco colunas na horizontal ficariam finas demais dentro
  // da caixa e os aglomerados encostariam um no outro.
  const grid = [
    { a: 'giardini', col: 0, row: 0 },
    { a: 'arsenale', col: 1, row: 0 },
    { a: 'city', col: 2, row: 0 },
    { a: 'collateral', col: 0.5, row: 1 },
    { a: 'parallel', col: 1.5, row: 1 },
  ];
  const cw = (c.r - c.l) / 3;
  const ch = (c.b - c.t) / 2;
  const annos = [];

  grid.forEach(({ a, col, row }) => {
    const group = buckets[a];
    const cx = c.l + cw * (col + 0.5);
    const cy = c.t + ch * (row + 0.44);
    const rad = Math.min(cw * 0.36, ch * 0.34);
    group.forEach((p, i) => {
      const ang = i * 2.39996;
      const r = Math.sqrt((i + 0.5) / group.length) * rad;
      p.tx = cx + Math.cos(ang) * r;
      p.ty = cy + Math.sin(ang) * r;
    });
    annos.push({ x: cx, y: cy + rad + 26, t: AREA_NAME[a], sub: group.length + '', center: true, area: a });
  });

  return { guides: [], annos };
}

const LAYOUTS = { geo: layoutGeo, raios: layoutRings, sedi: layoutSedi };

/* ── Componente ─────────────────────────────────────────────────────────── */

export default function LivingField({
  venues,
  anchor,
  mode = 'geo',
  onPick,
  zoneNames,
  height = '100%',
  interactive = true,
  density = 1,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRef = useRef(null);
  const state = useRef({ parts: [], w: 0, h: 0, pal: null, mx: 0, my: 0, hover: -1, raf: 0 });

  // Constrói as partículas uma vez por conjunto de locais.
  useEffect(() => {
    state.current.parts = venues.map((v, i) => ({
      id: v.id,
      name: v.name,
      area: v.area,
      zone: v.zone,
      mx: v.x,
      my: v.y,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      tx: 0,
      ty: 0,
      seed: (i * 9301 + 49297) % 233280 / 233280,
      k: 0.038 + ((i % 11) / 11) * 0.03, // rigidez variada → a mudança vira onda
      born: false,
    }));
  }, [venues]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    const s = state.current;
    const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    s.pal = readPalette();

    // A paleta vive em CSS custom properties; quando o tema troca, relê.
    const temaObs = new MutationObserver(() => {
      s.pal = readPalette();
    });
    temaObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.w = r.width;
      s.h = r.height;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      relayout();
    };

    const relayout = () => {
      if (!s.w || !s.parts.length) return;
      const out = (LAYOUTS[mode] || layoutGeo)(s.parts, s.w, s.h, anchor) || {};
      s.guides = out.guides || [];
      s.annos = out.annos || [];
      s.axis = out.axis || null;
      s.parts.forEach((p) => {
        if (!p.born) {
          // Entrada: nasce fora do quadro e é puxada para o lugar.
          const a = p.seed * Math.PI * 2;
          p.x = s.w / 2 + Math.cos(a) * s.w * 0.9;
          p.y = s.h / 2 + Math.sin(a) * s.h * 0.9;
          p.born = true;
          if (calmo) {
            p.x = p.tx;
            p.y = p.ty;
          }
        } else if (calmo) {
          p.x = p.tx;
          p.y = p.ty;
        }
      });
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      s.mx = e.clientX - r.left;
      s.my = e.clientY - r.top;
    };
    const onLeave = () => {
      s.mx = -9999;
      s.my = -9999;
      s.hover = -1;
    };
    const onClick = () => {
      if (s.hover >= 0 && onPick) onPick(s.parts[s.hover].id);
    };
    if (interactive) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('click', onClick);
    }

    let t0 = performance.now();

    const frame = (now) => {
      const t = now - t0;
      const { w, h, pal } = s;
      if (!w || !pal) {
        s.raf = requestAnimationFrame(frame);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Guias: os anéis de minuto. Vão embaixo de tudo, bem discretos.
      if (s.guides && s.guides.length) {
        ctx.save();
        ctx.strokeStyle = pal.rule;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.55;
        s.guides.forEach((g) => {
          ctx.beginPath();
          ctx.arc(g.cx, g.cy, g.r, 0, Math.PI * 2);
          ctx.stroke();
        });
        if (s.axis) {
          ctx.beginPath();
          ctx.moveTo(s.axis.x, s.axis.y);
          ctx.lineTo(s.axis.x, s.axis.y1);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Maré: uma respiração lenta do campo inteiro. É o único movimento
      // ambiente — sem ele o campo parece congelado, com mais vira ruído.
      const mare = calmo ? 0 : Math.sin(t * 0.00016) * 3.2;

      let melhor = -1;
      let melhorD = 26 * 26;

      // Halos primeiro, em composição aditiva: a luz soma onde há densidade,
      // então os aglomerados reais da cidade acendem sozinhos.
      ctx.globalCompositeOperation = pal.escuro ? 'lighter' : 'multiply';
      s.parts.forEach((p, i) => {
        if (!calmo) {
          p.vx += (p.tx - p.x) * p.k;
          p.vy += (p.ty - p.y) * p.k;
          p.vx *= 0.855;
          p.vy *= 0.855;
          p.x += p.vx;
          p.y += p.vy;
        }
        const dx = p.x - s.mx;
        const dy = p.y + mare - s.my;
        const d2 = dx * dx + dy * dy;
        if (d2 < melhorD) {
          melhorD = d2;
          melhor = i;
        }
        const px = p.x;
        const py = p.y + mare * (0.5 + p.seed);
        const R = 17 * density;
        const g = ctx.createRadialGradient(px, py, 0, px, py, R);
        if (pal.escuro) {
          g.addColorStop(0, pal.area[p.area] + '77');
          g.addColorStop(0.45, pal.area[p.area] + '22');
          g.addColorStop(1, pal.area[p.area] + '00');
        } else {
          // No multiplicativo o transparente tem que ser branco, senão a
          // borda do halo escurece num quadrado.
          g.addColorStop(0, pal.area[p.area] + 'aa');
          g.addColorStop(0.5, pal.area[p.area] + '2e');
          g.addColorStop(1, '#ffffff00');
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, R, 0, Math.PI * 2);
        ctx.fill();
        p.px = px;
        p.py = py;
      });

      // Núcleos.
      ctx.globalCompositeOperation = 'source-over';
      s.parts.forEach((p, i) => {
        const on = i === melhor;
        ctx.beginPath();
        ctx.arc(p.px, p.py, on ? 5.6 : 3.1, 0, Math.PI * 2);
        ctx.fillStyle = on ? pal.text : pal.area[p.area];
        ctx.fill();
        if (on) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, 13, 0, Math.PI * 2);
          ctx.strokeStyle = pal.text;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Rótulos das disposições — é o que separa diagrama de papel de parede.
      if (s.annos && s.annos.length) {
        ctx.save();
        s.annos.forEach((a) => {
          if (a.tick && Math.abs(a.tick.y1 - a.tick.y0) > 1.5) {
            ctx.globalAlpha = 0.4;
            ctx.strokeStyle = pal.text3;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.tick.x, a.tick.y0);
            ctx.lineTo(a.x - 2, a.tick.y1 - 4);
            ctx.stroke();
          }
          ctx.textAlign = a.center ? 'center' : 'left';
          ctx.globalAlpha = a.dim ? 0.75 : 1;
          ctx.fillStyle = a.area ? pal.area[a.area] : a.dim ? pal.text3 : pal.text;
          ctx.font = '500 11px "IBM Plex Mono", ui-monospace, monospace';
          ctx.fillText(a.t.toUpperCase(), a.x + (a.center ? 0 : 8), a.y);
          if (a.sub) {
            ctx.globalAlpha = 0.62;
            ctx.fillStyle = pal.text3;
            ctx.font = '400 10px "IBM Plex Mono", ui-monospace, monospace';
            ctx.fillText(a.sub, a.x + (a.center ? 0 : 8), a.y + 13);
          }
        });
        ctx.restore();
      }

      s.hover = interactive ? melhor : -1;
      const lbl = labelRef.current;
      if (lbl) {
        if (melhor >= 0) {
          const p = s.parts[melhor];
          lbl.textContent = p.name + ' · ' + (zoneNames?.[p.zone] || '');
          lbl.style.transform = `translate(${p.px + 18}px, ${p.py - 12}px)`;
          lbl.style.opacity = '1';
        } else {
          lbl.style.opacity = '0';
        }
      }
      canvas.style.cursor = melhor >= 0 && onPick ? 'pointer' : 'default';

      s.raf = requestAnimationFrame(frame);
    };
    s.raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      temaObs.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, [mode, anchor, onPick, zoneNames, interactive, density]);

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity .18s ease',
          font: '11px "IBM Plex Mono", ui-monospace, monospace',
          letterSpacing: '.04em',
          color: 'var(--text)',
          background: 'color-mix(in srgb, var(--ground) 86%, transparent)',
          border: '1px solid var(--rule)',
          padding: '5px 9px',
          whiteSpace: 'nowrap',
        }}
      />
    </div>
  );
}

export { AREA_NAME, AREA_ORDER };
