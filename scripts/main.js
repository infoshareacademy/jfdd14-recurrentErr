const element = document.getElementById('aboutUs');
const elementHeight = element.offsetHeight;
const elementOffsetTop = element.offsetTop;

let last_known_scroll_position = 0;
let ticking = false;

function doSomething(scroll_pos) {
    if(scroll_pos>500){
        console.log('Mam Cię!!!');
    }
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});
