// Generated from Cygnus.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by CygnusParser.
function CygnusListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

CygnusListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
CygnusListener.prototype.constructor = CygnusListener;

// Enter a parse tree produced by CygnusParser#game.
CygnusListener.prototype.enterGame = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#game.
CygnusListener.prototype.exitGame = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#declaration.
CygnusListener.prototype.enterDeclaration = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#declaration.
CygnusListener.prototype.exitDeclaration = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#comment_section.
CygnusListener.prototype.enterComment_section = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#comment_section.
CygnusListener.prototype.exitComment_section = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#separator.
CygnusListener.prototype.enterSeparator = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#separator.
CygnusListener.prototype.exitSeparator = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#entity.
CygnusListener.prototype.enterEntity = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#entity.
CygnusListener.prototype.exitEntity = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#resource.
CygnusListener.prototype.enterResource = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#resource.
CygnusListener.prototype.exitResource = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#flag.
CygnusListener.prototype.enterFlag = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#flag.
CygnusListener.prototype.exitFlag = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#timer.
CygnusListener.prototype.enterTimer = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#timer.
CygnusListener.prototype.exitTimer = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#property.
CygnusListener.prototype.enterProperty = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#property.
CygnusListener.prototype.exitProperty = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#label.
CygnusListener.prototype.enterLabel = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#label.
CygnusListener.prototype.exitLabel = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#singular.
CygnusListener.prototype.enterSingular = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#singular.
CygnusListener.prototype.exitSingular = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#many.
CygnusListener.prototype.enterMany = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#many.
CygnusListener.prototype.exitMany = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#boundary.
CygnusListener.prototype.enterBoundary = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#boundary.
CygnusListener.prototype.exitBoundary = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#control_logic.
CygnusListener.prototype.enterControl_logic = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#control_logic.
CygnusListener.prototype.exitControl_logic = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#timer_logic.
CygnusListener.prototype.enterTimer_logic = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#timer_logic.
CygnusListener.prototype.exitTimer_logic = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#initialize.
CygnusListener.prototype.enterInitialize = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#initialize.
CygnusListener.prototype.exitInitialize = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#precondition.
CygnusListener.prototype.enterPrecondition = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#precondition.
CygnusListener.prototype.exitPrecondition = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#result.
CygnusListener.prototype.enterResult = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#result.
CygnusListener.prototype.exitResult = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#label_name.
CygnusListener.prototype.enterLabel_name = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#label_name.
CygnusListener.prototype.exitLabel_name = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#outcome_name.
CygnusListener.prototype.enterOutcome_name = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#outcome_name.
CygnusListener.prototype.exitOutcome_name = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#identifier.
CygnusListener.prototype.enterIdentifier = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#identifier.
CygnusListener.prototype.exitIdentifier = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#condition.
CygnusListener.prototype.enterCondition = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#condition.
CygnusListener.prototype.exitCondition = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#Add.
CygnusListener.prototype.enterAdd = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Add.
CygnusListener.prototype.exitAdd = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#Delete.
CygnusListener.prototype.enterDelete = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Delete.
CygnusListener.prototype.exitDelete = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#Draw.
CygnusListener.prototype.enterDraw = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Draw.
CygnusListener.prototype.exitDraw = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#Clear.
CygnusListener.prototype.enterClear = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Clear.
CygnusListener.prototype.exitClear = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#Fill.
CygnusListener.prototype.enterFill = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Fill.
CygnusListener.prototype.exitFill = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#Increase.
CygnusListener.prototype.enterIncrease = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Increase.
CygnusListener.prototype.exitIncrease = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#Decrease.
CygnusListener.prototype.enterDecrease = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#Decrease.
CygnusListener.prototype.exitDecrease = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#IncreaseOverTime.
CygnusListener.prototype.enterIncreaseOverTime = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#IncreaseOverTime.
CygnusListener.prototype.exitIncreaseOverTime = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#DecreaseOverTime.
CygnusListener.prototype.enterDecreaseOverTime = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#DecreaseOverTime.
CygnusListener.prototype.exitDecreaseOverTime = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#SetValue.
CygnusListener.prototype.enterSetValue = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#SetValue.
CygnusListener.prototype.exitSetValue = function(ctx) {
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
CygnusListener.prototype.enterValue = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#value.
CygnusListener.prototype.exitValue = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#scalar.
CygnusListener.prototype.enterScalar = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#scalar.
CygnusListener.prototype.exitScalar = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#amount.
CygnusListener.prototype.enterAmount = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#amount.
CygnusListener.prototype.exitAmount = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#distance.
CygnusListener.prototype.enterDistance = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#distance.
CygnusListener.prototype.exitDistance = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#random_int.
CygnusListener.prototype.enterRandom_int = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#random_int.
CygnusListener.prototype.exitRandom_int = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#settable.
CygnusListener.prototype.enterSettable = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#settable.
CygnusListener.prototype.exitSettable = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#settable_point.
CygnusListener.prototype.enterSettable_point = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#settable_point.
CygnusListener.prototype.exitSettable_point = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#settable_bool.
CygnusListener.prototype.enterSettable_bool = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#settable_bool.
CygnusListener.prototype.exitSettable_bool = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#point.
CygnusListener.prototype.enterPoint = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#point.
CygnusListener.prototype.exitPoint = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#bool.
CygnusListener.prototype.enterBool = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#bool.
CygnusListener.prototype.exitBool = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#location.
CygnusListener.prototype.enterLocation = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#location.
CygnusListener.prototype.exitLocation = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#pool_decl.
CygnusListener.prototype.enterPool_decl = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#pool_decl.
CygnusListener.prototype.exitPool_decl = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#pool.
CygnusListener.prototype.enterPool = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#pool.
CygnusListener.prototype.exitPool = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#pool_name.
CygnusListener.prototype.enterPool_name = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#pool_name.
CygnusListener.prototype.exitPool_name = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#control_event.
CygnusListener.prototype.enterControl_event = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#control_event.
CygnusListener.prototype.exitControl_event = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#privacy_mode.
CygnusListener.prototype.enterPrivacy_mode = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#privacy_mode.
CygnusListener.prototype.exitPrivacy_mode = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#boundary_type.
CygnusListener.prototype.enterBoundary_type = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#boundary_type.
CygnusListener.prototype.exitBoundary_type = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#look_criterion.
CygnusListener.prototype.enterLook_criterion = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#look_criterion.
CygnusListener.prototype.exitLook_criterion = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#spawn_type.
CygnusListener.prototype.enterSpawn_type = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#spawn_type.
CygnusListener.prototype.exitSpawn_type = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#loop_type.
CygnusListener.prototype.enterLoop_type = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#loop_type.
CygnusListener.prototype.exitLoop_type = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#direction.
CygnusListener.prototype.enterDirection = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#direction.
CygnusListener.prototype.exitDirection = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#row.
CygnusListener.prototype.enterRow = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#row.
CygnusListener.prototype.exitRow = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#col.
CygnusListener.prototype.enterCol = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#col.
CygnusListener.prototype.exitCol = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#angular_direction.
CygnusListener.prototype.enterAngular_direction = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#angular_direction.
CygnusListener.prototype.exitAngular_direction = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#button.
CygnusListener.prototype.enterButton = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#button.
CygnusListener.prototype.exitButton = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#button_state.
CygnusListener.prototype.enterButton_state = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#button_state.
CygnusListener.prototype.exitButton_state = function(ctx) {
};


// Enter a parse tree produced by CygnusParser#reading.
CygnusListener.prototype.enterReading = function(ctx) {
};

// Exit a parse tree produced by CygnusParser#reading.
CygnusListener.prototype.exitReading = function(ctx) {
};



exports.CygnusListener = CygnusListener;