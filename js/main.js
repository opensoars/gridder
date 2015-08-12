/**
 * ! WARNING !
 * UGLY CODE, 15 min project
 * ! WARNING !
 */

var key_map = {
  up: 38,
  down: 40
}

// Helpers
function getEl(id) {
  return document.getElementById(id);
}

// Inputs
var content_size_input = getEl('content_size'),
    box_count_input = getEl('box_count'),
    space_between_input = getEl('space_between'),
    container_padding_input = getEl('container_padding'),
    border_box_input = getEl('border_box');

// Outputs
var results_container = getEl('results_container');

var space_between_reduction_output = getEl('space_between_reduction_output');
    container_padding_reduction_output = getEl('container_padding_reduction_output');
    remaining_content_size_output = getEl('remaining_content_size_output');
    box_size_output = getEl('box_size_output');

// Buttons
var preview_btn = getEl('preview_btn'),
    close_preview_btn = getEl('close_preview_btn');

// Etc
var preview_layer = getEl('preview_layer'),
    preview_layer_content = getEl('preview_layer_content');

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
    evt.target.value = parseFloat(evt.target.value) + 1;
  }
  else if (evt.which === key_map.down) {
    evt.target.value = parseFloat(evt.target.value) - 1;
  }

  evt.preventDefault();
}

function getPreviewHtml(data) {

  var html = "";

  var box_count = data.box_count,
      box_size = data.res.box_size,
      space_between = data.space_between,
      padding = data.padding;

  html += "<div class='preview' style='margin:0 auto;width: \
    " + data.content_size + "px;height:100%;background:rgb(245, 245, 245);'> \
  ";


  for (var i = 1; i <= box_count; i++) {
    html += "<div style='width:" + box_size + "px; padding:" + padding + "px;' \
      id='box" + i + "' class='box'>";

    html += "<div class='inner' style='height: " + (window.innerHeight - (padding*2)) + "px;'>" + i + "</div>"

    // /box
    html += "</div>";

    if (i < box_count) {
      console.log(i);
      html += "<div class='gutter' style='width:" + space_between + "px;'></div>";
    }
  }


  // /container
  html += "</div>";

  console.log(data);
  return html;
}

function showPreview() {
  preview_layer_content.innerHTML = getPreviewHtml({

    box_count: box_count_input.value,
    content_size: content_size_input.value,
    space_between: space_between_input.value,
    border_box: border_box_input.checked,
    padding: container_padding_input.value,
    res: {
      space_between_reduction: space_between_reduction_output.value,
      container_padding_reduction: container_padding_reduction_output.value,
      remaining_content_size: remaining_content_size_output.value,
      box_size: box_size_output.value
    }    
  });

  document.body.style.overflowY = 'hidden';

  preview_layer.style.display = 'block';
}

function closePreview() {
  document.body.style.overflowY = 'auto';
  preview_layer.style.display = 'none';
}

window.addEventListener('resize', function (evt) {
  if (preview_layer.style.display === 'block') {
    showPreview();
  }
});


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

  preview_btn.addEventListener('click', showPreview);
  close_preview_btn.addEventListener('click', closePreview);


  setFixtures();
  content_size_input.focus();
  callCalculate();
}


init();