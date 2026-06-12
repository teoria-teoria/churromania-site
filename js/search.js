// search.js - US store finder with Fuse.js fuzzy search.
// Global stores stay in stores.json (heritage data); this page filters to the US.
// Relies on data.js (loadData, esc).

(async function () {
  const storesData = await loadData('data/stores.json');
  if (!storesData) return;

  // US market focus: only show US locations on the store finder.
  const stores = storesData.stores.filter(s => s.country_code === 'US');

  // ---- store card renderer ----
  function storeCard(s) {
    return `
      <article class="rounded-2xl bg-white border border-cm-blue-dark/5 p-6 hover:shadow-lg hover:shadow-cm-blue/5 hover:-translate-y-1 transition-all duration-200">
        <h3 class="font-display text-lg font-bold text-cm-blue-dark leading-snug">${esc(s.name)}</h3>
        <p class="font-body text-sm text-cm-blue-dark/70 mt-2">${esc(s.address)}</p>
        <p class="font-body text-sm text-cm-blue-dark/70">${esc(s.city)}, ${esc(s.state)}</p>
        <div class="mt-4 pt-4 border-t border-cm-blue-dark/5 space-y-1 font-mono text-xs uppercase tracking-wider text-cm-blue-dark/50 tnum">
          <div>${esc(s.hours)}</div>
          <div>${esc(s.phone)}</div>
        </div>
      </article>`;
  }

  const list = document.getElementById('store-list');
  const count = document.getElementById('store-count');
  const empty = document.getElementById('store-empty');

  function render(results) {
    list.innerHTML = results.map(storeCard).join('');
    if (count) count.textContent = results.length;
    if (empty) empty.classList.toggle('hidden', results.length > 0);
  }

  // ---- fuzzy search ----
  // Fuse is loaded via CDN in stores.html. Fall back to substring match if missing.
  let fuse = null;
  if (window.Fuse) {
    fuse = new Fuse(stores, {
      keys: ['name', 'city', 'state', 'address'],
      threshold: 0.3,
      includeScore: true,
    });
  }

  function searchStores(query) {
    const q = query.trim();
    if (!q) return stores;
    if (fuse) return fuse.search(q).map(r => r.item);
    const lq = q.toLowerCase();
    return stores.filter(s =>
      [s.name, s.city, s.state, s.address]
        .some(v => String(v).toLowerCase().includes(lq)));
  }

  const input = document.getElementById('store-search');
  if (input) {
    input.addEventListener('input', () => render(searchStores(input.value)));
  }

  render(stores);
})();
