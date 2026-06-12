// data.js — shared helpers for loading JSON and rendering images safely.
// Used across menu, stores, blog, home, admin. No framework.

// Load a JSON file. Returns parsed data, or null on failure (logged, never throws).
async function loadData(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path} (${response.status})`);
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Escape text for safe insertion into HTML (data is ours, but be tidy anyway).
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Build an <img> string with a graceful fallback to the brand placeholder
// if the real photo isn't in the repo yet.
function cmImg(src, alt, classes) {
  return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" class="${classes || ''}"
    onerror="this.onerror=null;this.src='images/brand/placeholder.svg'">`;
}
