const aboutUs = document.getElementById('aboutUs');
const aboutUsCards = document.querySelectorAll('.aboutUs__card');

function scrollAboutUs() {
   let scroll_pos = window.scrollY;
   const windowHeight = window.innerHeight;

    if(scroll_pos + windowHeight > aboutUs.offsetTop + aboutUs.offsetHeight*1/2){
        aboutUsCards.forEach(element=>element.classList.add('aboutUs__card--animation'));
        window.removeEventListener('scroll', scrollAboutUs);
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
 
    (function() {

        const sectionsEl = document.querySelectorAll(".scrollspy");
        const sections = {};
        
        sectionsEl.forEach(function(element) {
          sections[element.id] = element.offsetTop;
        });
      
        window.onscroll = function() {
          const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
          for (let i in sections) {
            if (sections[i] <= scrollPosition + 300) {
              document.querySelector('.active').setAttribute('class', 'nav');
              document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
            }
          }
        };
      })();


     