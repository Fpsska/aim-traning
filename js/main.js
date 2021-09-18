let start = document.querySelector("#start")
let screens = document.querySelectorAll(".screen")
let timeList = document.querySelector("#time-list")
let timeCount = document.querySelector("#time")
let board = document.querySelector("#board")
let colors = ["#CC0099", "#FFFF00", "#000099", "#00FF66", "#00FFFF", "#FF6600"]
let time = 0
let score = 0

start.addEventListener("click", (event) => {
    event.preventDefault()
    screens[0].classList.add("up")
})

timeList.addEventListener("click", event => {
    if (event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute("data-time"))
        screens[1].classList.add("up")
        startGame()
    }
})

board.addEventListener("click", event => {
    if (event.target.classList.contains("circle")) {
        score++
        event.target.remove()
        getRandomCircle()
    }
})
board.addEventListener("mouseleave", () => {
    board.style.borderColor = "red";
})
board.addEventListener("mouseover", () => {
    board.style.borderColor = "#c0c0c0";
})

function startGame() {
    setInterval(decreaseTime, 1000)
    getRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let currentTime = --time
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }
        setTime(currentTime)
    }
}

function setTime(value) {
    timeCount.innerHTML = `00:${value}`
}

function finishGame() {
    timeCount.parentNode.classList.add("hide")
    board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`
}

function getRandomCircle() {
    let circle = document.createElement("div")
    let color = getRandomColor()
    let size = getRandomNumber(10, 60)
    let { width, height } = board.getBoundingClientRect()
    let x = getRandomNumber(0, width - size)
    let y = getRandomNumber(0, height - size)

    circle.style.background = color
    getRandomColor()
    circle.classList.add("circle")
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    let index = Math.floor(Math.random() * colors.length)
    return colors[index]
}