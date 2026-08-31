// Tema
const themeToggleBtn = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  if(themeToggleBtn) themeToggleBtn.textContent = '☀️';
}
if(themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  });
}

// Controle de Telas (Login / Dashboard)
const loginSection = document.getElementById('login-section');
const dashSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const pass = document.getElementById('admin-password').value;
  if(pass === 'admin123') { 
    // Oculta login e mostra painel (reforçado)
    loginSection.classList.add('hidden');
    loginSection.style.display = 'none'; // Garante que suma
    dashSection.classList.remove('hidden');
    dashSection.classList.add('visible');
    renderAdminPosts();
  } else {
    alert('Senha incorreta! Para testar, use: admin123');
  }
});

logoutBtn.addEventListener('click', () => {
  dashSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  loginSection.style.display = ''; // Volta a aparecer
  document.getElementById('admin-password').value = '';
});

// CRUD do CMS (Blog)
const postForm = document.getElementById('post-form');
const listContainer = document.getElementById('admin-posts-list');
let currentBase64 = '';

// Conversor de Upload de Arquivo para Base64
document.getElementById('post-image-file').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onloadend = function() {
    currentBase64 = reader.result;
  }
  reader.readAsDataURL(file);
});

function getPosts() {
  return JSON.parse(localStorage.getItem('codekidsPosts') || '[]');
}

function savePosts(posts) {
  localStorage.setItem('codekidsPosts', JSON.stringify(posts));
  renderAdminPosts();
}

// Ler
function renderAdminPosts() {
  const posts = getPosts();
  if(!posts.length) {
    listContainer.innerHTML = '<p style="color:var(--muted)">Nenhuma postagem encontrada.</p>';
    return;
  }
  listContainer.innerHTML = posts.slice().reverse().map(p => `
    <div class="admin-list-item">
      <div class="admin-item-content">
        <img src="${p.image}" alt="Thumb" />
        <div>
          <strong style="display:block; color:var(--text);">${p.title}</strong>
          <small style="color:var(--muted)">${p.date}</small>
        </div>
      </div>
      <div>
        <button class="action-btn edit" onclick="editPost('${p.id}')">Editar</button>
        <button class="action-btn delete" onclick="deletePost('${p.id}')">Excluir</button>
      </div>
    </div>
  `).join('');
}

// Criar / Atualizar
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const idInput = document.getElementById('edit-id').value;
  const title = document.getElementById('post-title').value;
  const excerpt = document.getElementById('post-excerpt').value;
  
  let posts = getPosts();
  
  if (idInput) {
    // Modo Edição
    posts = posts.map(p => {
      if (p.id === idInput) {
        return {
          ...p,
          title,
          excerpt,
          image: currentBase64 || p.image // Atualiza imagem só se mandou nova
        }
      }
      return p;
    });
  } else {
    // Modo Criação
    const finalImage = currentBase64 || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80';
    const now = new Date();
    const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    const dateStr = `${now.getDate()} de ${months[now.getMonth()]}, ${now.getFullYear()}`;

    posts.push({
      id: crypto.randomUUID(),
      title,
      excerpt,
      image: finalImage,
      date: dateStr
    });
  }

  savePosts(posts);
  resetForm();
});

// Deletar
window.deletePost = function(id) {
  if(confirm('Tem certeza que deseja excluir esta notícia?')) {
    let posts = getPosts();
    posts = posts.filter(p => p.id !== id);
    savePosts(posts);
  }
}

// Preparar Edição
window.editPost = function(id) {
  const posts = getPosts();
  const post = posts.find(p => p.id === id);
  if(!post) return;
  
  document.getElementById('edit-id').value = post.id;
  document.getElementById('post-title').value = post.title;
  document.getElementById('post-excerpt').value = post.excerpt;
  document.getElementById('form-cms-title').textContent = 'Editar Notícia';
  document.getElementById('btn-save').textContent = 'Salvar Alterações';
  document.getElementById('btn-cancel').classList.remove('hidden');
  currentBase64 = ''; 
  
  window.scrollTo(0, 0);
}

// Cancelar
document.getElementById('btn-cancel').addEventListener('click', resetForm);

function resetForm() {
  postForm.reset();
  document.getElementById('edit-id').value = '';
  document.getElementById('form-cms-title').textContent = 'Adicionar Nova Notícia';
  document.getElementById('btn-save').textContent = 'Publicar Notícia';
  document.getElementById('btn-cancel').classList.add('hidden');
  currentBase64 = '';
}