const storageKeys = { posts: 'codekidsPosts', partners: 'codekidsPartners' };

const defaultPosts = [
  { id: crypto.randomUUID(), title: 'Maratona de robótica 2026', excerpt: 'Alunos do 8º ano criaram robôs que coletam lixo escolar automaticamente.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', date: '30 de Agosto, 2026' }
];

const defaultPartners = [
  { name: 'TechEdu Brasil', initials: 'TE', description: 'Apoia materiais, laboratórios e mentoria.', type: 'Apoiador estratégico' },
  { name: 'Cidade Digital', initials: 'CD', description: 'Fornece infraestrutura e conectividade.', type: 'Parceiro tecnológico' }
];

function setDefaultStorage() {
  if (!localStorage.getItem(storageKeys.posts)) localStorage.setItem(storageKeys.posts, JSON.stringify(defaultPosts));
  if (!localStorage.getItem(storageKeys.partners)) localStorage.setItem(storageKeys.partners, JSON.stringify(defaultPartners));
}

function getPosts() { return JSON.parse(localStorage.getItem(storageKeys.posts) || '[]'); }
function getPartners() { return JSON.parse(localStorage.getItem(storageKeys.partners) || '[]'); }

const postsGrid = document.getElementById('posts-grid');
const partnersGrid = document.getElementById('partners-grid');

function renderSiteData() {
  if(postsGrid) {
    const posts = getPosts();
    if(posts.length === 0) {
      postsGrid.innerHTML = '<p style="color:var(--muted)">Nenhuma notícia publicada ainda.</p>';
    } else {
      postsGrid.innerHTML = posts.slice().reverse().map(post => `
        <article class="post-card fade-up visible">
          <img src="${post.image}" alt="${post.title}" />
          <div class="post-content">
            <span style="color: var(--muted); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 8px;">${post.date}</span>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
          </div>
        </article>`).join('');
    }
  }

  if(partnersGrid) {
    const partners = getPartners();
    partnersGrid.innerHTML = partners.map(partner => `
      <article class="partner-card fade-up visible">
        <div class="partner-logo">${partner.initials}</div>
        <div><span class="eyebrow accent" style="margin-bottom:8px; display:inline-block;">${partner.type}</span><h3>${partner.name}</h3></div>
        <p>${partner.description}</p>
      </article>`).join('');
  }
}

// Animações
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });

// Tema
const themeToggleBtn = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
}
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  });
}

// Modal Contato
const formModal = document.getElementById('form-modal');
if(formModal) {
  document.querySelectorAll('.open-form').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.getElementById('form-type').value = e.target.dataset.formType;
      document.getElementById('modal-title').textContent = e.target.dataset.formType === 'volunteer' ? 'Quero ser voluntário' : 'Quero apoiar';
      formModal.classList.remove('hidden');
    });
  });
  document.querySelectorAll('[data-close="true"]').forEach(btn => {
    btn.addEventListener('click', () => formModal.classList.add('hidden'));
  });
}

setDefaultStorage();
renderSiteData();
setTimeout(() => { document.querySelectorAll('.fade-up').forEach(el => observer.observe(el)); }, 100);