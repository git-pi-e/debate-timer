var timeDisplay = document.getElementById('display')
var msDisplay = document.getElementById('display_ms')
var startButton = document.getElementById('start')
var resetButton = document.getElementById('reset')
var muteToggleButton = document.getElementById('mute')
let isMute = false
var stopwatch = {
	elapsedTime: 0
}
let protectedTime1 = false
let protectedTime2 = false
let timeUp = false

var bell = new Audio("../resources/assets/bell.wav")

startButton.onclick = function() {
	if(startButton.innerHTML === "Start") {
		start()
		startButton.innerHTML = "Stop"
	} else {
		stopwatch.elapsedTime += Date.now() - stopwatch.startTime
		clearInterval(stopwatch.intervalID)
		startButton.innerHTML = "Start"	
	}
}

resetButton.onclick = function() {
	stopwatch.elapsedTime = 0
	stopwatch.startTime = Date.now()
	clearInterval(stopwatch.intervalID)
	displayTime(0, 0, 0)
	changeBackground(0, 0, 0)
	protectedTime1 = false
	protectedTime2 = false
	timeUp = false
}

muteToggleButton.onclick = function() {
	if(muteToggleButton.innerHTML === "Mute Bell") {
		muteToggleButton.innerHTML = "Unmute Bell"
		isMute = true
	} else if(muteToggleButton.innerHTML === "Unmute Bell") {
		muteToggleButton.innerHTML = "Mute Bell"
		isMute = false
	}
}

function start() {
	stopwatch.startTime = Date.now()
	stopwatch.intervalID = setInterval(delta, 10);
}

function delta() {
	let elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime
	let milliseconds = parseInt((elapsedTime % 1000) / 10)
	let seconds = parseInt((elapsedTime / 1000) % 60)
	let minutes = parseInt((elapsedTime / (1000 * 60)) % 60)
	displayTime(milliseconds, seconds, minutes)
	changeBackground(milliseconds, seconds, minutes)
}

function displayTime(ms, s, m) {
	let times = [m, s, ms].map(time => time < 10 ? `0${time}` : time.toString())

	timeDisplay.innerHTML = times.slice(0, 2).join(':')
	display_ms.innerHTML = `:`.concat(times[2])
}

function setBackground(color) {
	if(!(document.body.style.backgroundColor === color)) {
		document.body.style.backgroundColor = color
	}
}

function playBell(choice) {
	if(!isMute) {
		if(choice === 1) {
			if(!protectedTime1) {
				bell.play()
				protectedTime1 = true
			}
		} else if(choice === 2) {
			if(!protectedTime2) {
				bell.play()
				protectedTime2 = true
			}
		} else if(choice === 3) {
			if(!timeUp) {
				bell.play()
				timeUp = true
			}
		}
	}
}
 
function changeBackground(ms, s, m) {
	if(m === 0 && s === 0 && ms === 0) {
		setBackground("white") 
	} else if(m === 0 && s === 0 && ms > 0) {
		setBackground("yellow")
	} else if(m === 1 && s === 0 && ms > 0) {
		playBell(1)
		setBackground("green")
	} else if(m === 6 && s === 0 && ms > 0) {
		playBell(2)
		setBackground("yellow")
	} else if(m === 7 && s === 16 && ms > 0) {
		playBell(3)
		setBackground("red")
	}
}