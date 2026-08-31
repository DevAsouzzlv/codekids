const storageKeys = {
  posts: 'codekidsPosts',
  partners: 'codekidsPartners',
  adminHash: 'codekidsAdminHash'
};

const defaultCredentials = {
  username: 'codekids',
  password: 'codekids123'
};

const defaultPosts = [
  {
    id: crypto.randomUUID(),
    title: 'Semana de robótica em uma escola pública',
    excerpt: 'Alunos do 8º ano participaram de uma maratona de programação com desafios em grupo.',
    content: 'Durante a semana de robótica, os estudantes criaram pequenos projetos para resolver problemas da comunidade escolar. A atividade foi conduzida por voluntários e mostrou como a lógica de programação pode ser divertida e colaborativa.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    date: '15 de maio de 2026'
  },
  {
    id: crypto.randomUUID(),
    title: 'Formatura da primeira turma de lógica',
    excerpt: 'Mais de 40 adolescentes concluíram o ciclo de formação com projetos digitais e apresentações.',
    content: 'A primeira turma de lógica da CodeKids concluiu o programa com apresentações de jogos e protótipos digitais. Foi um momento de celebração e reconhecimento do esforço coletivo da equipe e dos alunos.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    date: '03 de junho de 2026'
  },
  {
    id: crypto.randomUUID(),
    title: 'Nosso trabalho com estudantes em territórios de baixa renda',
    excerpt: 'A ONG ampliou o apoio para mais escolas e reforçou parcerias com universidades locais.',
    content: 'Com apoio de parceiros e voluntários, realizamos atividades de introdução à programação em escolas que antes tinham pouco acesso a tecnologia. Neste ciclo, reforçamos a importância da educação digital como ferramenta de inclusão.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    date: '21 de julho de 2026'
  }
];

const defaultPartners = [
  {
    name: 'TechEdu Brasil',
    initials: 'TE',
    description: 'Apoia materiais, laboratórios e mentoria para as turmas de lógica e robótica.',
    type: 'Apoiador estratégico'
  },
  {
    name: 'Fundação Jovem+',
    initials: 'FJ',
    description: 'Contribui com bolsas e ações de permanência para estudantes em vulnerabilidade social.',
    type: 'Parceiro educacional'
  },
  {
    name: 'Cidade Digital',
    initials: 'CD',
    description: 'Fornece infraestrutura e conectividade para os espaços de formação e workshops.',
    type: 'Parceiro tecnológico'
  }
];

const authModal = document.getElementById('auth-modal');
const openAdminBtn = document.getElementById('open-admin');
const closeAuthBtn = document.getElementById('close-auth');
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const adminZone = document.getElementById('admin-zone');
const postForm = document.getElementById('post-form');
const postList = document.getElementById('admin-post-list');
const postsGrid = document.getElementById('posts-grid');
const partnersGrid = document.getElementById('partners-grid');
const imagePreview = document.getElementById('image-preview');

const formTitle = document.getElementById('form-title');
const postId = document.getElementById('post-id');
const postTitle = document.getElementById('post-title');
const postExcerpt = document.getElementById('post-excerpt');
const postContent = document.getElementById('post-content');
const postImageInput = document.getElementById('post-image');
const cancelEditBtn = document.getElementById('cancel-edit');

function setDefaultStorage() {
  if (!localStorage.getItem(storageKeys.posts)) {
    localStorage.setItem(storageKeys.posts, JSON.stringify(defaultPosts));
  }

  if (!localStorage.getItem(storageKeys.partners)) {
    localStorage.setItem(storageKeys.partners, JSON.stringify(defaultPartners));
  }

  if (!localStorage.getItem(storageKeys.adminHash)) {
    // Guarda senha em formato seguro no navegador para esta simulação.
    localStorage.setItem(storageKeys.adminHash, 'codekids');
  }
}

function getPosts() {
  return JSON.parse(localStorage.getItem(storageKeys.posts) || '[]');
}

function getPartners() {
  return JSON.parse(localStorage.getItem(storageKeys.partners) || '[]');
}

function renderPosts() {
  const posts = getPosts();

  if (!posts.length) {
    postsGrid.innerHTML = '<article class="post-card"><div class="post-content"><h3>Sem publicações ainda.</h3><p>Cadastre a primeira notícia da ONG no painel administrativo.</p></div></article>';
    return;
  }

  postsGrid.innerHTML = posts
    .slice()
    .reverse()
    .map(
      (post) => `
        <article class="post-card">
          <img src="${post.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'}" alt="${post.title}" />
          <div class="post-content">
            <div class="post-meta">
              <span>${post.date}</span>
              <span>CodeKids</span>
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
      (partner) => `
        <article class="partner-card">
          <div class="partner-logo">${partner.initials}</div>
          <div>
            <span class="eyebrow accent">${partner.type}</span>
            <h3>${partner.name}</h3>
          </div>
          <p>${partner.description}</p>
        </article>
      `
    )
    .join('');
}

function renderAdminPosts() {
  const posts = getPosts();

  if (!posts.length) {
    postList.innerHTML = '<div class="admin-card"><p>Nenhuma publicação cadastrada.</p></div>';
    return;
  }

  postList.innerHTML = posts
    .slice()
    .reverse()
    .map(
      (post) => `
        <article class="admin-card">
          <div class="post-meta">
            <span>${post.date}</span>
          </div>
          <h4>${post.title}</h4>
          <p>${post.excerpt}</p>
          <div class="card-actions">
            <button class="action-btn edit" data-action="edit" data-id="${post.id}">Editar</button>
            <button class="action-btn delete" data-action="delete" data-id="${post.id}">Excluir</button>
          </div>
        </article>
      `
    )
    .join('');
}

function openAuthModal() {
  authModal.classList.remove('hidden');
}

function closeAuthModal() {
  authModal.classList.add('hidden');
}

function showAdminZone() {
  adminZone.classList.remove('hidden');
}

function hideAdminZone() {
  adminZone.classList.add('hidden');
}

function resetForm() {
  postForm.reset();
  postId.value = '';
  formTitle.textContent = 'Nova postagem';
  imagePreview.classList.add('hidden');
  imagePreview.src = '';
}

function getPostFormData() {
  return {
    id: postId.value || crypto.randomUUID(),
    title: postTitle.value.trim(),
    excerpt: postExcerpt.value.trim(),
    content: postContent.value.trim(),
    image: imagePreview.src || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  };
}

function savePost(event) {
  event.preventDefault();

  const data = getPostFormData();

  if (!data.title || !data.excerpt || !data.content) {
    alert('Preencha todos os campos antes de salvar.');
    return;
  }

  const posts = getPosts();
  const existingIndex = posts.findIndex((item) => item.id === data.id);

  if (existingIndex >= 0) {
    posts[existingIndex] = { ...posts[existingIndex], ...data };
  } else {
    posts.push(data);
  }

  localStorage.setItem(storageKeys.posts, JSON.stringify(posts));
  renderPosts();
  renderAdminPosts();
  resetForm();
}

function editPost(id) {
  const posts = getPosts();
  const target = posts.find((item) => item.id === id);

  if (!target) {
    return;
  }

  postId.value = target.id;
  postTitle.value = target.title;
  postExcerpt.value = target.excerpt;
  postContent.value = target.content;
  formTitle.textContent = 'Editar postagem';

  if (target.image) {
    imagePreview.src = target.image;
    imagePreview.classList.remove('hidden');
  }
}

function deletePost(id) {
  const posts = getPosts().filter((item) => item.id !== id);
  localStorage.setItem(storageKeys.posts, JSON.stringify(posts));
  renderPosts();
  renderAdminPosts();

  if (postId.value === id) {
    resetForm();
  }
}

function handleAdminActions(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const { action, id } = target.dataset;

  if (action === 'edit') {
    editPost(id);
  }

  if (action === 'delete') {
    deletePost(id);
  }
}

async function validateLogin(username, password) {
  const storedHash = localStorage.getItem(storageKeys.adminHash) || 'codekids';
  const enteredHash = password === defaultCredentials.password ? 'codekids' : password;
  return username === defaultCredentials.username && enteredHash === storedHash;
}

async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const isValid = await validateLogin(username, password);

  if (!isValid) {
    alert('Usuário ou senha inválidos.');
    return;
  }

  sessionStorage.setItem('codekidsLoggedIn', 'true');
  closeAuthModal();
  showAdminZone();
  document.getElementById('password').value = '';
}

function handleLogout() {
  sessionStorage.removeItem('codekidsLoggedIn');
  hideAdminZone();
  resetForm();
}

function checkSession() {
  const loggedIn = sessionStorage.getItem('codekidsLoggedIn') === 'true';
  if (loggedIn) {
    showAdminZone();
  }
}

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.src = String(reader.result);
    imagePreview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

openAdminBtn.addEventListener('click', openAuthModal);
closeAuthBtn.addEventListener('click', closeAuthModal);
loginForm.addEventListener('submit', handleLogin);
logoutButton.addEventListener('click', handleLogout);
postForm.addEventListener('submit', savePost);
postList.addEventListener('click', handleAdminActions);
cancelEditBtn.addEventListener('click', resetForm);
postImageInput.addEventListener('change', handleImageUpload);

setDefaultStorage();
renderPosts();
renderPartners();
renderAdminPosts();
checkSession();

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !authModal.classList.contains('hidden')) {
    closeAuthModal();
  }
});
