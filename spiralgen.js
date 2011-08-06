
/*

	Spiral Generator
	Andy Green
	http://andygrn.co.uk
	August 2011

*/

var canvas,
	pen,
	parameter_inputs = [];

function init()
{

	var detect_feature = document.createElement('input');
	detect_feature.setAttribute('type', 'range');
	
	if (detect_feature.type !== 'range')
	{
		
		document.getElementById('compatibility-message').style.display = 'block';
		
	}
	
	canvas = document.getElementById('canvas');
	pen = canvas.getContext('2d');
	
	parameter_input_ids = [
		'param-spiral-sharpness',
		'param-spiral-length',
		'param-spiral-inner-radius',
		'param-spiral-outer-radius',
		'param-spiral-spread',
		'param-line-initial-opacity',
		'param-line-fade-amount',
		'param-line-thickness'
	];
	
	for (var i in parameter_input_ids)
	{
	
		parameter_inputs[i] = document.getElementById(parameter_input_ids[i]);
	
	}
	
	initUI();
	prepareDraw();

}

function initUI()
{

	document.getElementById('control-draw').addEventListener('click', prepareDraw, false);
	document.getElementById('control-save').addEventListener('click', saveCanvas, false);
	document.getElementById('control-clear').addEventListener('click', clearCanvas, false);

	for (var i in parameter_inputs)
	{

		document.getElementById(parameter_inputs[i].id + '-value').innerHTML = parameter_inputs[i].value;

		parameter_inputs[i].addEventListener('input', function(){
		
			var readout = document.getElementById(this.id + '-value');
			readout.innerHTML = this.value;
			
		}, false);
		
	}

}

function prepareDraw()
{

	var values = [],
		centre_x = canvas.width / 2,
		centre_y = canvas.height / 2;
	
	for (var i in parameter_inputs)
	{
		
		values[i] = parseInt(parameter_inputs[i].value);
		
	}

	drawSpiral(
		[ centre_x , centre_y ],
		values[0],
		values[1],
		values[2] * 10,
		values[3] / 10,
		(values[4] / 1000) + 1,
		values[5] / 10,
		values[6] / 1000,
		values[7]
	);

}

function drawSpiral(centre, sharpness, length, inner_radius, outer_radius, spread, initial_opacity, fade_amount, thickness)
{

	var x = (inner_radius * Math.cos(t)) + centre[0],
		y = (inner_radius * Math.sin(t)) + centre[1],
		t = 0;
	
	pen.lineWidth = thickness;
	
	for (var i = 0; i <= length; ++i)
	{

		pen.beginPath();
		pen.moveTo(x, y);
	
		x = (inner_radius * Math.cos(t)) + centre[0];
		y = (inner_radius * Math.sin(t)) + centre[1];

		pen.strokeStyle = 'rgba(0, 0, 0, ' + initial_opacity + ')';
		pen.lineTo(x, y);
		pen.stroke();
	
		t = t + sharpness;
		inner_radius = (inner_radius + outer_radius) * spread;
		initial_opacity -= fade_amount;

	}

}

function clearCanvas()
{

	pen.clearRect(0, 0, canvas.width, canvas.height);

}

function saveCanvas()
{

	var image_data = canvas.toDataURL('image/png');

//	image_data = image_data.replace('image/png', 'application/octet-stream');

	document.location.href = image_data;

}
