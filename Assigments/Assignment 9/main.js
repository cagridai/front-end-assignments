const apiUrl = "https://kokpit.smartlimon.com/items/"
const token = "" //put your token here

const movieForm = document.getElementById("movie-form")
const mainElm = document.getElementById("main")
const moviesElm = document.getElementById("movies")

const fetchApi = (endPoint = "", method = "GET", payload = null) => {
  return new Promise((resolve, reject) => {
    fetch(apiUrl + endPoint, {
      method: method,
      body: payload ? JSON.stringify(payload) : payload,
      headers: {
        "Content-Type": "application/json; charset = utf-8",
        Authorization: "Bearer " + token
      }
    })
      .then((resp) => (method === "DELETE" ? null : resp.json()))
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(err))
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
  moviesElm.innerHTML = ""
  fetchApi("movies")
    .then((resp) => {
      resp.forEach((element) => {
        let movieBox = document.createElement("div")
        movieBox.setAttribute("class", "movie-box")
        movieBox.innerHTML = `
      <div class="delete">
        <button class="delete-button" onclick="deleteMovie(${element.id})">Sil</button>
      </div>

      <div class="movie">
        <span class="movie-name">İsim: ${element.name}</span>
        <span class="movie-director">Yönetmen: ${element.director}</span>
        <span class="movie-score">Skor: ${element.score}</span>
      </div>

      <div class="comments">
        <span class="comment-text">Yorumlar</span>
        <span class="comment" id="${element.id}"></span>
      </div>
      `
        moviesElm.append(movieBox)
      })
    })
    .then((resp) => getComments())
}

function deleteMovie(id) {
  fetchApi("movies/" + id, "DELETE").then(getMovies())
}

function getComments() {
  fetchApi("comment").then((resp) => {
    const moviesId = document.getElementsByClassName("comment")
    resp.forEach((comment) => {
      let commentApi = moviesId[parseInt(comment.movie_id)]
      if (commentApi) {
        commentApi.innerHTML += `<span class="comment">${comment.comment}</span>`
      }
    })
  })
}

function init() {
  movieForm.addEventListener("submit", addMovie)
  getMovies()
}

init()
