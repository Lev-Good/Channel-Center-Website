// viewer.js - Online Channels Viewer Core

const CHANNELS = [
  {
    id: "mesudarim",
    name: "טיפים לכלכלה נכונה",
    description: "הקהילה החרדית הגדולה לחסכון ולהתנהלות כלכלית נכונה.",
    url: "https://mesudarim.chatfree.app/",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    color: "#27ae60"
  },
  {
    id: "hagizra",
    name: "הגיזרה💥",
    description: "ערוץ העדכונים המוביל בציבור החרדי.",
    url: "https://hagizra.news/",
    icon: "https://cdn-icons-png.flaticon.com/512/2989/2989549.png",
    color: "#c0392b"
  },
  {
    id: "black-cat",
    name: "הֶחָתוּל הַשָּׁחוֹר",
    description: "שיתוף תוכן מהיר ומעניין.",
    url: "https://black-cat.thechats.click/",
    icon: "https://cdn-icons-png.flaticon.com/512/4825/4825292.png",
    color: "#2c3e50"
  },
  {
    id: "music",
    name: "מיוזיק אונליין",
    description: "עדכוני מוזיקה ואנ\"ש שוטפים",
    url: "https://music.chatfree.app/",
    icon: "https://cdn-icons-png.flaticon.com/512/461/461238.png",
    color: "#e74c3c"
  },
  {
    id: "yedid-nefesh",
    name: "ידיד נפש⚡",
    description: "טיפים, עצות ותובנות לחיים שלווים ונפש בריאה♥️",
    url: "https://yedid-nefesh.chatfree.app/",
    icon: "https://cdn-icons-png.flaticon.com/512/2589/2589175.png",
    color: "#8e44ad"
  },
  {
    id: "ysiva",
    name: "שטייגען 📚.",
    description: "עדכונים מעולם הישיבות ומהרחוב החרדי הלוהט",
    url: "https://ysiva.thechats.click/",
    icon: "https://cdn-icons-png.flaticon.com/512/3251/3251521.png",
    color: "#8e44ad"
  },
  {
    id: "mizrach",
    name: "כותל המזרח",
    description: "עדכונים איכותיים מעולם התורה והישיבות",
    url: "https://mizrach.chatfree.app/",
    icon: "https://cdn-icons-png.flaticon.com/512/2645/2645851.png",
    color: "#e67e22"
  },
  {
    id: "moreshet-maran",
    name: "מורשת מרן אונליין",
    description: "הנעשה והנשמע בעולם התורה",
    url: "https://news.moreshet-maran.com/",
    icon: "https://cdn-icons-png.flaticon.com/512/3389/3389081.png",
    color: "#2980b9"
  },
  {
    id: "myshemesh",
    name: "מיין שמש my-shemesh",
    description: "עדכונים וחדשות מבית שמש",
    url: "https://myshemesh.co.il/",
    icon: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    color: "#f1c40f"
  },
  {
    id: "myali-mutagim",
    name: "My ali- מותגים מוסתרים",
    description: "קישורים למותגים מוסתרים",
    url: "https://myali-mutagim.chatfree.app/",
    icon: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
    color: "#f39c12"
  },
  {
    id: "myali",
    name: "My ali- קופונים וקישורים לאלי אקספרס",
    description: "קישורים ומוצרים שווים",
    url: "https://myali.chatfree.app/",
    icon: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
    color: "#f39c12"
  },
  {
    id: "aliexpress",
    name: "בזאר המציאות",
    description: "דילים והמלצות קניה",
    url: "https://aliexpress.thechats.click/",
    icon: "https://cdn-icons-png.flaticon.com/512/263/263142.png",
    color: "#e74c3c"
  },
  {
    id: "israelshapira",
    name: "מעיינות ונחלים - ישראל שפירא",
    description: "מידע על מעיינות ונחלים מארצנו הקדושה",
    url: "https://channel.israelshapira.com/",
    icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    color: "#16a085"
  },
  {
    id: "music-express",
    name: "מוזיקה אקספרס",
    description: "עדכוני מוזיקה רעננים ומהירים",
    url: "https://music-express.chatfree.app/",
    icon: "https://cdn-icons-png.flaticon.com/512/461/461238.png",
    color: "#e74c3c"
  }
];

let activeChannel = null;
let currentOffset = 0;
let activeCategory = "";
let isLoading = false;
let hasMore = true;

const sidebarContainer = document.getElementById('sidebar-channels');
const activeIcon = document.getElementById('active-icon');
const activeName = document.getElementById('active-name');
const activeSubcount = document.getElementById('active-subcount');
const messagesFeed = document.getElementById('messages-feed');
const categoryTabs = document.getElementById('category-tabs');
const pinnedBar = document.getElementById('pinned-bar');
const pinnedMessagesContainer = document.getElementById('pinned-messages');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.viewer-sidebar');

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderChannelsList();
  setupEventListeners();
});

// Render sidebar list
function renderChannelsList() {
  sidebarContainer.innerHTML = '';
  CHANNELS.forEach(ch => {
    const el = document.createElement('div');
    el.className = 'channel-item';
    el.setAttribute('data-id', ch.id);
    el.innerHTML = `
      <img src="${ch.icon}" class="channel-item-img" alt="${ch.name}">
      <span class="channel-item-name">${ch.name}</span>
    `;
    el.addEventListener('click', () => selectChannel(ch));
    sidebarContainer.appendChild(el);
  });
}

function setupEventListeners() {
  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

  // Close sidebar on item click for mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== menuToggle) {
      sidebar.classList.remove('show');
    }
  });

  // Infinite Scroll
  messagesFeed.addEventListener('scroll', () => {
    if (isLoading || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesFeed;
    if (scrollHeight - scrollTop - clientHeight < 150) {
      loadMoreMessages();
    }
  });
}

async function selectChannel(channel) {
  activeChannel = channel;
  currentOffset = 0;
  activeCategory = "";
  hasMore = true;
  isLoading = false;

  // Toggle active class in sidebar
  document.querySelectorAll('.channel-item').forEach(el => {
    el.classList.remove('active');
    if (el.getAttribute('data-id') === channel.id) {
      el.classList.add('active');
    }
  });

  // Close sidebar on mobile
  sidebar.classList.remove('show');

  // Update Header
  activeIcon.textContent = "📡";
  activeIcon.style.background = channel.color;
  activeName.textContent = channel.name;
  activeSubcount.textContent = channel.description;

  // Clear feed and show loader
  messagesFeed.innerHTML = '<div class="loading-spinner">טוען הודעות...</div>';
  categoryTabs.style.display = 'none';
  pinnedBar.style.display = 'none';

  // Load categories and messages
  loadCategories(channel);
  loadMessages(true);
}

// Load Categories
async function loadCategories(channel) {
  categoryTabs.innerHTML = '';
  const url = `${channel.url.replace(/\/$/, '')}/api/categories`;
  let categories = [];
  try {
    categories = await fetchJson(url);
  } catch (e) {
    console.warn("Failed loading categories", e);
  }

  if (categories && categories.length > 0) {
    categoryTabs.style.display = 'flex';
    
    // Add "All" tab
    const allTab = document.createElement('div');
    allTab.className = 'viewer-tab active';
    allTab.textContent = 'הכל';
    allTab.addEventListener('click', () => switchCategory('', allTab));
    categoryTabs.appendChild(allTab);

    categories.forEach(cat => {
      const tab = document.createElement('div');
      tab.className = 'viewer-tab';
      tab.textContent = cat;
      tab.addEventListener('click', () => switchCategory(cat, tab));
      categoryTabs.appendChild(tab);
    });
  }
}

function switchCategory(cat, tabEl) {
  if (activeCategory === cat) return;
  activeCategory = cat;
  currentOffset = 0;
  hasMore = true;

  // Update tabs visual active state
  document.querySelectorAll('.viewer-tab').forEach(el => el.classList.remove('active'));
  tabEl.classList.add('active');

  messagesFeed.innerHTML = '<div class="loading-spinner">מפלטר הודעות...</div>';
  loadMessages(true);
}

// Fetch helper with CORS Proxy fallbacks
async function fetchJson(url) {
  // 1. Direct fetch
  try {
    const res = await fetch(`${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      if (data) return data;
    }
  } catch (e) {
    console.warn("Direct fetch failed for URL:", url, e.message);
  }

  // Define fallback proxies
  const proxyChain = [
    { name: 'CorsProxy.io', getUrl: (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}` },
    { name: 'CodeTabs', getUrl: (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}` },
    { name: 'ThingProxy', getUrl: (u) => `https://thingproxy.freeboard.io/fetch/${u}` },
    { name: 'AllOrigins', getUrl: (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}` }
  ];

  for (const proxy of proxyChain) {
    try {
      console.log(`Trying CORS proxy: ${proxy.name} for URL: ${url}`);
      const proxyUrl = proxy.getUrl(url);
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const data = await res.json();
        if (data) {
          console.log(`Successfully fetched from ${proxy.name}`);
          return data;
        }
      }
    } catch (e) {
      console.warn(`Proxy ${proxy.name} failed:`, e.message);
    }
  }

  throw new Error("All fetch methods and CORS proxies failed.");
}

async function loadMessages(isInit = false) {
  if (isLoading) return;
  isLoading = true;

  const url = `${activeChannel.url.replace(/\/$/, '')}/api/messages?limit=25&offset=${currentOffset}` + 
    (activeCategory ? `&category=${encodeURIComponent(activeCategory)}` : '');

  try {
    const data = await fetchJson(url);
    const rawMsgs = Array.isArray(data) ? data : (data.messages || []);
    
    if (isInit) {
      messagesFeed.innerHTML = '';
    } else {
      const spinner = messagesFeed.querySelector('.loading-spinner');
      if (spinner) spinner.remove();
    }

    if (rawMsgs.length === 0) {
      hasMore = false;
      if (isInit) {
        messagesFeed.innerHTML = '<div class="feed-placeholder"><h3>אין הודעות להצגה בערוץ זה</h3></div>';
      }
      isLoading = false;
      return;
    }

    // Process and append
    const processed = parseRawMessages(rawMsgs, activeChannel);
    processed.sort((a,b) => b.id - a.id);

    processed.forEach(msg => {
      const card = renderMessageCard(msg);
      messagesFeed.appendChild(card);
    });

    setupScrollObserver();

    currentOffset += rawMsgs.length;
    if (rawMsgs.length < 25) {
      hasMore = false;
    }
  } catch (e) {
    console.error("Error loading messages", e);
    if (isInit) {
      messagesFeed.innerHTML = '<div class="feed-placeholder"><h3>שגיאה בטעינת הודעות</h3><p>אנא נסה שנית מאוחר יותר או בדוק את חיבור האינטרנט שלך.</p></div>';
    }
  }

  isLoading = false;
}

async function loadMoreMessages() {
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  spinner.textContent = 'טוען הודעות נוספות...';
  messagesFeed.appendChild(spinner);
  loadMessages(false);
}

// Media extractors
function extractMediaUrls(text, type, baseUrl) {
  if (!text) return [];
  const urls = [];
  let match;
  if (type === 'img') {
    const r1 = /!\[.*?\]\((.*?)\)/g;
    const r2 = /\[image-embedded#\]\((.*?)\)/g;
    while ((match = r1.exec(text)) !== null) {
      let u = match[1];
      if (u.startsWith('/')) u = baseUrl + u;
      urls.push(u);
    }
    while ((match = r2.exec(text)) !== null) {
      let u = match[1];
      if (u.startsWith('/')) u = baseUrl + u;
      urls.push(u);
    }
  } else if (type === 'video') {
    const r = /\[video-embedded#\]\((.*?)\)/g;
    while ((match = r.exec(text)) !== null) {
      let u = match[1];
      if (u.startsWith('/')) u = baseUrl + u;
      urls.push(u);
    }
  } else if (type === 'audio') {
    const r = /\[audio-embedded#\]\((.*?)\)/g;
    while ((match = r.exec(text)) !== null) {
      let u = match[1];
      if (u.startsWith('/')) u = baseUrl + u;
      urls.push(u);
    }
  }
  return urls;
}

function parseRawMessages(rawMsgs, channel) {
  const baseUrl = channel.url.replace(/\/$/, '');
  return rawMsgs.map(msg => {
    const text = msg.text || '';
    const imgs = extractMediaUrls(text, 'img', baseUrl);
    const videos = extractMediaUrls(text, 'video', baseUrl);
    const audios = extractMediaUrls(text, 'audio', baseUrl);

    return {
      id: msg.id,
      text: removeSignature(text, channel.id),
      time: msg.timestamp || msg.time || new Date().toISOString(),
      author: msg.author || channel.name,
      images: imgs,
      videos: videos,
      audios: audios,
      views: msg.views || 0,
      reactions: msg.reactions || {}
    };
  });
}

function removeSignature(text, channelId) {
  if (!text) return '';
  if (channelId === 'yedid-nefesh') {
    return text.replace(/לקרוא עוד בערוץ ידיד נפש[\s\S]*/gi, '').trim();
  }
  if (channelId === 'mesudarim') {
    return text.replace(/רוצים להצטרף לערוץ\?[\s\S]*/gi, '').trim();
  }
  return text;
}

function renderMessageCard(msg) {
  const card = document.createElement('div');
  card.className = 'msg-card';
  card.setAttribute('data-id', msg.id);

  // Author and Avatar
  const avatar = activeChannel.icon;
  const timeFormatted = formatTime(msg.time);

  // Parse Text Markdown
  let processedText = msg.text
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="msg-link" target="_blank">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Handle read more
  const isLong = processedText.length > 250;
  let textHtml = '';
  if (isLong) {
    textHtml = `
      <div class="msg-text-short">${processedText.slice(0, 250)}...</div>
      <div class="msg-text-full" style="display:none;">${processedText}</div>
      <button class="read-more-btn">קרא עוד ▾</button>
    `;
  } else {
    textHtml = `<div class="msg-text">${processedText}</div>`;
  }

  // Media HTML
  let mediaHtml = '';
  if (msg.images && msg.images.length > 0) {
    msg.images.forEach(img => {
      mediaHtml += `<div class="msg-media"><img src="${img}" alt="media"></div>`;
    });
  }
  if (msg.videos && msg.videos.length > 0) {
    msg.videos.forEach(vid => {
      mediaHtml += `<div class="msg-media"><video src="${vid}" controls></video></div>`;
    });
  }
  if (msg.audios && msg.audios.length > 0) {
    msg.audios.forEach(aud => {
      mediaHtml += `<div class="msg-media"><audio src="${aud}" controls></audio></div>`;
    });
  }

  // Reactions
  let reactionsHtml = '';
  const reactKeys = Object.keys(msg.reactions);
  if (reactKeys.length > 0) {
    reactionsHtml = `<div class="msg-reactions">`;
    reactKeys.forEach(emoji => {
      const count = msg.reactions[emoji];
      if (count > 0) {
        reactionsHtml += `<span class="msg-reaction-pill">${emoji} ${count}</span>`;
      }
    });
    reactionsHtml += `</div>`;
  }

  card.innerHTML = `
    <div class="msg-header">
      <div class="msg-author-info">
        <img src="${avatar}" class="msg-author-avatar" alt="avatar">
        <span class="msg-author">${msg.author}</span>
      </div>
      <span class="msg-time">${timeFormatted}</span>
    </div>
    ${textHtml}
    ${mediaHtml}
    <div class="msg-footer">
      <span class="msg-views">👁️ ${msg.views} צפיות</span>
      ${reactionsHtml}
    </div>
  `;

  // Read more click handler
  if (isLong) {
    const btn = card.querySelector('.read-more-btn');
    const shortDiv = card.querySelector('.msg-text-short');
    const fullDiv = card.querySelector('.msg-text-full');
    btn.addEventListener('click', () => {
      if (fullDiv.style.display === 'none') {
        fullDiv.style.display = 'block';
        shortDiv.style.display = 'none';
        btn.textContent = 'הצג פחות ▴';
      } else {
        fullDiv.style.display = 'none';
        shortDiv.style.display = 'block';
        btn.textContent = 'קרא עוד ▾';
      }
    });
  }

  return card;
}

function formatTime(isoString) {
  try {
    const date = new Date(isoString);
    const options = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('he-IL', options);
  } catch (e) {
    return '';
  }
}

// Scroll Intersection Observer for Viewport entrance animation
function setupScrollObserver() {
  const cards = document.querySelectorAll('.msg-card:not(.scroll-visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(card => observer.observe(card));
}
