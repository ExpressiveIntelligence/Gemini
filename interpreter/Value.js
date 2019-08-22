/*
 * Value class - for calculated, non-primitive values
 * 
 * value 
	: scalar
	| amount (WORD|'clear') // WORD should specify a color
	| distance ( entity ',' entity ',' look_criterion) 
	| random_int ( scalar ',' scalar )
	| settable = resource | property 
	;
 */

function Value (calculation, args) {

	this.calculation = calculation; // can be "literal", amount", "distance", "random_int", "resource", "property"
	this.args = args; // Array of arguments to the calculation 

	console.log("CalculatedValue:", this.calculation, this.args);

	this.getValue = function () {

		switch (this.calculation) {

			case 'amount' : 
				return PhaserDriver.getColorAmount(this.args[0]);
				break;
			case 'distance' :
				return PhaserDriver.getEntityDistance(this.args[0],this.args[1],this.args[2]);
				break;
			case 'random_int' :
				return random_int(this.args[0],this.args[1]);
				break;
			case 'resource' :
				return PhaserDriver.getResourceValue(this.args[0]);
				break;
			case 'property' :
				return PhaserDriver.getPropertyValue(this.args[0],this.args[1]);
				break;
			case 'literal' :
				return this.args[0];
				break;
			default: 
				break;
		}

	}

	// Returns a random integer between min and max (inclusive)
	// Might be fine with just Math.random() * (max - min) + min.
	function random_int (min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	}

}