let minute = 0;
let seconds = 0;
let time_start = false;

const display = document.getElementById('display');
var start = document.getElementById('start');
var reset = document.getElementById('reset');

start.onclick = function() {
    if(time_start === false) {
        time_start = true;
        stopwatch();
        switchStart();
    } else {
        time_start = false;
        switchStart();
    }
};

reset.onclick = function() {
    resetStopwatch();
}


function stopwatch() {
    if(time_start) {
        seconds++;

        if(seconds === 60) {
    	   minute++;
    	   seconds = 0;
        }

        if(minute === 60) {
    	   time_start = false;
        }

        displayTime();

    	setTimeout(stopwatch, 1000);
    }
}

function switchStart() {
    if(time_start) {
        start.innerHTML = "Stop";
    } else {
        start.innerHTML = "Start";
    }
}

function resetStopwatch() {
    time_start = false;
    switchStart();
    minute = 0;
    seconds = 0;
    displayTime();
}

function displayTime() {
    let m = minute.toString().padStart(2, '0');
    let s = seconds.toString().padStart(2, '0');
    display.innerHTML = `${m}:${s}`;
}
