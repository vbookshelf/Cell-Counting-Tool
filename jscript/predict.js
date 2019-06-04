// Code is based on a YouTube tutorial by deeplizard
// https://www.youtube.com/watch?v=HEQDRWMK6yY



// After the model loads we want to make a prediction on the default image.
// Thus, the user will see predictions when the page is first loaded.

function simulateClick(tabID) {
	
	document.getElementById(tabID).click();
}

function predictOnLoad() {
	
	// Simulate a click on the predict button
	setTimeout(simulateClick.bind(null,'predict-button'), 500);
};


$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();
	}
	
		
		let file = $("#image-selector").prop('files')[0];
		reader.readAsDataURL(file);
		
		
		// Simulate a click on the predict button
		// This introduces a 0.5 second delay before the click.
		// Without this long delay the model loads but may not automatically
		// predict.
		setTimeout(simulateClick.bind(null,'predict-button'), 500);

});




let model;
(async function () {
	
	model = await tf.loadModel('http://cellcount.test.woza.work/count_model3/model.json');
	$("#selected-image").attr("src", "http://cellcount.test.woza.work/assets/cell_mask_10.jpg")
	
	
	
	// Hide the model loading spinner
	$('.progress-bar').hide();
	
	// Simulate a click on the predict button
	predictOnLoad();
	
	
})();






$("#predict-button").click(async function () {
	
	
	
	let image = $('#selected-image').get(0);
	
	// ========================================================== //
	// Pre-process the image using Tensorflow.js api. This is not standard Tensorflow.
	// This is tensorflow.js code designed to be used with javascript.
	// https://js.tensorflow.org/api/0.6.1/#slice
	// ========================================================== //
	
	// This is how we print info on tensors to the console:
	// verbose can be left out e.g. tensor.print()
	//const verbose = true;
	//tensor.print(verbose);
	
	let tensor = tf.fromPixels(image) // Tensorflow.js code
	
	// This is chaining.
	// Note the input image is a mask but it has 3 channels.
	.resizeNearestNeighbor([128,128]) // Tensorflow.js code
	
	//.toFloat()
	//.div(tf.scalar(255.0))
	.expandDims(); // Tensorflow.js code
	
	
	
	
	// Pass the tensor to the model and call predict on it.
	// Predict returns a tensor.
	// data() loads the values of the output tensor and returns
	// a promise of a typed array when the computation is complete.
	// Notice the await and async keywords are used together.
	
	// ========================================================== //
	// Note that after predict is completed we are working with
	// a javascript array and not a tensor.
	// ========================================================== //
	
	// make a prediction
	let predictions = await model.predict(tensor).data();
	
	// convert predictions to a javascript array
	var preds = Array.from(predictions); // JS Code with js array
	
	console.log('count_model3');
	
	console.log(predictions);
	console.log(preds);
	
	// choose the first item in the list
	var num = preds[0]; // JS Code with js array
	
	// round the result
	num = num.toFixed(0); // JS Code with js array
	
	// This is how we print info on Javascript variables 
	// to the console:
	//console.log(num.toFixed(0));
	//console.log(Array.from(predictions));
	
// clear the existing predictions from the webpage
$("#prediction-list").empty();

// write the result to the webpage
$("#prediction-list").append(`<li>Cell Count: ${num}</li>`);


	
	
});









