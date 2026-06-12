// lead-form.js — franchise inquiry form.
// v1: intercept submit, show an inline success state, log the payload.
// The form still posts (best-effort) to the class echo endpoint so the data
// goes somewhere. Swap the action for a real CRM webhook in v1.1.

(function () {
  const form = document.getElementById('lead-form');
  if (!form) return;
  const success = document.getElementById('lead-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Franchise inquiry (v1 — echoes to class endpoint):', data);

    // Best-effort send to the configured action. no-cors: we don't read the
    // response, we just hand it off. Failure here never blocks the success UI.
    try {
      fetch(form.action, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form),
      }).catch(function () {});
    } catch (err) { /* ignore in v1 */ }

    if (success) {
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      success.focus();
    }
  });
})();
