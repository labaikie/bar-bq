
Game Name: "Bar-B-Q for GA"
Link: http://labaikie.github.io/project-1
Trello: https://trello.com/b/E106DyAw/project-1-bbq-game
GitHub: https://github.com/labaikie/bar-bq



1. Introduction
    - "Bar-B-Q for GA" is a 2-player click, drag & drop game.
    - Players take turns to play 60 seconds of grill time in each round.
    - The goal of the game is to earn as many points as possible by grilling food & matching them with the right side order, according to the current order list displayed in the upper left-corner of the game screen.
    - Each food has different cook, perfect cook, and burn times.
    - If food is burned, the player is penalized by having points deducted from the overall score.
    - No installation is required to play.

2. Technologies & Approach
    - The game is developed using HTML, CSS, Javascrpt, JQuery & JQuery UI.
    - Constructor functions were built to instantiate different food items (with properties such as name, cook times & points), as well as menu items (with properties such as main ingredients & side orders) easily.
    - The constructor functions also allow the performance of same functions on different food & menu objects.
    - The primary use of JQuery UI has been to create draggable & droppable elements.
    - The game utilizes setInterval() function to keep track of both the game play time and the grill time for each food item.
    - At different grill times, the image of the food items are swopped to simulate grilling.
    - Images and the grill sound were taken from the web.
    - The start, change player, and end screens' display methods change dynamically to have them appear at certain stages of the game. The same CSS styling are applied to the three screens.
    - Each player's data (such as name, color, score) are stored in an object.

3. Unsolved Problems
    - The codes can be cleaner...
    - Burned food tend to shift left on their own whenever a new food item is placed on the grill.
    - The game cannot be paused in the middle of a player's round.
    - The game does not allow the selection of single-player mode.



Developer: La Baik
