const apiUrl = ""

const commentInput = $("#comment-input")
const feedForm = $("#feed-form")
const charLenght = $("#char-lenght")

// HELPERS

const callApi = () => {}

const getFeedInputLenght = () => {
  return commentInput.val().trim().length
}

const renderFeedCharLenght = () => {
  charLenght.text(getFeedInputLenght())
}

const checkFeedInput = (e) => {
  let charLenght = getFeedInputLenght()
  console.log(commentInput.val())

  renderFeedCharLenght()

  if (charLenght >= 42) {
    commentInput.val().text() = e.target.val().text().substring(0, 42)
    e.preventDefault()
  }
}

// FEEDS

const getFeeds = () => {}

const renderFeeds = () => {}

const feedSubmit = (e) => {}

// INIT

const init = () => {
  feedForm.submit(feedSubmit)
  commentInput.keypress(checkFeedInput)
  commentInput.on("paste", checkFeedInput)
}

init()
