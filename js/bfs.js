/*----------  variable part  ----------*/
var MAXVAL = 10;
var errorMessage;
var interval = 1000;
var paused = false;
var input;
var userInput;


var adjacentNode = [], nodePosition = [];
var shortestPath = [];
var level = [];
var parent = [];
var inputData;
var bfsControlStrip = [], bfsAnimationIndex = 0, bfsAnimationPreviousIndex = bfsControlStrip.length;

bfsAnimationIndex = 0;

bfsAnimationPreviousIndex = bfsControlStrip.length - 1;

var bfsInputSet = [];


bfsInputSet[10] = [[1,2],
				   [1,3],
				   [3,5],
				   [2,5],
				   [3,4],
				   [5,4],
				   [6,4],
				   [7,10],
				   [3,6],
				   [6,8],
				   [5,7],
				   [9,10],
				   [8,9]
				   ];

bfsInputSet[5] = [[1,2],
				  [1,3],
				  [3,4],
				  [2,5]
				  ];

bfsInputSet[8] = [[1,2],
				  [1,3],
				  [1,4],
				  [3,4],
				  [4,5],
				  [5,6],
				  [5,7],
				  [3,7],
				  [7,8]
				  ];

adjacentNode = [];
nodePosition = [];










/*----------  function part  ----------*/





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





/*----------  createAdjacentListBfs  ----------*/
function createAdjacentListBfs(graphArray, source, sink){

	var i, j, len, tempIndex, tempValue;
	var bfsAdjacentNodeList = [];

	for(i = 0; i <= sink; i++){

		bfsAdjacentNodeList[i] = new Array();
	}

	len = graphArray.length;

	for(i = 0; i < len; i++){

		tempIndex = graphArray[i][0];

		tempValue = graphArray[i][1];

		bfsAdjacentNodeList[tempIndex].push(tempValue);
	}

	return bfsAdjacentNodeList;
}

/*----------  createNodePositionBfs function body  ----------*/


function createNodePositionBfs(adjacentNode, source, sink){

	var i, j, len, top, left, index;

	var bfsNodePosition = [];

	for(i = source; i <= sink; i++){

		if(i == source){

			if(userInput == 10)
				bfsNodePosition[i] = [1,300];
			else
				bfsNodePosition[i] = [50,300];
		}

		len = adjacentNode[i].length;

		if(typeof bfsNodePosition[i] == 'undefined'){

			top = bfsNodePosition[source][0];
			left = bfsNodePosition[source][1] + 100;


			bfsNodePosition[i] = [top, left];

			continue;

		}

		top = bfsNodePosition[i][0] + 100;
		left = bfsNodePosition[i][1] - 100;

		for(j = 0; j < len; j++){

			index = adjacentNode[i][j];

			if (typeof bfsNodePosition[index] == 'undefined'){

				left = left + 100;

				bfsNodePosition[index] = [top, left];
			}
		}

		if(i == sink){

			bfsNodePosition[i][1] = 300
		}
	}

	return bfsNodePosition;
}


/*----------  createCircleText function body  ----------*/


function createCircleText(nodePosition, source, sink){

	var i, j, len, first, second , third, fourth, fifth, final, temp;

	first = '<div class="col" id="circle-div-'
	second = '"><p id="circle-';
	third = '">';
	fourth = '</p></div>';
	// fifth = '</div>';

	final = '';

	for(i = source; i <= sink; i++){

		temp = first + i + second + i + third + i + fourth;

		final = final + temp;
	}

	// final = '<canvas class="col" id="myCanvas" width="200" height="100" style="border:1px solid #000000;">' +
	// 		final + '</canvas>';

	return final;
}


/*----------  addCssToCircleDiv function body  ----------*/


function addCssToCircleDiv(nodePosition, source,sink){

	var i, j, circleId, divId;

	for(i = source; i <= sink; i++){

		divId = "#circle-div-" + i;

		$(divId).css({

			'top': nodePosition[i][0],
			'left': nodePosition[i][1],
			'height': '50px',
			'width': '50px',
			'border-radius': '50%',
			'background-color': 'black',
			'text-align': 'center'
		});

		circleId = "#circle-" + i;

		$(circleId).css({

			'font-weight': '700',
			'text-align': 'center',
			'color': 'white',
			'font-size': '25px',
			'margin': '0',
			'padding-top': '10px'
		});
	}
}



/*----------  createArrowFromCircleToCircle function body  ----------*/


function createArrowFromCircleToCircle(adjacentNode, nodePosition, source, sink){

	var i, j, len, adjacentLength;
	var top, left, parentTop, parentLeft;
	var index, height, width, svgLeft, svgTop, svgHeight, svgWidth;

	var firstx1, firsty1, firstx2, firsty2;
	var secondx1, secondx2, secondy1, secondy2;
	var thirdx1, thirdx2, thirdy1, thirdy2;

	var finalText = '' , tempText;

	// len = adjacentNode.length;

	for(i = source; i <= sink; i++){

		// adjacentLength = adjacentNode[i]
		len = adjacentNode[i].length;

		parentTop = nodePosition[i][0];
		parentLeft = nodePosition[i][1];

		for(j = 0; j < len; j++){

			index = adjacentNode[i][j];

			top = nodePosition[index][0];
			left = nodePosition[index][1];

			if(parentLeft == left){

				svgTop = parentTop + 50 - 1;
				svgLeft = parentLeft;

				svgHeight = 52;
				svgWidth = 52;

				firstx1 = 25;
				firsty1 = 0;
				firstx2 = 25;
				firsty2 = 52;

				secondx1 = firstx1 - 7;
				secondy1 = 40;
				secondx2 = 25;
				secondy2 = 52;

				thirdx1 = firstx1 + 7;
				thirdy1 = 40;
				thirdx2 = 25;
				thirdy2 = 52;

			}
			else if(parentTop + 100 == top){

				svgTop = parentTop + 50;

				if(parentLeft > left)
					svgLeft = left;
				else if(parentLeft < left)
					svgLeft = parentLeft;





				svgHeight = 52;

				if(parentLeft > left)
					svgWidth = parentLeft - left + 50;
				else if(parentLeft < left)
					svgWidth = left - parentLeft + 50;
				




				firstx1 = 25;

				if(parentLeft > left)
					firsty1 = 52;
				else if(parentLeft < left)
					firsty1 = 0;
				

				firstx2 = svgWidth - firstx1;

				if(parentLeft > left)
					firsty2 = 0;
				else if(parentLeft < left)
					firsty2 = 52;
				





				/*  second & third x1, y1 nia jhamela hoite pare
				 	parle thik korbo naile nai
				*/

				if(parentLeft > left)
					secondx1 = 37;
				else if(parentLeft < left)
					secondx1 = firstx2 - 5;
				
				if(parentLeft > left)
					secondy1 = 37;
				else if(parentLeft < left)
					secondy1 = 40;
				

				if(parentLeft > left)
					secondx2 = firstx1;
				else if(parentLeft < left)
					secondx2 = firstx2;
				
				secondy2 = 52;
				





				if(parentLeft > left)
					thirdx1 = 42;
				else if(parentLeft < left)
					thirdx1 = firstx2 - 15;
				
				thirdy1 = 50;

				if(parentLeft > left)
					thirdx2 = firstx1;
				else if(parentLeft < left)
					thirdx2 = firstx2;
				

				thirdy2 = 52;
				
			}
			else if(parentTop == top){

				svgTop = parentTop;

				if(parentLeft > left)
					svgLeft = left + 50;
				else if(parentLeft < left)
					svgLeft = parentLeft + 50;


				svgHeight = 52;

				if(parentLeft > left)
					svgWidth = parentLeft - left - 50;
				else if(parentLeft < left)
					svgWidth = left - parentLeft - 50;
				

				firstx1 = 0;
				firsty1 = 25;
				firstx2 = svgWidth;
				firsty2 = 25;



				if(parentLeft > left)
					secondx1 = 10;
				else if(parentLeft < left)
					secondx1 = 40;

				secondy1 = 15;

				if(parentLeft > left)
					secondx2 = 0;
				else if(parentLeft < left)
					secondx2 = 52;

				secondy2 = 25;



				thirdx1 = secondx1;
				thirdy1 = 35;
				thirdx2 = secondx2;
				thirdy2 = 25;

				// console.log('svg Top' + svgTop);
				// console.log('svg left' + svgLeft);
				// console.log('svg height' + svgHeight);
				// console.log('svg width' + svgWidth);

				console.log('parentLeft' + parentLeft);
				console.log('left' + left);
			}



			tempText = '<svg width="' + svgWidth + '" height="' + svgHeight + '" style="position: absolute; top: ' + svgTop + 'px; left: ' + svgLeft + 'px;">' +
		  			   '<line x1="' + firstx1 + '" y1="' + firsty1 + '" x2="' + firstx2 + '" y2="' + firsty2 + '" stroke="black"></line>' +
		  			   '<line x1="' + secondx1 + '" y1="' + secondy1 + '" x2="' + secondx2 + '" y2="' + secondy2 + '" stroke="black"></line>' + 
		  			   '<line x1="' + thirdx1 + '" y1="' + thirdy1 + '" x2="' + thirdx2 + '" y2="' + thirdy2 + '" stroke="black"></line>' + 
					   '</svg>';

			finalText = finalText + tempText;
		}
	}

	return finalText;
}









/*----------  drawBfsInputSet function body  ----------*/


function drawBfsInputSet(index){

	var inputData = bfsInputSet[index];

	var source = 1, sink = index;

	/* create adjacent list */
	adjacentNode =  createAdjacentListBfs(inputData, source, sink);

	console.log('adjacent Node ' + adjacentNode);

	nodePosition = createNodePositionBfs(adjacentNode, source, sink);

	var circleText = createCircleText(nodePosition, source, sink);

	$('#visualization').html(circleText);

	addCssToCircleDiv(nodePosition, source,sink);

	var arrowText = createArrowFromCircleToCircle(adjacentNode, nodePosition, source, sink);

	$('#visualization').append(arrowText);

	// console.log('arrow text ' + arrowText);

}


/*----------  runBfs function body  ----------*/
function runBfs(index){

	var i, j, u, v, len;

	var source = 1; sink = index;

	var queue = [];
	level = [];
	parent = [];
	shortestPath = [];

	queue.push(source);

	// bfsControlStrip.push("enqueue");
	// bfsControlStrip.push(source);

	level[source] = 0;
	parent[source] = 0;

	while(queue.length != 0){

		u = queue.shift();

		bfsControlStrip.push("dequeue");
		bfsControlStrip.push(u);
		bfsControlStrip.push("start adding adjacent node");

		len = adjacentNode[u].length;

		for(i = 0; i < len; i++){

			v = adjacentNode[u][i];

			bfsControlStrip.push(v);

			if(typeof level[v] == 'undefined'){

				level[v] = level[u] + 1;

				parent[v] = u;

				queue.push(v);
			}
		}

		bfsControlStrip.push("end adding adjacent node");
		bfsControlStrip.push("remove focus");
		bfsControlStrip.push(u);

	}

	console.log('control Strip ' + bfsControlStrip);
	v = sink;

	while(v != source){

		// console.log(v);

		shortestPath.push(v);

		v = parent[v];
	}

	shortestPath.push(source);

	console.log(shortestPath);

	// alert('shortest distance ' + level[sink]);
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

			input = parseInt(inputDigits[0]);

			userInput = input;
			
			inputData = bfsInputSet[input];

			var arrayToString = inputData.toString();
			// console.log(inputData);
			
			var text = "Your Inputs :- <br><br>" + arrayToString;

			// console.log(inputDigits);

			$("#input-container").html(text);

			// /*----------  draw the columns & add css accordingly & create positionArray----------*/

			drawBfsInputSet(input);

			runBfs(userInput);

			// drawColumns();

			// addNecessaryCss();

			// createPositionArray();

			// /*----------  implement the algorithm in js & create a control stripe  ----------*/

			// bubbleSort();




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

			// id = setInterval(runBfs(userInput), interval+10);


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

			// moveNextStep();
				if(bfsAnimationIndex == bfsControlStrip.length){

					alert('you are in last position');
				}

				var controlStripeState = bfsControlStrip[bfsAnimationIndex];

				var len = bfsControlStrip.length;

				if(controlStripeState == "enqueue"){

					if(bfsAnimationIndex < len)
						bfsAnimationIndex++;

					var id = "#circle-div-" + bfsControlStrip[bfsAnimationIndex];

					$(id).css('backgroundColor', 'red');
					
				}
				else if(controlStripeState == "dequeue"){

					if(bfsAnimationIndex < len)
						bfsAnimationIndex++;

					var id = "#circle-div-" + bfsControlStrip[bfsAnimationIndex];

					$(id).css('backgroundColor', 'red');
				}
				else if(controlStripeState == "start adding adjacent node"){

					if(bfsAnimationIndex < len)
						bfsAnimationIndex++;

					controlStripeState = bfsControlStrip[bfsAnimationIndex];

					while(controlStripeState != "end adding adjacent node"){

						var id = "#circle-div-" + controlStripeState;

						$(id).css('backgroundColor', 'green');

						if(bfsAnimationIndex < len)
							bfsAnimationIndex++;

						controlStripeState = bfsControlStrip[bfsAnimationIndex];
					}
				}
				else if(controlStripeState == "remove focus"){

					if(bfsAnimationIndex < len)
						bfsAnimationIndex++;

					controlStripeState = bfsControlStrip[bfsAnimationIndex];

					var id = "#circle-div-" + controlStripeState;

					$(id).css('backgroundColor', 'black');

					var tempLen = adjacentNode[controlStripeState].length;
					var i;

					for(i = 0; i < tempLen; i++){

						
						id = "#circle-div-" + adjacentNode[controlStripeState][i];
						$(id).css('backgroundColor', 'black');
					}
				}



				if(bfsAnimationIndex < len)
					bfsAnimationIndex++;
			
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