async function fetchGames() {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = corsProxy + "https://feeds.gamepix.com/v2/json?sid=ANA26&pagination=96&page=1";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.games || data.games.length === 0) {
            console.error("Tidak ada game yang ditemukan!");
            return;
        }

        renderGames(data.games);
    } catch (error) {
        console.error("Gagal mengambil data game:", error);
    }
}

function renderGames(games) {
    const gameGrid = document.getElementById("gameGrid");
    gameGrid.innerHTML = games.map(game => `
        <div class="game-card" onclick="openGame('${game.url}')">
            <img src="${game.thumbnail}" class="game-thumbnail" alt="${game.name}">
            <div class="game-info">
                <h3 class="game-title">${game.name}</h3>
                <div class="game-meta">
                    <span>⭐ ${game.rating || "N/A"}</span>
                    <span>🎮 ${game.category || "Uncategorized"}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchGames);
