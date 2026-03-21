/* ─────────────────────────────
   PORTFOLIO CHATBOT WIDGET
   Powered by Anthropic API
───────────────────────────────*/

const CHATBOT_SYSTEM_PROMPT = `You are Tahir's AI assistant on his personal portfolio website. You are knowledgeable, friendly, and concise.

## About Tahir Kurtar
- Data Scientist, ML Engineer, and AI Engineer based in Izmir, Turkey
- Graduate of Izmir Democracy University — Electrical and Electronics Engineering
- Supervisor: Asst. Prof. Başak Esin Köktürk Güzel
- Open to job opportunities in data science, machine learning, and AI
- Contact: tahirkurtar50@gmail.com
- LinkedIn: https://www.linkedin.com/in/tahir-kurtar-b49613254/
- GitHub: https://github.com/TahirKurtar
- Medium: https://medium.com/@tahirkurtar
- Kaggle: https://www.kaggle.com/tahirkurtar
- Hugging Face: https://huggingface.co/TahirKurtar

## Graduation Project (Most Important Work)
Title: "A Comparative Study of GAN-Based Image-to-Image Translation Methods for AFM-to-O₂A Microscopy Images"
- **Problem**: s-SNOM microscopes cost $500,000+. Can deep learning replace them by generating O₂A images from cheap AFM images?
- **Dataset**: Spatially aligned AFM ↔ O₂A image pairs (nanoscale microscopy)
- **Models evaluated**: Pix2Pix, CycleGAN, ESRGAN, GauGAN, Vanilla GAN
- **Key results**:
  - GauGAN: BEST (L1=0.202, SSIM=0.457, PSNR=19.49 dB) — spatially-adaptive normalization (SPADE) wins
  - Pix2Pix: Strong supervised baseline (L1=0.208, SSIM=0.442, PSNR=19.48 dB)
  - ESRGAN: Cosmetic sharpness improvement only, no real structural gain
  - CycleGAN: FAILED (L1=1.83) — unpaired training unsuitable for precise nanoscale tasks
  - Vanilla GAN: Lower bound reference
- GitHub: https://github.com/TahirKurtar/AFM-to-O2A-GAN-Comparison
- Medium article: https://medium.com/@tahirkurtar/can-deep-learning-replace-an-expensive-microscope-gans-for-afm-to-o%E2%82%82a-translation-e85ebb5f830c
- Model checkpoints on Hugging Face: https://huggingface.co/TahirKurtar/cyclegan-afm-to-o2a

## Deep Learning Projects

### Choroidal Thickness AI
- Predicts choroidal thickness (temporal, subfoveal, nasal) from retinal fundus images
- 4 multimodal models: Retina Only, Retina+FAF, Retina+Tabular, Retina+FAF+Tabular
- Best model: Retina+FAF+Tabular (MAE=53.81 µm, R²=0.532)
- Backbone: ResNet50 (ImageNet pretrained), Flask web application
- Model weights on Hugging Face: https://huggingface.co/TahirKurtar/choroidal-thickness-models
- GitHub: https://github.com/TahirKurtar/Choroidal-Thickness-AI

### Grasp-and-Lift EEG Detection
- Detects 6 hand movement phases from 32-channel EEG signals
- 3 models: ResCNN (AUC=0.806), LSTM (AUC=0.743), U-Net with EfficientNet-B1 (AUC=0.954)
- Application: Brain-Computer Interface (BCI) for paralyzed patients
- GitHub: https://github.com/TahirKurtar/Grasp-and-Lift-EEG-Detection

### Fashion Image Similarity — VGG16 + KNN
- Visual fashion recommendation system
- VGG16 (frozen, transfer learning) → 512-dim embeddings → KNN similarity search
- Finds 5 most visually similar products from 10,000 items
- GitHub: https://github.com/TahirKurtar/Fashion-Image-Similarity-VGG16-KNN

## Data Science / Python Projects

### Zillow Housing Market Analysis
- U.S. housing affordability analysis (2012–2024) using Zillow ZHVI + FRED economic data
- Price trends, clustering (KMeans), Prophet forecasting, mortgage burden analysis
- Key finding: Jackson WY most unaffordable (17.62x price-to-income ratio)
- Kaggle: https://www.kaggle.com/code/tahirkurtar/zillow-project
- GitHub: https://github.com/TahirKurtar/Zillow_Housing_Market_Analysis

### Cryptocurrency Historical Price Analysis
- EDA on 6 cryptocurrencies: Bitcoin, Ethereum, Dogecoin, Solana, XRP, Tether
- Volatility analysis, correlation, feature engineering, PCA, Random Forest feature importance
- Most volatile: Dogecoin (11.35% daily std), Most stable: Tether
- GitHub: https://github.com/TahirKurtar/Cryptocurrency-Historical-Price-Analysis

## Power BI Projects

### Sales & Revenue Dashboard
- Sales analysis for Turkish cities (2023–2024)
- KPI cards, monthly trends, segment/category breakdown, Top 5 cities
- GitHub: https://github.com/TahirKurtar/Sales_Revenue_Dashboard

### Freelancer Earnings & Job Trends
- Analysis of Kaggle freelancer dataset
- 14-page dashboard: job categories, platforms, ratings, performance scores
- GitHub: https://github.com/TahirKurtar/Freelancer_Earnings_Job_Trends

### Cross-Brand Competitive Analytics
- Price and product comparison: LCW (12K products), H&M (6.7K), Koton, DeFacto
- Data collected via n8n automation
- GitHub: https://github.com/TahirKurtar/Cross_Brand_Competitive_Analytics

## Skills & Expertise

### Programming Languages
- Python, SQL, C++, MATLAB, JavaScript, HTML, CSS

### Data Analytics & Business Intelligence
- Pandas, NumPy, Matplotlib, Seaborn, Plotly
- Power BI, Looker Studio
- EDA, Feature Engineering, Dashboard Design

### Machine Learning & AI
- Frameworks: PyTorch, TensorFlow, Keras, Scikit-Learn
- Architectures: CNN, RNN/LSTM, U-Net, ResNet, VGG16, EfficientNet
- GANs: Pix2Pix, CycleGAN, GauGAN, ESRGAN, Vanilla GAN
- Focus areas: Transfer Learning, Computer Vision, Medical Image Analysis, Generative AI, Deep Learning

### Data Science
- XGBoost, LightGBM, Prophet, KMeans, PCA
- Time Series Analysis, Statistical Analysis

### Web & Deployment
- Flask, Docker, Hugging Face, Vercel, Git/GitHub

### Development Tools
- Jupyter, Google Colab, VS Code, n8n, Git Bash

### Databases
- PostgreSQL, MSSQL

## Behavior Guidelines
- Keep responses SHORT and conversational (2-4 sentences max unless asked for detail)
- If asked about Tahir's projects, describe them enthusiastically with specific numbers
- If asked general ML/AI questions, answer them helpfully
- If someone wants to hire or collaborate, direct them to LinkedIn or email
- Always respond in the same language the user writes in (Turkish or English)
- Never make up projects or facts not listed above`;

(function initChatbot() {
  /* ── State ── */
  const history = [];
  let isOpen = false;
  let isLoading = false;

  /* ── Inject CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    /* ── CHATBOT WIDGET ── */
    #tk-chat-toggle {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 1000;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 24px rgba(99,102,241,0.5);
      transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s;
      color: #fff;
    }
    #tk-chat-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 32px rgba(99,102,241,0.65);
    }
    #tk-chat-toggle .icon-chat,
    #tk-chat-toggle .icon-close {
      position: absolute;
      transition: opacity 0.2s, transform 0.2s;
    }
    #tk-chat-toggle.open .icon-chat  { opacity: 0; transform: scale(0.7); }
    #tk-chat-toggle.open .icon-close { opacity: 1; transform: scale(1);   }
    #tk-chat-toggle:not(.open) .icon-chat  { opacity: 1; transform: scale(1);   }
    #tk-chat-toggle:not(.open) .icon-close { opacity: 0; transform: scale(0.7); }

    /* Unread dot */
    #tk-chat-dot {
      position: absolute;
      top: 4px; right: 4px;
      width: 12px; height: 12px;
      background: #06b6d4;
      border-radius: 50%;
      border: 2px solid #080b14;
      animation: tk-pulse 2s ease-in-out infinite;
    }
    @keyframes tk-pulse {
      0%,100% { transform: scale(1); opacity: 1; }
      50%      { transform: scale(1.3); opacity: 0.7; }
    }

    /* Window */
    #tk-chat-window {
      position: fixed;
      bottom: 96px;
      right: 28px;
      z-index: 999;
      width: 360px;
      max-height: 520px;
      background: #0d1321;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      box-shadow: 0 24px 64px rgba(0,0,0,0.6);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: scale(0.85) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
      transform-origin: bottom right;
    }
    #tk-chat-window.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* Header */
    #tk-chat-header {
      padding: 16px 18px;
      background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1));
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .tk-avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
    }
    .tk-header-info h4 {
      font-size: 0.88rem; font-weight: 700;
      color: #e8eaf6; margin: 0;
    }
    .tk-header-info p {
      font-size: 0.72rem; color: #8892b0; margin: 0;
      display: flex; align-items: center; gap: 5px;
    }
    .tk-online-dot {
      width: 7px; height: 7px;
      background: #02b875; border-radius: 50%;
      display: inline-block;
    }

    /* Messages */
    #tk-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.1) transparent;
    }
    #tk-chat-messages::-webkit-scrollbar { width: 4px; }
    #tk-chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

    .tk-msg {
      display: flex;
      gap: 8px;
      animation: tk-fadein 0.25s ease;
    }
    @keyframes tk-fadein {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .tk-msg.user { flex-direction: row-reverse; }
    .tk-bubble {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 0.82rem;
      line-height: 1.6;
      color: #e8eaf6;
      word-break: break-word;
    }
    .tk-msg.bot  .tk-bubble { background: rgba(255,255,255,0.06); border-bottom-left-radius: 4px; }
    .tk-msg.user .tk-bubble { background: linear-gradient(135deg, #6366f1, #8b5cf6); border-bottom-right-radius: 4px; }

    /* Typing indicator */
    .tk-typing .tk-bubble {
      display: flex; align-items: center; gap: 4px;
      padding: 12px 16px;
    }
    .tk-typing .tk-bubble span {
      width: 7px; height: 7px;
      background: #8892b0; border-radius: 50%;
      animation: tk-bounce 1.2s ease-in-out infinite;
    }
    .tk-typing .tk-bubble span:nth-child(2) { animation-delay: 0.2s; }
    .tk-typing .tk-bubble span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes tk-bounce {
      0%,60%,100% { transform: translateY(0); }
      30%          { transform: translateY(-6px); }
    }

    /* Input */
    #tk-chat-input-row {
      padding: 12px 14px;
      border-top: 1px solid rgba(255,255,255,0.07);
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    #tk-chat-input {
      flex: 1;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 0.82rem;
      color: #e8eaf6;
      font-family: 'Inter', sans-serif;
      outline: none;
      transition: border-color 0.2s;
      resize: none;
    }
    #tk-chat-input::placeholder { color: #8892b0; }
    #tk-chat-input:focus { border-color: rgba(99,102,241,0.5); }
    #tk-chat-send {
      width: 38px; height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: #fff; flex-shrink: 0;
      transition: filter 0.2s, transform 0.2s;
      align-self: flex-end;
    }
    #tk-chat-send:hover:not(:disabled) { filter: brightness(1.15); transform: scale(1.05); }
    #tk-chat-send:disabled { opacity: 0.4; cursor: not-allowed; }

    /* Suggested questions */
    #tk-suggestions {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 0 16px 12px;
    }
    .tk-suggestion {
      font-size: 0.72rem;
      padding: 5px 11px;
      border-radius: 100px;
      background: rgba(99,102,241,0.1);
      border: 1px solid rgba(99,102,241,0.25);
      color: #8892b0;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      white-space: nowrap;
    }
    .tk-suggestion:hover { background: rgba(99,102,241,0.2); color: #e8eaf6; }

    @media (max-width: 480px) {
      #tk-chat-window { width: calc(100vw - 32px); right: 16px; }
      #tk-chat-toggle { right: 16px; bottom: 16px; }
    }
  `;
  document.head.appendChild(style);

  /* ── Build HTML ── */
  document.body.insertAdjacentHTML('beforeend', `
    <!-- Chat Toggle Button -->
    <button id="tk-chat-toggle" aria-label="Open chat">
      <div id="tk-chat-dot"></div>
      <svg class="icon-chat" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
      <svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>

    <!-- Chat Window -->
    <div id="tk-chat-window" role="dialog" aria-label="Chat with Tahir's AI">
      <div id="tk-chat-header">
        <div class="tk-avatar">🤖</div>
        <div class="tk-header-info">
          <h4>Tahir's AI Assistant</h4>
          <p><span class="tk-online-dot"></span> Online · Ask me anything</p>
        </div>
      </div>
      <div id="tk-chat-messages"></div>
      <div id="tk-suggestions">
        <button class="tk-suggestion">🎓 Graduation project?</button>
        <button class="tk-suggestion">📂 What projects do you have?</button>
        <button class="tk-suggestion">🛠️ What tech stack do you use?</button>
        <button class="tk-suggestion">💼 Are you open to work?</button>
      </div>
      <div id="tk-chat-input-row">
        <textarea id="tk-chat-input" rows="1" placeholder="Ask about projects, skills…"></textarea>
        <button id="tk-chat-send" aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `);

  /* ── Elements ── */
  const toggle   = document.getElementById('tk-chat-toggle');
  const window_  = document.getElementById('tk-chat-window');
  const messages = document.getElementById('tk-chat-messages');
  const input    = document.getElementById('tk-chat-input');
  const sendBtn  = document.getElementById('tk-chat-send');
  const dot      = document.getElementById('tk-chat-dot');
  const suggestions = document.querySelectorAll('.tk-suggestion');

  /* ── Toggle ── */
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    toggle.classList.toggle('open', isOpen);
    window_.classList.toggle('open', isOpen);
    if (isOpen) {
      dot.style.display = 'none';
      if (messages.children.length === 0) addWelcome();
      setTimeout(() => input.focus(), 300);
    }
  });

  /* ── Welcome message ── */
  function addWelcome() {
    appendMsg('bot', "Hi! 👋 I'm Tahir's AI assistant. I can tell you about his projects (GAN research, EEG detection, choroidal thickness AI, Power BI dashboards and more), skills, and experience — or answer general ML/AI questions. What would you like to know?");
  }

  /* ── Append message ── */
  function appendMsg(role, text) {
    const div = document.createElement('div');
    div.className = `tk-msg ${role}`;
    div.innerHTML = `<div class="tk-bubble">${text.replace(/\n/g, '<br>')}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  /* ── Typing indicator ── */
  function showTyping() {
    const div = document.createElement('div');
    div.className = 'tk-msg bot tk-typing';
    div.id = 'tk-typing-indicator';
    div.innerHTML = `<div class="tk-bubble"><span></span><span></span><span></span></div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
  function hideTyping() {
    const el = document.getElementById('tk-typing-indicator');
    if (el) el.remove();
  }

  /* ── Send message ── */
  async function sendMessage(text) {
    text = text.trim();
    if (!text || isLoading) return;

    // Hide suggestions after first message
    document.getElementById('tk-suggestions').style.display = 'none';

    appendMsg('user', text);
    history.push({ role: 'user', content: text });
    input.value = '';
    input.style.height = 'auto';

    isLoading = true;
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: CHATBOT_SYSTEM_PROMPT,
          messages: history,
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not get a response.';

      hideTyping();
      appendMsg('bot', reply);
      history.push({ role: 'assistant', content: reply });

    } catch (err) {
      hideTyping();
      appendMsg('bot', 'Something went wrong. Please try again.');
      console.error(err);
    }

    isLoading = false;
    sendBtn.disabled = false;
    input.focus();
  }

  /* ── Events ── */
  sendBtn.addEventListener('click', () => sendMessage(input.value));

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input.value);
    }
  });

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });

  // Suggested questions
  suggestions.forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.textContent));
  });

})();