var content_size_input = document.getElementById('content_size'),
    box_count_input = document.getElementById('box_count'),
    space_between_input = document.getElementById('space_between'),
    container_padding_input = document.getElementById('container_padding');

var space_between_reduction_output =
      document.getElementById('space_between_reduction_output');
    container_padding_reduction_output =
      document.getElementById('container_padding_reduction_output');
    remaining_content_size_output =
      document.getElementById('remaining_content_size_output');
    box_size_output = document.getElementById('box_size_output');

  
var calculate_btn = document.getElementById('calculate_btn');

var results_container = document.getElementById('results_container');

function calculate(data) {
  var content_size = data.content_size || 0,
      box_count = data.box_count || 0,
      space_between = data.space_between || 0,
      container_padding = data.container_padding || 0;

  var space_between_reduction = (space_between * (box_count - 1)),
      container_padding_reduction = container_padding * 2,
      total_reduction = space_between_reduction + container_padding_reduction;

  var remaining_content_size = content_size - total_reduction;

  var box_size = remaining_content_size / box_count;

  return {
    space_between_reduction: space_between_reduction,
    container_padding_reduction: container_padding_reduction,
    remaining_content_size: remaining_content_size,
    box_size: box_size
  };
}

function callCalculate(evt) {
  fillResults(calculate({
    content_size: content_size_input.value,
    box_count: box_count_input.value,
    space_between: space_between_input.value,
    container_padding: container_padding_input.value
  }));
}

content_size_input.addEventListener('keyup', callCalculate);
box_count_input.addEventListener('keyup', callCalculate);
space_between_input.addEventListener('keyup', callCalculate);
container_padding_input.addEventListener('keyup', callCalculate);

calculate_btn.addEventListener('click', callCalculate);

function fillResults(res) {
  space_between_reduction_output.value = res.space_between_reduction;
  container_padding_reduction_output.value = res.container_padding_reduction;
  remaining_content_size_output.value = res.remaining_content_size;
  box_size_output.value = res.box_size;

  console.log(res);
}


function setFixtures() {
  content_size.value = '1170';
  box_count.value = 3;
  space_between.value = 50;
  container_padding.value = 25;
}

setFixtures();


content_size_input.focus();