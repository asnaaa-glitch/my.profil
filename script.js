document.documentElement.classList.add('js');

/* ===== Pengaturan =====
   Form kontak: daftar gratis di https://formspree.io, buat form baru,
   lalu tempel alamatnya di sini, contoh: 'https://formspree.io/f/abcdwxyz'.
   Kalau dikosongkan, form membuka aplikasi email sebagai cadangan. */
const FORM_ENDPOINT = '';
const MY_EMAIL = 'as.husna06@gmail.com';

const $ = id => document.getElementById(id);
const store = {
  get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
};

/* ===== Terjemahan Indonesia -> Inggris ===== */
const EN = {
  'Semua': 'All', 'Tentang': 'About', 'Keahlian': 'Skills', 'Perjalanan': 'Journey', 'Proyek': 'Projects',
  'Hubungi saya': 'Contact me',
  'Terbuka untuk proyek freelance': 'Open for freelance projects',
  'Saya Husna, frontend developer yang membuat website rapi dan nyaman dipakai.': "I'm Husna, a frontend developer who builds clean, comfortable-to-use websites.",
  'Fokus saya ada di detail UI/UX dan animasi yang halus, supaya setiap halaman terasa jelas dan menyenangkan bagi penggunanya.': 'I focus on UI/UX details and smooth animation so every page feels clear and pleasant to use.',
  'Lihat proyek': 'View projects', 'Lihat CV': 'View CV', 'Kembali': 'Back', 'Simpan PDF': 'Save as PDF',
  'Profil': 'Profile', 'Pengalaman': 'Experience', 'Pendidikan': 'Education', 'Frontend Developer (Freelance)': 'Frontend Developer (Freelance)',
  'File CV belum ditemukan. Letakkan cv-husna.pdf di folder yang sama dengan index.html.': 'CV file not found. Place cv-husna.pdf in the same folder as index.html.',
  'Tentang saya': 'About me',
  'Saya Asmaul Husna, mahasiswa Teknik Informatika di Universitas Jabal Ghafur yang suka membangun tampilan website yang bersih, modern, dan enak dipakai.': "I'm Asmaul Husna, an Informatics Engineering student at Universitas Jabal Ghafur who loves building clean, modern, easy-to-use websites.",
  'Bagi saya, website yang bagus bukan hanya soal tampilan, tapi juga kenyamanan saat berinteraksi. Karena itu saya memperhatikan detail UI/UX dan animasi agar pengalamannya terasa hidup tanpa mengganggu.': 'To me, a good website is not only about looks but also how comfortable it feels to use. That is why I care about UI/UX details and animation that feel alive without getting in the way.',
  'Desain': 'Design',
  '2024 – sekarang': '2024 – present',
  '2024 – sekarang · Semester 6': '2024 – present · Semester 6',
  'Proyek freelance dan pengembangan portfolio pribadi dengan React, Next.js, dan TypeScript.': 'Freelance projects and personal portfolio development with React, Next.js, and TypeScript.',
  'Mendalami Figma, Tailwind CSS, dan prinsip desain responsif.': 'Learning Figma, Tailwind CSS, and responsive design principles.',
  'Teknik Informatika': 'Informatics Engineering',
  'Universitas Jabal Ghafur. Mempelajari rekayasa perangkat lunak, pengembangan web, dan desain.': 'Universitas Jabal Ghafur. Studying software engineering, web development, and design.',
  'Proyek terbaru': 'Latest projects',
  'Platform digital untuk melaporkan masalah desa dan memantau transparansi dana.': 'A digital platform for reporting village issues and tracking fund transparency.',
  'Klon antarmuka Netflix dengan tampilan modern dan responsif.': 'A Netflix interface clone with a modern, responsive look.',
  'Dashboard untuk mengelola broadcast WhatsApp.': 'A dashboard for managing WhatsApp broadcasts.',
  'Website interaktif untuk menjelajahi fakta menarik, lengkap dengan kuis.': 'An interactive website for exploring interesting facts, with a quiz.',
  'Aplikasi chat teman curhat berbahasa Indonesia, didukung Google Gemini API.': 'An Indonesian-language companion chat app powered by the Google Gemini API.',
  'Website untuk memudahkan mahasiswa melakukan absensi di setiap mata kuliah.': 'A website that makes it easy for students to take attendance in every course.',
  'Buka demo': 'Open demo', 'Kode': 'Code',
  'Ayo bekerja sama': "Let's work together",
  'Ceritakan proyek Anda. Saya membalas lewat email.': "Tell me about your project. I'll reply by email.",
  'Indonesia · Senin–Jumat, 09.00–18.00': 'Indonesia · Mon–Fri, 09:00–18:00',
  'Nama': 'Name', 'Subjek': 'Subject', 'Pesan': 'Message', 'Kirim pesan': 'Send message',
  'Frontend developer yang suka membuat antarmuka rapi dan nyaman dipakai.': 'A frontend developer who loves building tidy, comfortable interfaces.'
};
const UI = {
  id: { close: 'Tutup', lang: 'Ganti bahasa', theme: 'Ganti tema', sending: 'Mengirim…', ok: 'Pesan terkirim. Terima kasih!',
        err: 'Pesan belum terkirim. Coba lagi atau kirim langsung lewat email.', mail: 'Aplikasi email Anda dibuka. Kirim pesannya dari sana.', subj: 'Pesan dari portfolio', from: 'Dari' },
  en: { close: 'Close', lang: 'Change language', theme: 'Change theme', sending: 'Sending…', ok: 'Message sent. Thank you!',
        err: 'Message not sent. Try again or email me directly.', mail: 'Your email app is opening. Send the message from there.', subj: 'Message from portfolio', from: 'From' }
};

let lang = store.get('lang') === 'en' ? 'en' : 'id';
const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  const key = node.nodeValue.trim().replace(/\s+/g, ' ');
  if (EN[key]) textNodes.push({ node, key, pre: node.nodeValue.match(/^\s*/)[0], post: node.nodeValue.match(/\s*$/)[0] });
}

function setLang(l) {
  lang = l;
  textNodes.forEach(t => { t.node.nodeValue = t.pre + (l === 'en' ? EN[t.key] : t.key) + t.post; });
  document.documentElement.lang = l;
  $('langBtn').textContent = l === 'en' ? 'ID' : 'EN';
  $('langBtn').setAttribute('aria-label', UI[l].lang);
  $('themeBtn').setAttribute('aria-label', UI[l].theme);
  $('mClose').setAttribute('aria-label', UI[l].close);
  store.set('lang', l);
  $('cvLang').textContent = l === 'en' ? 'ID' : 'EN';
  showRole();
}
$('langBtn').addEventListener('click', () => { modal.open && modal.close(); setLang(lang === 'id' ? 'en' : 'id'); });

/* ===== Mode terang dan gelap ===== */
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  $('themeBtn').textContent = t === 'dark' ? '☀' : '☾';
  store.set('theme', t);
}
$('themeBtn').addEventListener('click', () =>
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

/* ===== Menu mobile ===== */
const menuBtn = $('menuBtn');
const nav = $('nav');
menuBtn.addEventListener('click', () => {
  menuBtn.setAttribute('aria-expanded', String(nav.classList.toggle('open')));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

/* ===== Menu aktif saat scroll ===== */
const links = [...nav.querySelectorAll('a[href^="#"]')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach(a => { const sec = document.querySelector(a.getAttribute('href')); if (sec) spy.observe(sec); });

/* ===== Detail proyek (fitur utama) =====
   Tambahkan proyek lain di sini dengan pola yang sama. */
const DETAIL_LABEL = { id: 'Fitur utama', en: 'Key features' };
const DETAILS = {
  'DesaCare': {
    id: ['Laporan cepat: kirim laporan masalah desa hanya dalam beberapa langkah', 'Bukti foto: unggah foto agar laporan lebih jelas dan valid', 'Status real-time: pantau laporan dari Pending hingga Selesai', 'Transparansi dana desa yang bisa dipantau warga'],
    en: ['Quick reports: submit a village issue in just a few steps', 'Photo evidence: upload photos so reports are clearer and more valid', 'Real-time status: track a report from Pending to Done', 'Village fund transparency that residents can follow']
  },
  'Netflix Clone': {
    id: ['Trailer film yang bisa diputar langsung di halaman', 'Kolom pencarian film', 'Tampilan responsif di berbagai ukuran layar'],
    en: ['Movie trailers that play right on the page', 'Movie search box', 'Responsive layout on different screen sizes']
  },
  'Broadcast Manual': {
    id: ['Halaman masuk dengan akun', 'Dashboard untuk mengelola broadcast WhatsApp', 'Data dikelola lewat Google Sheets'],
    en: ['Account login page', 'Dashboard for managing WhatsApp broadcasts', 'Data managed through Google Sheets']
  },
  'Curhat AI': {
    id: ['Daftar dan masuk dengan akun', 'Teman curhat berbahasa Indonesia', 'Didukung Google Gemini API'],
    en: ['Sign up and log in with an account', 'An Indonesian-language companion to talk to', 'Powered by the Google Gemini API']
  },
  'Knowledge Explorer': {
    id: ['Fakta menarik dikelompokkan per kategori: Sains, Sejarah, Psikologi, Luar Angkasa, dan lainnya', 'Sistem level dan XP supaya makin semangat menjelajah', 'Statistik pribadi: fakta dieksplorasi, fakta disimpan, dan hari streak', 'Pencarian fakta dan kuis'],
    en: ['Interesting facts grouped by category: Science, History, Psychology, Space, and more', 'Level and XP system to keep exploring fun', 'Personal stats: facts explored, facts saved, and day streak', 'Fact search and quizzes']
  },
  'Absensi Mahasiswa': {
    id: ['Scan QR lewat kamera agar kehadiran tercatat otomatis', 'Kartu QR untuk setiap mahasiswa', 'Daftar mahasiswa dengan pencarian dan filter Hadir atau Belum', 'Ringkasan kehadiran hari ini dengan pembaruan otomatis', 'Riwayat presensi, ekspor CSV, dan input manual', 'Mode terang dan gelap'],
    en: ['QR scanning through the camera so attendance is recorded automatically', 'A QR card for every student', 'Student list with search and Present or Absent filters', "Today's attendance summary with automatic refresh", 'Attendance history, CSV export, and manual entry', 'Light and dark mode']
  }
};

/* ===== Popup detail proyek ===== */
const modal = $('modal');
function openModal(card) {
  const img = card.querySelector('.thumb img');
  $('mImg').src = img ? img.src : '';
  $('mImg').alt = img ? img.alt : '';
  $('mThumb').hidden = !img;
  $('mTitle').textContent = card.querySelector('h3').textContent;
  $('mDesc').textContent = card.querySelector('.card-body p').textContent;
  const feats = (DETAILS[card.querySelector('h3').textContent.trim()] || {})[lang];
  $('mExtra').replaceChildren();
  if (feats) {
    const title = document.createElement('h4');
    title.textContent = DETAIL_LABEL[lang];
    const list = document.createElement('ul');
    feats.forEach(f => { const li = document.createElement('li'); li.textContent = f; list.appendChild(li); });
    $('mExtra').append(title, list);
  }
  $('mTags').replaceChildren(...[...card.querySelectorAll('.tags li')].map(li => li.cloneNode(true)));
  $('mLinks').replaceChildren(...[...card.querySelectorAll('.links a')].map(a => a.cloneNode(true)));
  modal.showModal();
}
document.querySelectorAll('.card').forEach(card => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'detail-btn';
  btn.textContent = 'Detail';
  btn.addEventListener('click', () => openModal(card));
  card.querySelector('.links').appendChild(btn);
  card.querySelector('.thumb').addEventListener('click', () => openModal(card));
});
$('mClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

/* ===== Filter proyek ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  const f = btn.dataset.filter;
  filterBtns.forEach(b => b.classList.toggle('active', b === btn));
  document.querySelectorAll('.card').forEach(card => {
    const tags = [...card.querySelectorAll('.tags li')].map(li => li.textContent.trim());
    card.classList.toggle('is-hidden', f !== 'all' && !tags.includes(f));
  });
}));

/* ===== Lihat CV (popup) ===== */
const cvModal = $('cvModal');
$('cvBtn').addEventListener('click', () => cvModal.showModal());
$('cvBack').addEventListener('click', () => cvModal.close());
$('cvLang').addEventListener('click', () => setLang(lang === 'id' ? 'en' : 'id'));
$('cvPrint').addEventListener('click', () => {
  const oldTitle = document.title;
  document.title = 'CV-Asmaul-Husna';
  window.addEventListener('afterprint', () => { document.title = oldTitle; }, { once: true });
  window.print();
});
cvModal.addEventListener('click', e => { if (e.target === cvModal) cvModal.close(); });

/* ===== Form kontak ===== */
const form = $('contactForm');
const note = $('formNote');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const t = UI[lang];
  const data = {
    name: $('name').value.trim(), email: $('email').value.trim(),
    subject: $('subject').value.trim() || t.subj, message: $('message').value.trim()
  };
  if ($('gotcha').value) return;

  if (!FORM_ENDPOINT) {
    const body = `${t.from}: ${data.name} (${data.email})\n\n${data.message}`;
    window.location.href = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = t.mail;
    form.reset();
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  const textNode = [...btn.childNodes].find(n => n.nodeType === 3);
  const label = textNode.nodeValue;
  btn.disabled = true;
  textNode.nodeValue = t.sending;
  note.textContent = '';
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(res.status);
    note.textContent = t.ok;
    form.reset();
  } catch (err) {
    note.textContent = t.err;
  } finally {
    btn.disabled = false;
    textNode.nodeValue = label;
  }
});

/* ===== Teks peran yang berganti dengan transisi ===== */
const ROLES = {
  id: ['Frontend Developer', 'UI/UX Designer', 'Mahasiswa Teknik Informatika'],
  en: ['Frontend Developer', 'UI/UX Designer', 'Informatics Engineering Student']
};
const roleEl = $('roles');
let roleIdx = 0;
function showRole() { roleEl.textContent = ROLES[lang][roleIdx]; }
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!calm) {
  setInterval(() => {
    roleEl.animate(
      [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-50%)' }],
      { duration: 350, easing: 'ease-in' }
    ).finished.then(() => {
      roleIdx = (roleIdx + 1) % ROLES[lang].length;
      showRole();
      roleEl.animate(
        [{ opacity: 0, transform: 'translateY(50%)' }, { opacity: 1, transform: 'none' }],
        { duration: 450, easing: 'cubic-bezier(.2,.7,.2,1)' }
      );
    });
  }, 2800);
}

/* ===== Muncul pelan saat scroll ===== */
const revealEls = document.querySelectorAll('.split > *, #projects h2, .card');
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  if (el.classList.contains('card')) el.style.animationDelay = ((i % 3) * 90) + 'ms';
});
const revealer = new IntersectionObserver((entries, obs) => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    obs.unobserve(en.target);
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealer.observe(el));

$('year').textContent = new Date().getFullYear();
setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
setLang(lang);