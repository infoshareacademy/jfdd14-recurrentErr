let slider = document.getElementById("myRange"); //getting the number of peeps
let people = document.getElementById("people"); // 
updatePeeps(); //gets number of peeps from slider value
let totalPrice = document.getElementById("cena"); // Tekst z info o ceną
let fifty = document.getElementById("discount50"); // checkbox1
let five = document.getElementById("discount5");   // checkbox2

function getTotalPrice() { //getting price from

    let basePrices = [0, 39.99, 49.99, 59.99, 59.99];
    let basePrice = basePrices[slider.value];
    let discount = 0;
    if (fifty.checked === true) {
        discount += (basePrice * 0.5);
    }
    if (five.checked === true) {
        discount += (basePrice * 0.05);
    }
    return basePrice - discount;
}

function updatePrice () {
    totalPrice.innerHTML = `${(getTotalPrice()).toFixed(2)} zł`;
}

function updatePeeps (){
     people.innerHTML = slider.value;
    }


slider.addEventListener("change", function () {
  
    updatePrice();
    updatePeeps();
});

fifty.addEventListener("change", () => {
  
    updatePrice();
   
});

five.addEventListener("change", () => {
    updatePrice();
});
