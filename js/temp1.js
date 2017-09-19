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
