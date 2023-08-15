const apiUrl = "https://kokpit.smartlimon.com/items/"
const token = "AmN8rnhDsZLLox3-WBVcdmIxFDmRuqhK"

const callApi = (endPoint = "", method = "GET", payload = null) => {
  return new Promise((resolve, reject) => {
    fetch(apiUrl + endPoint, {
      method: method,
      body: payload ? JSON.stringify(payload) : payload,
      headers: {
        "Content-Type": "application/json; charset = utf-8",
        Authorization: "Bearer " + token
      }
    })
      .then((resp) => resp.JSON())
      .then((resp) => resolve(resp.data))
      .catch((err) => reject(err))
  })
}
