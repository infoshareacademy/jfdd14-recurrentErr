let slider = document.getElementById("myRange");
let output = document.getElementById("people");
output.innerHTML = slider.value;
let cena = document.getElementById("cena");
// cena.innerHTML
let show;

oninput = function () {

  output.innerHTML = slider.value;
  let show;
  // cena.innerHTML = `${show}`;
  console.log("output", slider.value);

  if (slider.value == 0) {

    show = "Proszę wybrać liczbę abonentów";
    console.log(show);
   

  }
  else if (slider.value == 1) {
    show = "39.99 zł";
    console.log(show);
  }
  else if (slider.value == 2) {
    show = "49.99 zł";
    console.log(show);
  }
  else if (slider.value == 3) {
    show = "59.99 zł";
    console.log(show);
  }
  else if (slider.value == 4) {
    show = "59.99 zł";
    console.log(show);
  }
  else show = "Nie ma takiej opcji."

  cena.innerHTML = `${show}`;
};





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
