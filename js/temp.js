/*----------  implement the algorithm in js & create a control stripe  ----------*/
	
	// console.log("before merge sort" + inputDigits);

	controlStripe.push("mergeSort-start");
	controlStripe.push("mergeSort-function-start");

	controlStripe.push("mergeSort-function");
	controlStripe.push([0,inputDigits.length - 1]);

	mergeSort(0, inputDigits.length - 1);

	controlStripe.push('mergeSort-end');


	console.log(controlStripe);



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