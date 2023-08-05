const apiURL = "https://rickandmortyapi.com/api/character"

fetch(apiURL)
    .then(response => response.json())
    .then(data => makeCards(data.results))

function makeCards(charactersArray) {
    const cardContainer = document.querySelector('#card-container')

    charactersArray.forEach(character => {
        cardContainer.innerHTML += 
             `
             <div id='character-card-${character.id}' class='cards'>
                <div class='card-image'>
                    <img src=${character.image}></img>
                </div>
                <div class='card-content'>
                    <div class='card-section'>
                        <span class='name'>${character.name}</span>
                        <span class='status'><span class="status__icon"></span>${character.status} - ${character.species}</span>
                    </div>
                    <div class='card-section'>
                        <span class='grey-text'>Last known Location:</span>
                        <span class='name'>${character.location.name}</span>
                    </div>
                    <div class='card-section'>
                        <span class='grey-text'>First seen in:</span>
                        <span class='name'>${character.origin.name}</span>
                    </div>
                </div>
             </div> 
             `
    })
}