const abort = new AbortController()
const userInputP = document.getElementById("user-input-p")

window.addEventListener(
    "keydown",
    handleKeyDown,
    { signal : abort.signal}
)

let lastCorrect
let paragraph = "This is a typing test"
let currChar = 0

function handleKeyDown(e) {
    const key = e.key

    console.log(key)

    // If any other key than a character or digit is pressed it returns.
    if (key.length !== 1) return

    if (currChar === 0) return handleFirstChar(key)

    let replaceVal
    let correctChar = paragraph.charAt(currChar)

    if (lastCorrect) {
        // just add if current is correct
        // or close span tag and create new if old is correct
        replaceVal = handleLastCorrect(key, correctChar)
    } else {
        // just add if current is incorrect
        // or close span tag and create new if old is correct
        replaceVal = handleLastIncorrect(key, correctChar)
    }

    userInputP.innerHTML = userInputP.innerHTML
        .slice(
            0,
            userInputP.innerHTML.lastIndexOf(`<span class="undone">`)-7 // removes the undone part
        )
        .concat(
            replaceVal, // adds the new string
            `<span class="undone">`,
            paragraph.substring(currChar+1),
            `</span>` // adds the undone part
        )

    currChar++
}

function handleLastCorrect(key, correctChar) {
    if (key === correctChar) {
        return `${correctChar}</span>`
    } else {
        lastCorrect = false
        return `</span><span class="incorrect">${correctChar}</span>`
    }
}

function handleLastIncorrect(key, correctChar) {
    if (key === correctChar) {
        lastCorrect = true
        return `</span><span class="correct">${correctChar}</span>`
    } else {
        return `${correctChar}</span>`
    }
}

function handleFirstChar(key) {
    let replaceVal

    if (key === paragraph.charAt(currChar)) {
        lastCorrect = true
        replaceVal = `<span class="correct">${key}</span>`
    } else {
        lastCorrect = false
        replaceVal = `<span class="incorrect">${key}</span>`
    }

    userInputP.innerHTML = userInputP.innerHTML
        .slice(
            0,
            userInputP.innerHTML.lastIndexOf(`<span class="undone">`) // removes the undone part
        )
        .concat(
            replaceVal, // adds the new string
            `<span class="undone">`,
            paragraph.substring(currChar+1),
            `</span>` // adds the undone part
        )

    currChar++
}