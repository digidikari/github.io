const games = [
    {
        id: 1,
        title: "Super Adventure",
        category: "Aksi",
        thumbnail: "https://via.placeholder.com/250x180",
        embedUrl: "games/game1.html"
    },
    {
        id: 2,
        title: "Puzzle Master",
        category: "Puzzle",
        thumbnail: "https://via.placeholder.com/250x180",
        embedUrl: "games/game2.html"
    }
];

function renderGames(gamesArray) {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = gamesArray.map(game => `
        <div class="game-card" onclick="openGame('${game.embedUrl}')">
            <img src="${game.thumbnail}" class="game-thumbnail" alt="${game.title}">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-category">${game.category}</p>
            </div>
        </div>
    `).join('');
}

function openGame(url) {
    document.getElementById('gameFrame').src = url;
    document.getElementById('gameModal').style.display = 'block';
}

function closeGame() {
    document.getElementById('gameFrame').src = '';
    document.getElementById('gameModal').style.display = 'none';
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm) || 
        game.category.toLowerCase().includes(searchTerm)
    );
    renderGames(filteredGames);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGame();
});

renderGames(games);
