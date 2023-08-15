const apiUrl = "https://kokpit.smartlimon.com/items/"
const token = "AmN8rnhDsZLLox3-WBVcdmIxFDmRuqhK"

const movieForm = document.getElementById("movie-form")
const moviesElm = document.getElementById("movie-list")

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
  moviesElm.innerHTML = ""
  fetchApi("movies").then((resp) => {
    resp.forEach((element) => {
      let liElm = document.createElement("li")
      let deleteElm = document.createElement("button")
      deleteElm.textContent = "Sil"
      deleteElm.setAttribute("id", "delete-button")
      deleteElm.setAttribute("onclick", `deleteMovie(${element.id})`)
      liElm.setAttribute("id", element.id)
      liElm.innerText =
        element.name + " - " + element.director + " - " + element.score + " -> "
      moviesElm.append(liElm)
      liElm.append(deleteElm)
    })
  })
}

function deleteMovie(id) {
  fetchApi("movies/" + id, "DELETE")
}

function init() {
  movieForm.addEventListener("submit", addMovie)
  getMovies()
}

init()
