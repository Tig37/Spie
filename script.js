
let currentAudio = null;
let currentButton = null;
let currentStatus = null;

async function fetchPlaylist() {
  try {
    const res = await fetch('sounds.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Erreur chargement sounds.json:', e);
    const container = document.getElementById('playlist');
    container.innerHTML = `<div class="card"><h3>Playlist introuvable</h3><p>Vérifie que sounds.json est à la racine et bien formé.</p></div>`;
    return [];
  }
}

function renderPlaylist(items) {
  const container = document.getElementById('playlist');
  container.innerHTML = '';
  if (!items.length) {
    container.innerHTML = '<div class="card">Aucun son trouvé</div>';
    return;
  }
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    const title = document.createElement('h3');
    title.textContent = item.title;
    const btn = document.createElement('button');
    btn.className = 'play-btn';
    btn.textContent = '▶ Lecture';
    const status = document.createElement('div');
    status.className = 'status';
    btn.addEventListener('click', () => playSound(item.file, btn, status));
    card.appendChild(title);
    card.appendChild(btn);
    card.appendChild(status);
    container.appendChild(card);
  });
}

function playSound(src, button, statusEl) {
  if (currentAudio && currentButton === button) {
    if (currentAudio.paused) currentAudio.play(); else currentAudio.pause();
    updateUI();
    return;
  }
  stopCurrent();
  currentAudio = new Audio(src);
  currentButton = button;
  currentStatus = statusEl;
  currentAudio.addEventListener('playing', updateUI);
  currentAudio.addEventListener('pause', updateUI);
  currentAudio.addEventListener('ended', () => { updateUI(true); stopCurrent(); });
  currentAudio.play().catch(err => console.error(err));
  updateUI();
}

function stopCurrent() {
  if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
  if (currentButton) currentButton.textContent = '▶ Lecture';
  if (currentStatus) currentStatus.textContent = '';
  currentAudio = null; currentButton = null; currentStatus = null;
}

function updateUI(ended = false) {
  if (!currentButton || !currentAudio) return;
  if (ended) { currentButton.textContent = '▶ Lecture'; currentStatus.textContent = 'Terminé'; return; }
  const isPlaying = !currentAudio.paused;
  currentButton.textContent = isPlaying ? '⏸ Pause' : '▶ Lecture';
  currentStatus.textContent = isPlaying ? 'Lecture en cours…' : 'En pause';
}

document.getElementById('stopAll').addEventListener('click', stopCurrent);
window.addEventListener('DOMContentLoaded', async () => {
  const items = await fetchPlaylist();
  renderPlaylist(items);
});
