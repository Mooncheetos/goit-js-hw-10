import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let countdownInterval;
let userSelectedDate;

const dateTimePicker = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        validateSelectedDate(userSelectedDate);
    },
});

function validateSelectedDate(selectedDate) {
    const currentDate = new Date();
    const startTimerBtn = document.getElementById('start-timer');
    if (selectedDate < currentDate) {
        startTimerBtn.disabled = true;
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
        });
    } else {
        startTimerBtn.disabled = false;
    }
}

document.getElementById('start-timer').addEventListener('click', () => {
    const selectedDate = userSelectedDate;
    const targetDate = new Date(selectedDate).getTime();

    dateTimePicker.disabled = true;
    document.getElementById('start-timer').disabled = true;

    countdownInterval = setInterval(updateTimerUI, 1000, targetDate);
});

function updateTimerUI(targetDate) {
    const currentDate = new Date().getTime();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        updateTimerDisplay(0, 0, 0, 0);
        iziToast.success({
            title: 'Success',
            message: 'Countdown finished!',
        });
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerDisplay(days, hours, minutes, seconds);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
    const timerFields = document.querySelectorAll('.timer [class="value"]');
    timerFields[0].textContent = addLeadingZero(days);
    timerFields[1].textContent = addLeadingZero(hours);
    timerFields[2].textContent = addLeadingZero(minutes);
    timerFields[3].textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

window.addEventListener('load', () => {
    const startTimerBtn = document.getElementById('start-timer');
    startTimerBtn.disabled = true;
});