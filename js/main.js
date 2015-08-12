/**
 * ! WARNING !
 * UGLY CODE, 15 min project
 * ! WARNING !
 */

var key_map = {
  up: 38,
  down: 40
}

// Inputs
var content_size_input = document.getElementById('content_size'),
    box_count_input = document.getElementById('box_count'),
    space_between_input = document.getElementById('space_between'),
    container_padding_input = document.getElementById('container_padding'),
    border_box_input = document.getElementById('border_box');

// Outputs
var results_container = document.getElementById('results_container');

var space_between_reduction_output =
      document.getElementById('space_between_reduction_output');
    container_padding_reduction_output =
      document.getElementById('container_padding_reduction_output');
    remaining_content_size_output =
      document.getElementById('remaining_content_size_output');
    box_size_output = document.getElementById('box_size_output');


function calculate(data) {
  var content_size = data.content_size || 0,
      box_count = data.box_count || 0,
      space_between = data.space_between || 0,
      container_padding = data.container_padding || 0;

  var space_between_reduction = (space_between * (box_count - 1)),
      container_padding_reduction = border_box_input.checked
        ? 0 : container_padding * 2,
      total_reduction = space_between_reduction + container_padding_reduction;

  var padding_reduction = border_box_input.checked
    ? 0
    : (container_padding * 2) * box_count;

  var remaining_content_size = content_size - space_between_reduction - padding_reduction;

  var box_size = remaining_content_size / box_count;

  return {
    space_between_reduction: space_between_reduction,
    container_padding_reduction: padding_reduction,
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

function fillResults(res) {
  space_between_reduction_output.value = res.space_between_reduction;
  container_padding_reduction_output.value = res.container_padding_reduction;
  remaining_content_size_output.value = res.remaining_content_size;
  box_size_output.value = res.box_size;
}


function setFixtures() {
  content_size.value = '1170';
  box_count.value = 4;
  space_between.value = 50;
  container_padding.value = 25;
}

function handleKeydown(evt) {

  if (evt.which === key_map.up) {
    evt.target.value += 1;
  }
  else if (evt.which === key_map.down) {
    evt.target.value -= 1;
  }

}


function init() {
  content_size_input.addEventListener('keyup', callCalculate);
  box_count_input.addEventListener('keyup', callCalculate);
  space_between_input.addEventListener('keyup', callCalculate);
  container_padding_input.addEventListener('keyup', callCalculate);

  content_size_input.addEventListener('keydown', handleKeydown);
  box_count_input.addEventListener('keydown', handleKeydown);
  space_between_input.addEventListener('keydown', handleKeydown);
  container_padding_input.addEventListener('keydown', handleKeydown);



  border_box_input.addEventListener('click', callCalculate);

  setFixtures();
  content_size_input.focus();
  callCalculate();
}


init();