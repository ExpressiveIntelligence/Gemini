# Gemini

Gemini is an intent-based abstract game generator, meaning it takes design intents as input and generates games that satisfy those intents. 

## How it works

Gemini works by running a set of generation files and a designer-specified intent file (all written in AnsProlog) through an Answer Set Programming (ASP) grounder and solver, [Clingo](https://potassco.org/). Clingo will return a number of different solutions (i.e., games, written as logic programs) that each satisfy all the constraints given in the generation and intent files. (You'd usually specify to Clingo a maximum number of solutions to return, otherwise it'll run for a while and may return on the order of hundreds of different games.) See examples of game files in the example-games subdirectory.

Once ASP solutions have been generated by Clingo, they are read and modified by the simulate.py Python program, which usese a genetic algorithm to tweak parameter values to ensure the game is playable with some input, with preference for games that end. The Python program outputs logical descriptions of games as Cygnus programs. Cygnus is a general game description language developed alongside Gemini. 

## What to do with this repository

There are different things you can do with the materials in this repository.

- **Generate games** (as Cygnus .lp files) on the command line using Clingo - see instructions for how in the asp subdirectory README
- **Make a new design intent** and generate games using that as input - create a new .lp file after the examples in asp/intents
- **Edit Gemini itself** - by modifying the .lp files in asp/generation

## Further Reading 

**Papers:**

- [Germinate: A Mixed-Initiative Casual Creator for Rhetorical Games](https://mkremins.github.io/publications/Germinate_AIIDE2020.pdf). Max Kreminski, Melanie Dickinson, Joseph C. Osborn, Adam Summerville, Michael Mateas, and Noah Wardrip‑Fruin. Artificial Intelligence and Interactive Digital Entertainment Conference (AIIDE), October 2020.
- [Is Your Game Generator Working? Evaluating Gemini, an Intentional Generator](https://www.aaai.org/ojs/index.php/AIIDE/article/view/5225/). Joseph C. Osborn, Melanie Dickinson, Barrett Anderson, Adam Summerville, Jill Denner, David Torres, Noah Wardrip-Fruin, and Michael Mateas. Artificial Intelligence and Interactive Digital Entertainment Conference (AIIDE), October 2019.
- [Gemini: Bidirectional Generation and Analysis of Games via ASP](https://www.aaai.org/ocs/index.php/AIIDE/AIIDE18/paper/viewPaper/18086). Adam Summerville, Chris Martens, Ben Samuel, Joe Osborn, Noah Wardrip-Fruin, and Michael Mateas. Artificial Intelligence and Interactive Digital Entertainment Conference (AIIDE), September 2018.
- [From Mechanics to Meaning](https://ieeexplore.ieee.org/abstract/document/8078288). Adam Summerville, Chris Martens, Sarah Harmon, Michael Mateas, Noah Wardrip-Fruin, and Arnav Jhala. Transactions on Computational Intelligence and AI in Games (TCIAIG) Special Issue on AI-based and AI-assisted Game Design, October 2017.
- [Leveraging Procedural Narrative and Gameplay to Address Controversial Topics](http://computationalcreativity.net/iccc2017/CCSJ/samuel.pdf). Ben Samuel, Jacob Garbe, Adam Summerville, Jill Denner, Sarah Harmon, Gina Lepore, Chris Martens, Noah Wardrip-Fruin, and Michael Mateas. Workshop on Computational Creativity and Social Justice (CCSJ) at the International Conference on Computational Creativity (ICCC), June 2017.
- [Proceduralist Readings, Procedurally](https://www.aaai.org/ocs/index.php/AIIDE/AIIDE16/paper/viewPaper/14061). Chris Martens, Adam Summerville, Michael Mateas, Joseph Osborn, Sarah Harmon, Noah Wardrip-Fruin, and Arnav Jhala. Workshop on Experimental AI in Games (EXAG) at the Artificial Intelligence and Interactive Digital Entertainment Conference (AIIDE), October 2016.


Gemini was originally developed for a project called _Emma's Journey_. See the [ClimateChange](https://github.com/LudoNarrative/ClimateChange) repository for its original development and the [LudoNarrative](https://github.com/LudoNarrative/) organization for more early repositories related to Gemini.