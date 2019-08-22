function Collector () {

	var entities = {}, // An object whose keys are entity IDs and values are objects with entity info
		resources = {},
		pools = {}, // An object whose keys are pool names and values are each an array of subpools
		rules = {},
		initial = [], // An array of actions to do at game start
		state = {};

	// Getters
	function getEntities () { return entities; }
	function getResources () { return resources; }
	function getPools () { return pools; }
	function getRules () { return rules; }
	function getInitial () { return initial; }

	function getResource (resourceID) { return resources[resourceID]; }
	function getEntityProperty (entityID, propertyName) { return entities[entityID][propertyName]; }

	// Setters
	function registerEntity (entityID) {
		// If this entity has not been added to the entity symbol table, add it
		if (!entities.hasOwnProperty(entityID)) {
			entities[entityID] = new Entity();
		}
	}

	function registerResource (resourceID) {
		// If this resource has not been added to the resource symbol table, add it
		if (!resources.hasOwnProperty(resourceID)) {
			resources[resourceID] = new Resource();
		}
	}

	function registerPool (poolID) {
		// If this pool ID has not been added to the pool symbol table, add it
		if (!pools.hasOwnProperty(poolID)) {
			pools[poolID] = new Pool();
		}
	}

	function registerRule (ruleID) {
		// If this rule ID has not been added to the rule symbol table, add it
		if (!rules.hasOwnProperty(ruleID)) {
			rules[ruleID] = new Rule();
		}
	}

	// Recursively build an action
	// Return that complex action
	//function createAction (operation, args) {

		//console.log("action:",operation);
		//args.forEach (function (arg) {
		//	if ( !isBaseCase(arg) ){
			//console.log("-arg:",arg);
		//});

	//	return new Action (operation,args);
	//}

	function registerEntityProperty (entityID, propertyName, value) {
		entities[entityID][propertyName] = value;
	}

	function registerResourceProperty (resourceID, propertyName, value) {
		resources[resourceID][propertyName] = value;
	}

	function registerSubpool (poolID, row, col, locationType, withinType) {
		pools[poolID].addSubpool(row, col, locationType, withinType);
	}

	/* Register a single rule condition (a rule can have multiple conditions which all must be true)
	 * Params: 
	 * 	operation could be: ge, le, overlaps, timer_elapsed, button, click
	 * 	args: arguments to the condition operation (vary by operation)
	 * 		ge and le: 		[a, b] for a <= b or a >= b
	 * 		overlaps: 		[e1, e2, bool] where e1, e2 are entity IDs and bool is true (overlapping) or false (not)
	 * 		timer_elapsed: 	[timerID]
	 * 		button: 		[button, button_state], e.g., ["mouse", "held"]
	 * 		click: 			[entityID]
	 * 	button could be: 		mouse | key_up | key_down | key_left | key_right | key_space
	 *  button_state could be: 	pressed | held | released 
	 */
	function registerCondition (ruleID, operation, args, text) {
		// expect args to be an array
		rules[ruleID].addCondition(operation, args, text);
	}

	function registerAction (operation, args, text, ruleID=null) {

		console.log ("In Collector.registerAction()");
		console.log ("op:", operation, ", args:", args, ", text:", text, ", ruleID:", ruleID);

		if (ruleID==null) {
			// This action is in an 'initialize' statement (no ruleID)
			initial.push(new Action(operation, args, text))
		} else { 
			rules[ruleID].addAction(operation, args, text);
		}

	}

	return {
		getEntities : getEntities,
		getResources : getResources,
		getPools : getPools,
		getRules : getRules,
		getInitial : getInitial,

		registerEntity : registerEntity,
		registerResource : registerResource,
		registerPool : registerPool,
		registerRule : registerRule,
		registerAction : registerAction,

		getResource : getResource,
		getEntityProperty : getEntityProperty,

		registerEntityProperty : registerEntityProperty,
		registerResourceProperty : registerResourceProperty,
		registerSubpool : registerSubpool,
		registerCondition : registerCondition,

	}

}
