## INTRODUCTION 

I made this BreakOut game using HTML, CSS & JavaScript. It is a  part of my childhood game collection. 


## TECHNOLOGIES 
 
                - HTML
                - CSS 
                - JavaScript
                - VS Code


## FEATURES 
          
            - Move the paddle left and right to keep the ball in play
            - Break blocks to earn points
            - Watch the difficulty increase as new rows generate
            - Restart the game after losing
            - Track score in real-time


## NEW FEATURES

                1. Level System
                                >The game now progresses automatically
                                >Blocks increase with each level
                                >Ball speed increases

                         => Before: one static level
                         => Now: infinite progression system

                2. Lives System
                                >You don’t lose instantly anymore
                                >Ball resets after each miss
                                >Game ends only when lives = 0
                                >Fixed negative lives bug

                         => Before: instant game over
                         => Now: actual gameplay loop

                3. Start + Pause System
                                >ENTER → start game
                                >P → pause/resume
                                >Game doesn’t run in background anymore

                         => Before: game runs immediately
                         => Now: controlled flow like real games

                4. High Score System
                                >Uses localStorage
                                >Saves the best score even after refresh
                                >Updates only when beaten

                         => Before: score resets always
                         => Now: persistent progress

                5. Background System
                                >Gradient background added
                                >Replaced plain black screen

                         => Before: static black
                         => Now: visually styled game

                6. Fixed Lives Going Negative
                                >Prevented multiple frame hits
                                >Added proper life handling logic
                                
                7. Fixed Game Flow Order
                                >Start → Pause → Game → Game Over handled correctly
                                >Prevented update loop bugs
                                
                8. Removed Rendering Conflicts
                                >Removed duplicate clearRect()
                                >Fixed background flickering
                                
                9. Fixed Critical Typos
                
                10. HUD (Score UI) Improved
                                >Score, Level, Lives, High Score aligned properly
                                >No more text going outside canvas
                                
                                   GAME STRUCTURE IMPROVED
                => game now has:

                                >Proper game states (start/pause / game over)
                                >Separated logic (update/draw/helpers)
                                >Cleaner flow
                                >Better readability

## KEYBOARD SHORTCUTS

                     => ← Arrow Left → Move paddle left
                     => → Arrow Right → Move paddle right
                     => Space → Restart game after Game Over


## PROCESS I FOLLOWED TO MAKE IT

                               - HTML Setup
                               - Canvas Initialization
                               - Game Objects
                               - Game Loop
                               - Movement & Controls
                               - Collision Detection
                               - Game Logic


## WHAT I LEARNED 

                - How to use the HTML Canvas API
                - How game loops work using requestAnimationFrame()
                - Basics of collision detection
                - Managing game state (score, reset, game over)
                - Handling user input with keyboard events
                - Structuring a project with HTML, CSS, and JavaScript


## HOW IT CAN BE IMPROVED 

                         - Add sound effects 
                         - Add levels with increasing difficulty
                         - Improve collision accuracy (real physics feel)
                         - Add lives instead of instant Game Over
                         - Add start screen / pause feature
                         - Add mobile touch controls
                         - Add high score saving system
                         - Improve UI (animations, colors, effects)



## PREVIEW 



https://github.com/user-attachments/assets/1400f9dd-31ad-4e4e-bd0c-05d1e7142e9c

