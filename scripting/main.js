let mainDiv = document.getElementById("main-div")
let testDiv = document.getElementById("test-div")
let startBtn = document.getElementById("start-btn")
let p = document.getElementById("sample-text-p")
let testString = "Hello, this is a typing test to test your typing speed and maybe even errors?"

startBtn.onclick = function() {
    changeAppState(1)

}
function changeAppState(state) {
    switch (state) {
        case 0:
            break;
        case 1:
            mainDiv.hidden = true
            testDiv.hidden = false
            p.innerHTML = `<span class="undone">${testString}</span>`
            window.addEventListener("keyup", function (e) {userInputListener(e)})
    }

}

let previousKey = ""
let sumArray = []
let a = 0
function userInputListener(event) {
    console.log(event.key)
    let key = event.key
    if (previousKey === "Shift") {
        key = event.key.toUpperCase()
    } else if (event.key === "Backspace") {
        sumArray.pop()
        a--
        renderHTML()
        return
    }
    if (testString.charAt(a) === key) {

    }
    renderHTML()
    a++

    previousKey = event.key
}

function renderHTML() {
    let string = ""
    let previousCorrect = false
    let first = true

    for (const i in sumArray) {
        if (first) {
            if(i[1] === true) {
                if (previousCorrect) {
                    string += i[0]
                } else {
                    string += "</span><span class='correct'>" + i[0]
                }
            } else {
                if (previousCorrect) {
                    string += i[0]
                } else {
                    string += "</span><span class='incorrect'>" + i[0]
                }
            }
        }
        first = false
    }

    console.log(string)
}
/*
states
    1 = started
    2 = showing result
    0 = main screen
 */

/*
globals:
let charNum = 1
let newTestString = ""
let previousCharCorrect = false

    let str0 = testString.slice(0,charNum)
    console.log(str0,str0.endsWith(event.key),str0.length)
    if (str0.endsWith(event.key)) {
        if (previousCharCorrect) {
            newTestString += `${event.key}`
        } else if (str0.length === 1) {
            newTestString += `<span class="correct">${event.key}`
        } else {
            newTestString += `</span><span class="correct">${event.key}`
        }
        previousCharCorrect = true
    } else {
        if (previousCharCorrect) {
            newTestString += `</span><span class="incorrect">${event.key}`
        } else if (str0.length === 1) {
            newTestString += `<span class="incorrect">${event.key}`
        } else {
            newTestString += `${event.key}`
        }
        previousCharCorrect = false
    }
    console.log(newTestString)
    p.innerHTML = newTestString + `</span><span class="undone">${testString.slice(charNum)}</span>`
    charNum++

    working code but cant handle other keys
 */