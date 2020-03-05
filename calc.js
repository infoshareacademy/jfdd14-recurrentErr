let slider = document.getElementById("myRange");
let output = document.getElementById("people");
let show = 0; // inicjalizacja z ceną początkową
output.innerHTML = slider.value;
let cena = document.getElementById("cena"); // Tekst z info o ceną
let fifty = document.getElementById("discount50"); // Radio 1
let five = document.getElementById("discount5");   // Radio 2
// let both = document.getElementById("both");       // Radio 3
let discount = 0;
let render = function () {
  cena.innerHTML = "";
}
slider.addEventListener ( "change", function () {
  console.log("input")
  output.innerHTML = slider.value;
  
  if (slider.value == 0) {
    cena.innerHTML = "Proszę wybrać liczbę abonentów";
  }
  else if (slider.value == 1 ) {
    show = 39.99; // nowa cena, w postaci liczbowej
  }
  else if (slider.value == 2) {
    show = 49.99;
  }
  else if (slider.value == 3 || slider.value == 4) {
    show = 59.99;
  }
  cena.innerHTML = `${show-discount} zł`;
});
five.addEventListener("change",()=>{ // inny event listener dla checkboxa
  if(five.checked===true && fifty.checked===false){
    discount += (0.05*show).toFixed(2);
   
  }
  else if(five.checked===true && fifty.checked===true){
      discount += (0.55*show).toFixed(2);
  }
  if(five.checked===false){
    discount = 0;
  }
  cena.innerHTML = `${show-discount} zł`;
});
fifty.addEventListener("change",()=>{
  if(fifty.checked===true && five.checked===false){
    discount += (0.5*show).toFixed(2);
  }
  else if(fifty.checked===true && five.checked===true){
    discount += (0.55*show).toFixed(2);
  }
  if(fifty.checked===false){
    discount = 0;
  }
  cena.innerHTML = `${show-discount} zł`;
  console.log(discount);
});
