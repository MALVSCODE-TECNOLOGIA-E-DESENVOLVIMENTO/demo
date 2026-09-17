/* ═══════════════════════════════════════════════════════════
   MALVSCODE · PORTAL DEMONSTRATIVO
   Login + Splash + Hub de Seleção de Projetos
   ═══════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────
   PROJETOS DISPONÍVEIS
   ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id:    'logistica',
    name:  'Logística',
    desc:  'Registre e acompanhe processos, compare cotações de frete, monitore prazos e status em tempo real.',
    icon:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
              <path d="M15 18H9"/>
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
              <circle cx="17" cy="18" r="2"/>
              <circle cx="7" cy="18" r="2"/>
            </svg>`,
    url:   '../logistica/index.html'
  },
  {
    id:    'controle-precos',
    name:  'Controle de Preços',
    desc:  'Acompanhe preços de itens cotados, compare valores entre fornecedores e consulte o histórico de variações.',
    icon:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 13H7"/>
              <path d="M19 9h-4"/>
              <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
              <rect x="15" y="5" width="4" height="12" rx="1"/>
              <rect x="7" y="8" width="4" height="9" rx="1"/>
            </svg>`,
    url:   '../controle-precos/index.html'
  },
  {
    id:    'estoque',
    name:  'Estoque',
    desc:  'Gerencie entradas, saídas e inventário de produtos com rastreabilidade completa.',
    icon:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>`,
    url:   '#'
  },
  {
    id:    'compras',
    name:  'Compras',
    desc:  'Emita ordens de compra, acompanhe aprovações e gerencie o relacionamento com fornecedores.',
    icon:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>`,
    url:   '#'
  },
  {
    id:    'gestao-pagamentos',
    name:  'Gestão de Pagamentos',
    desc:  'Controle contas a pagar e a receber, concilie lançamentos e visualize o fluxo de caixa.',
    icon:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>`,
    url:   '#'
  },
  {
    id:    'sistema-integrado',
    name:  'Sistema Integrado',
    desc:  'Visão consolidada de todos os módulos MALVSCODE em um único painel.',
    icon:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>`,
    url:   '#'
  }
];

/* ───────────────────────────────────────────────
   ESTADO GLOBAL
   ─────────────────────────────────────────────── */
let deviceToken = null;

/* ───────────────────────────────────────────────
   HELPERS
   ─────────────────────────────────────────────── */
function getGreeting() {
  // Fuso de Brasília
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  );
  const hour = now.getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function getOrCreateDeviceToken() {
  let token = localStorage.getItem('malvDeviceToken');
  if (!token) {
    token = 'dev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('malvDeviceToken', token);
  }
  return token;
}

function showMessage(message, type = 'error') {
  const box = document.getElementById('messageBox');
  if (!box) return;
  box.textContent = message;
  box.className = `message ${type} show`;
  setTimeout(() => box.classList.remove('show'), 5000);
}

function togglePassword() {
  const input = document.getElementById('password');
  const btn   = document.querySelector('.toggle-password');
  if (!input || !btn) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'OCULTAR';
  } else {
    input.type = 'password';
    btn.textContent = 'MOSTRAR';
  }
}

/* ───────────────────────────────────────────────
   LOGIN — DEMONSTRATIVO
   Qualquer usuário/senha é aceito nesta versão demo.
   Basta clicar em ENTRAR para visualizar o fluxo.
   ─────────────────────────────────────────────── */
function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    showMessage('Preencha usuário e senha para continuar.', 'error');
    return;
  }

  const loginBtn = document.getElementById('loginBtn');
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<span class="btn-spinner"></span> Autenticando...';

  // Simula uma autenticação local (demonstrativo)
  setTimeout(() => {
    const session = {
      username: username,
      name:     username.charAt(0).toUpperCase() + username.slice(1),
      sector:   'Administrador',
      loginAt:  new Date().toISOString()
    };

    sessionStorage.setItem('malvUserSession', JSON.stringify(session));

    loginBtn.disabled = false;
    loginBtn.innerHTML = 'ENTRAR';

    showSplashAndHub(session);
  }, 800);
}

/* ───────────────────────────────────────────────
   SPLASH → HUB
   ─────────────────────────────────────────────── */
function showSplashAndHub(session) {
  const loginScreen = document.getElementById('loginScreen');
  const splash      = document.getElementById('splashWelcome');
  const greetingEl  = document.getElementById('splashGreeting');
  const hubScreen   = document.getElementById('hubScreen');

  // Esconde login
  loginScreen.classList.add('hidden');

  // Saudação
  const greeting = getGreeting();
  greetingEl.textContent = `${greeting}, MALVSCODE`;

  // Mostra splash
  splash.style.display = 'flex';
  splash.style.animation = 'none';
  void splash.offsetWidth;
  splash.style.animation = 'fadeOut 0.5s ease 2.2s forwards';

  setTimeout(() => {
    splash.style.display = 'none';
    showHub(session);
  }, 2800);
}

/* ───────────────────────────────────────────────
   HUB — SELEÇÃO DE PROJETOS
   ─────────────────────────────────────────────── */
function showHub(session) {
  const hubScreen = document.getElementById('hubScreen');
  hubScreen.style.display = 'flex';

  // Preenche dados do usuário
  const userName   = session.name || session.username;
  const userSector = session.sector || 'Usuário';

  document.getElementById('hubUserName').textContent   = userName;
  document.getElementById('hubUserSector').textContent = userSector;
  document.getElementById('hubUserInitial').textContent = userName.charAt(0).toUpperCase();

  // Renderiza os cards
  renderProjectCards();
}

function renderProjectCards() {
  const grid = document.getElementById('hubGrid');
  grid.innerHTML = '';

  PROJECTS.forEach(project => {
    const card = document.createElement('div');
    card.className = 'hub-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const isAvailable = project.url && project.url !== '#';

    card.innerHTML = `
      <div class="hub-card-icon">${project.icon}</div>
      <div class="hub-card-body">
        <div class="hub-card-title">${project.name}</div>
        <div class="hub-card-desc">${project.desc}</div>
      </div>
      <div class="hub-card-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    `;

    if (isAvailable) {
      card.addEventListener('click', () => openProject(project));
      card.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          openProject(project);
        }
      });
    } else {
      card.style.opacity = '0.55';
      card.style.cursor  = 'not-allowed';
    }

    grid.appendChild(card);
  });
}

function openProject(project) {
  // Navega para o projeto demonstrativo
  window.location.href = project.url;
}

/* ───────────────────────────────────────────────
   LOGOUT
   ─────────────────────────────────────────────── */
function showLogoutModal() {
  document.getElementById('logoutModal').classList.add('show');
}

function closeLogoutModal() {
  document.getElementById('logoutModal').classList.remove('show');
}

function confirmLogout() {
  closeLogoutModal();
  sessionStorage.removeItem('malvUserSession');

  // Esconde hub, mostra login
  document.getElementById('hubScreen').style.display = 'none';
  document.getElementById('loginScreen').classList.remove('hidden');

  // Limpa campos
  document.getElementById('password').value = '';
  document.getElementById('username').value = '';

  // Reseta splash
  const splash = document.getElementById('splashWelcome');
  if (splash) {
    splash.style.display = 'none';
    splash.style.animation = 'none';
  }
}

/* ───────────────────────────────────────────────
   INIT
   ─────────────────────────────────────────────── */
function init() {
  deviceToken = getOrCreateDeviceToken();

  // Se já houver sessão salva, pula direto para o hub (demonstrativo)
  const stored = sessionStorage.getItem('malvUserSession');
  if (stored) {
    try {
      const session = JSON.parse(stored);
      showSplashAndHub(session);
      return;
    } catch {
      sessionStorage.removeItem('malvUserSession');
    }
  }

  // Caso contrário, permanece na tela de login
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('username').focus();
}

window.addEventListener('DOMContentLoaded', init);
