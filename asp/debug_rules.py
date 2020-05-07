"""
ASP debugging script by Adam Summerville
https://github.com/LudoNarrative/ClimateChange/blob/9bdfa92dd66c585c50f25c6bd309a189f8f03205/GameGenerator/ASP_cleaned/debug_rules.py

Adam says:

> The basic gist of it is to run it like so:
> python debug_rules.py $(./common.sh) intents/your_intent.lp
>
> (i.e. run it with everything) -- but the key is that the constraints file should be first.
> It then performs a binary search -- pruning all of the lower constraints in the generation_constraints.
> E.g. it starts by pruning the lower half -- if that is satisfiable it prunes the lower 25%,
> else it prunes the lower 75% -- stopping when it finds the earliest rule that causes the generation to be unsatisfiable.
>
> Now, this is obviously not guaranteed to give you a good result
> (it is often a clique of rules that mean it is unsatisfiable),
> but it generally can give you enough direction to find out why it is spitting out unsatisfiable.
>
> As a note, a UX pattern that I found useful was to "shuffle" rules to the top/bottom.
> If you are convinced a rule is ok (but turns up as the one that makes it unsatisfiable)
> move it to the top of the file to try to find other offending rules.
> Conversely, move a rule you suspect is the lone offender to the bottom to see if thats the case.
"""

import subprocess
import json
import collections
import random
import sys

def solve(*args):
    """Run clingo with the provided argument list and return the parsed JSON result."""
    
    args = ['clingo','--outf=2']+args[0]
    print args
    print ' '.join(args)
    clingo = subprocess.Popen(
        ' '.join(args),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True
        )
    out, err = clingo.communicate()
    if err:
        print err
    return parse_json_result(out)
def parse_json_result(out):
    """Parse the provided JSON text and extract a dict
    representing the predicates described in the first solver result."""

    result = json.loads(out)
    
    if  len(result['Call']) <= 0:
        return False
    if 'Witnesses' not in result['Call'][0]:
        return False
    if len(result['Call'][0]['Witnesses']) <= 0:
        return False
    
    return True
    

if __name__ == '__main__':

    modifiable = sys.argv[1]
    args = sys.argv[2:]
    
    text = open(modifiable).read()
    rules = text.split('.')
    passes = False
    minVal = 0
    maxVal = len(rules)
    
    ruleCounter = (minVal + maxVal)/2
    best = minVal
    
    passes = solve([modifiable]+args)
    if passes:
        print 'PASSES'
        exit()
    while ruleCounter != minVal and ruleCounter != maxVal:
        print ruleCounter
        with open('mod.lp','w') as modfile:
            modfile.write('.'.join(rules[:ruleCounter])+'.')
        sys.stdout.flush()
        print ['mod.lp'] + args
        passes = solve(['mod.lp'] + args)
        if passes:
            minVal = ruleCounter
            best = minVal
        else:
            maxVal = ruleCounter
        ruleCounter = (minVal + maxVal)/2
    
        print rules[ruleCounter]
        with open('mod.lp','w') as modfile:
            modfile.write('.'.join(rules[:minVal+1])+'.')
