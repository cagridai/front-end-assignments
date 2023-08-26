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
      .then((resp) => (method === "DELETE" ? null : resolve(resp.data)))
      .catch((err) => reject(err))
  })
}

// GET, POST, DELETE Movie

function getMovies() {
  moviesElm.innerHTML = ""
  fetchApi("movies")
    .then((resp) => {
      console.log(resp)
      resp.forEach((element) => {
        let movieBox = document.createElement("div")
        movieBox.setAttribute("class", "movie-box")
        movieBox.innerHTML = `
        <div class="movie">
          <div class="movie-haeder">
            <span class="movie-name">${element.name}</span>
            <button class="delete-button" onclick="deleteMovie(${element.id})">Sil</button>
          </div>
          <span class="movie-director">Yönetmen: ${element.director}</span>
          <span class="movie-score">Skor: ${element.score}</span>
        </div>

        <div class="comment-header">
          <span class="comment-text">Yorumlar</span>
        </div>

        <div class="comments">
          <div class="text-area">
            <textarea class="comment-box comment-textarea"  id="textarea-${element.id}" placeholder="Yorumunuzu buraya giriniz"></textarea>
            <button class="add-comment-btn" onclick="addComment(${element.id})">Yorum Ekle</button>
          </div>
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
    console.log(resp)
    const moviesId = document.getElementsByClassName("comments")
    resp.forEach((comment) => {
      let commentApi = moviesId[parseInt(comment.movie_id)]
      if (commentApi) {
        commentApi.innerHTML += `
          <div class="comment-box">
            <span class="comment" id="${comment.id}">${comment.comment}</span>
            <div class="changeButtons">
              <button onclick="changeComment(${comment.id})">Yorumu Düzenle</button>
              <button onclick="deleteComment(${comment.id})">Yorumu Sil</button>
            </div>
          </div>
        `
      }
    })
    let commentsToSort = document.getElementsByClassName("comment")
  })
}

function addComment(id) {
  let getText = document.getElementById(`textarea-${id}`).value
  if (getText) {
    fetchApi("comment", "POST", {
      movie_id: id,
      comment: getText
    }).then(getMovies())
  }
}

function changeComment(id) {
  let commentToChange = document.getElementById(`${id}`)
  const commentText = commentToChange.value
  commentToChange.innerHTML = `
  <textarea class="comment-box comment-textarea">${commentText}</textarea>
  `
}

function deleteComment(id) {
  fetchApi("comment/" + id, "DELETE").then(getMovies())
}

function init() {
  movieForm.addEventListener("submit", addMovie)
  getMovies()
}

init()
