/* ============================================= */
/* SCRIPT.JS — Breadcrumb, Mobile Menu, Lightbox */
/* ============================================= */

const siteMap = {
  "index.html":    { title: "Beranda",              parent: null },
  "profil.html":   { title: "Profil Suku Boti",      parent: "index.html" },
  "falsafah.html": { title: "Falsafah & Adat",       parent: "index.html" },
  "galeri.html":   { title: "Galeri Motif Tenun",    parent: "index.html" },
  "audio.html":    { title: "Audio Bahasa Lokal",    parent: "index.html" },
  "peta.html":     { title: "Peta Interaktif",       parent: "index.html" },
  "sitemap.html":  { title: "Sitemap",               parent: null }
};

function getCurrentFileName() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

/* 1. Breadcrumb Otomatis */
function renderBreadcrumb() {
  const container = document.getElementById("breadcrumb");
  if (!container) return;

  const currentFile = getCurrentFileName();
  const trail = [];
  let cursor = currentFile;

  while (cursor && siteMap[cursor]) {
    trail.unshift({ file: cursor, title: siteMap[cursor].title });
    cursor = siteMap[cursor].parent;
  }

  if (trail.length === 0) {
    trail.push({ file: currentFile, title: document.title });
  }

  container.innerHTML = trail
    .map((item, index) => {
      const isLast = index === trail.length - 1;
      if (isLast) return `<span class="current">${item.title}</span>`;
      return `<a href="${item.file}">${item.title}</a><span class="sep">&#9670;</span>`;
    })
    .join("");
}

/* 2. Mobile Menu Toggle */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

/* 3. Lightbox untuk Galeri */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-grid figure');
  if (galleryItems.length === 0) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="close-btn">&times;</span>
    <img src="" alt="">
    <p style="color:white; margin-top:15px; font-size:18px;"></p>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('p');
  const closeBtn = lightbox.querySelector('.close-btn');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('figcaption');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

/* 4. Back to Top Button */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.innerHTML = '&#8593;';
  btn.setAttribute('aria-label', 'Kembali ke atas');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 5. Reveal Animation & Inisialisasi */
document.addEventListener("DOMContentLoaded", () => {
  renderBreadcrumb();
  initMobileMenu();
  initLightbox();
  initBackToTop();
  
  const main = document.querySelector("main");
  if (main) requestAnimationFrame(() => main.classList.add("is-visible"));
});