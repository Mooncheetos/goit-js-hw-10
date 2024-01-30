import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById('datetime-picker');
const startTimerBtn = document.getElementById('start-timer');
let countdownInterval;

startTimerBtn.addEventListener('click', () => {
    // Отримання вибраної дати та часу користувачем
    const selectedDate = dateTimePicker.value;
    const targetDate = new Date(selectedDate).getTime();

    // Запуск таймера зворотнього відліку
    countdownInterval = setInterval(() => {
        // Отримання поточної дати та часу
        const currentDate = new Date().getTime();
        const timeDifference = targetDate - currentDate;

        // Розрахунок залишкового часу в мілісекундах та перетворення його у дні, години, хвилини і секунди
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Оновлення інтерфейсу таймера
        updateTimerUI(days, hours, minutes, seconds);
    }, 1000); // Кожну секунду
});

function updateTimerUI(days, hours, minutes, seconds) {
    // Оновлення значень елементів інтерфейсу з відповідними класами
    document.querySelector('[data-days]').textContent = formatTimeUnit(days);
    document.querySelector('[data-hours]').textContent = formatTimeUnit(hours);
    document.querySelector('[data-minutes]').textContent = formatTimeUnit(minutes);
    document.querySelector('[data-seconds]').textContent = formatTimeUnit(seconds);
}

function formatTimeUnit(unit) {
    // Додавання нуля передоднішніх чисел, якщо вони менші за 10
    return unit < 10 ? `0${unit}` : unit;
}
