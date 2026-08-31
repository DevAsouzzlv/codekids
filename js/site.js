const storageKeys = {
  posts: 'codekidsPosts',
  partners: 'codekidsPartners',
  darkMode: 'codekidsDarkMode',
  submissions: 'codekidsSubmissions'
};

const defaultPartners = [
  { name: 'TechEdu Brasil', initials: 'TE', description: 'Apoia materiais, mentoria e formação para jovens em tecnologia e educação.', type: 'Apoiador estratégico' },
  { name: 'Fundação Jovem+', initials: 'FJ', description: 'Contribui com bolsas, permanência e apoio para estudantes em situação de vulnerabilidade.', type: 'Parceiro educacional' },
  { name: 'Cidade Digital', initials: 'CD', description: 'Fornece infraestrutura, conectividade e apoio operacional para as ações locais.', type: 'Parceiro tecnológico' }
];

const defaultPosts = [
  {
    id: crypto.randomUUID(),
    title: 'Semana de robótica em uma escola pública',
    excerpt: 'Alunos do 8º ano participaram de uma maratona de programação com desafios em grupo.',
    content: 'Durante a semana de robótica, nossos estudantes desenvolveram projetos para resolver desafios reais da comunidade escolar. A atividade reforçou como aprender lógica pode ser desafiador, criativo e coletivo.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    date: '15 de maio de 2026',
    category: 'Aula'
  },
  {
    id: crypto.randomUUID(),
    title: 'Formatura da primeira turma de lógica',
    excerpt: 'Mais de 40 adolescentes concluíram o ciclo com apresentações e protótipos digitais.',
    content: 'A primeira turma de lógica concluiu o programa com projetos, apresentações e celebrações do esforço coletivo. Foi um marco de confiança e progresso para toda a rede.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    date: '03 de junho de 2026',
    category: 'Evento'
  },
  {
    id: crypto.randomUUID(),
    title: 'Aulas de programação chegam a mais escolas da rede pública',
    excerpt: 'A CodeKids ampliou o alcance e reforçou parcerias locais com universidades e voluntários.',
    content: 'Com apoio de parceiros e mentores, ampliamos nossas ações para escolas que ainda tinham pouco contato com tecnologia. O foco continua sendo ampliar oportunidades e acesso à educação digital.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    date: '21 de julho de 2026',
    category: 'Notícia'
  }
];

const postsGrid = document.getElementById('posts-grid');
const partnersGrid = document.getElementById('partners-grid');
const themeToggle = document.getElementById('theme-toggle');
const submissionFeed = document.getElementById('submission-feed');
const formModal = document.getElementById('form-modal');
const supportForm = document.getElementById('support-form');
const modalTitle = document.getElementById('modal-title');
const formTypeInput = document.getElementById('form-type');

function setDefaults() {
  if (!localStorage.getItem(storageKeys.posts)) {
    localStorage.setItem(storageKeys.posts, JSON.stringify(defaultPosts));
  }

  if (!localStorage.getItem(storageKeys.partners)) {
    localStorage.setItem(storageKeys.partners, JSON.stringify(defaultPartners));
  }

  const savedTheme = localStorage.getItem(storageKeys.darkMode) === 'true';
  if (savedTheme) {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
}

function getPosts() {
  return JSON.parse(localStorage.getItem(storageKeys.posts) || '[]');
}

function getPartners() {
  return JSON.parse(localStorage.getItem(storageKeys.partners) || '[]');
}

function getSubmissions() {
  return JSON.parse(localStorage.getItem(storageKeys.submissions) || '[]');
}

function renderPosts() {
  const posts = getPosts();

  if (!posts.length) {
    postsGrid.innerHTML = '<article class="post-card"><div class="post-content"><h3>Sem publicações ainda.</h3><p>Estamos preparando as próximas histórias da nossa comunidade.</p></div></article>';
    return;
  }

  postsGrid.innerHTML = posts
    .slice()
    .reverse()
    .map(
      post => `
        <article class="post-card">
          <img src="${post.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'}" alt="${post.title}" />
          <div class="post-content">
            <div class="post-meta">
              <span>${post.date}</span>
              <span>${post.category || 'Notícia'}</span>
            </div>
            <h3>${post.title}</h3>
            <p class="post-preview">${post.excerpt}</p>
            <p>${post.content}</p>
          </div>
        </article>
      `
    )
    .join('');
}

function renderPartners() {
  const partners = getPartners();
  partnersGrid.innerHTML = partners
    .map(
      partner => `
        <article class="partner-card">
          <div class="partner-logo">${partner.initials}</div>
          <div>
            <span class="eyebrow eyebrow-soft">${partner.type}</span>
            <h3>${partner.name}</h3>
          </div>
          <p>${partner.description}</p>
        </article>
      `
    )
    .join('');
}

function renderSubmissions() {
  if (!submissionFeed) return;

  const submissions = getSubmissions();

  if (!submissions.length) {
    submissionFeed.innerHTML = '<div class="empty-state">Ainda não há intenções registradas. Seja o primeiro a apoiar.</div>';
    return;
  }

  submissionFeed.innerHTML = submissions
    .slice(0, 3)
    .map(
      item => `
        <article class="submission-item">
          <span>${item.type === 'support' ? 'Apoio' : 'Voluntário'}</span>
          <h4>${item.name}</h4>
          <p>${item.message}</p>
          <small>${new Date(item.createdAt).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</small>
        </article>
      `
    )
    .join('');
}

function openFormModal(type) {
  const nextType = type === 'volunteer' ? 'volunteer' : 'support';

  if (!formModal || !supportForm || !formTypeInput || !modalTitle) return;

  formTypeInput.value = nextType;
  modalTitle.textContent = nextType === 'support' ? 'Quero apoiar' : 'Quero ser voluntário';
  formModal.classList.remove('hidden');
  formModal.setAttribute('aria-hidden', 'false');
}

function closeFormModal() {
  if (!formModal) return;
  formModal.classList.add('hidden');
  formModal.setAttribute('aria-hidden', 'true');
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(supportForm);
  const payload = {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    message: String(formData.get('message') || '').trim(),
    type: String(formData.get('type') || 'support'),
    createdAt: new Date().toISOString()
  };

  if (!payload.name || !payload.email || !payload.message) {
    return;
  }

  // Salvar no localStorage
  const submissions = getSubmissions();
  submissions.unshift(payload);
  localStorage.setItem(storageKeys.submissions, JSON.stringify(submissions));

  // Enviar para Google Sheets via Apps Script
  sendToGoogleSheets(payload);

  supportForm.reset();
  closeFormModal();
  renderSubmissions();
}

function sendToGoogleSheets(data) {
  // IMPORTANTE: Substitua pela URL do seu Google Apps Script
  const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/{SEU_SCRIPT_ID}/usercopy?action=submitForm';
  
  fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(data)
  })
  .catch(error => {
    console.error('Erro ao enviar dados para Google Sheets:', error);
  });
}

function toggleTheme() {
  const enabled = document.body.classList.toggle('dark-mode');
  localStorage.setItem(storageKeys.darkMode, String(enabled));
  if (themeToggle) {
    themeToggle.textContent = enabled ? '☀️' : '🌙';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

const openButtons = document.querySelectorAll('.open-form');
openButtons.forEach(button => {
  button.addEventListener('click', () => {
    openFormModal(button.dataset.formType || 'support');
  });
});

if (formModal) {
  formModal.addEventListener('click', event => {
    if (event.target && event.target.dataset.close === 'true') {
      closeFormModal();
    }
  });
}

const modalCloseButtons = document.querySelectorAll('[data-close="true"]');
modalCloseButtons.forEach(button => {
  button.addEventListener('click', () => closeFormModal());
});

if (supportForm) {
  supportForm.addEventListener('submit', handleFormSubmit);
}

// Google Maps Configuration
function initMap() {
  const codekidsLocation = { lat: -23.5505, lng: -46.6333 }; // São Paulo, SP
  
  const map = new google.maps.Map(document.getElementById('google-map'), {
    zoom: 14,
    center: codekidsLocation,
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#e0f0f7' }]
      }
    ]
  });

  // Adicionar marker da CodeKids
  const marker = new google.maps.Marker({
    position: codekidsLocation,
    map: map,
    title: 'CodeKids - Educação Tecnológica para Jovens',
    animation: google.maps.Animation.DROP
  });

  // Info window
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 10px; font-family: Arial; font-size: 14px;">
        <strong>CodeKids</strong><br>
        Educação tecnológica para jovens<br>
        <small>contato@codekids.org</small>
      </div>
    `
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

// Inicializar mapa quando o DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMap);
} else {
  initMap();
}

setDefaults();
renderPosts();
renderPartners();
renderSubmissions();
