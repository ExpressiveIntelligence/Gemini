#const min_entities = 1.
#const max_entities = 2.
#const min_resources = 1.
#const max_resources = 1.
#const min_outcomes = 2.
#const max_outcomes = 8.
#const min_timers = 0.
#const max_timers = 2.

#const min_end_outcomes = 1.
#const max_end_outcomes = 1.
#const max_resource_change_per = 2.
#const max_conditions_per = 2.



required(hand_eye_coordination).
:- not reading(hand_eye_coordination,game).

required(risk_reward).
:- not reading(risk_reward,control_event(_)).


label(resource(r(1)),concentration,write) :- reading(good,resource(r(1))).
:- not reading(good,resource(r(1))).



label(entity(e(1)),e1).

required(maintenance).
:- not reading(maintenance,resource(r(1))).

:- not action(mode_change(game_loss)).
:- 2 {action(mode_change(N))}.

attract_mode :- precondition(overlaps(E1,E2,true),O),
						reading(bad,O).	
						
:- not attract_mode.

:- outcome(repeled_from_cursor_entity_e_1_XX__XX__XX_).
:- outcome(repeled_from_cursor_entity_e_2_XX__XX__XX_).
