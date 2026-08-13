export type CoderCardData = {
  name: string;
  level: { label: string; icon: string };
  runs: number;
  bestStreak: number;
  languages: string[];
  codingSince: string;
};

const COLORS = {
  bg: '#080808',
  surface: '#161616',
  border: 'rgba(255,255,255,0.08)',
  text: '#efefef',
  muted: '#888888',
  green: '#00e676',
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const LANG_LABELS: Record<string, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  go: 'Go',
  rust: 'Rust',
  shell: 'Bash',
  ruby: 'Ruby',
  php: 'PHP',
  swift: 'Swift',
  kotlin: 'Kotlin',
  csharp: 'C#',
  sql: 'SQL',
};

export function drawCoderCard(ctx: CanvasRenderingContext2D, data: CoderCardData) {
  const SIZE = 1080;
  ctx.clearRect(0, 0, SIZE, SIZE);

  const bgGradient = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  bgGradient.addColorStop(0, COLORS.bg);
  bgGradient.addColorStop(1, '#0d0d0d');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, SIZE, SIZE);

  const pad = 64;
  const panelX = pad;
  const panelY = pad;
  const panelW = SIZE - pad * 2;
  const panelH = SIZE - pad * 2;
  roundRect(ctx, panelX, panelY, panelW, panelH, 36);
  ctx.fillStyle = COLORS.surface;
  ctx.fill();
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 2;
  ctx.stroke();

  let cursorY = panelY + 90;

  ctx.textAlign = 'center';
  ctx.fillStyle = COLORS.green;
  ctx.font = '700 34px "Segoe UI", system-ui, sans-serif';
  ctx.fillText('CHADUVUKO', SIZE / 2, cursorY);

  cursorY += 90;
  ctx.fillStyle = COLORS.text;
  ctx.font = '800 64px "Segoe UI", system-ui, sans-serif';
  ctx.fillText(data.name, SIZE / 2, cursorY);

  cursorY += 62;
  ctx.font = '600 36px "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = COLORS.green;
  ctx.fillText(`${data.level.icon} ${data.level.label}`, SIZE / 2, cursorY);

  cursorY += 70;
  const stats: [string, string][] = [
    ['Total Runs', String(data.runs)],
    ['Best Streak', `${data.bestStreak} day${data.bestStreak === 1 ? '' : 's'}`],
    ['Languages Tried', String(data.languages.length)],
    ['Coding Since', data.codingSince],
  ];

  const gridTop = cursorY;
  const gridW = panelW - 96;
  const gridX = SIZE / 2 - gridW / 2;
  const cellW = gridW / 2;
  const cellH = 132;
  const gap = 16;

  stats.forEach(([label, value], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = gridX + col * (cellW + gap / 2) + (col === 1 ? -gap / 2 : 0);
    const cy = gridTop + row * (cellH + gap);
    const cw = cellW - gap / 2;

    roundRect(ctx, cx, cy, cw, cellH, 18);
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.fill();
    ctx.strokeStyle = COLORS.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = COLORS.text;
    ctx.font = '700 38px "Segoe UI", system-ui, sans-serif';
    ctx.fillText(value, cx + cw / 2, cy + 58);

    ctx.fillStyle = COLORS.muted;
    ctx.font = '600 20px "Segoe UI", system-ui, sans-serif';
    ctx.fillText(label.toUpperCase(), cx + cw / 2, cy + 96);
  });

  cursorY = gridTop + cellH * 2 + gap + 70;

  const chips = data.languages.slice(0, 8).map(l => LANG_LABELS[l] || l);
  if (chips.length) {
    ctx.font = '600 22px "Segoe UI", system-ui, sans-serif';
    const chipPadX = 22;
    const chipGap = 14;
    const chipH = 46;
    const widths = chips.map(c => ctx.measureText(c).width + chipPadX * 2);

    const rows: { chip: string; w: number }[][] = [[]];
    let rowW = 0;
    const maxRowW = panelW - 96;
    chips.forEach((chip, i) => {
      const w = widths[i];
      if (rowW + w > maxRowW && rows[rows.length - 1].length > 0) {
        rows.push([]);
        rowW = 0;
      }
      rows[rows.length - 1].push({ chip, w });
      rowW += w + chipGap;
    });

    rows.forEach(row => {
      const rowTotalW = row.reduce((a, r) => a + r.w, 0) + chipGap * (row.length - 1);
      let x = SIZE / 2 - rowTotalW / 2;
      row.forEach(({ chip, w }) => {
        roundRect(ctx, x, cursorY, w, chipH, chipH / 2);
        ctx.fillStyle = 'rgba(0,230,118,0.08)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,230,118,0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = COLORS.text;
        ctx.textAlign = 'center';
        ctx.fillText(chip, x + w / 2, cursorY + chipH / 2 + 8);
        x += w + chipGap;
      });
      cursorY += chipH + 14;
    });
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = COLORS.muted;
  ctx.font = '600 24px "Segoe UI", system-ui, sans-serif';
  ctx.fillText('chaduvuko.com/playground', SIZE / 2, panelY + panelH - 46);
}
