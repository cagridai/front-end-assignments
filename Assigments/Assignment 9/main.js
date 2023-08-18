const apiUrl = "https://kokpit.smartlimon.com/items/"
const token = "AmN8rnhDsZLLox3-WBVcdmIxFDmRuqhK" //put your token here

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
      .then((resp) => (method === "DELETE" ? null : resolve(resp.data)))
      .catch((err) => reject(err))
  })
}

// GET, POST, DELETE Movie

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

      <div id="add-comment-${element.id}">
        <button class="add-comment-btn" onclick="addComment(${element.id})">Yorum Ekle</button>
      </div>
      `
        moviesElm.append(movieBox)
      })
    })
    .then((resp) => getComments())
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

function deleteMovie(id) {
  fetchApi("movies/" + id, "DELETE").then(getMovies())
}

// GET, POST, DELETE Comment

function getComments() {
  fetchApi("comment").then((resp) => {
    const moviesId = document.getElementsByClassName("comments")
    resp.forEach((comment) => {
      let commentApi = moviesId[parseInt(comment.movie_id)]
      if (commentApi) {
        commentApi.innerHTML += `
        <span class="comment">${comment.comment}</span>
        <button onclick="">Yorumu Düzenle</button>
        <button onclick="deleteComment(${comment.id})">Yorumu Sil</button>
        `
      }
    })
  })
}

function addComment(id) {
  const addCommentDiv = document.getElementById(`add-comment-${id}`)
  addCommentDiv.innerHTML = `
  <input type="text" id="comment-text" class="add-comment-input" name="comment">
  <button onclick=addCommentText(${id - 1})>Yorumu ekle</button>
  `
}

function addCommentText(id) {
  const getText = document.getElementById(`comment-text`).value
  fetchApi(`comment`, "POST", {
    movie_id: id,
    comment: getText
  }).then(getMovies())
}

function deleteComment(id) {
  fetchApi("comment/" + id, "DELETE").then(getMovies())
}

function init() {
  movieForm.addEventListener("submit", addMovie)
  getMovies()
}

init()
