/* ─────────────────────────────
   PORTFOLIO APP.JS
   GitHub API + Medium RSS + Kaggle (static)
───────────────────────────────*/
const GITHUB_USER = 'TahirKurtar';
const GITHUB_TOKEN = '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';
const MEDIUM_USER = '@tahirkurtar';

/* ── Pinned Medium yazıları — yeni pinli yazı eklemek için URL'yi buraya ekle ── */
const PINNED_URLS = [
  'https://medium.com/@tahirkurtar/can-deep-learning-replace-an-expensive-microscope-gans-for-afm-to-o%E2%82%82a-translation-e85ebb5f830c',
];

/* ── Utility: URL'nin pinned listesinde olup olmadığını kontrol et ── */
function isPinned(url) {
  try {
    const slug = new URL(decodeURIComponent(url)).pathname.split('/').filter(Boolean).pop();
    return PINNED_URLS.some(pinned => {
      const pinnedSlug = new URL(decodeURIComponent(pinned)).pathname.split('/').filter(Boolean).pop();
      return slug === pinnedSlug;
    });
  } catch {
    return PINNED_URLS.includes(url);
  }
}

/* ── Kaggle projeleri — link eklemek/çıkarmak için sadece buraya bak ── */
const KAGGLE_PROJECTS = [
  {
    title: 'Fundamentals of Biomedical Signal Processing Proje',
    url: 'https://www.kaggle.com/code/oulcanakca/fundamentals-of-biomedical-signal-processing-proje',
    description: 'EEG Proje',
    tags: ['Python', 'EEG'],
  },
  {
    title: 'Project-1',
    url : 'https://www.kaggle.com/code/tahirkurtar/project-1',
    description: 'Projem benim',
    tags: ['Python', 'Proje'],
  },
  {
    title: 'Zillow Project',
    url: 'https://www.kaggle.com/code/tahirkurtar/zillow-project',
    description: 'Zillow Projesi',
    tags: ['Python', 'Zillow'],
  },
  {
    title: 'GauGAN',
    url: 'https://www.kaggle.com/code/tahirkurtar/gaugan',
    description: 'GauGAN for AFM-O2A Translation',
    tags: ['Python', 'GAN'],
  },
  {
    title: 'Fashion Image Similarity: VGG16 & KNN Recommender',
    url: 'https://www.kaggle.com/code/tahirkurtar/visual-product-recommendation-system-vgg16-knn/edit',
    description: 'Leveraging VGG16 and KNN, this intelligent engine instantly recommends fashion products by analyzing visual similarity, design, and texture.',
    tags: ['Computer Vision', 'Deep Learning', 'Fashion', 'Recommendation System'],
  }
];



/* ── Language color map ── */
const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Jupyter: '#DA5B0B',
  R: '#198CE7',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  Java: '#b07219',
};

/* ── Navbar scroll effect ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 40);
});


/* ════════════════════════════
   THEME TOGGLE
════════════════════════════ */

/* ════════════════════════════
   THEME TOGGLE
════════════════════════════ */
(function initTheme() {
  const saved = localStorage.getItem('tk-theme');
  if (saved === 'light') document.body.classList.add('light-theme');

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('tk-theme', isLight ? 'light' : 'dark');
      });
    }
  });
})();

/* ── Floating particles ── */
(function spawnParticles() {
  const container = document.getElementById('bgParticles');
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
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.97;
      this.vy *= 0.97;
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

/* ── Utility: truncate text ── */
function truncate(str, n) {
  if (!str) return '';
  return str.length > n ? str.slice(0, n) + '…' : str;
}

/* ── Utility: format numbers ── */
function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n;
}

/* ── Utility: time ago ── */
function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  if (diff < 2592000) return Math.floor(diff / 86400) + 'd ago';
  if (diff < 31536000) return Math.floor(diff / 2592000) + 'mo ago';
  return Math.floor(diff / 31536000) + 'y ago';
}



/* ════════════════════════════
   GITHUB
════════════════════════════ */
async function fetchGitHub() {
  const container = document.getElementById('githubCards');
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=9&type=public`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
    const repos = await res.json();
    container.innerHTML = '';
    const sorted = repos
      .filter(r => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 8);
    if (sorted.length === 0) {
      container.innerHTML = `<div class="error-card">No public repositories found yet.</div>`;
      return;
    }
    sorted.forEach(repo => {
      const langColor = LANG_COLORS[repo.language] || '#8892b0';
      const tags = [repo.language, ...(repo.topics || []).slice(0, 2)].filter(Boolean);
      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.className = 'card';
      card.setAttribute('id', `ghRepo-${repo.id}`);
      card.innerHTML = `
        <div class="card-body">
          <div class="card-icon-row">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="#8892b0">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
            </svg>
            <span class="card-source">github.com / ${GITHUB_USER}</span>
          </div>
          <h3 class="card-title">${repo.name}</h3>
          <p class="card-desc">${truncate(repo.description || 'No description.', 120)}</p>
          ${tags.length ? `<div class="card-tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
        </div>
        <div class="card-footer">
          <span class="card-link">${repo.full_name} →</span>
          <span class="card-meta">
            ${repo.language ? `<span class="meta-item"><span class="lang-dot" style="background:${langColor}"></span>${repo.language}</span>` : ''}
            <span class="meta-item">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
              </svg>
              ${fmt(repo.stargazers_count)}
            </span>
            <span class="meta-item">${timeAgo(repo.updated_at)}</span>
          </span>
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
   MEDIUM — Card builder
════════════════════════════ */
function buildMediumCard(item, idx) {
  const thumbMatch = item.thumbnail ||
    (item.content && item.content.match(/<img[^>]+src="([^"]+)"/)?.[1]);
  const tags = (item.categories || []).slice(0, 3);
  const tmp = document.createElement('div');
  tmp.innerHTML = item.description || '';
  const desc = tmp.textContent.trim();
  const pubDate = item.pubDate
    ? new Date(item.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  const card = document.createElement('a');
  card.href = item.link;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = 'card';
  card.setAttribute('id', `medPost-${idx}`);
  card.innerHTML = `
    ${thumbMatch
      ? `<img class="card-thumb" src="${thumbMatch}" alt="${item.title}" loading="lazy" />`
      : `<div class="card-thumb-placeholder">✍️ Medium Article</div>`
    }
    <div class="card-body">
      <div class="card-icon-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#02b875">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
        <span class="card-source">medium.com</span>
      </div>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-desc">${truncate(desc, 150)}</p>
      ${tags.length ? `<div class="card-tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
    </div>
    <div class="card-footer">
      <span class="card-link">Read Article →</span>
      <span class="card-meta">${pubDate}</span>
    </div>
  `;
  return card;
}

/* ════════════════════════════
   MEDIUM — Main fetch
════════════════════════════ */
async function fetchMedium() {
  const container = document.getElementById('mediumCards');
  const rssUrl = encodeURIComponent(`https://medium.com/feed/${MEDIUM_USER}`);
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&count=10`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.status !== 'ok') throw new Error('RSS conversion error');
    container.innerHTML = '';

    const items = data.items || [];
    if (items.length === 0) {
      container.innerHTML = `<div class="error-card">No Medium articles found yet.</div>`;
      return;
    }

    // Pinned yazılar önce, geri kalanlar tarih sırasıyla
    const pinnedItems = items.filter(item => isPinned(item.link));
    const otherItems  = items.filter(item => !isPinned(item.link));

    pinnedItems.forEach((item, idx) => container.appendChild(buildMediumCard(item, idx)));
    otherItems.forEach((item, idx) => container.appendChild(buildMediumCard(item, pinnedItems.length + idx)));

  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div class="error-card">
        Medium articles could not be loaded.<br>
        <small>${err.message}</small><br><br>
        <a href="https://medium.com/${MEDIUM_USER}" target="_blank" style="color:#02b875">Visit Medium profile →</a>
      </div>`;
  }
}

/* ════════════════════════════
   KAGGLE
════════════════════════════ */
function renderKaggle() {
  const container = document.getElementById('kaggleCards');
  container.innerHTML = '';

  KAGGLE_PROJECTS.forEach((project, idx) => {
    const card = document.createElement('a');
    card.href = project.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'card';
    card.setAttribute('id', `kaggleProject-${idx}`);
    card.innerHTML = `
      <div class="card-body">
        <div class="card-icon-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#20beff">
            <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.236.118-.353.354-.353h2.431c.234 0 .351.117.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z"/>
          </svg>
          <span class="card-source">kaggle.com</span>
        </div>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description}</p>
        ${project.tags.length ? `<div class="card-tags">${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
      </div>
      <div class="card-footer">
        <span class="card-link">View Notebook →</span>
      </div>
    `;
    container.appendChild(card);
  });
}
/* ════════════════════════════
   INIT
════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  fetchGitHub();
  fetchMedium();
  renderKaggle();
});