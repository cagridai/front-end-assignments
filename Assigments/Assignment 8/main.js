const cardContainer = document.querySelector('#card-container')

let currentPage = 1
let isFetching = false
let hasMore = true


async function fetchData() {
    isFetching = true

    let response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
    let data = await response.json()
    isFetching = false

    if (data.info.next === null) {
        hasMore = false
        return
    }

    data.results.forEach(character => {
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

    currentPage++
}

window.addEventListener('scroll', () => {
    if (isFetching || !hasMore) {
        return 
    }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        fetchData()
    }
})

fetchData()