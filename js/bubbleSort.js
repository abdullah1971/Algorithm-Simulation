/*========================================================================
=            Taking input, varify and show input in container            =
========================================================================*/

/*----------  global variable  ----------*/
const MAXVAL = 15;

var errorMessage;
var inputDigits = [];
var positionArray = [];
var controlStripe = [];

/*----------  global variable for simulation control  ----------*/
var controlIndex = 0;
var direction = "next";
var paused = false;
var previousClass = ".bubble-sort-take-input";
var id;

var firstColumnColor, secondColumnColor;

var interval = 1000;






/*----------  function part  ----------*/


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
 *	remove 0's from inputDigits
 * 
 *
 *	@param null
 *	@return null
 */

function removeZeroValues() {
	

	var removeItem = 0;

	inputDigits = jQuery.grep(inputDigits, function(value) {
	  return value != removeItem;
	});
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
		topValue = 350 - height;


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
 *	swap array element
 * 
 *
 *	@param two elements of an array
 *	@return changed array
 */


Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}




/**
 *	implement bubble sort algorithm &
	create a control stripe
 * 
 *
 *	@param null
 *	@return null
 */


function bubbleSort() {
	
	var i, j, k, len;

	var tempIndex = [];
	var tempDigits = [];
	var trackPosition = [];

	len = inputDigits.length;

	/*----------  this array for keeping record of index  ----------*/
	
	for(i = 0; i < len; i++){

		tempIndex.push(i + 1);
	}


	/*----------  this array for tracking positions  ----------*/
	
	for(i = 0; i < len; i++){

		trackPosition.push(i + 1);
	}


	/*----------  this array for copying inputDigits array  ----------*/
	
	tempDigits = inputDigits;



	controlStripe.push("start");


	controlStripe.push("start i");

	for(i = 0; i < len; i++){


		controlStripe.push("start j");

		for(j = 0; j < len-i-1; j++){

			controlStripe.push("swap check");
			controlStripe.push(trackPosition);

			/*----------  send checking elements for better visualization  ----------*/
			controlStripe.push([j, j+1]);


			if(tempDigits[j] > tempDigits[j + 1]){

				tempDigits.swap(j, j + 1);
				tempIndex.swap(j, j + 1);

				/*----------  create fresh trackPosition array & copy index from
							  tempIndex to prevent js array tracking  ----------*/
				

				trackPosition = [];

				for(k = 0; k < len; k++){

					trackPosition.push(tempIndex[k]);
				}



				controlStripe.push("swap");
				controlStripe.push(trackPosition);

			}

			controlStripe.push("mark j");
		}

		controlStripe.push("mark i");
	}

	controlStripe.push("end"); console.log(controlStripe);
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
 *	work on control stripe. when called, move to previous step of
 	control stripe and do necessary changes
 * 
 *
 *	@param null
 *	@return null
 */


function movePreviousStep() {
	

	var controlInstruction = controlStripe[controlIndex];

	if(controlInstruction == "start i"){

		controlIndex--;

		$(previousClass).removeClass('active');
		$(".bubble-sort-take-input").addClass('active');

		previousClass = ".bubble-sort-take-input";


	}
	else if(controlInstruction == "start j"){

		$(previousClass).removeClass('active');
		$("#bubbleSort-for-i").addClass('active');

		previousClass = "#bubbleSort-for-i";

		controlIndex--;


	}
	else if(Array.isArray(controlInstruction)){

		if(controlStripe[controlIndex - 2] == "swap check"){

			$(previousClass).removeClass('active');
			$("#bubbleSort-for-j").addClass('active');

			previousClass = "#bubbleSort-for-j";

			


			/*----------  set back previos column color  ----------*/
			
			var selected = controlStripe[controlIndex];
			var indexes = controlStripe[controlIndex - 1];

			var first = "#colNum" + indexes[ selected[0] ];
			var second = "#colNum" + indexes[ selected[1] ];

			$(first).css('background-color', firstColumnColor);
			$(second).css('background-color', secondColumnColor);



			controlIndex--;
			controlIndex--;
			controlIndex--;


		}
		else if (controlStripe[controlIndex + 1] == "mark j") {

			$(previousClass).removeClass('active');
			$("#bubbleSort-check-condition").addClass('active');

			previousClass = "#bubbleSort-check-condition";

			controlIndex--;
			controlIndex--;
			// controlIndex--; // need check

			

		}

	}
	else if(controlInstruction == "mark j"){ 

		if(controlStripe[controlIndex - 2] == "swap"){

			/*----------  do the reverse animation  ----------*/
			
			var beforeSwap = [];
			var afterSwap = [];

			beforeSwap = controlStripe[controlIndex - 4];
			afterSwap = controlStripe[controlIndex - 1];

			/*----------  find change between two array & mark them  ----------*/
			
			var first, second, i, len;

			len = inputDigits.length;

			for(i = 0; i < len; i++){

				if(beforeSwap[i] != afterSwap[i]){

					first = afterSwap[i];
					second = beforeSwap[i];

					break;
				}
			}

			/*----------  get column id and animate  ----------*/

			var firstPosition = positionArray[i + 2] + 'px'; // need check
			var secondPosition = positionArray[i + 1] + 'px';
			
			first = "#colNum" + first;
			second = "#colNum" + second;

		

			$(first).animate({'left' : firstPosition}, {duration:interval});
			$(second).animate({'left' : secondPosition}, {duration:interval});


			/*----------  change color what was before swaping  ----------*/
			

			$(first).css('background-color', firstColumnColor);
			$(second).css('background-color', secondColumnColor);



			$(previousClass).removeClass('active');
			$("#bubbleSort-swap").addClass('active');

			previousClass = "#bubbleSort-swap"; // need check

			controlIndex--;
			// controlIndex--;
		}
		else if(controlStripe[controlIndex - 3] == "swap check"){

			/*----------  set back previos column color  ----------*/
			
			var selected = controlStripe[controlIndex - 1];
			var indexes = controlStripe[controlIndex - 2];

			var first = "#colNum" + indexes[ selected[0] ];
			var second = "#colNum" + indexes[ selected[1] ];

			$(first).css('background-color', firstColumnColor);
			$(second).css('background-color', secondColumnColor);





			$(previousClass).removeClass('active');
			$("#bubbleSort-check-condition").addClass('active');

			previousClass = "#bubbleSort-check-condition";

			controlIndex--; // need check


		}

		
	}
	else if(controlInstruction == "mark i"){

		$(previousClass).removeClass('active');
		$("#bubbleSort-for-j").addClass('active');

		previousClass = "#bubbleSort-for-j"; // need check

		controlIndex--;


	}
	else if(controlInstruction == "start"){

		// controlIndex++;

		// $(previousClass).removeClass('active');
		alert("You are in first Step");


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


function moveNextStep() {

	if (paused === true) {

      clearInterval(id);
      
    }
	

	controlIndex++;


	var controlInstruction = controlStripe[controlIndex];

	if (controlInstruction == "end") {

		controlIndex--;
		
		$(previousClass).removeClass('active');
		alert("You are in last Step");

    	clearInterval(id);

    	return;
      
    }


 	// if(controlIndex >= controlStripe.length ){

		// controlIndex--;
 	// }


	if(controlInstruction == "start i"){

		$(previousClass).removeClass('active');
		$("#bubbleSort-for-i").addClass('active');

		previousClass = "#bubbleSort-for-i";


	}
	else if(controlInstruction == "start j"){

		$(previousClass).removeClass('active');
		$("#bubbleSort-for-j").addClass('active');

		previousClass = "#bubbleSort-for-j";


	}
	else if(controlInstruction == "swap check"){

		$(previousClass).removeClass('active');
		$("#bubbleSort-check-condition").addClass('active');

		previousClass = "#bubbleSort-check-condition";


		/*----------  color columns which are checking  ----------*/
		
		var selected = controlStripe[controlIndex + 2];
		var indexes = controlStripe[controlIndex + 1];

		var first = "#colNum" + indexes[ selected[0] ];
		var second = "#colNum" + indexes[ selected[1] ];

		/*----------  set track of previous color of selected columns  ----------*/
		
		firstColumnColor = $(first).css('background-color');
		secondColumnColor = $(second).css('background-color');



		$(first).css('background-color', 'green');
		$(second).css('background-color', 'green');



		controlIndex++;
		controlIndex++;


	}
	else if(controlInstruction == "swap"){

		$(previousClass).removeClass('active');
		$("#bubbleSort-swap").addClass('active');

		previousClass = "#bubbleSort-swap";

		controlIndex++;


	}
	else if(controlInstruction == "mark j"){

		if(controlStripe[controlIndex - 2] == "swap"){

			/*----------  do the animation  ----------*/ 
			
			var beforeSwap = [];
			var afterSwap = [];

			beforeSwap = controlStripe[controlIndex - 4];
			afterSwap = controlStripe[controlIndex - 1];

			/*----------  find change between two array & mark them  ----------*/
			
			var first, second, i, len;

			len = inputDigits.length;

			for(i = 0; i < len; i++){

				if(beforeSwap[i] != afterSwap[i]){

					first = beforeSwap[i];
					second = afterSwap[i];

					break;
				}
			}

			/*----------  get column id and animate  ----------*/

			var firstPosition = positionArray[i + 2] + 'px';
			var secondPosition = positionArray[i + 1] + 'px';
			
			first = "#colNum" + first;
			second = "#colNum" + second;

			// $(first).animate({
			// 	'left': firstPosition,
			// 	'background-color': '#87ecf1'
			// }, interval);

			// $(first).animate({
			// 	'left': secondPosition,
			// 	'background-color': '#87ecf1'
			// }, interval);

			$(first).animate({'left' : firstPosition}, {duration:interval});
			$(second).animate({'left' : secondPosition}, {duration:interval});


			/*----------  change color while swaping  ----------*/
			

			$(first).css('background-color', '#499498');
			$(second).css('background-color', '#499498');



			$(previousClass).removeClass('active');
			$("#bubbleSort-for-j").addClass('active');

			previousClass = "#bubbleSort-for-j";


		}
		else if(controlStripe[controlIndex - 3] == "swap check"){

			/*----------  set back previos column color  ----------*/
			
			var selected = controlStripe[controlIndex - 1];
			var indexes = controlStripe[controlIndex - 2];

			var first = "#colNum" + indexes[ selected[0] ];
			var second = "#colNum" + indexes[ selected[1] ];

			$(first).css('background-color', firstColumnColor);
			$(second).css('background-color', secondColumnColor);





			$(previousClass).removeClass('active');
			$("#bubbleSort-for-j").addClass('active');

			previousClass = "#bubbleSort-for-j";


		}
	}
	else if(controlInstruction == "mark i"){

		$(previousClass).removeClass('active');
		$("#bubbleSort-for-i").addClass('active');

		previousClass = "#bubbleSort-for-i";


	}
	else if(controlInstruction == "end"){

		// clearInterval(id);

		controlIndex--;

		$(previousClass).removeClass('active');
		alert("You are in last Step");

	}


	// if (controlInstruction == "end") {

 //      clearInterval(id);
      
 //    }

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
		previousClass = ".bubble-sort-take-input";
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

			/*----------  implement the algorithm in js & create a control stripe  ----------*/

			bubbleSort();




		}
		else{

			$("#input-container").html("");

			alert(errorMessage);
		}
	});




/*==================================================
=            Simulation Control Section            =
==================================================*/




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

/*=====  End of Simulation Control Section  ======*/







	

	


});

/*=====  End of Taking input, varify and show input in container  ======*/






