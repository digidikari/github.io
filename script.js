// Fungsi utama
async function init() {
    try {
        const games = await loadGames();
        renderGames(games);
        initSearch();
        initSidebar();
    } catch (error) {
        showError('Gagal memuat game');
    }
}

// Ambil data dari GamePix
async function loadGames() {
  try {
    const response = await fetch(`${RSS_FEED}?sid=${GAMEPIX_SID}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Failed to load games:', error);
    return [];
  }
}

// Render game sesuai template Anda
function renderGames(games) {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = games.map(game => `
        <div class="game-card" onclick="openGame('${game.embedUrl}')">
            <img src="${game.thumbnail}?w=400" 
                 class="game-thumbnail"
                 onerror="this.src='https://via.placeholder.com/400x300?text=Thumbnail+Error'">
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="game-meta">
                    <span class="game-genre">${game.category}</span>
                    <span>⭐ ${(game.quality_score * 5).toFixed(1)}</span>
                </div>
                <div class="game-meta">
                    <span>👥 ${game.players}</span>
                    <span>🏷️ ${game.tags?.[0] || 'General'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Fungsi buka game
function openGame(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 12px;
    `;
    
    Swal.fire({
        html: iframe,
        showCloseButton: true,
        width: '90%',
        height: '90%',
        showConfirmButton: false,
        background: '#0f0f14',
        customClass: {
            popup: 'custom-modal'
        }
    });
}

// Pencarian
function initSearch() {
    document.querySelector('.search-input').addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.game-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = title.includes(term) ? 'block' : 'none';
        });
    });
}

// Error handling
function showError(msg) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = msg;
    document.body.prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', init);
