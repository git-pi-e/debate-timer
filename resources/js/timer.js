var timeDisplay = document.getElementById('display')
var msDisplay = document.getElementById('display_ms')
var startButton = document.getElementById('start')
var resetButton = document.getElementById('reset')
var muteToggleButton = document.getElementById('mute')
var alertButton = document.getElementById('alert')

var minuteInput = document.getElementById("ipMinute")
var secondInput = document.getElementById("ipSecond")
var alertInput = document.getElementById("ipAlert")
var displayAlert = document.getElementById("displayAlert")
var currentAlert = document.getElementById("currentAlert")

var alerts = {}
var printed = {}

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

	if(!(startButton.innerHTML === "Start")) {
		startButton.innerHTML = "Start"
	}

	displayAlert.innerHTML = ""
	currentAlert.innerHTML = ""

	alerts = {}
	printed = {}
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

alertButton.onclick = function() {
	let minute = parseInt(minuteInput.value)
	let second = parseInt(secondInput.value)
	let alert = alertInput.value
	let prev = displayAlert.innerHTML
	let minuteString = minute >= 10 ? minute.toString() : `0${minute}`
	let secondString = second >= 10 ? second.toString() : `0${second}`
	displayAlert.innerHTML = prev.concat(`<br/>${minuteString}:${secondString} - ${alert}`)

	alerts[`${minute}:${second}`] = alert
	printed[`${minute}:${second}`] = false
	console.log(alerts)
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
	displayCurrentAlert(minutes, seconds)
}

function displayCurrentAlert(minute, second) {
	let key = `${minute}:${second}`
	//console.log(key + (key in alerts))
	if(key in printed && !printed[key]){
		console.log("in here")
		let alert = alerts[key]
		let cAlert = `<div id="${key}" class="alert">${key} - ${alert}</div>` 
		currentAlert.innerHTML = currentAlert.innerHTML.concat(cAlert)
		printed[key] = true
		let func = () => {
			console.log(key)
			document.getElementById(key).remove()
			
		}
		setTimeout(func, 10000)
	}
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