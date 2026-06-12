// search.js - stores page. Renders the country breakdown + full store list,
// and wires Fuse.js fuzzy search over the stores. Relies on data.js (loadData, esc).

(async function () {
  const [storesData, countries] = await Promise.all([
    loadData('data/stores.json'),
    loadData('data/countries.json'),
  ]);
  if (!storesData) return;

  const stores = storesData.stores;
  const flagByCode = {};
  (countries || []).forEach(c => { flagByCode[c.code] = c.flag; });

  // ---- country breakdown grid ----
  const grid = document.getElementById('country-grid');
  if (grid && countries) {
    grid.innerHTML = countries.map(c => `
      <div class="rounded-2xl bg-white border border-cm-blue-dark/5 p-6">
        <div class="text-3xl mb-3">${esc(c.flag)}</div>
        <div class="font-display text-xl font-bold text-cm-blue-dark">${esc(c.name)}</div>
        <div class="font-mono text-xs uppercase tracking-wider text-cm-blue-dark/50 mt-2">${esc(c.stores)} stores &middot; since ${esc(c.since)}</div>
      </div>`).join('');
  }

  // ---- store card renderer ----
  function storeCard(s) {
    const flag = flagByCode[s.country_code] || '';
    return `
      <article class="rounded-2xl bg-white border border-cm-blue-dark/5 p-6 hover:shadow-lg hover:shadow-cm-blue/5 transition-all duration-200">
        <div class="flex items-start justify-between gap-3">
          <h3 class="font-display text-lg font-bold text-cm-blue-dark leading-snug">${esc(s.name)}</h3>
          <span class="text-2xl shrink-0" aria-hidden="true">${esc(flag)}</span>
        </div>
        <p class="font-body text-sm text-cm-blue-dark/70 mt-2">${esc(s.address)}</p>
        <p class="font-body text-sm text-cm-blue-dark/70">${esc(s.city)}, ${esc(s.state)}, ${esc(s.country)}</p>
        <div class="mt-4 pt-4 border-t border-cm-blue-dark/5 space-y-1 font-mono text-xs uppercase tracking-wider text-cm-blue-dark/50">
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
      keys: ['name', 'city', 'state', 'country', 'address'],
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
      [s.name, s.city, s.state, s.country, s.address]
        .some(v => String(v).toLowerCase().includes(lq)));
  }

  const input = document.getElementById('store-search');
  if (input) {
    input.addEventListener('input', () => render(searchStores(input.value)));
  }

  render(stores);
})();
