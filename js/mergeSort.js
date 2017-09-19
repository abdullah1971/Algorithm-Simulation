/*=================================================================================
=            take input, varify and show it in container & simulate it            =
===================================================================================*/



/*----------  global variables  ----------*/
const MAXVAL = 10;

var errorMessage;
var inputDigits = [];
var initialInputDigits = [];
var positionArray = [];
var controlStripe = [];


/*----------  global variable for simulation control  ----------*/
var controlIndex = 0;
var direction = "next";
var paused = false;
var previousClass = ".bubble-sort-take-input";
var id;
var selectionColor = 1;
var mergePosition;
var currentWorkingChunkIndexes = [];
var currentWorkingChunk = [];
var currentFinalMergedArray = [];

var firstColumnColor, secondColumnColor;

var interval = 1000;









/*----------  function section  ----------*/


/**
 *	check input string if it contains only digits 
 * 
 *	@param string
 *	@return boolean
 */

function isAllAreDigits(input) {
	
	var len = input.length;

	var i, j;

	for(i = 0; i < len; i++){

		if(isNaN( input[i] ) ){

			errorMessage = "Input must contains only digits, Please try again";

			return false;
		}
		// else if(input[i] === "0"){

		// 	errorMessage = "Input value must be non-zero, Please try again";

		// 	return false;
		// }
	}

	return true;
}





/**
 *	check if input value excced maximum limit and non-zero
 * 
 *
 *	@param null
 *	@return boolean
 */

function isLessThanMaxValuePlusNonZero() {
	
	var len = inputDigits.length;

	var i, j;

	for(i = 0; i < len; i++){

		if(inputDigits[i] > MAXVAL){

			errorMessage = "Maximum value limit exccded, Please try again";

			return false
		}

		if(inputDigits[i] == 0){

			errorMessage = "Input value must be non-zero, Please try again";

			return false;
		}
	}

	return true;
}





/**
 *	validate input from user.
 	if validation passes convert string to digits array and return true
 	else create error message & return false
 * 
 *	@param string
 *	@return boolean
 */

function validateInput(input) {
	
	/*----------  check if string contains only digits, space & non-zero value  ----------*/
	
	if(isAllAreDigits(input)){

		input.trim(); 

		/*----------  remove intermediate spaces  ----------*/
		
		input = input.replace(/\s+/g,' ').trim();

		inputDigits = input.split(" ");


		/*----------  check maximum value limit  ----------*/
		
		if( !isLessThanMaxValuePlusNonZero() ){

			return false;
		}


		/*----------  check input length  ----------*/
		
		if(inputDigits.length > 10){

			errorMessage = "Numbers exceed maximum limit, Please try again";

			return false;
		}




		return true;
	}

	return false;
}





/**
 *	draw colum according to user input
 * 
 *
 *	@param null
 *	@return null
 */			

function drawColumns() {
	
	var colNum = inputDigits.length;
	var firstHalf,secondHalf,thirdHalf,fourthHalf;


	firstHalf = "<div class='col' id=";
	secondHalf = "><p class='para' id='colVal";
	thirdHalf = "</p></div>";

	var columnHtml,finalText = "";
	

	for(i = 0; i < colNum; i++){

		inputDigits[i] = parseInt(inputDigits[i]);

		columnHtml = firstHalf + "\"colNum" + (i + 1) + "\"" + secondHalf + (i + 1) + "\'>" + inputDigits[i] + thirdHalf + "<br>";

		finalText = finalText + columnHtml;

	}

	$("#visualization").html(finalText);
}





/**
 *	add necessary css for the created columns
 * 
 *
 *	@param null
 *	@return null
 */


function addNecessaryCss() {

	var i, j, maxValue, width, height, leftValue = 25, topValue;
	var backgroundColor, marginTop, columnColor = 000000, len;
	var temp, columnId;

	len = inputDigits.length;

	maxValue = Math.max.apply(Math, inputDigits);

	for(i = 0; i < len; i++){

		columnId = "#colNum" + (i + 1);

		/*  width  */
		width = 40;

		/*  height  */
		height = inputDigits[i] * 20;


		/*  left value  */
		leftValue = leftValue + 70;


		/*  top value  */
		topValue = 215 - height;


		/*  background color  */
		backgroundColor = Math.ceil( Math.random() * 100000 ) + 111111 + i + 1;


		/*  margin top  */
		if( inputDigits[i] == 1){

			marginTop = -8;
		}
		else{

			marginTop = (inputDigits[i] - 2) * 20;
		}


		/*  assign the calculated value  */

		$(columnId).css({

			'width': width + 'px',
			'height': height + 'px',
			'left': leftValue + 'px',
			'top': topValue + 'px',
			'background-color': '#' + backgroundColor,
			// 
			
		});

		$('#colVal' + (i + 1)).css('margin-top', marginTop + 'px');

	}


}




/**
 *	create position array by the value of column's left value
 * 
 *
 *	@param null
 *	@return null
 */


function createPositionArray() {
	
	var i, j, len;

	len = inputDigits.length;

	positionArray[1] = 95;

	for(i = 2; i <= len; i++){

		positionArray[i] = positionArray[i - 1] + 70;
	}
}




/**
 *	createInitialInputDigitsArray function body
 * 
 *
 *	@param null
 *	@return null
 */

 function createInitialInputDigitsArray(){

 	var i;

 	var len = inputDigits.length;

 	for(i = 0; i < len; i++){

 		initialInputDigits.push(inputDigits[i]);
 	}
 }



/**
 *	function for mergeing elements of two array
 * 
 *
 *	@param start , end and mid point
 *	@return null
 */


 function merge(low, high, mid){

 	var i, j, k, temp = [], track = [], index;

 	i = low;
 	k = low;  // this is for temp array
 	j = mid + 1;

 	controlStripe.push('first-merge-try');

 	console.log("start " + inputDigits);

 	markArrayAsNotVisited(currentWorkingChunk, low, high, 0);


 	// for first merge try	
 	while(i <= mid && j <= high){

 		controlStripe.push('take-i');

 		if(inputDigits[i] < inputDigits[j]){

 			controlStripe.push('yes-i');

 			index = findColumId(initialInputDigits, inputDigits[i], low, high);
 			controlStripe.push(index);

 			temp[k] = inputDigits[i];
 			track[k] = i;
 			console.log("index " + index);

 			k++;
 			i++;


 		}
 		else{

 			controlStripe.push('take-j');
 			controlStripe.push('yes-j');

 			index = findColumId(initialInputDigits, inputDigits[j], low, high);
 			controlStripe.push(index);

 			temp[k] = inputDigits[j];
 			track[k] = j;
 			console.log("index " + index);

 			k++;
 			j++;
 		}

 		controlStripe.push('first-merge-try');
 	}

 	controlStripe.push('first-merge-try-end');
 	// controlStripe.push('first array left');

 	// for first array if any element left behind
 	while(i <= mid){

 		controlStripe.push('take first array left');
 		controlStripe.push('first array left');

 		index = findColumId(initialInputDigits, inputDigits[i], low, high);
 		controlStripe.push(index);

 		temp[k] = inputDigits[i];
 		track[k] = i;
 		console.log("index " + index);

 		i++;
 		k++;
 	}

 	controlStripe.push('first array left end');
 	// controlStripe.push('second array left');

 	// for second array if any element left behind
 	while(j <= high){

 		controlStripe.push('take second array left');
 		controlStripe.push('second array left');

 		index = findColumId(initialInputDigits, inputDigits[j], low, high);
 		controlStripe.push(index);

 		temp[k] = inputDigits[j];
 		track[k] = j;
 		console.log("index " + index);

 		j++;
 		k++;
 	}

 	controlStripe.push('second array left end');
 	controlStripe.push(track);
 	// controlStripe.push('create final array');

 	// for replacing temp array to original array
 	for(i = low; i < k; i++){

 		controlStripe.push('take final array');
 		controlStripe.push('create final array');

 		inputDigits[i] = temp[i];
 	}

 	console.log("end");
 	controlStripe.push('merge-end');

 }



/**
 *	function for merge sort
 * 
 *
 *	@param start point, end point
 *	@return null
 */

 function mergeSort(low, high){

 	var mid;

 	controlStripe.push('check low < high');

 	if(low < high){

 		controlStripe.push('calculate mid');
 		mid = Math.floor((low + high) / 2);

 		controlStripe.push('mergeSort-function-first');
 		controlStripe.push([low,mid]);
 		mergeSort(low, mid);

 		controlStripe.push('mergeSort-function-second');
 		controlStripe.push([mid+1,high]);
 		controlStripe.push("mergeSort-function");
 		mergeSort(mid+1, high);

 		controlStripe.push('merge-start');
 		controlStripe.push('merge-function');
 		controlStripe.push([low,high,mid]);
 		merge(low, high, mid);

 	}

 	return;
 }


/**
 *	mark the range of array as not visited
 * 
 *
 *	@param array, range, value
 *	@return null
 */
 function markArrayAsNotVisited(array, low, high, value){

 	for(var i = low; i <= high; i++){

 		array[i] = value;
 	}
 }





 /**
  *	findColumId function body, find column id by using value from initialInputDigits array
  * 
  *
  *	@param column value
  *	@return column id
  */	

  function findColumId(array, value, low, high){


  	var i, len;

  	// len = initialInputDigits.length;

  	for(i = low; i <= high; i++){

  		if(value == array[i] && currentWorkingChunk[i] == 0){

  			currentWorkingChunk[i] = 1;

  			return i;
  		}
  	}

  }




/**
*	work on control stripe. when called, move to next step of
	control stripe and do necessary changes
* 
*
*	@param null
*	@return null
*/

function moveNextStep(){

	if (paused === true) {

      clearInterval(id);
      
    }


	controlIndex++;

	console.log(controlIndex);

	var controlInstruction = controlStripe[controlIndex];

	if(controlInstruction == "mergeSort-function-start"){


		$(previousClass).removeClass('active');
		$('.first-call-merge-sort').addClass('active');

		previousClass = ".first-call-merge-sort";

	}
	else if(controlInstruction == "mergeSort-function" || controlInstruction == "mergeSort-function-first" || controlInstruction == "mergeSort-function-second"){


		$(previousClass).removeClass('active');

		if(controlInstruction == "mergeSort-function"){

			$('.mergeSort-function').addClass('active');
			previousClass = ".mergeSort-function";

		}
		else if (controlInstruction == "mergeSort-function-first"){

			$('.merge-sort-function-inside-first').addClass('active');
			previousClass = ".merge-sort-function-inside-first";

		}
		else if (controlInstruction == "mergeSort-function-second") {

			$('.merge-sort-function-inside-second').addClass('active');
			previousClass = ".merge-sort-function-inside-second";

		}
		

		/*----------  color the selected columns  ----------*/
		var i, columnId;
		var range = [];

		range = controlStripe[controlIndex + 1];

		for(i = range[0]; i <= range[1]; i++){

			columnId = "#colNum" + (i + 1);

			if(selectionColor == 0){

				$(columnId).css('background-color', 'green');
				// selectionColor = 1;
			}
			else{

				$(columnId).css('background-color', '#31708f');
				// selectionColor = 0;
			}
		}

		if(selectionColor == 0)
			selectionColor = 1;
		else
			selectionColor = 0;

		if(controlStripe[controlIndex + 1] != "check low < high")
			controlIndex++;

	}
	else if(controlInstruction == "check low < high"){


		$(previousClass).removeClass('active');
		$('.check-low-high').addClass('active');

		previousClass = ".check-low-high";

	}
	else if (controlInstruction == "calculate mid") {


		$(previousClass).removeClass('active');
		$('.calculate-mid').addClass('active');

		previousClass = ".calculate-mid";

	}
	else if(controlInstruction == "merge-start"){


		$(previousClass).removeClass('active');
		$('.merge-function-call').addClass('active');

		previousClass = ".merge-function-call";

	}
	else if(controlInstruction == "merge-function"){



		$(previousClass).removeClass('active');
		$('.merge-function').addClass('active');

		previousClass = ".merge-function";

		/*----------  get all the selected columns and pull them down  ----------*/
		
		var i, topPosition, columnId;

		var columnItems = [];

		columnItems = controlStripe[controlIndex + 1];

		/*----------  to take track where next element will be placed during merging  ----------*/
		mergePosition = columnItems[0];
		currentWorkingChunkIndexes = columnItems;
		// markArrayAsNotVisited(currentWorkingChunk, columnItems[0], columnItems[1], 0);


		for(i = columnItems[0]; i <= columnItems[1]; i++){

			columnId = "#colNum" + (i + 1);

			topPosition = parseInt($(columnId).css('top'),10) + 210;

			$(columnId).animate({'top': topPosition}, interval+10);
		}

		controlIndex++;
		// controlIndex++;

	}
	else if(controlInstruction == "first-merge-try"){


		$(previousClass).removeClass('active');
		$('.first-merge-try').addClass('active');

		previousClass = ".first-merge-try";


	}
	else if(controlInstruction == "take-i"){


		$(previousClass).removeClass('active');
		$('.take-i').addClass('active');

		previousClass = ".take-i";


	}
	else if(controlInstruction == "yes-i"){


		$(previousClass).removeClass('active');
		$('.yes-i').addClass('active');

		previousClass = ".yes-i";


		/*----------  take this element to the sorted position on previous line  ----------*/

		var columnId, leftValue;

		columnId = "#colNum" + (controlStripe[controlIndex + 1] + 1);

		leftValue = positionArray[mergePosition + 1];

		$(columnId).animate({'left': leftValue, 'top': parseInt($(columnId).css('top'), 10) - 210}, interval+10);

		mergePosition++;

		controlIndex++;


	}
	else if(controlInstruction == "take-j"){


		$(previousClass).removeClass('active');
		$('.take-j').addClass('active');

		previousClass = ".take-j";

	}
	else if(controlInstruction == "yes-j"){



		$(previousClass).removeClass('active');
		$('.yes-j').addClass('active');

		previousClass = ".yes-j";


		/*----------  take this element to the sorted position on previous line  ----------*/

		var columnId, leftValue, topValue;

		columnId = "#colNum" + (controlStripe[controlIndex + 1] + 1);

		leftValue = positionArray[mergePosition + 1];

		topValue = $(columnId).css('top');

		topValue = parseInt($(columnId).css('top'),10) - 210;

		$(columnId).animate({'left': leftValue, 'top': topValue}, interval+10);

		mergePosition++;

		controlIndex++;


	}
	else if(controlInstruction == "first-merge-try-end"){



		$(previousClass).removeClass('active');
		$('.first-array-left').addClass('active');

		previousClass = ".first-array-left";

	}
	else if(controlInstruction == "first array left"){



		$(previousClass).removeClass('active');
		$('.first-array-left').addClass('active');

		previousClass = ".first-array-left";


		/*----------  take this element to the sorted position on previous line  ----------*/

		if(controlStripe[controlIndex + 1] != "take first array left"){


			var columnId, leftValue, topValue;

			columnId = "#colNum" + (controlStripe[controlIndex + 1] + 1);

			leftValue = positionArray[mergePosition + 1];

			topValue = $(columnId).css('top');

			topValue = parseInt($(columnId).css('top'),10) - 210;

			$(columnId).animate({'left': leftValue, 'top': topValue}, interval+10);

			mergePosition++;

			controlIndex++;

		}




	}
	else if(controlInstruction == "take first array left"){


		
		$(previousClass).removeClass('active');
		$('.take-first-array-left').addClass('active');

		previousClass = ".take-first-array-left";


	}
	else if(controlInstruction == "first array left end"){


		
		$(previousClass).removeClass('active');
		$('.second-array-left').addClass('active');

		previousClass = ".second-array-left";

	}
	else if(controlInstruction == "second array left"){



		$(previousClass).removeClass('active');
		$('.take-second-array-left').addClass('active');

		previousClass = ".take-second-array-left";


		/*----------  take this element to the sorted position on previous line  ----------*/

		var columnId, leftValue, topValue;

		columnId = "#colNum" + (controlStripe[controlIndex + 1] + 1);

		leftValue = positionArray[mergePosition + 1];

		topValue = $(columnId).css('top');

		topValue = parseInt($(columnId).css('top'),10) - 210;

		$(columnId).animate({'left': leftValue, 'top': topValue}, interval+10);

		mergePosition++;

		if(controlStripe[controlIndex + 1] != "second array left end")
			controlIndex++;


	}
	else if(controlInstruction == "second array left end" || controlInstruction == "create final array"){


		/*----------  to get the index where merge started  ----------*/
		if(controlInstruction == "second array left end"){

			mergePosition = currentWorkingChunkIndexes[0];
			currentFinalMergedArray = controlStripe[controlIndex + 1]; 

			controlIndex++;
		}
		


		$(previousClass).removeClass('active');
		$('.create-final-array').addClass('active');

		previousClass = ".create-final-array";

	}
	else if(controlInstruction == "take final array"){


		$(previousClass).removeClass('active');
		$('.take-final-array').addClass('active');

		previousClass = ".take-final-array";

		/*----------  change the color of coping element  ----------*/
		var columnId;

		columnId = "#colNum" + (currentFinalMergedArray[mergePosition] + 1);

		$(columnId).css('background-color', '#9c8358');

		mergePosition++;


	}
	else if(controlInstruction == "merge-end"){

		if(controlStripe[controlIndex + 1] == "mergeSort-function-second"){


			$(previousClass).removeClass('active');
			$('.merge-sort-function-inside-second').addClass('active');

			previousClass = ".merge-sort-function-inside-second";

		}
		else if(controlStripe[controlIndex + 1] == "mergeSort-end"){

			$(previousClass).removeClass('active');

			controlIndex++;
			// controlIndex++;
			alert('your are in last step');
		}
	}
}



/**
 *	movePreviousStep function body
 * 
 *
 *	@param null
 *	@return null
 */

 function movePreviousStep(){

 	//controlIndex--;

 	console.log(controlIndex);

 	var controlInstruction = controlStripe[controlIndex];

 	if(controlInstruction == "mergeSort-start"){

 		alert('You are in first step');

 		// controlIndex++;

 	}
 	else if(controlInstruction == "mergeSort-function-start"){

 		
 		$(previousClass).removeClass('active');
 		$('.take-input').addClass('active');

 		previousClass = ".take-input";

 		controlIndex--;
 	}
 	else if(controlInstruction == "mergeSort-function"){


		$(previousClass).removeClass('active');

		var previousControlInstruction = controlStripe[controlIndex - 1];

		if(previousControlInstruction == "mergeSort-function-start"){

			$('.first-call-merge-sort').addClass('active');

			previousClass = ".first-call-merge-sort";

			controlIndex--;
		}
		else if(Array.isArray(previousControlInstruction)){

			console.log(previousControlInstruction);

			$('.merge-sort-function-inside-second').addClass('active');

			previousClass = ".merge-sort-function-inside-second";

			controlIndex--;
			
		}
		

	}
 }



/*----------  jquery part  ----------*/
$(document).ready(function() {
	

	/*----------  make empty input field before user see it  ----------*/
	
	$("#input-button").on('click', function() {
		
		$("#userInput").val('');

	});




	/*----------  take input from user by modal  ----------*/
	
	$("#submit-input-on-modal").click(function() {

		/*----------  reset control stripe & related values  ----------*/
		
		controlIndex = 0;
		direction = "next";
		pause = true;
		previousClass = ".take-input";
		controlStripe = [];
		
		var input = $("#userInput").val();

		if(validateInput(input)){

			errorMessage = "";

			/*----------  fill the input container  ----------*/
			
			var text = "Your Inputs :- <br><br>" + inputDigits;

			$("#input-container").html(text);

			/*----------  draw the columns & add css accordingly & create positionArray----------*/

			drawColumns();

			addNecessaryCss();

			createPositionArray();

			createInitialInputDigitsArray();

			/*----------  implement the algorithm in js & create a control stripe  ----------*/
			
			// console.log("before merge sort" + inputDigits);

			controlStripe.push("mergeSort-start");
			controlStripe.push("mergeSort-function-start");

			controlStripe.push("mergeSort-function");
			controlStripe.push([0,inputDigits.length - 1]);

			mergeSort(0, inputDigits.length - 1);

			controlStripe.push('mergeSort-end');


			console.log(controlStripe);



		}
		else{

			$("#input-container").html("");

			alert(errorMessage);
		}
	});


	/*=================================================
	=            simulation part in jquery            =
	=================================================*/
	
			

	/*----------  assign function accordingly  ----------*/

		$("#run").on('click', function() {

			/*----------  prevent user to clicking control buttons before giving input  ----------*/

			var getText = $("#input-container").html().trim();

			if(getText.length == 0){

				errorMessage = "Please fill the input.";

				alert(errorMessage);
			}
			else{

				paused = false;

				id = setInterval(moveNextStep, interval+10);


			}
			

		});



		$("#prev").on('click', function() {

			/*----------  prevent user to clicking control buttons before giving input  ----------*/

			var getText = $("#input-container").html().trim();

			if(getText.length == 0){

				errorMessage = "Please fill the input.";

				alert(errorMessage);
			}
			else{

				movePreviousStep();
			}
			
		});



		$("#pause").on('click', function() {

			/*----------  prevent user to clicking control buttons before giving input  ----------*/

			var getText = $("#input-container").html().trim();

			if(getText.length == 0){

				errorMessage = "Please fill the input.";

				alert(errorMessage);
			}
			else{

				paused = true;
			}
			
		});



		$("#next").on('click', function() {

			/*----------  prevent user to clicking control buttons before giving input  ----------*/

			var getText = $("#input-container").html().trim();

			if(getText.length == 0){

				errorMessage = "Please fill the input.";

				alert(errorMessage);
			}
			else{

				moveNextStep();
			}
			
		});





		$("#interval").on('click', function() {
			
			interval = $("#interval option:selected").val() * 1000;
			
			// console.log(interval);
		});

		



		$("#fullScreen").on('click', function() {

			/*----------  prevent user to clicking control buttons before giving input  ----------*/

			var getText = $("#input-container").html().trim();

			if(getText.length == 0){

				errorMessage = "Please fill the input.";

				alert(errorMessage);
			}
			else{

				
			}
			// fullScreen();
		});


	
	/*=====  End of simulation part in jquery  ======*/
	


});




/*=====  End of take input, varify and show it in container & simulate it  ======*/





