// Data Game (Contoh)
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
    },
    // Tambahkan game lain di sini
];

// Render Game Cards
function renderGames(gamesArray) {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';

    gamesArray.forEach(game => {
        const card = `
            <div class="game-card">
                <img src="${game.thumbnail}" class="game-thumbnail" alt="${game.title}">
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-category">${game.category}</p>
                    <button class="play-button" onclick="openModal('${game.embedUrl}')">Mainkan</button>
                </div>
            </div>
        `;
        gameGrid.innerHTML += card;
    });
}

// Fitur Pencarian
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm) || 
        game.category.toLowerCase().includes(searchTerm)
    );
    renderGames(filteredGames);
});

// Modal Control
function openModal(embedUrl) {
    const modal = document.getElementById('gameModal');
    const iframe = document.getElementById('gameFrame');
    iframe.src = embedUrl;
    modal.style.display = "block";
}

document.querySelector('.close').addEventListener('click', function() {
    const modal = document.getElementById('gameModal');
    const iframe = document.getElementById('gameFrame');
    iframe.src = "";
    modal.style.display = "none";
});

// Inisialisasi
renderGames(games);
