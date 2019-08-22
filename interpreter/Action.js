/*
 *
 * Possible action operations and their corresponding args:
 * 		add_entity, 	[entityID, value, point] - where value can be passed to evaluate(value)
 *		delete_entity, 	[entityID] - the entity instance who was bound in this rule's precondition
 *		draw_color, 	[point, color]
 * 		clear_color, 	[point]
 * 		fill_color, 	either ["all"] or [rowNum, colNum]
 *		increase_value, [variable, value]
 *		
 * 		
 action 
	: 'add' '(' entity ',' value ',' point ')'
	| 'delete' '(' entity ')' 
	| 'draw' '(' point ',' WORD ')' // WORD should be a color
	| 'clear' '(' point ')'
	| 'fill' '(' ('all'|location) ',' WORD ')' // WORD should be a color

	| 'increase' '(' settable ',' value ')'
	| 'decrease' '(' settable ',' value ')'
	| 'increase_over_time' '(' settable ',' value ')'
	| 'decrease_over_time' '(' settable ',' value ')'

	| 'set_value' '(' settable ',' value ')'
	| 'set_point' '(' settable_point ',' point ')'
	| 'set_bool' '(' settable_bool ',' bool ')'

	| 'moves' '(' entity ',' direction ',' value ')' // For consistency, consider changing to 'move'
	| 'move_toward' '(' entity ',' point ',' value ')'
	| 'move_away' '(' entity ',' point ',' value ')'

	| 'set_acceleration' '(' entity ',' ( direction | point ) ',' value ')' 
	| 'apply_restitution' '(' entity ',' entity ')'
	| 'rotates' '(' entity ',' angular_direction ',' value ')' // Consider changing to 'rotate'
	| 'rotate_to' '(' entity ',' value ')' // Red in BNF but used in games now.
	| 'look_at' '(' entity ',' point ',' look_criterion ')'

	| 'set_sprite' '(' entity ',' WORD ')' // WORD should be a sprite
	| 'set_color' '(' entity ',' WORD ')' // WORD should be a color
	| 'set_size' '(' entity ',' value ')' // Red in BNF
	| 'set_bounce' '(' entity ',' value ')' // Red in BNF
	| 'set_draggable' '(' entity ',' bool ')'
	| 'set_static' '(' entity ',' bool ')'

	| 'mode_change' '(' WORD ')' // WORD should be a mode
	;
 */

function Action (operation="", args=[], text="") {

	this.operation = operation;
	this.args = args;
	this.text = text;


	var applyAction = function (operation, args) {

		// switch on operation
		// sometimes returning a value where appropriate

		switch (operation) {

			case 'set_value' : 
				console.log("apply set value action");
				

		}
		
	}

	var evaluateValue = function () {

	}

	
}