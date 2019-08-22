
grammar Cygnus;

/* Parser Rules */

// A game is made up of one or more declarations 
// (TODO: followed by an optional instructions section, which is skipped)
game : declaration* comment_section? EOF ; 

declaration  
	: 	
	( entity 
	| resource 
	| flag 
	| label
	| singular
	| many
	| boundary
	| control_logic // (Redundant with initialize(set_draggable(..)). Will be removed from Cygnus eventually)
	| timer_logic
	| pool_decl

	| initialize
	| precondition
	| result

	| reading // Reading rules are not technically in the Cygnus language, but often exported with them
	) '.'; // A declaration always has a period at the end

comment_section : separator .* ;

separator : '='+ ;

entity 	 : 'entity' '(' identifier ')';
resource : 'resource' '(' identifier ')';
flag 	 : 'flag' '(' identifier ')';
timer 	 : 'timer' '(' identifier ')';

property : 'property' '(' entity ',' identifier ')';

label 
	: 'label' '(' resource ',' label_name ',' privacy_mode ')'
	| 'label' '(' entity ',' label_name ')'
	;

singular : 'singular' '(' entity ')';
many 	 : 'many' '(' entity ')';
boundary : 'boundary' '(' boundary_type ')';

control_logic : 'controlLogic' '(' 'draggable' '(' entity ')' ')';

timer_logic : 'timer_logic' '(' timer ',' value ',' loop_type ')';

initialize   : 'initialize' '(' action ')' ;

precondition : 'precondition' '(' condition ',' outcome_name ')';
result		 : 'result' '(' outcome_name ',' action ')';



// TODO: a label can't have spaces right now (WS ignored). Decide whether we want to allow.
label_name // A resource or entity label can be in quotes or not
	: identifier
	| '"' identifier '"'
	;

outcome_name 
	: 'outcome' '(' identifier ')'
	| 'tick'
	;

identifier
	: WORD
	| WORD '(' WORD ')'
	| WORD '(' NUM ')' // An identifier can't be a number by itself, but can have a nested number, e.g., 'e(1)''
	;

condition 
	: 'ge' '(' value ',' value ')'
	| 'le' '(' value ',' value ')'
	| 'overlaps' '(' entity ',' entity ',' bool ')'
	| 'control_event' '(' control_event ')'
	| 'timer_elapsed' '(' (timer|identifier) ')' // Should require timer only - need to fix in Gemini.
	| 'tick'
	; 

// Label the outermost alternatives of the action rule using the # operator 
// Tells Antlr to generate a separate listener method for each alternative of action
action 
	: 'add' '(' entity ',' value ',' point ')' 	# Add
	| 'delete' '(' entity ')' 					# Delete
	| 'draw' '(' point ',' WORD ')' 			# Draw 		// WORD should be a color
	| 'clear' '(' point ')'						# Clear
	| 'fill' '(' ('all'|location) ',' WORD ')' 	# Fill 		// WORD should be a color

	| 'increase' '(' settable ',' value ')'				# Increase
	| 'decrease' '(' settable ',' value ')'				# Decrease
	| 'increase_over_time' '(' settable ',' value ')'	# IncreaseOverTime
	| 'decrease_over_time' '(' settable ',' value ')'	# DecreaseOverTime

	| 'set_value' '(' settable ',' value ')'			# SetValue
	| 'set_point' '(' settable_point ',' point ')'		# SetPoint
	| 'set_bool' '(' settable_bool ',' bool ')'			# SetBool

	| 'moves' '(' entity ',' direction ',' value ')' 	# Move // For consistency, consider changing to 'move'
	| 'move_toward' '(' entity ',' point ',' value ')'	# MoveToward
	| 'move_away' '(' entity ',' point ',' value ')'	# MoveAway

	| 'set_acceleration' '(' entity ',' ( direction | point ) ',' value ')' 	# SetAcceleration
	| 'apply_restitution' '(' entity ',' entity ')'								# ApplyRestitution
	| 'rotates' '(' entity ',' angular_direction ',' value ')' 		# Rotate // Consider changing to 'rotate'
	| 'rotate_to' '(' entity ',' value ')' 							# RotateTo // Red in BNF but used in games now.
	| 'look_at' '(' entity ',' point ',' look_criterion ')'			# LookAt

	| 'set_sprite' '(' entity ',' WORD ')' 		# SetSprite 	// WORD should be a sprite
	| 'set_color' '(' entity ',' WORD ')' 		# SetColor 		// WORD should be a color
	| 'set_size' '(' entity ',' value ')' 		# SetSize 		// Red in BNF
	| 'set_bounce' '(' entity ',' value ')' 	# SetBounce 	// Red in BNF				
	| 'set_draggable' '(' entity ',' bool ')'	# SetDraggable
	| 'set_static' '(' entity ',' bool ')'		# SetStatic 	// Only allowed in initialize()?

	| 'mode_change' '(' WORD ')' 				# ModeChange 	// WORD should be a mode
	;

value 
	: scalar
	| amount
	| distance
	| random_int
	| settable
	;

scalar : 'scalar' '(' NUM ')';

amount     : 'amount' '(' (WORD|'clear') ')'; // WORD should specify a color
distance   : 'distance' '(' entity ',' entity ',' look_criterion ')'; 
random_int : 'random_int' '(' scalar ',' scalar ')'; // Red in BNF - may not be implemented in Gemini, compiler, or both

settable 		: resource | property ;
settable_point 	: entity | property ; // Is an entity property only settable as a point if it's a point type? 
settable_bool	: flag | property ; // ""

point
	: location
	| 'cursor'
	| pool
	| settable_point
	;

bool : BOOL | settable_bool ;

location : 'location' '(' row ',' col ')' ;

pool_decl : 'pool' '(' pool_name ',' location ',' spawn_type ',' spawn_type ')' ;

pool : 'pool' '(' pool_name ')' ;

pool_name : entity | identifier ; // e.g., pool(entity(e_1_XX_)) or pool(pool1)

control_event 
	: 'click' '(' entity ')'
	| 'button' '(' button ',' button_state ')'
	;

privacy_mode  	: 'read' | 'write' | 'private'; 
boundary_type 	: 'closed' | 'torus';
look_criterion 	: 'nearest' | 'furthest' | 'random';
spawn_type 		: 'random' | 'ordered';
loop_type		: 'loop' | 'once' | 'repeat'; // 'once' and 'repeat' are red in BNF

direction 		: 'forward' | 'backward' | 'left' | 'right' | 'north' | 'south' | 'east' | 'west' ; // west is red in BNF
row 			: 'top' | 'middle' | 'bottom';
col 			: 'left' | 'center' | 'right';
angular_direction : 'cw' | 'ccw';

button 			: 'mouse' | 'key_up' | 'key_down' | 'key_left' | 'key_right' | 'key_space' ;
button_state 	: 'pressed' | 'held' | 'released' ;

reading : 'reading' '(' .*? ',' .*? ')';

BOOL: 'true' | 'false';

NUM : [0-9]+;

WORD: ([a-z]|[A-Z]|[0-9]|'_')+ ; 
WS : [ \t\r\n]+ -> skip ; // skip spaces, tabs, newlines (using Antlr's ->skip directive)

COMMENT: '%' ~[\n\r]* ( [\n\r] | EOF) -> channel(HIDDEN) ;
MULTILINE_COMMENT: '/*' ( MULTILINE_COMMENT | . )*? ('*/' | EOF) -> channel(HIDDEN);

ANYCHAR : . ;

