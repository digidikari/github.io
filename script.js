// Data Game
const games = Array.from({length: 50}, (_, i) => ({
    id: i+1,
    title: `Game ${i+1}: Petualangan Epik`,
    genre: ["Aksi", "Balapan", "Puzzle", "Olahraga"][i%4],
    rating: (Math.random() * 5).toFixed(1),
    players: Math.floor(Math.random() * 10000),
    category: ["Trending", "Baru", "Populer"][i%3],
    thumbnail: `https://picsum.photos/200/150?random=${i+1}`,
    embedUrl: `https://play.gamepix.com/rotating-flappy/embed?id=${i+1}`
}));

// Generate Game Cards
function generateGameCards() {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = games.map(game => `
        <div class="game-card" onclick="openGame('${game.embedUrl}')">
            <img src="${game.thumbnail}" class="game-thumbnail">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <div class="game-meta">
                    <span class="game-genre">${game.genre}</span>
                    <span>⭐ ${game.rating}</span>
                </div>
                <div class="game-meta">
                    <span>👥 ${game.players}</span>
                    <span>🏷️ ${game.category}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Game Control
function openGame(url) {
    document.getElementById('gameFrame').src = url;
    document.getElementById('gameModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGame() {
    document.getElementById('gameFrame').src = '';
    document.getElementById('gameModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    sidebar.classList.toggle('active');
    toggleBtn.textContent = sidebar.classList.contains('active') ? '✕' : '☰';
}

document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    if (!sidebar.contains(e.target) && !e.target.classList.contains('sidebar-toggle')) {
        sidebar.classList.remove('active');
        toggleBtn.textContent = '☰';
    }
});

// Search Functionality
document.querySelector('.search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm) || 
        game.genre.toLowerCase().includes(searchTerm)
    );
    renderFilteredGames(filtered);
});

function renderFilteredGames(filteredGames) {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = filteredGames.map(game => `
        <div class="game-card" onclick="openGame('${game.embedUrl}')">
            <img src="${game.thumbnail}" class="game-thumbnail">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <div class="game-meta">
                    <span class="game-genre">${game.genre}</span>
                    <span>⭐ ${game.rating}</span>
                </div>
                <div class="game-meta">
                    <span>👥 ${game.players}</span>
                    <span>🏷️ ${game.category}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize
generateGameCards();
