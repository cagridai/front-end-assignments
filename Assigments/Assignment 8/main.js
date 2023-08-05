const apiURL = "https://rickandmortyapi.com/api/character"

fetch(apiURL)
    .then(response => response.json())
    .then(data => makeCards(data.results))

function makeCards(charactersArray) {
    const cardContainer = document.querySelector('#card-container')

    charactersArray.forEach(character => {
        cardContainer.innerHTML += 
             `
             <div id='character-card-${character.id}'
             <span>${character.name}</span>
             <img src=${character.image}></img>
             </div> 
             `
    })
}