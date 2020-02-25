let slider = document.getElementById("myRange");
let output = document.getElementById("people");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
};

