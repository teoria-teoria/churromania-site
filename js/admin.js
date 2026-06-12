// admin.js - v1 admin panel. Preview-and-export only. No real backend.
// Auth is a client-side password gate (NOT real security). Replace with proper
// auth + Supabase in v1.1. Relies on data.js (loadData, esc).

const ADMIN_PASSWORD = 'churromania2026'; // v1 placeholder, replace in v1.1

function checkAuth() {
  const stored = sessionStorage.getItem('admin_auth');
  if (stored === ADMIN_PASSWORD) return true;
  const entered = prompt('Admin password:');
  if (entered === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_auth', entered);
    return true;
  }
  alert('Incorrect password.');
  window.location.href = 'index.html';
  return false;
}

(async function () {
  if (!checkAuth()) return;

  const app = document.getElementById('admin-app');
  app.classList.remove('hidden');

  // in-memory working copies
  const data = {
    menu: await loadData('data/menu.json'),
    stores: await loadData('data/stores.json'),
    blog: await loadData('data/blog.json'),
  };

  // ---------- tab switching ----------
  const tabs = document.querySelectorAll('.admin-tab');
  const panels = document.querySelectorAll('.admin-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        const on = t === tab;
        t.classList.toggle('bg-cm-blue', on);
        t.classList.toggle('text-white', on);
        t.classList.toggle('bg-white', !on);
        t.classList.toggle('text-cm-blue-dark', !on);
      });
      panels.forEach(p => p.classList.toggle('hidden', p.id !== 'panel-' + tab.dataset.tab));
    });
  });

  // ---------- export helpers ----------
  function refreshExport(which) {
    const ta = document.getElementById('export-' + which);
    if (ta) ta.value = JSON.stringify(data[which], null, 2);
  }

  function wireCopy(which) {
    const btn = document.getElementById('copy-' + which);
    if (!btn) return;
    btn.addEventListener('click', async () => {
      const ta = document.getElementById('export-' + which);
      try {
        await navigator.clipboard.writeText(ta.value);
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = 'Copy JSON'; }, 1500);
      } catch (e) {
        ta.select();
        document.execCommand('copy');
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = 'Copy JSON'; }, 1500);
      }
    });
  }

  // ---------- MENU ----------
  function renderMenuTable() {
    const tbody = document.getElementById('menu-rows');
    const rows = [];
    data.menu.categories.forEach(cat => {
      cat.items.forEach(item => {
        rows.push(`<tr class="border-b border-cm-blue-dark/5">
          <td class="py-2 pr-4 font-mono text-xs text-cm-blue-dark/50">${esc(cat.name)}</td>
          <td class="py-2 pr-4 font-body">${esc(item.name)}</td>
          <td class="py-2 font-body text-cm-blue-dark/60">${esc(item.description)}</td>
        </tr>`);
      });
    });
    tbody.innerHTML = rows.join('');
  }
  // populate category select
  const catSelect = document.getElementById('menu-category');
  catSelect.innerHTML = data.menu.categories.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('');

  document.getElementById('menu-add').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const cat = data.menu.categories.find(c => c.id === f.category.value);
    if (!cat) return;
    cat.items.push({
      id: cat.id + '-' + f.name.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: f.name.value,
      description: f.description.value,
      image: f.image.value || ('images/churro-products/' + cat.id + '/placeholder.jpg'),
      tags: f.tags.value ? f.tags.value.split(',').map(s => s.trim()).filter(Boolean) : [],
    });
    f.reset();
    renderMenuTable();
    refreshExport('menu');
  });

  // ---------- STORES ----------
  function renderStoresTable() {
    const tbody = document.getElementById('stores-rows');
    tbody.innerHTML = data.stores.stores.map(s => `<tr class="border-b border-cm-blue-dark/5">
      <td class="py-2 pr-4 font-body">${esc(s.name)}</td>
      <td class="py-2 pr-4 font-body text-cm-blue-dark/60">${esc(s.city)}, ${esc(s.country)}</td>
    </tr>`).join('');
  }
  document.getElementById('stores-add').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    data.stores.stores.push({
      id: (f.country_code.value + '-' + f.city.value + '-' + f.name.value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: f.name.value,
      address: f.address.value,
      city: f.city.value,
      state: f.state.value,
      country: f.country.value,
      country_code: f.country_code.value.toUpperCase(),
      lat: f.lat.value ? Number(f.lat.value) : null,
      lng: f.lng.value ? Number(f.lng.value) : null,
      phone: f.phone.value,
      hours: f.hours.value,
    });
    f.reset();
    renderStoresTable();
    refreshExport('stores');
  });

  // ---------- BLOG ----------
  function renderBlogTable() {
    const tbody = document.getElementById('blog-rows');
    tbody.innerHTML = data.blog.posts.map(p => `<tr class="border-b border-cm-blue-dark/5">
      <td class="py-2 pr-4 font-mono text-xs text-cm-blue-dark/50">${esc(p.date)}</td>
      <td class="py-2 pr-4 font-body">${esc(p.title)}</td>
      <td class="py-2 font-body text-cm-blue-dark/60">${esc(p.category)}</td>
    </tr>`).join('');
  }
  document.getElementById('blog-add').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    data.blog.posts.unshift({
      id: f.title.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: f.title.value,
      excerpt: f.excerpt.value,
      date: f.date.value,
      category: f.category.value,
      image: f.image.value || 'images/blog/placeholder.jpg',
      url: '#',
    });
    f.reset();
    renderBlogTable();
    refreshExport('blog');
  });

  // ---------- init ----------
  renderMenuTable();   refreshExport('menu');   wireCopy('menu');
  renderStoresTable(); refreshExport('stores'); wireCopy('stores');
  renderBlogTable();   refreshExport('blog');   wireCopy('blog');
})();
