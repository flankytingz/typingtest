let mainDiv = document.getElementById("main-div")
let testDiv = document.getElementById("test-div")
let resultDiv = document.getElementById("result-div")
let startBtn = document.getElementById("start-btn")
let playAgainBtn = document.getElementById("play-again-btn")
let p = document.getElementById("sample-text-p")
let string = "Hello, this is a typing test to test your typing speed and maybe even errors?"
let sumArray = []
let timer = 0

startBtn.onclick = function () {
    changeAppState(1)
}
function changeAppState(state) {
    console.log(`App state is now: ${state}`)
    switch (state) {
        case 0:
            mainDiv.hidden = false
            testDiv.hidden = true
            resultDiv.hidden = true
            break;
        case 1:
            mainDiv.hidden = true
            testDiv.hidden = false
            renderHTML()
            window.addEventListener("keydown", userInputListener)
            break;
        case 2:
            timer = (Date.now() - timer)/1000
            window.removeEventListener("keydown", userInputListener)
            console.log(timer, string.split(" ").length, (string.split(" ").length/timer * 60))
            playAgainBtn.onclick = function () {
                changeAppState(0)
            }
            sumArray = []
            timer = 0
            testDiv.hidden = true
            resultDiv.hidden = false
            break;
    }
    return null
}

function userInputListener(event) {
    if (timer === 0) timer = Date.now()
    let key = event.key
    if (key === "Backspace" && sumArray.length !== 0) {
        sumArray.pop()
        renderHTML()
        return
    }
    if (key.length !== 1) return;
    if (string.charAt(sumArray.length) === key) {
        sumArray.push(true)
    } else {
        sumArray.push(false)
    }
    renderHTML()
}

function renderHTML() {
    let previousCorrect
    let i = 0
    let string0 = ""

    if (sumArray.length === 0) {
        p.innerHTML =`<span class='undone'>${string}</span>`
        return
    } else if (sumArray.length === string.length) {
        changeAppState(2)
        return;
    }

    // opens the span tag for the first letter
    if(sumArray[i] === true) {
        string0 = `<span class='correct'>${string.charAt(i)}`
        previousCorrect = true
    } else {
        string0 = `<span class='incorrect'>${string.charAt(i)}`
        previousCorrect = false
    }
    i++

    while (i < sumArray.length) {
        if(sumArray[i] === true) {
            // if the previous letter was correct then it doesn't open a new span tag
            if (previousCorrect) {
                string0 += string.charAt(i)
            } else {
                // the previous letter was incorrect but the current letter isn't, so it needs to close the span tag and open a new one
                string0 += "</span><span class='correct'>" + string.charAt(i)
            }
            previousCorrect = true
        } else {
            // if the previous letter was correct but the current letter isn't, so it needs to close the span tag and open a new one
            if (previousCorrect) {
                string0 += "</span><span class='incorrect'>" + string.charAt(i)
            } else {
                // the previous letter was incorrect, so it doesn't need to add a new span tag.
                string0 += string.charAt(i)
            }
            previousCorrect = false
        }
        i++
    }
    // adds the rest of the text length
    string0 += `</span><span class='undone'>${string.slice(i)}</span>`
    p.innerHTML = string0
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