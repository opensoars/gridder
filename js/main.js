var content_size_input = document.getElementById('content_size'),
    box_count_input = document.getElementById('box_count'),
    space_between_input = document.getElementById('space_between'),
    container_padding_input = document.getElementById('container_padding');
  
var calculate_btn = document.getElementById('calculate_btn');

var results = document.getElementById('results');

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

function onCalculateClick(evt) {
  var results = calculate({
    content_size: content_size_input.value,
    box_count: box_count_input.value,
    space_between: space_between_input.value,
    container_padding: container_padding_input.value
  });

  console.log(results);

}

calculate_btn.addEventListener('click', onCalculateClick);




function setFixtures() {
  content_size.value = '1170';
  box_count.value = 3;
  space_between.value = 50;
  container_padding.value = 25;
}

setFixtures();


content_size_input.focus();