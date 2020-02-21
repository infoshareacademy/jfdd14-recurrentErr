const element = document.getElementById('aboutUs');
const aboutUsCards = document.querySelectorAll('.aboutUs__card');


function doSomething() {
   let scroll_pos = window.scrollY;
   const windowHeight = window.innerHeight;
   const elementHeight = element.offsetHeight;

    if(scroll_pos + windowHeight > element.offsetTop + element.offsetHeight*1/2){
        console.log('Mam Cię!!!');
        aboutUsCards.forEach(element=>element.classList.add('aboutUs__card--animation'));
        window.removeEventListener('scroll', doSomething)
    }
}

window.addEventListener('scroll', doSomething);
