// script.js - Landing Page Interactions

document.addEventListener('DOMContentLoaded', () => {
  // Light/Dark Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('light-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggleBtn.textContent = isLight ? '☀️' : '🌙';
    });
  }

  // Tab Switching in Hero Extension Mockup
  const mockupTabs = document.querySelectorAll('.mockup-tab');
  const feedChTitle = document.querySelector('.feed-ch-title');
  const cardParagraph = document.querySelector('.mockup-card-item p');

  const contentMap = {
    'עדכונים': {
      title: 'מיוזיק אונליין',
      badge: '4,520 רשומים',
      text: 'השיר החדש של נחמן פילמר "אהבת השם" שוחרר כעת להאזנה וניגון ישיר!'
    },
    'פודקאסטים': {
      title: 'מיוזיק פודקאסט',
      badge: '4,520 רשומים',
      text: 'פרק 14 בסדרת "עולם הישיבות" מאת הרב ולבה שוחרר כעת להורדה!'
    },
    'הפינה היומית': {
      title: 'הפינה היומית',
      badge: '4,520 רשומים',
      text: 'הלכות שבת ומועדים: דיני טבילת כלים ונושאים חמים לשולחן השבת.'
    }
  };

  mockupTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle Active Tab class
      mockupTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update content dynamically
      const tabName = tab.textContent.trim();
      if (contentMap[tabName]) {
        feedChTitle.textContent = contentMap[tabName].title;
        cardParagraph.textContent = contentMap[tabName].text;
      }
    });
  });

  // Fade-in observer for scrolling
  const steps = document.querySelectorAll('.step-card, .feature-card, .channel-pill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  steps.forEach(el => {
    el.style.opacity = '0.3';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
