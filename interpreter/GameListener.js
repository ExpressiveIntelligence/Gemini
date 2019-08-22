/*
 * Custom listener which inherits and overrides the Antlr-generated listener, CygnusListener.
 *
 * Calls functions in Collector to add values to game data objects
 */

const antlr4 = require('antlr4/index');
const CygnusParser = require('./CygnusParser');
var CygnusListener = require('./CygnusListener').CygnusListener;
  
// Create and return a new GameListener instance
// Takes a Collector instance, which GameListener functions will populate
var GameListener = function (data) {
	this.data = data;
    CygnusListener.call(this); // inherit default listener
    return this;
};
 
// inherit default listener
GameListener.prototype = Object.create(CygnusListener.prototype);
GameListener.prototype.constructor = GameListener;
 
// override default listener behavior

// Enter a parse tree produced by CygnusParser#game.
GameListener.prototype.enterGame = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#game.
GameListener.prototype.exitGame = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#declaration.
GameListener.prototype.enterDeclaration = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#declaration.
GameListener.prototype.exitDeclaration = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#comment_section.
GameListener.prototype.enterComment_section = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#comment_section.
GameListener.prototype.exitComment_section = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#separator.
GameListener.prototype.enterSeparator = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#separator.
GameListener.prototype.exitSeparator = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#entity.
GameListener.prototype.enterEntity = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#entity.
GameListener.prototype.exitEntity = function(ctx) {

	// If this entity has not been added to the entity symbol table, add it
	this.data.registerEntity(ctx.identifier().getText());
	
};


// Enter a parse tree produced by CygnusParser#resource.
GameListener.prototype.enterResource = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#resource.
GameListener.prototype.exitResource = function(ctx) {

	// If this resource has not been added to the resource symbol table, add it
	this.data.registerResource(ctx.identifier().getText());
};


// Enter a parse tree produced by CygnusParser#flag.
GameListener.prototype.enterFlag = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#flag.
GameListener.prototype.exitFlag = function(ctx) {

	// If this flag has not been added to the flag symbol table, add it
	
};


// Enter a parse tree produced by CygnusParser#timer.
GameListener.prototype.enterTimer = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#timer.
GameListener.prototype.exitTimer = function(ctx) {

	// If this timer has not been added to the timer symbol table, add it
	
};


// Enter a parse tree produced by CygnusParser#property.
GameListener.prototype.enterProperty = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#property.
GameListener.prototype.exitProperty = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#label.
GameListener.prototype.enterLabel = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#label.
GameListener.prototype.exitLabel = function(ctx) {

	var labelName = ctx.label_name().getText();	

	// A label can be for a resource or an entity
	if (ctx.resource() !== null) {
		var resourceID = ctx.resource().identifier().getText();
		var privacy = ctx.privacy_mode().getText();
		this.data.registerResourceProperty(resourceID, "label", labelName);
		this.data.registerResourceProperty(resourceID, "privacy", privacy);

	} else if (ctx.entity() !== null) {
		var entityID = ctx.entity().identifier().getText();
		this.data.registerEntityProperty(entityID, "label", labelName);
	}

};


// Enter a parse tree produced by CygnusParser#singular.
GameListener.prototype.enterSingular = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#singular.
GameListener.prototype.exitSingular = function(ctx) {

	// Register the given entity as 'many'=false
	var entityID = ctx.entity().identifier().getText();
	this.data.registerEntityProperty(entityID,"many",false);

};


// Enter a parse tree produced by CygnusParser#many.
GameListener.prototype.enterMany = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#many.
GameListener.prototype.exitMany = function(ctx) {

	// Register the given entity as 'many'=true
	var entityID = ctx.entity().identifier().getText();
	this.data.registerEntityProperty(entityID,"many",true);

};


// Enter a parse tree produced by CygnusParser#boundary.
GameListener.prototype.enterBoundary = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#boundary.
GameListener.prototype.exitBoundary = function(ctx) {

	// Register the game's boundary type (currently either 'closed' or 'torus')

};


// Enter a parse tree produced by CygnusParser#control_logic.
GameListener.prototype.enterControl_logic = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#control_logic.
GameListener.prototype.exitControl_logic = function(ctx) {

	// (Redundant with initialize(set_draggable(..)). Will be removed from Cygnus eventually)

};


// Enter a parse tree produced by CygnusParser#timer_logic.
GameListener.prototype.enterTimer_logic = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#timer_logic.
GameListener.prototype.exitTimer_logic = function(ctx) {

	// TODO

};


// Enter a parse tree produced by CygnusParser#initialize.
GameListener.prototype.enterInitialize = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#initialize.
// initialize   : 'initialize' '(' action ')' ;
// Similar to exitResult, but no ruleID
GameListener.prototype.exitInitialize = function(ctx) {

	let action = ctx.getChild(2);
	
	if (action.hasOwnProperty("operation") && action.hasOwnProperty("args")) {
		this.data.registerAction (action.operation, action.args, action.getText());
	}

};


// Enter a parse tree produced by CygnusParser#precondition.
// precondition : 'precondition' '(' condition ',' outcome_name ')';
// Just register the outcome name; condition registered in exitPrecondition
GameListener.prototype.enterPrecondition = function(ctx) {

	var outcome_name = ctx.outcome_name();
	var ruleID;

	// Save the rule identifier ('tick' is a special case,
	// since it doesn't have an 'identifier' child)
	if (outcome_name.getText() == 'tick') {
		ruleID = 'tick';
	} else if (outcome_name.identifier() !== null) {
		ruleID = outcome_name.identifier().getText();
	}

	// Add rule to rules symbol table
	this.data.registerRule(ruleID);
};

// Exit a parse tree produced by CygnusParser#precondition.
// precondition : 'precondition' '(' condition ',' outcome_name ')';
GameListener.prototype.exitPrecondition = function(ctx) {

	// Save the context of the 'condition' child of 'precondition' 
	var cond_ctx = ctx.condition();

	// Collect relevant data about a condition to register with the Collector:
	// the name of the condition operation (ge, le, overlaps, timer_elapsed, button, click)
	// the raw text from the Cygnus file
	// arguments to the condition operation (vary by operation)

	var condition = cond_ctx.getChild(0).getText(); 
	var text = cond_ctx.getText();
	var args = [];

	// Construct args 
	switch (condition) {

		case "ge" : 
		case "le" : 
			// TODO: Use child nodes to set values, rather than use raw text
			args.push(cond_ctx.value(0).value);
			args.push(cond_ctx.value(1).value);
			break;

		case "overlaps" :
			// Set args to be entity IDs 
			args.push(cond_ctx.entity(0).identifier().getText());
			args.push(cond_ctx.entity(1).identifier().getText());
			args.push(cond_ctx.bool().getText());
			break;

		case "control_event" : 
			// Could be either 'click(entity)' or 'button(button,button_state)'

			var control_predicate_ctx = cond_ctx.control_event();
			var control_predicate_name = cond_ctx.control_event().getChild(0).getText();

			if (control_predicate_name == "click") {
				condition = "click"; // use click for operation instead of control_event
				args.push(control_predicate_ctx.entity().getText());

			} else if (control_predicate_name == "button") {
				condition = "button" // use button for operation instead of control_event
				args.push(control_predicate_ctx.button().getText());
				args.push(control_predicate_ctx.button_state().getText());
			}

			break;

		case "timer_elapsed" :

			// The third child is either 'timer(id)' (more correct) or just 'id' 
			// (TODO: Should eventually prevent Gemini from producing timer_elapsed(id))
			if (cond_ctx.getChild(2) instanceof CygnusParser.CygnusParser.IdentifierContext) {
				args.push(cond_ctx.getChild(2).getText());
			} else {
				args.push(cond_ctx.getChild(2).identifier().getText());
			}

			break;

		case "tick" :
			// Tick has no arguments
			break;
	}

	// Register condition and its arguments if it isn't the "tick" rule
	// (Don't need to save any conditions for "tick")
	if (condition !== "tick") {

		var ruleID = ctx.outcome_name().identifier().getText();
		// registerCondition takes ruleID, operation, operation arguments, and 
		this.data.registerCondition(ruleID, condition, args, text);
	
	}
};


// Enter a parse tree produced by CygnusParser#result.
// 'result' '(' outcome_name ',' action ')';
// (Same behavior as enterPrecondition: just register outcome name and save it to the node)
GameListener.prototype.enterResult = function(ctx) {

	var outcome_name = ctx.outcome_name();
	var ruleID;

	// Save the rule identifier ('tick' is a special case,
	// since it doesn't have an 'identifier' child)
	if (outcome_name.getText() == 'tick') {
		ruleID = 'tick';
	} else if (outcome_name.identifier() !== null) {
		ruleID = outcome_name.identifier().getText();
	}

	ctx.ruleID = ruleID;

	// Add rule to rules symbol table if it hasn't been added already
	this.data.registerRule(ruleID);

};

// Exit a parse tree produced by CygnusParser#result.
// 'result' '(' outcome_name ',' action ')';
// Register action for this rule ID using registerAction (operation, args, text, ruleID)?
GameListener.prototype.exitResult = function(ctx) {

	let action = ctx.getChild(4);
	
	if (action.hasOwnProperty("operation") && action.hasOwnProperty("args")) {
		this.data.registerAction (action.operation, action.args, action.getText(), ctx.ruleID);
	}

};


// Enter a parse tree produced by CygnusParser#label_name.
GameListener.prototype.enterLabel_name = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#label_name.
GameListener.prototype.exitLabel_name = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#outcome_name.
GameListener.prototype.enterOutcome_name = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#outcome_name.
GameListener.prototype.exitOutcome_name = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#identifier.
GameListener.prototype.enterIdentifier = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#identifier.
GameListener.prototype.exitIdentifier = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#condition.
GameListener.prototype.enterCondition = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#condition.
GameListener.prototype.exitCondition = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#action.
GameListener.prototype.enterAction = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#action.
GameListener.prototype.exitAction = function(ctx) {

	// Similarly to precondition, collect relevant data about the action
	// to register with the Collector:
	// - the name of the action
	// - the raw text from the Cygnus file
	// - arguments to the action operation (vary by operation)

	// All action subnodes should add construct a custom ctx.action object 
	// ctx.action = ctx.getChild(0).action;
	
	//var action = ctx.getChild(0).getText();
	//var text = ctx.getText();
	//var args = [];


	// The parent node predicate name is either "initialize" or "result"
	var parent = ctx.parentCtx.getChild(0).getText();
	var isInInitialize = (parent == "initialize");

	switch (action) { 

		case "add":
			break;

		case "delete":
			break;

		case "draw":
			break;

		case "clear":
			break;

		case "fill":
			break;

		case "increase":
			break;

		case "decrease":
			break;

		case "increase_over_time":
			break;

		case "decrease_over_time":
			break;

		case "set_value":

			// Children: settable, value
			// The single child of settable is either resource or property
/*			
			var moreSpecificAction = "",
				args = [];

			if (ctx.settable().resource() !== null) {

				// Setting the value of a resource: 2 args (resourceID, get_value Action object)
				moreSpecificAction = "set_resource_value"; 
				args[0] = ctx.settable().resource().identifier().getText();
			
			} else if (ctx.settable().property() !== null) {

				// Setting the value of a property: 3 args (entityID, propertyName, get_value Action object)
				moreSpecificAction = "set_property_value"; 
				args[0] = ctx.settable().property().entity().identifier().getText();
				args[1] = ctx.settable().property().identifier().getText();
			}

			// Value has already been populated by descendant nodes 
			var value = ctx.value().value;
			args.push(value);

			ctx.action = this.data.createAction(moreSpecificAction, args);
			console.log ("ctx.action in set_value:", ctx.action);

			if (isInInitialize) {

				//if (ctx.settable().resource !== null) {
				//	this.data.setResourceValue (resourceID, value);

				//} else if (ctx.settable().property() !== null) {
				//	this.data.setPropertyValue (entityID, propertyName, value);
				//}
				//this.data.registerResourceProperty(resourceID, "initialValue", value);
			}
*/
			break;
		
		case "set_point":
			break;

		case "set_bool":
			break;

		case "moves":
			break;

		case "move_toward":
			break;

		case "move_away":
			break;

		case "set_acceleration":
			break;

		case "apply_restitution":
			break;

		case "rotates":
			break;

		case "rotate_to":
			break;

		case "look_at":
			break;

		case "set_sprite":
			break;

		case "set_color":
			break;

		case "set_size":
			break;

		case "set_bounce":
			break;

		case "set_draggable":
			break;

		case "set_static":
			break;

		case "mode_change":
			break;

	}

	//console.log("Action:",action);
};


// Enter a parse tree produced by CygnusParser#Add.
CygnusListener.prototype.enterAdd = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Add.
// 'add' '(' entity ',' value ',' point ')'
// Add 'value' number of instances of the given entity to the location given by 'point'
CygnusListener.prototype.exitAdd = function(ctx) {

	ctx.operation = "add";
	ctx.args = [ ctx.entity().identifier().getText(),
				 ctx.value().value,
				 ctx.point().point ];

};


// Enter a parse tree produced by CygnusParser#Delete.
CygnusListener.prototype.enterDelete = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Delete.
// 'delete' '(' entity ')' 
CygnusListener.prototype.exitDelete = function(ctx) {

	ctx.operation = "delete";
	ctx.args = [ ctx.entity().identifier().getText() ];

};


// Enter a parse tree produced by CygnusParser#Draw.
CygnusListener.prototype.enterDraw = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Draw.
// 'draw' '(' point ',' WORD ')' // WORD should be a color
CygnusListener.prototype.exitDraw = function(ctx) {

	ctx.operation = "draw";
	ctx.args = [ ctx.point().point,
				 ctx.WORD().getText() ];

};


// Enter a parse tree produced by CygnusParser#Clear.
CygnusListener.prototype.enterClear = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Clear.
// 'clear' '(' point ')'
CygnusListener.prototype.exitClear = function(ctx) {

	ctx.operation = "clear";
	ctx.args = [ ctx.point().point ];

};


// Enter a parse tree produced by CygnusParser#Fill.
CygnusListener.prototype.enterFill = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Fill.
// 'fill' '(' ('all'|location) ',' WORD ')' // WORD should be a color
CygnusListener.prototype.exitFill = function(ctx) {

	ctx.operation = "fill";

	let location = ctx.getChild(2).getText() === "all" ? "all" : ctx.location().point;

	ctx.args = [ location,
				 ctx.WORD().getText() ];

};


// Enter a parse tree produced by CygnusParser#Increase.
CygnusListener.prototype.enterIncrease = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Increase.
// 'increase' '(' settable ',' value ')'
CygnusListener.prototype.exitIncrease = function(ctx) {

	ctx.operation = "increase";
	ctx.args = [ ctx.settable().reference, // could be a resourceID or [entityID, propertyName]
				 ctx.value().value ];
};


// Enter a parse tree produced by CygnusParser#Decrease.
CygnusListener.prototype.enterDecrease = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Decrease.
// 'decrease' '(' settable ',' value ')'
CygnusListener.prototype.exitDecrease = function(ctx) {

	ctx.operation = "decrease";
	ctx.args = [ ctx.settable().reference, // could be a resourceID or [entityID, propertyName]
				 ctx.value().value ];
};


// Enter a parse tree produced by CygnusParser#IncreaseOverTime.
CygnusListener.prototype.enterIncreaseOverTime = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#IncreaseOverTime.
CygnusListener.prototype.exitIncreaseOverTime = function(ctx) {

	ctx.operation = "increaseOverTime";
	ctx.args = [ ctx.settable().reference, // could be a resourceID or [entityID, propertyName]
				 ctx.value().value ];
};


// Enter a parse tree produced by CygnusParser#DecreaseOverTime.
CygnusListener.prototype.enterDecreaseOverTime = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#DecreaseOverTime.
CygnusListener.prototype.exitDecreaseOverTime = function(ctx) {

	ctx.operation = "DecreaseOverTime";
	ctx.args = [ ctx.settable().reference, // could be a resourceID or [entityID, propertyName]
				 ctx.value().value ];
};


// Enter a parse tree produced by CygnusParser#SetValue.
CygnusListener.prototype.enterSetValue = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetValue.
// 'set_value' '(' settable ',' value ')'
// Set ctx.operation and args for use in exitResult and exitInitialize
CygnusListener.prototype.exitSetValue = function(ctx) {

	// Children: settable, value
	// The single child of settable is either resource or property
		
	args = [];

	// Configure the first arguments to this action operator (the variable being set)
	if (ctx.settable().resource() !== null) {
		// Setting the value of a resource: 2 args (resourceID, get_value Action object)
		args[0] = ctx.settable().resource().identifier().getText();

	} else if (ctx.settable().property() !== null) {
		// Setting the value of a property: 3 args (entityID, propertyName, get_value Action object)
		args[0] = ctx.settable().property().entity().identifier().getText();
		args[1] = ctx.settable().property().identifier().getText();
	}

	// Configure the last argument to this action operator (the value to set the variable to)
	// Value has already been populated by descendant nodes 
	var value = ctx.value().value;
	args.push(value);

	ctx.operation = "set_value";
	ctx.args = args;

	// this.data.registerAction('set_value', args, ctx.getText());
	//console.log ("ctx.parentCtx", ctx.parentCtx.getText());

	/*if (isInInitialize) {
		//if (ctx.settable().resource !== null) {
		//	this.data.setResourceValue (resourceID, value);
		//} else if (ctx.settable().property() !== null) {
		//	this.data.setPropertyValue (entityID, propertyName, value);
		//}
		//this.data.registerResourceProperty(resourceID, "initialValue", value);
	}*/
};


// Enter a parse tree produced by CygnusParser#SetPoint.
CygnusListener.prototype.enterSetPoint = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetPoint.
CygnusListener.prototype.exitSetPoint = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#SetBool.
CygnusListener.prototype.enterSetBool = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetBool.
CygnusListener.prototype.exitSetBool = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#Move.
CygnusListener.prototype.enterMove = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Move.
CygnusListener.prototype.exitMove = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#MoveToward.
CygnusListener.prototype.enterMoveToward = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#MoveToward.
CygnusListener.prototype.exitMoveToward = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#MoveAway.
CygnusListener.prototype.enterMoveAway = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#MoveAway.
CygnusListener.prototype.exitMoveAway = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#SetAcceleration.
CygnusListener.prototype.enterSetAcceleration = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetAcceleration.
CygnusListener.prototype.exitSetAcceleration = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#ApplyRestitution.
CygnusListener.prototype.enterApplyRestitution = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#ApplyRestitution.
CygnusListener.prototype.exitApplyRestitution = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#Rotate.
CygnusListener.prototype.enterRotate = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Rotate.
CygnusListener.prototype.exitRotate = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#RotateTo.
CygnusListener.prototype.enterRotateTo = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#RotateTo.
CygnusListener.prototype.exitRotateTo = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#LookAt.
CygnusListener.prototype.enterLookAt = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#LookAt.
CygnusListener.prototype.exitLookAt = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#SetSprite.
CygnusListener.prototype.enterSetSprite = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetSprite.
CygnusListener.prototype.exitSetSprite = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#SetColor.
CygnusListener.prototype.enterSetColor = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetColor.
CygnusListener.prototype.exitSetColor = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#SetSize.
CygnusListener.prototype.enterSetSize = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetSize.
CygnusListener.prototype.exitSetSize = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#SetBounce.
CygnusListener.prototype.enterSetBounce = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetBounce.
CygnusListener.prototype.exitSetBounce = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#SetDraggable.
CygnusListener.prototype.enterSetDraggable = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetDraggable.
CygnusListener.prototype.exitSetDraggable = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#SetStatic.
CygnusListener.prototype.enterSetStatic = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetStatic.
CygnusListener.prototype.exitSetStatic = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#ModeChange.
CygnusListener.prototype.enterModeChange = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#ModeChange.
CygnusListener.prototype.exitModeChange = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#value.
GameListener.prototype.enterValue = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#value.
// value : scalar | amount | distance | random_int | settable
// (None of the possible children are recursive)
GameListener.prototype.exitValue = function(ctx) {

	// Value ctx has a single immediate child,
	// scalar, amount, distance, random_int, or settable.
	// Each one has a custom value property in their ctx,
	// which has been built up by their own listener funcs.
	// Add that as the argument for a new action, get_value.

	// Set this node's custom 'value' property to its child's value
	ctx.value = ctx.getChild(0).value;
	
	//ctx.value = this.data.createAction("get_value",args);
	//console.log("---value in exitValue for", ctx.getText() ,":", ctx.getChild(0).value);

};


// Enter a parse tree produced by CygnusParser#scalar.
GameListener.prototype.enterScalar = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#scalar.
GameListener.prototype.exitScalar = function(ctx) {

	// Add scalar integer value to a new property for this ctx
	// Convert scalar's NUM token from string to integer
	ctx.value = new Value ("literal",[parseInt( ctx.NUM().getText() )]);
	
};

// Enter a parse tree produced by CygnusParser#amount.
CygnusListener.prototype.enterAmount = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#amount.
// amount : 'amount' '(' (WORD|'clear') ')'; // WORD should specify a color
CygnusListener.prototype.exitAmount = function(ctx) {

	var args = [ ctx.getChild(2).getText() ];
	ctx.value = new Value ("amount", args);
};


// Enter a parse tree produced by CygnusParser#distance.
CygnusListener.prototype.enterDistance = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#distance.
CygnusListener.prototype.exitDistance = function(ctx) {

	// Arguments for 'distance' operation
	// e.g., ['e_1_XX_', 'e_2_XX_', 'nearest']
	var args = [ 
		ctx.entity(0).identifier().getText(), 
		ctx.entity(1).identifier().getText(), 
		ctx.look_criterion().getText()
	];
	
	ctx.value = new Value ("distance",args);

};


// Enter a parse tree produced by CygnusParser#random_int.
CygnusListener.prototype.enterRandom_int = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#random_int.
CygnusListener.prototype.exitRandom_int = function(ctx) {

	// Arguments for 'random_int' operation. E.g., [0,360]
	var args = [ 
		ctx.scalar(0).value,
		ctx.scalar(1).value
	];
	
	ctx.value = new Value ("random_int",args);
};

// Enter a parse tree produced by CygnusParser#settable.
GameListener.prototype.enterSettable = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#settable.
GameListener.prototype.exitSettable = function(ctx) {

	// Settable could either be used as a value or a reference
	// (something to set something else's value, or something which itself is being set)
	// ctx.value is used for the former case, and ctx.reference for the latter

	// Could also be a resource or an entity property

	var isResource = ( ctx.getChild(0) instanceof CygnusParser.CygnusParser.ResourceContext );
	var isProperty = ( ctx.getChild(0) instanceof CygnusParser.CygnusParser.PropertyContext );

	if (isResource) {

		var resourceID = ctx.resource().identifier().getText();		
		ctx.value = new Value ("resource",[resourceID]);
		ctx.reference = resourceID;

	} else if (isProperty) {

		var entityID = ctx.property().entity().identifier().getText();
		var propertyName = ctx.property().identifier().getText();

		ctx.value = new Value ("property",[entityID, propertyName]);
		ctx.reference = [entityID, propertyName];

	}

};


// Enter a parse tree produced by CygnusParser#settable_point.
GameListener.prototype.enterSettable_point = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#settable_point.
// settable_point 	: entity | property ; 
GameListener.prototype.exitSettable_point = function(ctx) {

	var isEntity = ( ctx.getChild(0) instanceof CygnusParser.CygnusParser.EntityContext );
	var isProperty = ( ctx.getChild(0) instanceof CygnusParser.CygnusParser.PropertyContext );

	if (isEntity) {
		ctx.point = new Point ("entity",[ctx.entity().identifier().getText()]);

	} else if (isProperty) {
		var entityID = ctx.property().entity().identifier().getText();
		var propertyName = ctx.property().identifier().getText();

		ctx.point = new Point ("property",[entityID, propertyName]);
	}

};


// Enter a parse tree produced by CygnusParser#settable_bool.
GameListener.prototype.enterSettable_bool = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#settable_bool.
GameListener.prototype.exitSettable_bool = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#point.
GameListener.prototype.enterPoint = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#point.
// point : location | 'cursor' | pool | settable_point
GameListener.prototype.exitPoint = function(ctx) {

	if (ctx.getText() === "cursor") {
		ctx.point = new Point ("cursor");
	} else {
		ctx.point = ctx.getChild(0).point;
	}
};


// Enter a parse tree produced by CygnusParser#bool.
GameListener.prototype.enterBool = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#bool.
GameListener.prototype.exitBool = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#location.
GameListener.prototype.enterLocation = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#location.
// location : 'location' '(' row ',' col ')' ;
GameListener.prototype.exitLocation = function(ctx) {

	ctx.point = new Point ("location",[ctx.row().getText(), ctx.col().getText()]);

};


// Enter a parse tree produced by CygnusParser#pool_decl.
CygnusListener.prototype.enterPool_decl = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#pool_decl.
CygnusListener.prototype.exitPool_decl = function(ctx) {

	var poolID = ctx.pool_name().getText();
	var row = ctx.location().row().getText();
	var col = ctx.location().col().getText();
	var locationType = ctx.spawn_type(0).getText();
	var withinType = ctx.spawn_type(1).getText();

	this.data.registerPool (poolID);
	this.data.registerSubpool (poolID,row,col,locationType,withinType);

	ctx.point = new Point ("pool",[poolID]);

};


// Enter a parse tree produced by CygnusParser#pool.
CygnusListener.prototype.enterPool = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#pool.
CygnusListener.prototype.exitPool = function(ctx) {

	var poolID = ctx.pool_name().getText();
	ctx.point = new Point ("pool",[poolID]);

};


// Enter a parse tree produced by CygnusParser#pool_name.
CygnusListener.prototype.enterPool_name = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#pool_name.
CygnusListener.prototype.exitPool_name = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#control_event.
GameListener.prototype.enterControl_event = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#control_event.
GameListener.prototype.exitControl_event = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#privacy_mode.
GameListener.prototype.enterPrivacy_mode = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#privacy_mode.
GameListener.prototype.exitPrivacy_mode = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#boundary_type.
GameListener.prototype.enterBoundary_type = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#boundary_type.
GameListener.prototype.exitBoundary_type = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#look_criterion.
GameListener.prototype.enterLook_criterion = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#look_criterion.
GameListener.prototype.exitLook_criterion = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#spawn_type.
GameListener.prototype.enterSpawn_type = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#spawn_type.
GameListener.prototype.exitSpawn_type = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#loop_type.
GameListener.prototype.enterLoop_type = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#loop_type.
GameListener.prototype.exitLoop_type = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#direction.
GameListener.prototype.enterDirection = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#direction.
GameListener.prototype.exitDirection = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#row.
GameListener.prototype.enterRow = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#row.
GameListener.prototype.exitRow = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#col.
GameListener.prototype.enterCol = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#col.
GameListener.prototype.exitCol = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#angular_direction.
GameListener.prototype.enterAngular_direction = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#angular_direction.
GameListener.prototype.exitAngular_direction = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#button.
GameListener.prototype.enterButton = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#button.
GameListener.prototype.exitButton = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#button_state.
GameListener.prototype.enterButton_state = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#button_state.
GameListener.prototype.exitButton_state = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#reading.
GameListener.prototype.enterReading = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#reading.
GameListener.prototype.exitReading = function(ctx) {
};



exports.GameListener = GameListener;
