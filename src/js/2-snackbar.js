import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();

    const delay = Number(event.target.elements['delay'].value);
    
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
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}
