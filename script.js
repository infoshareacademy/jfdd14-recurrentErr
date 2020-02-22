const aboutUs = document.getElementById('aboutUs');
const aboutUsCards = document.querySelectorAll('.aboutUs__card');

function scrollAboutUs() {
   let scroll_pos = window.scrollY;
   const windowHeight = window.innerHeight;

    if(scroll_pos + windowHeight > aboutUs.offsetTop + aboutUs.offsetHeight*1/2){
        aboutUsCards.forEach(element=>element.classList.add('aboutUs__card--animation'));
        window.removeEventListener('scroll', doSomething)
    }
}

window.addEventListener('scroll', scrollAboutUs);

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
            




     