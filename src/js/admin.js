const storageKeys = {
  posts: 'codekidsPosts',
  partners: 'codekidsPartners',
  adminUser: 'codekidsAdminUser',
  adminPassword: 'codekidsAdminPassword',
  darkMode: 'codekidsDarkMode'
};

const defaultCredentials = {
  username: 'codekids',
  password: 'codekids123'
};

const loginView = document.getElementById('login-view');
const dashboardView = document.getElementById('dashboard-view');
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const themeToggle = document.getElementById('theme-toggle');
const postForm = document.getElementById('post-form');
const postList = document.getElementById('admin-post-list');
const postCount = document.getElementById('post-count');
const formTitle = document.getElementById('form-title');
const postId = document.getElementById('post-id');
const postTitle = document.getElementById('post-title');
const postExcerpt = document.getElementById('post-excerpt');
const postCategory = document.getElementById('post-category');
const postContent = document.getElementById('post-content');
const postImageInput = document.getElementById('post-image');
const imagePreview = document.getElementById('image-preview');
const cancelEditBtn = document.getElementById('cancel-edit');

function setDefaultCredentials() {
  if (!localStorage.getItem(storageKeys.adminUser)) {
    localStorage.setItem(storageKeys.adminUser, defaultCredentials.username);
  }

  if (!localStorage.getItem(storageKeys.adminPassword)) {
    localStorage.setItem(storageKeys.adminPassword, defaultCredentials.password);
  }

  const enabled = localStorage.getItem(storageKeys.darkMode) === 'true';
  if (enabled) {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
  }
}

function getPosts() {
  return JSON.parse(localStorage.getItem(storageKeys.posts) || '[]');
}

function renderAdminPosts() {
  const posts = getPosts();
  postCount.textContent = String(posts.length);

  if (!posts.length) {
    postList.innerHTML = '<div class="admin-card"><p>Nenhuma notícia cadastrada.</p></div>';
    return;
  }

  postList.innerHTML = posts
    .slice()
    .reverse()
    .map(
      post => `
        <article class="admin-card">
          <div class="post-meta">
            <span>${post.date}</span>
            <span>${post.category || 'Notícia'}</span>
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

function showDashboard() {
  loginView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
}

function showLogin() {
  dashboardView.classList.add('hidden');
  loginView.classList.remove('hidden');
}

function resetForm() {
  postForm.reset();
  postId.value = '';
  formTitle.textContent = 'Nova notícia';
  imagePreview.classList.add('hidden');
  imagePreview.src = '';
}

function getPostFormData() {
  const image = imagePreview.src || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80';

  return {
    id: postId.value || crypto.randomUUID(),
    title: postTitle.value.trim(),
    excerpt: postExcerpt.value.trim(),
    category: postCategory.value,
    content: postContent.value.trim(),
    image,
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  };
}

function savePost(event) {
  event.preventDefault();

  const data = getPostFormData();

  if (!data.title || !data.excerpt || !data.content) {
    alert('Preencha todos os campos da notícia antes de salvar.');
    return;
  }

  const posts = getPosts();
  const index = posts.findIndex(item => item.id === data.id);

  if (index >= 0) {
    posts[index] = { ...posts[index], ...data };
  } else {
    posts.push(data);
  }

  localStorage.setItem(storageKeys.posts, JSON.stringify(posts));
  renderAdminPosts();
  resetForm();
  if (window.parent && window.parent.location) {
    window.parent.location.reload();
  }
}

function editPost(id) {
  const target = getPosts().find(item => item.id === id);
  if (!target) return;

  postId.value = target.id;
  postTitle.value = target.title;
  postExcerpt.value = target.excerpt;
  postCategory.value = target.category || 'Notícia';
  postContent.value = target.content;
  formTitle.textContent = 'Editar notícia';

  if (target.image) {
    imagePreview.src = target.image;
    imagePreview.classList.remove('hidden');
  }
}

function deletePost(id) {
  const posts = getPosts().filter(item => item.id !== id);
  localStorage.setItem(storageKeys.posts, JSON.stringify(posts));
  renderAdminPosts();

  if (postId.value === id) {
    resetForm();
  }
}

function handleAdminActions(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const { action, id } = target.dataset;
  if (action === 'edit') editPost(id);
  if (action === 'delete') deletePost(id);
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const validUser = localStorage.getItem(storageKeys.adminUser) === username;
  const validPassword = localStorage.getItem(storageKeys.adminPassword) === password;

  if (!validUser || !validPassword) {
    alert('Usuário ou senha inválidos.');
    return;
  }

  sessionStorage.setItem('codekidsAuth', 'true');
  showDashboard();
  document.getElementById('password').value = '';
}

function handleLogout() {
  sessionStorage.removeItem('codekidsAuth');
  showLogin();
  resetForm();
}

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.src = String(reader.result);
    imagePreview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function toggleTheme() {
  const enabled = document.body.classList.toggle('dark-mode');
  localStorage.setItem(storageKeys.darkMode, String(enabled));
  if (themeToggle) themeToggle.textContent = enabled ? '☀️' : '🌙';
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

loginForm.addEventListener('submit', handleLogin);
logoutButton.addEventListener('click', handleLogout);
postList.addEventListener('click', handleAdminActions);
postForm.addEventListener('submit', savePost);
cancelEditBtn.addEventListener('click', resetForm);
postImageInput.addEventListener('change', handleImageUpload);

setDefaultCredentials();
renderAdminPosts();

if (sessionStorage.getItem('codekidsAuth') === 'true') {
  showDashboard();
} else {
  showLogin();
}
