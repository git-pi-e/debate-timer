let minute = 0;
let seconds = 0;
let mseconds = 0;

let time_start = false;

let interval_id = null;

const display = document.getElementById('display');
var start = document.getElementById('start');
var reset = document.getElementById('reset');

start.onclick = function() {
    startStop();
};

reset.onclick = function() {
    resetStopwatch();
}

function startStop() {
    if(time_start === false) {
        time_start = true;
        interval_id = setInterval(stopwatch, 10);
        switchStart();
    } else {
        time_start = false;
        clearInterval(interval_id);
        switchStart();
    }
}


function stopwatch() {
    if(time_start) {
        mseconds++;
        if(mseconds === 100) {
            mseconds = 0;
            seconds++;
        }
        if(seconds === 60) {
            minute++;
            seconds = 0;
        }

        if(minute === 60) {
            time_start = false;
        }

        displayTime();
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
    if(!(interval_id === null)) {
        clearInterval(interval_id);
    }
    minute = 0;
    seconds = 0;
    mseconds = 0;
    displayTime();
}

function displayTime() {
    let m = minute.toString().padStart(2, '0');
    let s = seconds.toString().padStart(2, '0');
    let ms = mseconds.toString().padStart(2, '0');
    display.innerHTML = `${m}:${s}:${ms}`;
}
