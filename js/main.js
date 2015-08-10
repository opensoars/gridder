var content_size = document.getElementById('content_size'),
    box_count = document.getElementById('box_count'),
    space_between = document.getElementById('space_between'),
    container_padding = document.getElementById('container_padding');
  
var calculate_btn = document.getElementById('calculate_btn');


function calculate(evt) {
  console.log(evt);
}


calculate_btn.addEventListener('click', calculate);




function fixtures() {
  content_size.value = '1170';
  box_count.value = 3;
  space_between.value = 50;
  container_padding.value = 25;
}

fixtures();