let slider = document.getElementById("myRange");
let output = document.getElementById("people");
output.innerHTML = slider.value;
let cena = document.getElementById("cena");
let show;
let five = document.getElementById("discount5");
let fifty = document.getElementById("discount50");
let newCenka = document.getElementById("cena");
let newCenusia = document.getElementById("cena");


slider.addEventListener ( "change", function () {
console.log("input")
  output.innerHTML = slider.value;
  let show;
  if (slider.value == 0) {
    show = "Proszę wybrać liczbę abonentów";
  }
  else if (slider.value == 1 ) {
    show = "39.99 zł";
  }
  else if (slider.value == 2) {
    show = "49.99 zł";
  }
  else if (slider.value == 3) {
    show = "59.99 zł";
  }
  else if (slider.value == 4) {
    show = "59.99 zł";
  }
  else show = "Nie ma takiej opcji."
  cena.innerHTML = `${show}`;
  
   
}
);
five.addEventListener ('change',() => {

  console.log("click")
  // let newCenka = document.getElementById("cena");
  let newCena;
  if (slider.value == 1)  {
    
    newCena = "nowa cena 5% mniej, czyli 37.99 zł";
  }
  else if (slider.value == 2) {
   newCena = "nowa cena 5% mniej, czyli 47.49 zł";
  }
  else if (slider.value == 3 || slider.value == 4 ) {
        
    newCena = "nowa cena 5% mniej, czyli 56.99 zł";
  }
    newCenka.innerHTML = `${newCena}`;
    console.log(newCena);
 
});

fifty.addEventListener ('change',() => {

  console.log("click")
  
  
  // let newCenusia = document.getElementById("cena");
  let cenka;
  if (slider.value == 1)  {
    
    cenka = "Nowa cena 50% mniej, czyli 19.99 zł";
  }
  else if (slider.value == 2) {
    cenka = "Nowa cena 50% mniej, czyli 24.99 zł";
  }
  else if (slider.value == 3 || slider.value == 4 ) {
        
    cenka = "Nowa cena 50% mniej, czyli 29.99 zł";
  }
    newCenusia.innerHTML = `${cenka}`;
    console.log(cenka);
 
});



// num.addEventListener("input", () => {
//   function newPromise(value){


//       return new Promise((resolve, reject) => {
//           if (value > 0) {
//               resolve ((value*value)*-1) //tak można dostać minus infinity
//           }
//           else reject ("Value is less than 0 can't perform this operation")
//       })
//   }

//   newPromise(num.value)
//   .then( x => {
//       result.innerHTML =`Result = ` + x;
//    console.log(x)
//   })
//    .catch (x => {
//       result.innerHTML =`Result = ` + x;
//       console.log(x)
//   })

// });
