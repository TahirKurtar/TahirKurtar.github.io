/* ─────────────────────────────
   PORTFOLIO APP.JS
───────────────────────────────*/
const GITHUB_USER = 'TahirKurtar';
const GITHUB_TOKEN = '';

const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#2b7489',
  Jupyter: '#DA5B0B', R: '#198CE7', HTML: '#e34c26', CSS: '#563d7c',
  Shell: '#89e051', Go: '#00ADD8', Rust: '#dea584', C: '#555555',
  'C++': '#f34b7d', Java: '#b07219',
};

/* ════════════════════════════
   NETWORK BACKGROUND CANVAS
════════════════════════════ */
(function initNetwork() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d');

  let W, H, nodes;
  const COUNT = 70;
  const MAX_DIST = 160;
  const SPEED = 0.4;

  function isLight() { return document.body.classList.contains('light-theme'); }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeNodes() {
    nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 2 + 1.5,
    }));
  }

  function draw() {
    requestAnimationFrame(draw);
    const light = isLight();
    ctx.clearRect(0, 0, W, H);

    const bg    = light ? '#f0f4ff' : '#080b14';
    const nodeC = light ? 'rgba(99,102,241,' : 'rgba(99,102,241,';
    const lineC = light ? 'rgba(99,102,241,' : 'rgba(99,102,241,';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < COUNT; i++) {
      const a = nodes[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;

      for (let j = i + 1; j < COUNT; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * (light ? 0.35 : 0.55);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = lineC + alpha + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      const alpha = light ? 0.7 : 0.9;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = nodeC + alpha + ')';
      ctx.shadowColor = light ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.8)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  window.addEventListener('resize', () => { resize(); makeNodes(); });
  resize();
  makeNodes();
  draw();
})();


window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Scroll progress bar ── */
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scrollProgress');
  if (bar) {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + '%';
  }
});

/* ════════════════════════════
   THEME TOGGLE
════════════════════════════ */
(function initTheme() {
  const saved = localStorage.getItem('tk-theme');
  if (saved === 'light') document.body.classList.add('light-theme');

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('tk-theme', isLight ? 'light' : 'dark');
    });
  }
})();

/* ── Floating particles ── */
(function spawnParticles() {
  const container = document.getElementById('bgParticles');
  if (!container) return;
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#f0f6fc'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 20 + 15}s;
      animation-delay:${Math.random() * 20}s;
    `;
    container.appendChild(p);
  }
})();

/* ════════════════════════════
   MOUSE CANVAS PARTICLE SYSTEM
════════════════════════════ */
(function initMouseCanvas() {
  if (window.matchMedia('(pointer: coarse)').matches) {
    const canvas = document.getElementById('mouseCanvas');
    if (canvas) canvas.style.display = 'none';
    return;
  }
  const canvas = document.getElementById('mouseCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  let mx = W / 2, my = H / 2;
  let px = mx, py = my;
  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
  window.addEventListener('mousemove', e => {
    px = mx; py = my;
    mx = e.clientX;
    my = e.clientY;
  });
  const particles = [];
  class Dot {
    constructor() { this.reset(); }
    reset() {
      this.x = mx + (Math.random() - 0.5) * 20;
      this.y = my + (Math.random() - 0.5) * 20;
      const angle = Math.atan2(my - py, mx - px) + (Math.random() - 0.5) * 1.4;
      const speed = Math.random() * 1.8 + 0.4;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 3 + 1;
      this.life = 1;
      this.decay = Math.random() * 0.018 + 0.008;
      const hue = Math.random() < 0.5 ? 220 : 190;
      this.color = `hsla(${hue},90%,95%,`;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.vx *= 0.97; this.vy *= 0.97;
      this.life -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.shadowColor = 'rgba(180,210,255,0.9)';
      ctx.shadowBlur = this.size * 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.life + ')';
      ctx.fill();
      ctx.restore();
    }
  }
  let frameCount = 0;
  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, W, H);
    frameCount++;
    if (frameCount % 2 === 0) {
      for (let i = 0; i < 3; i++) particles.push(new Dot());
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      if (particles[i].life <= 0) { particles.splice(i, 1); continue; }
      particles[i].draw();
    }
  }
  loop();
})();

/* ── Utility ── */
function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n;
}

/* ════════════════════════════
   GITHUB
════════════════════════════ */
async function fetchGitHub() {
  const container = document.getElementById('githubCards');
  if (!container) return;
  try {
    const headers = {};
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=public`,
      { headers }
    );
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
    const repos = await res.json();
    container.innerHTML = '';
    const sorted = repos
      .filter(r => !r.fork)
      .filter(r => !['TahirKurtar', 'TahirKurtar.github.io'].includes(r.name))
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 20);
    if (sorted.length === 0) {
      container.innerHTML = '<div class="error-card">No public repositories found yet.</div>';
      return;
    }
    sorted.forEach(repo => {
      const lang = (repo.language === 'Jupyter Notebook') ? null : repo.language;
      const langColor = LANG_COLORS[lang] || '#8892b0';
      const tags = [...(repo.topics || [])].filter(Boolean);
      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.className = 'card';
      card.innerHTML = `
        <div class="card-body">
          <div class="card-icon-row">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="#8892b0">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
            </svg>
            <span class="card-source">github.com / ${GITHUB_USER}</span>
          </div>
          <h3 class="card-title">${repo.name}</h3>
          <p class="card-desc">${repo.description || 'No description.'}</p>
          ${tags.length ? `<div class="card-tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
        </div>
        <div class="card-footer">
          <span class="card-link">View Project \u2192</span>
          ${lang ? `<span class="meta-item"><span class="lang-dot" style="background:${langColor}"></span>${lang}</span>` : ''}
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = `<div class="error-card">GitHub data could not be loaded.<br><small>${err.message}</small></div>`;
  }
}

/* ════════════════════════════
   INIT
════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  fetchGitHub();
});