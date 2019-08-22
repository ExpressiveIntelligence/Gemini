/*
 * Rule class, with subclasses Condition and Action
 */

function Rule () {

	var conditions = [],
		actions = [],
		allConditionsMet = false;

	// Categorization of each supported condition operation into a broad type
	var conditionTypeMap = 
		{
			"ge" 			: "comparison",
			"le" 			: "comparison",
			"overlaps" 		: "collision",
			"control_event" : "control",
			"timer_elapsed" : "timer",
			"tick" 			: "tick"
		};

	// Whether this condition type is checked by Interpeter (internal) or Driver (external)
	var conditionScopeMap = 
		{
			"comparison" : "internal",
			"collision"  : "external",
			"control"	 : "external",
			"timer"		 : "internal",
			"tick"		 : "internal"
		};

	function Condition (operation, args, text) {

		this.operation = operation; // e.g., 'ge', 'le', 'overlaps', ...
		this.type = conditionTypeMap[operation]; // e.g., 'comparison', 'collision', ...
		this.scope = conditionScopeMap[this.type]; // 'internal' or 'external'
		this.text = text; // raw text from the Cygnus file

		this.args = args; // Array of arguments to the operation
		
		this.conditionMet = false;

		// currentState is an object of variables with their current values?
		this.checkCondition = function (currentState) {

			switch (this.operation) {
				case "ge" : 
					return this.args[0].getValue() >= this.args[1].getValue();
				case "le" : 
					return this.args[0].getValue() <= this.args[1].getValue();
				default: 
					return false;
			}
			//return true or false	
		}
	
	}

	function addCondition (operation, args, text) {
		conditions.push(new Condition(operation, args, text));
	}

	function addAction (operation, args, text) {
		actions.push(new Action(operation, args, text));
	}

	return {
		addCondition : addCondition,
		addAction : addAction,
		conditions : conditions,
		actions: actions
	}

}