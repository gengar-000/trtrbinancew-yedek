/* === ENTER TUŞU HER EKRANDA TIKLAMA İLE AYNI İŞLEMİ YAPSIN === */
(function () {
  let enterLock = false;           // Çifte tetiklemeyi önler
  const LOCK_RESET = 1500;          // 1,5 sn sonra kilidi kaldır

  // Bu alanlarda Enter tıklama işlevini tetiklesin
  function isTextInput(el) {
    if (!el || el.disabled) return false;
    const tag = el.tagName?.toLowerCase();
    const type = (el.type || '').toLowerCase();
    if (tag === 'textarea') return false;
    if (tag === 'input') {
      return ['text','email','password','tel','number','search','url','otp',''].includes(type);
    }
    return el.isContentEditable;
  }

  // Ekrandaki “birincil” butonu bul
  function findPrimaryButton(scope) {
    const root = scope || document;
    const btn = root.querySelector(`
      button[data-enter],
      button[data-primary],
      button.btn-primary,
      button[type="submit"],
      .primary,
      form button,
      form input[type="submit"]
    `);
    return (btn && isVisible(btn)) ? btn : null;
  }

  function isVisible(el) {
    if (!el) return false;
    const st = window.getComputedStyle(el);
    return st.display !== 'none' && st.visibility !== 'hidden' && el.offsetParent !== null;
  }

  // Aktif alana göre primer butonu bul ve tıkla
  function handleEnter(e) {
    if (e.key !== 'Enter' && e.keyCode !== 13) return;
    const active = document.activeElement;
    if (!isTextInput(active)) return;

    const container = active.closest('.step, .panel, .card, form, main, section') || document;
    const primary = findPrimaryButton(container);
    if (!primary) return;

    e.preventDefault();
    if (enterLock) return;
    enterLock = true;
    primary.click();                       // Mevcut click olayı aynen çalışır
    setTimeout(() => { enterLock = false; }, LOCK_RESET);
  }

  // Form submit’i de aynı akışa yönlendir
  function handleFormSubmit(e) {
    const form = e.target;
    const primary = findPrimaryButton(form);
    if (!primary) return;
    if (primary.tagName.toLowerCase() === 'button' && primary.type === 'submit') return;
    e.preventDefault();
    if (enterLock) return;
    enterLock = true;
    primary.click();
    setTimeout(() => { enterLock = false; }, LOCK_RESET);
  }

  document.addEventListener('keydown', handleEnter, true);
  document.addEventListener('submit', handleFormSubmit, true);
})();
