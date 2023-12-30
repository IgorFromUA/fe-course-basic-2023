function getGame(id) {
    const url = 'https://mmo-games.p.rapidapi.com/game?id=';
    const optionsGamesUrl = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1c3169c707mshb51bff34cbc9ff6p1749b9jsn648a19134256',
            'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
        },
    };
    return fetch(`${url}${id}`, optionsGamesUrl)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        });
}

const gameInfo = getGame(localStorage.getItem('gameId'));

function createGameCardStr(game) {
    const {
        title,
        thumbnail,
        description,
        genre,
        platform,
        publisher,
        developer,
        release_date: releaseDate,
    } = game;
    return `        <h1 class="description__title" data-description-title>${title}</h1>
                    <div class="card-section">
                        <div class="img-container">
                            <img class="card__img" data-card-img src="${thumbnail}" alt="game picture">
                            <ul class="card__actors">
                                <li class="card__actor" data-genre>
                                    <span class="semiBold">Genre:</span>    ${genre}
                                </li>
                                <li class="card__actor" data-platform>
                                    <span class="semiBold">Platform:</span>    ${platform}
                                </li>
                                <li class="card__actor" data-publisher>
                                    <span class="semiBold">Publisher:</span>    ${publisher}
                                </li>
                                <li class="card__actor" data-developer>
                                    <span class="semiBold">Developer:</span>    ${developer}
                                </li>
                                <li class="card__actor" data-release-date>
                                    <span class="semiBold">Release_date:</span>    ${releaseDate}
                                </li>
                            </ul>
                        </div>
                        <div class="card__description">
                            <p class="description__text" data-description-text>${description}</p>
                        </div>
                    </div>
                    <div>

                    </div>
    `;
}

function createCardGame(game) {
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    cardContent.insertAdjacentHTML('afterbegin', createGameCardStr(game));
    return cardContent;
}

async function createGameCard(gameProm) {
    const GAME_ELEMENT = document.querySelector('[data-game]');
    const game = await gameProm;
    const card = document.createElement('div');
    card.classList.add('card');

    card.appendChild(createCardGame(game));

    GAME_ELEMENT.appendChild(card);
}

createGameCard(gameInfo);
