/*
 * Point class - for x,y values
 *
 * Used when: declaring a pool location, setting an entity's location, adding a new entity at a location,
 *  drawing color at a location, clearing color at a location. 
 * 
 * point : location | 'cursor' | pool | settable_point
 * location : 'location' '(' row ',' col ')' ;
 * pool : 'pool' '(' pool_name ')' ;
 * settable_point 	: entity | property ; // Is an entity property only settable as a point if it's a point type? 
 * 
 */

function Point (type, args=[]) {

	this.type = type; // can be "location", "cursor", "pool", "entity", "property"
	this.args = args; // Array of arguments to the type 
					  // - [] for 'cursor'
					  // - [row, col] for 'location'
					  // - [poolID] for 'pool'
					  // - [entityID] for 'entity'
					  // - [entityID, property] for 'property'

	// Return x,y value pair as array
	this.getValue = function () {

		switch (this.type) {

			case 'location' : // a grid location with args = [row, col]
				return PhaserDriver.getGridLocation(this.args[0], this.args[1]);
				break;
			case 'cursor' :
				return PhaserDriver.getCursorLocation();
				break;
			case 'pool' :
				return PhaserDriver.getPoolLocation(this.args[0]);
				break;
			case 'entity' :
				return PhaserDriver.getEntityLocation(this.args[0]);
				break;
			case 'property' :
				// assert this property has type point
				return PhaserDriver.getPropertyValue(this.args[0],this.args[1]);
				break;
			default: 
				break;
		}

	}

}