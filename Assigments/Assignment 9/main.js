const apiUrl = "https://kokpit.smartlimon.com/items/"
const token = "AmN8rnhDsZLLox3-WBVcdmIxFDmRuqhK"

const movieForm = document.getElementById("movie-form")
const deleteBtn = document.getElementsByClassName("delete")
const mainElm = document.getElementById("main")

const fetchApi = (endPoint = "", method = "GET", payload = null) => {
  return new Promise((resolve, reject) => {
    if (method === "DELETE") {
      fetch(apiUrl + endPoint, {
        method: method,
        headers: {
          "Content-Type": "application/json; charset = utf-8",
          Authorization: "Bearer " + token
        }
      })
        .then((res) => {
          getMovies()
        })
        .catch((err) => reject(err))
    } else {
      fetch(apiUrl + endPoint, {
        method: method,
        body: payload ? JSON.stringify(payload) : payload,
        headers: {
          "Content-Type": "application/json; charset = utf-8",
          Authorization: "Bearer " + token
        }
      })
        .then((resp) => resp.json())
        .then((resp) => resolve(resp.data))
        .catch((err) => reject(err))
    }
  })
}

function addMovie(e) {
  e.preventDefault()
  const formData = new FormData(e.target)
  let payloadData = {}
  formData.forEach((value, key) => {
    payloadData[key] = value
  })
  fetchApi("movies", "POST", payloadData).then((resp) => getMovies())
}

function getMovies() {
  fetchApi("movies").then((resp) => {
    resp.forEach((element) => {
      let movieBox = document.createElement("div")
      movieBox.setAttribute("class", "movie-box")
      movieBox.innerHTML = `
      <div class="delete">
        <button class="delete-button">Sil</button>
      </div>

      <div class="movie">
        <span class="movie-name">İsim: ${element.name}</span>
        <span class="movie-director">Yönetmen: ${element.director}</span>
        <span class="movie-score">Skor: ${element.score}</span>
      </div>

      <div id="${element.movie_id}"></div>
      `
      mainElm.append(movieBox)
    })
  })
}

function deleteMovie(id) {
  fetchApi("movies/" + id, "DELETE")
  fetchApi("comment/" + id, "DELETE")
}

function getComments() {
  fetchApi("comment").then((resp) => {
    const moviesId = document.getElementsByClassName("movies_id")
    resp.forEach((comment) => {
      let commentElm = moviesId[parseInt(comment.movie_id)]
      if (commentElm) {
        commentElm.innerText += " " + comment.comment
      }
    })
  })
}

function init() {
  movieForm.addEventListener("submit", addMovie)
  getMovies()
  getComments()
}

init()
