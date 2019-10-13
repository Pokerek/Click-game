// --- VAR ---
// BOX
var container = document.getElementById('container')
// Hov many squere
// Input control
var inputHow = document.querySelector('input')
inputHow.addEventListener('change', newGame)
var pointNum
// holder
var holder = false
var canClick = true
var selectedPos
// Hiden tab
var tabSquereCheck, tabSquere
// Holder for html sqere
var squereDisplay
// player's score
var maxPlayer = 2
var thisPlayer = 0
var pointArr
var playerArr = document.querySelectorAll('.player')
var scoreHolder = document.querySelectorAll('.scoreDisplay')

// --- FUNCTION ---
// Random number
function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
// Generate squere
function generateSquere () {
  for (var i = 0; i < pointNum; i++) {
    var newSquere = document.createElement('div')
    newSquere.classList.add('squere')
    container.appendChild(newSquere)
    tabSquereCheck[i] = false
  }
  squereDisplay = document.querySelectorAll('.squere')
}
// Click power
function clickPower () {
  if (canClick) { //  Permition to click
    //  Selected logic
    this.classList.toggle('selected')
    if (holder && this.value !== selectedPos) {
      var actualPos = this.value
      canClick = false
      if (this.textContent === squereDisplay[selectedPos].textContent) { // Find the same
        // Squere remove
        setTimeout(function () {
          squereDisplay[selectedPos].classList.remove('squere', 'selected')
          squereDisplay[selectedPos].innerHTML = ''
          squereDisplay[selectedPos].classList.add('squereRemove')
          squereDisplay[selectedPos].removeEventListener('click', clickPower)
          squereDisplay[actualPos].classList.remove('squere', 'selected')
          squereDisplay[actualPos].innerHTML = ''
          squereDisplay[actualPos].classList.add('squereRemove')
          squereDisplay[actualPos].removeEventListener('click', clickPower)
          addPoint() // Add point
          endgame() // End game check
          canClick = true
        }, 600)
      } else {
        // Miss
        setTimeout(function () {
          squereDisplay[selectedPos].classList.toggle('selected')
          squereDisplay[actualPos].classList.toggle('selected')
          scoreHolder[thisPlayer].classList.remove('actual')
          if (thisPlayer < maxPlayer - 1) {
            thisPlayer++
          } else thisPlayer = 0
          scoreHolder[thisPlayer].classList.add('actual')
          canClick = true
        }, 1000)
      }
    } else {
      selectedPos = this.value
    }
    holder = !holder
  }
}
// Add point
function addPoint () {
  playerArr[thisPlayer].textContent = pointArr[thisPlayer] += 1
}
// Clear score board
function clearScore () {
  pointArr = new Array(maxPlayer)
  for (var i = 0; i < pointArr.length; i++) {
    playerArr[i].textContent = pointArr[i] = 0
  }
  scoreHolder[thisPlayer].classList.remove('actual')
  thisPlayer = 0
  scoreHolder[thisPlayer].classList.add('actual')
}
// End game
function endgame () {
  if (document.querySelectorAll('#container > .squereRemove').length === inputHow.value * 2) {
    var winner = 0
    // MVP
    for (var i = 1; i < maxPlayer; i++) {
      if (pointArr[winner] < pointArr[i]) { winner = i }
    }
    var winBox = document.createElement('div')
    winBox.classList.add('winInfo')
    winBox.textContent = 'The winner is player ' + (winner + 1)
    container.innerHTML = ''
    container.appendChild(winBox)
  }
}
//  Mix squere
function mixSquere () {
  var halfSquere = pointNum / 2
  var randCheck = []
  for (var i = 0; i < halfSquere; i++) {
    randCheck[i] = false
  }
  for (i = 0; i < halfSquere; i++) {
    var randNum
    while (true) {
      randNum = getRandomIntInclusive(1, halfSquere)
      if (!randCheck[randNum - 1]) {
        randCheck[randNum - 1] = true
        break
      }
    }
    for (var j = 0; j < 2; j++) {
      do {
        // Random pos of squere var
        var randPos = getRandomIntInclusive(0, pointNum - 1)
        var changeNot = true
        if (!tabSquereCheck[randPos]) {
          tabSquereCheck[randPos] = true
          changeNot = false
          tabSquere[randPos] = randNum
          // Add value
          squereDisplay[randPos].textContent = randNum
          // Memory pos of squere
          squereDisplay[randPos].value = randPos
          // add picture
          var picture = document.createElement('img')
          picture.src = 'imgs/' + randNum + '.jpg'
          picture.classList.add('pictureSquere')
          squereDisplay[randPos].appendChild(picture)
          // Take the power
          squereDisplay[randPos].addEventListener('click', clickPower)
        }
      } while (changeNot)
    }
  }
}

// Start game function
function newGame () {
  console.log('Start game')
  // Clear logic
  tabSquereCheck = new Array(pointNum)
  tabSquere = new Array(pointNum)
  holder = false
  pointNum = inputHow.value * 2
  // Clear board
  document.getElementById('container').innerHTML = ''
  clearScore()
  generateSquere()
  mixSquere()
}

// Start game
document.getElementById('gameNew').addEventListener('click', newGame)
