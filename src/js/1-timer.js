import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTimePicker = document.getElementById('datetime-picker');
const startTimerBtn = document.getElementById('start-timer');
const timerFields = document.querySelectorAll('.timer [class="value"]');
let countdownInterval;
let userSelectedDate;

// Flatpickr options
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        validateSelectedDate(userSelectedDate);
    },
};

// Initialize Flatpickr
flatpickr(dateTimePicker, options);

function validateSelectedDate(selectedDate) {
    const currentDate = new Date();
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

startTimerBtn.addEventListener('click', () => {
    const selectedDate = userSelectedDate;
    const targetDate = new Date(selectedDate).getTime();

    // Disable input and start button
    dateTimePicker.disabled = true;
    startTimerBtn.disabled = true;

    countdownInterval = setInterval(() => {
        const currentDate = new Date().getTime();
        const timeDifference = targetDate - currentDate;
        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            updateTimerUI(0, 0, 0, 0);
            iziToast.success({
                title: 'Success',
                message: 'Countdown finished!',
            });
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        updateTimerUI(days, hours, minutes, seconds);
    }, 1000);
});

function updateTimerUI(days, hours, minutes, seconds) {
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
