const input  		= document.querySelector("#array");
const type	        = document.querySelector("#type");
const resultfield   = document.querySelector("#result");
let result 			= {};

function getAndValidateFormData() {
	let array_string = input.value.trim();

	resultfield.innerHTML = '';
	if (result) { result = {} }
	
	if (!array_string || !type.value)  { resultfield.innerHTML = "Missing values"; return; }

	array_string = array_string.split(' ');

	for (var i = array_string.length - 1; i >= 0; i--) {
		const isNum = /^\-?\d+$/.test(array_string[i]);

		if (!isNum) { resultfield.innerHTML = "Non digit value found"; return; }

		array_string[i] = Number.parseInt(array_string[i]);
	}

	findLis(array_string, []);

	printLis();
	
}

function printLis() {
	switch(type.value) {
	  case "lis":
		resultfield.innerHTML = `<th>${result[Math.max(...Object.keys(result))][0]}</th>`
	    break;
	  case "shortest":
		Object.values(result).forEach(val => {
				resultfield.innerHTML += `<th>${val.join(', ')}</th> <br>`;
			})
	    break;
	  default:
	  	Object.values(result).forEach(val => {
				resultfield.innerHTML = `<th>${val.join(', ')}</th> <br>` + resultfield.innerHTML;
			})
	}
}

function findLis(input, output) {
	if (input.length == 0) {
		if (output.length != 0) {
			if (!result[output.length]) {
				result[output.length] = [];
			}
			result[output.length].unshift(`(${output.join(',')})`);
		}
		return
	}

	findLis(input.slice(1), output.slice());

	if (output.length == 0) {
		findLis(input.slice(1), input.slice(0, 1));
	} else if (input[0] > output.slice(-1)) {
		output.push(input[0]);
		findLis(input.slice(1), output.slice());
	}
}
