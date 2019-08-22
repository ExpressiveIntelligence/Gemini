label(resource(r_1_XX_),effort,write).
label(entity(e_1_XX_),person).

entity(e_1_XX_).

resource(r_1_XX_).

many(entity(e_1_XX_)).

initialize(set_value(resource(r_1_XX_),scalar(0))).
initialize(fill(all,orange)).
initialize(fill(location(middle,center),blue)).
initialize(set_draggable(entity(e_1_XX_),true)).
initialize(add(entity(e_1_XX_),scalar(1),location(middle,center))).
initialize(set_sprite(entity(e_1_XX_),triangle)).
initialize(set_color(entity(e_1_XX_),red)).

controlLogic(draggable(entity(e_1_XX_))).

pool(entity(e_1_XX_),location(top,left),random,ordered).
pool(entity(e_1_XX_),location(top,center),random,ordered).
pool(entity(e_1_XX_),location(top,right),random,ordered).
pool(entity(e_1_XX_),location(middle,left),random,ordered).
pool(entity(e_1_XX_),location(middle,center),random,ordered).
pool(entity(e_1_XX_),location(middle,right),random,ordered).
pool(entity(e_1_XX_),location(bottom,left),random,ordered).
pool(entity(e_1_XX_),location(bottom,center),random,ordered).
pool(entity(e_1_XX_),location(bottom,right),random,ordered).

boundary(closed).

initialize(set_value(resource(r_1_XX_),scalar(0))).
initialize(set_value(resource(r_1_XX_),scalar(1))).

precondition(le(scalar(5),scalar(3)),outcome(o_2_XX_)).
result(outcome(o_2_XX_),decrease_over_time(property(entity(e_1_XX_),health),scalar(7))).
result(outcome(o_2_XX_),increase_over_time(property(entity(e_1_XX_),health),scalar(1))).

precondition(control_event(click(entity(e_2_XX_))),outcome(o_4_XX_)).
result(outcome(o_4_XX_),add(entity(e_1_XX_),scalar(1),entity(e_2_XX_))).

precondition(control_event(click(entity(e_1_XX_))),outcome(o_3_XX_)).
result(outcome(o_3_XX_),add(entity(e_1_XX_),scalar(1),property(entity(e_2_XX_),health))).