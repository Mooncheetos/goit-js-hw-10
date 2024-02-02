import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.getElementById('promise-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Отримання значення затримки та перетворення його на число
    const delay = Number(event.target.elements['delay'].value);
    
    // Отримання обраного значення стану
    const state = document.querySelector('input[name="state"]:checked').value;

    createPromise(delay, state)
        .then(() => {
            iziToast.success({ 
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms` 
            });
        })
        .catch(() => {
            iziToast.error({ 
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms` 
            });
        });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve();
            } else {
                reject();
            }
        }, delay);
    });
}