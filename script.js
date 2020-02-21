document.addEventListener('DOMContentLoaded', function () {
    const cookieAlert = document.getElementById('cookieAlert');

    if (!localStorage.getItem('cookieAlert')) {
    cookieAlert.classList.remove('hidden');
    }

    cookieAlert.addEventListener('click', function (event) {
         let target = event.target;

        if (target.tagName === 'A' && target.classList.contains('close')) {
            event.preventDefault();
            cookieAlert.classList.add('hidden');
            localStorage.setItem('cookieAlert', true);
            }
        });
    }
);
