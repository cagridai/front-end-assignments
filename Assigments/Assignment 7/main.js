const activeStudents = []
const button = document.getElementById('student-button')
const checkboxes = document.getElementsByClassName('student')
const winner = document.getElementById('winner')
let currentStudent = ''

const jsConfetti = new JSConfetti()

function addCheckedStudents(i) {
    if (activeStudents.includes(checkboxes[i].value)) {
        let index = activeStudents.indexOf(checkboxes[i].value)
        activeStudents.splice(index, 1)
    } else {
        activeStudents.push(checkboxes[i].value)
    }
}

function shuffle() {
    let randomStudent = activeStudents[Math.floor(Math.random()*activeStudents.length)]

    if (activeStudents.length == 0) {
        alert('Öğrenci seçiniz!')
    } else {
        winner.innerText = randomStudent
        if (winner.innerText == currentStudent) {
            shuffle()
        }
        currentStudent = winner.innerText
        jsConfetti.addConfetti()
    }
}