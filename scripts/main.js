const element = document.getElementById('aboutUs');

const elementOffsetTop = element.offsetTop;



function doSomething() {
   let scroll_pos = window.scrollY;
   const windowHeight = window.innerHeight;
   const elementHeight = element.offsetHeight;

   console.log(window.scrollY);
    if(scroll_pos + windowHeight > element.offsetTop + element.offsetHeight*3/4){
        console.log('Mam Cię!!!');
        window.removeEventListener('scroll', doSomething)
    }
}

window.addEventListener('scroll', doSomething);
