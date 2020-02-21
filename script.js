document.addEventListener('DOMContentLoaded', function () {
    const cookieAlert = document.querySelector('#cookieAlert');
    const closeBtn = document.querySelector('.close')

    if (!localStorage.getItem('cookieAlert')) {
    cookieAlert.classList.remove('hidden');
    }
    closeBtn.addEventListener('click', function (event) {
            event.preventDefault();
            cookieAlert.classList.add('hidden');
            localStorage.setItem('cookieAlert', true);
    })});
            




     