// =========================
// SCREEN SYSTEM
// =========================

const screens =
    document.querySelectorAll(
        ".screen"
    );


function showScreen(screen) {

    screens.forEach(
        function (currentScreen) {

            currentScreen.style.display =
                "none";

        }
    );


    screen.style.display =
        "flex";


    window.scrollTo(
        0,
        0
    );

}



// =========================
// REUSABLE DIALOGUE
// =========================

function setupDialogue(
    textElement,
    button,
    dialogue,
    finalButtonText,
    finished
) {

    let dialogueNumber =
        0;


    button.addEventListener(
        "click",
        function () {

            if (
                dialogueNumber <
                dialogue.length - 1
            ) {

                dialogueNumber++;


                textElement.textContent =
                    dialogue[
                        dialogueNumber
                    ];


                if (
                    dialogueNumber ===
                    dialogue.length - 1
                ) {

                    button.textContent =
                        finalButtonText;

                }

            } else {

                finished();

            }

        }
    );

}



// =========================
// BUTTON SOUND SYSTEM
// =========================

let audioContext =
    null;


function getAudioContext() {

    if (
        !audioContext
    ) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }


    return audioContext;

}


function playButtonSound() {

    const context =
        getAudioContext();


    const oscillator =
        context.createOscillator();


    const volume =
        context.createGain();


    oscillator.type =
        "sine";


    oscillator.frequency.setValueAtTime(
        520,
        context.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        390,
        context.currentTime +
        0.06
    );


    volume.gain.setValueAtTime(
        0.035,
        context.currentTime
    );


    volume.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime +
        0.07
    );


    oscillator.connect(
        volume
    );


    volume.connect(
        context.destination
    );


    oscillator.start();


    oscillator.stop(
        context.currentTime +
        0.07
    );

}


document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.closest(
                "button"
            )
        ) {

            playButtonSound();

        }

    }
);



// =========================
// START
// =========================

const startButton =
    document.getElementById(
        "start-btn"
    );


const zankaScreen =
    document.getElementById(
        "zanka-screen"
    );


startButton.addEventListener(
    "click",
    function () {

        showScreen(
            zankaScreen
        );

    }
);



// =========================
// ZANKA
// =========================

const zankaDialogueText =
    document.getElementById(
        "zanka-dialogue-text"
    );


const zankaNextButton =
    document.getElementById(
        "zanka-next-btn"
    );


const idiaScreen =
    document.getElementById(
        "idia-screen"
    );


const zankaDialogue = [

    "So you're the one everyone's making a fuss about.",

    "Hmph. Fine. I'll get this started.",

    "Happy birthday. Don't just let the day pass. Make it one worth remembering."

];


setupDialogue(

    zankaDialogueText,

    zankaNextButton,

    zankaDialogue,

    "Continue",

    function () {

        showScreen(
            idiaScreen
        );

    }

);



// =========================
// IDIA
// =========================

const idiaDialogueText =
    document.getElementById(
        "idia-dialogue-text"
    );


const idiaNextButton =
    document.getElementById(
        "idia-next-btn"
    );


const idiaChallengeScreen =
    document.getElementById(
        "idia-challenge-screen"
    );


const idiaDialogue = [

    "Wait... you actually showed up?",

    "Okay, this is way more social interaction than I planned for.",

    "Whatever. Since you're here... guess I should give you something to do."

];


setupDialogue(

    idiaDialogueText,

    idiaNextButton,

    idiaDialogue,

    "Start Game",

    function () {

        showScreen(
            idiaChallengeScreen
        );


        chooseHackTarget();

    }

);



// =========================
// IDIA GAME
// =========================

const hackTiles =
    document.querySelectorAll(
        ".hack-tile"
    );


const hackScoreText =
    document.getElementById(
        "score"
    );


const challengeMessage =
    document.getElementById(
        "challenge-message"
    );


const finishHackButton =
    document.getElementById(
        "finish-hack-btn"
    );


let hackScore =
    0;


let activeHackTile =
    -1;


function chooseHackTarget() {

    if (
        hackScore >= 5
    ) {

        return;

    }


    hackTiles.forEach(
        function (tile) {

            tile.classList.remove(
                "active"
            );

        }
    );


    let newTile =
        Math.floor(
            Math.random() *
            hackTiles.length
        );


    while (
        newTile ===
        activeHackTile
    ) {

        newTile =
            Math.floor(
                Math.random() *
                hackTiles.length
            );

    }


    activeHackTile =
        newTile;


    hackTiles[
        activeHackTile
    ].classList.add(
        "active"
    );

}


hackTiles.forEach(
    function (
        tile,
        index
    ) {

        tile.addEventListener(
            "click",
            function () {

                if (
                    index !==
                    activeHackTile
                ) {

                    return;

                }


                hackScore++;


                hackScoreText.textContent =
                    hackScore;


                if (
                    hackScore >= 5
                ) {

                    tile.classList.remove(
                        "active"
                    );


                    activeHackTile =
                        -1;


                    challengeMessage.textContent =
                        "ACCESS GRANTED";


                    finishHackButton.style.display =
                        "inline-block";

                } else {

                    chooseHackTarget();

                }

            }
        );

    }
);



// =========================
// IDIA RESULT
// =========================

const idiaResultScreen =
    document.getElementById(
        "idia-result-screen"
    );


finishHackButton.addEventListener(
    "click",
    function () {

        showScreen(
            idiaResultScreen
        );

    }
);


const idiaResultText =
    document.getElementById(
        "idia-result-text"
    );


const idiaResultNextButton =
    document.getElementById(
        "idia-result-next-btn"
    );


const kavehScreen =
    document.getElementById(
        "kaveh-screen"
    );


const idiaResultDialogue = [

    "Okay... you actually cleared it.",

    "Not bad. Guess the system didn't stand much of a chance.",

    "Happy birthday. May your RNG be blessed, your social encounters be optional, and your year have zero unavoidable boss fights."

];


setupDialogue(

    idiaResultText,

    idiaResultNextButton,

    idiaResultDialogue,

    "Continue",

    function () {

        showScreen(
            kavehScreen
        );

    }

);



// =========================
// KAVEH
// =========================

const kavehDialogueText =
    document.getElementById(
        "kaveh-dialogue-text"
    );


const kavehNextButton =
    document.getElementById(
        "kaveh-next-btn"
    );


const kavehChallengeScreen =
    document.getElementById(
        "kaveh-challenge-screen"
    );


const kavehDialogue = [

    "Finally. I was starting to think you'd never get here.",

    "I've been working on something, and naturally, something has gone wrong.",

    "Since you're already here... you might as well help me fix it."

];


setupDialogue(

    kavehDialogueText,

    kavehNextButton,

    kavehDialogue,

    "Fix Blueprint",

    function () {

        showScreen(
            kavehChallengeScreen
        );

    }

);



// =========================
// KAVEH GAME
// =========================

const blueprintPieces =
    document.querySelectorAll(
        ".blueprint-piece"
    );


const kavehProgress =
    document.getElementById(
        "kaveh-progress"
    );


const kavehChallengeMessage =
    document.getElementById(
        "kaveh-challenge-message"
    );


const finishKavehButton =
    document.getElementById(
        "finish-kaveh-btn"
    );


const blueprintOrder = [

    "foundation",

    "pillars",

    "walls",

    "roof"

];


let blueprintStep =
    0;


function resetBlueprint() {

    blueprintStep =
        0;


    kavehProgress.textContent =
        "0";


    blueprintPieces.forEach(
        function (piece) {

            piece.classList.remove(
                "selected"
            );


            piece.disabled =
                false;

        }
    );

}


blueprintPieces.forEach(
    function (piece) {

        piece.addEventListener(
            "click",
            function () {

                const chosenPart =
                    piece.dataset.part;


                if (
                    chosenPart ===
                    blueprintOrder[
                        blueprintStep
                    ]
                ) {

                    piece.classList.add(
                        "selected"
                    );


                    piece.disabled =
                        true;


                    blueprintStep++;


                    kavehProgress.textContent =
                        blueprintStep;


                    if (
                        blueprintStep ===
                        blueprintOrder.length
                    ) {

                        kavehChallengeMessage.textContent =
                            "Blueprint restored.";


                        finishKavehButton.style.display =
                            "inline-block";

                    }

                } else {

                    kavehChallengeMessage.textContent =
                        "No, no, no. That's not how buildings work. Try again.";


                    resetBlueprint();

                }

            }
        );

    }
);



// =========================
// KAVEH RESULT
// =========================

const kavehResultScreen =
    document.getElementById(
        "kaveh-result-screen"
    );


finishKavehButton.addEventListener(
    "click",
    function () {

        showScreen(
            kavehResultScreen
        );

    }
);


const kavehResultText =
    document.getElementById(
        "kaveh-result-text"
    );


const kavehResultNextButton =
    document.getElementById(
        "kaveh-result-next-btn"
    );


const mikasaScreen =
    document.getElementById(
        "mikasa-screen"
    );


const kavehResultDialogue = [

    "Huh. You actually fixed it.",

    "Okay, I'll admit it. You have better design instincts than I expected.",

    "Happy birthday! I hope this year brings you good people, good memories, and considerably fewer disasters than mine."

];


setupDialogue(

    kavehResultText,

    kavehResultNextButton,

    kavehResultDialogue,

    "Continue",

    function () {

        showScreen(
            mikasaScreen
        );

    }

);



// =========================
// MIKASA
// =========================

const mikasaDialogueText =
    document.getElementById(
        "mikasa-dialogue-text"
    );


const mikasaNextButton =
    document.getElementById(
        "mikasa-next-btn"
    );


const mikasaChallengeScreen =
    document.getElementById(
        "mikasa-challenge-screen"
    );


const mikasaDialogue = [

    "You made it this far.",

    "Good. This next part needs quick reactions.",

    "Stay focused. Don't hesitate."

];


setupDialogue(

    mikasaDialogueText,

    mikasaNextButton,

    mikasaDialogue,

    "Begin Drill",

    function () {

        showScreen(
            mikasaChallengeScreen
        );


        startMikasaRound();

    }

);



// =========================
// MIKASA GAME
// =========================

const mikasaLanes =
    document.querySelectorAll(
        ".mikasa-lane"
    );


const mikasaLeftButton =
    document.getElementById(
        "mikasa-left-btn"
    );


const mikasaRightButton =
    document.getElementById(
        "mikasa-right-btn"
    );


const mikasaScoreText =
    document.getElementById(
        "mikasa-score"
    );


const mikasaHitsText =
    document.getElementById(
        "mikasa-hits"
    );


const mikasaChallengeMessage =
    document.getElementById(
        "mikasa-challenge-message"
    );


const finishMikasaButton =
    document.getElementById(
        "finish-mikasa-btn"
    );


let mikasaPlayerLane =
    1;


let mikasaDangerLane =
    -1;


let mikasaScore =
    0;


let mikasaHits =
    0;


let mikasaRoundActive =
    false;


let mikasaTimer;


function renderMikasaArena() {

    mikasaLanes.forEach(
        function (
            lane,
            index
        ) {

            lane.classList.remove(
                "danger",
                "player-lane"
            );


            lane.textContent =
                "";


            if (
                index ===
                mikasaDangerLane
            ) {

                lane.classList.add(
                    "danger"
                );


                lane.textContent =
                    "⚠";

            }


            if (
                index ===
                mikasaPlayerLane
            ) {

                lane.classList.add(
                    "player-lane"
                );


                lane.textContent +=
                    "◆";

            }

        }
    );

}


function startMikasaRound() {

    if (
        mikasaScore >= 5
    ) {

        return;

    }


    mikasaDangerLane =
        Math.floor(
            Math.random() *
            3
        );


    mikasaRoundActive =
        true;


    mikasaChallengeMessage.textContent =
        "Incoming! Move!";


    renderMikasaArena();


    clearTimeout(
        mikasaTimer
    );


    mikasaTimer =
        setTimeout(
            resolveMikasaRound,
            1000
        );

}


function resolveMikasaRound() {

    if (
        !mikasaRoundActive
    ) {

        return;

    }


    mikasaRoundActive =
        false;


    if (
        mikasaPlayerLane ===
        mikasaDangerLane
    ) {

        mikasaHits++;


        mikasaHitsText.textContent =
            mikasaHits;


        mikasaChallengeMessage.textContent =
            "Hit. Move earlier.";

    } else {

        mikasaScore++;


        mikasaScoreText.textContent =
            mikasaScore;


        mikasaChallengeMessage.textContent =
            "Good dodge.";

    }


    mikasaDangerLane =
        -1;


    renderMikasaArena();


    if (
        mikasaScore >= 5
    ) {

        mikasaChallengeMessage.textContent =
            "Drill complete.";


        finishMikasaButton.style.display =
            "inline-block";

    } else {

        setTimeout(
            startMikasaRound,
            700
        );

    }

}


function moveMikasa(
    direction
) {

    mikasaPlayerLane +=
        direction;


    if (
        mikasaPlayerLane < 0
    ) {

        mikasaPlayerLane =
            0;

    }


    if (
        mikasaPlayerLane > 2
    ) {

        mikasaPlayerLane =
            2;

    }


    renderMikasaArena();

}


mikasaLeftButton.addEventListener(
    "click",
    function () {

        moveMikasa(
            -1
        );

    }
);


mikasaRightButton.addEventListener(
    "click",
    function () {

        moveMikasa(
            1
        );

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            mikasaChallengeScreen.style.display !==
            "flex"
        ) {

            return;

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            moveMikasa(
                -1
            );

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            moveMikasa(
                1
            );

        }

    }
);



// =========================
// MIKASA RESULT
// =========================

const mikasaResultScreen =
    document.getElementById(
        "mikasa-result-screen"
    );


finishMikasaButton.addEventListener(
    "click",
    function () {

        showScreen(
            mikasaResultScreen
        );

    }
);


const mikasaResultText =
    document.getElementById(
        "mikasa-result-text"
    );


const mikasaResultNextButton =
    document.getElementById(
        "mikasa-result-next-btn"
    );


const sigmaScreen =
    document.getElementById(
        "sigma-screen"
    );


const mikasaResultDialogue = [

    "You kept moving. Good.",

    "Speed helps, but keeping your head matters more.",

    "Happy birthday. I hope this year gives you more peaceful days than difficult ones. Take care of yourself."

];


setupDialogue(

    mikasaResultText,

    mikasaResultNextButton,

    mikasaResultDialogue,

    "Continue",

    function () {

        showScreen(
            sigmaScreen
        );

    }

);



// =========================
// SIGMA
// =========================

const sigmaDialogueText =
    document.getElementById(
        "sigma-dialogue-text"
    );


const sigmaNextButton =
    document.getElementById(
        "sigma-next-btn"
    );


const sigmaChallengeScreen =
    document.getElementById(
        "sigma-challenge-screen"
    );


const sigmaDialogue = [

    "You found your way here.",

    "That's actually impressive. Most people would probably have gotten distracted by now.",

    "Let's see how well you remember what you see."

];


setupDialogue(

    sigmaDialogueText,

    sigmaNextButton,

    sigmaDialogue,

    "Begin",

    function () {

        showScreen(
            sigmaChallengeScreen
        );


        startSigmaGame();

    }

);



// =========================
// SIGMA PATTERN MEMORY GAME
// =========================

const sigmaCards =
    document.querySelectorAll(
        ".sigma-card"
    );


const sigmaScoreText =
    document.getElementById(
        "sigma-score"
    );


const sigmaChallengeMessage =
    document.getElementById(
        "sigma-challenge-message"
    );


const finishSigmaButton =
    document.getElementById(
        "finish-sigma-btn"
    );


let sigmaRound =
    0;


let sigmaPattern =
    [];


let sigmaPlayerStep =
    0;


let sigmaCanChoose =
    false;


let sigmaShowingPattern =
    false;


let sigmaGameStarted =
    false;



// =========================
// WAIT HELPER
// =========================

function wait(
    milliseconds
) {

    return new Promise(
        function (resolve) {

            setTimeout(
                resolve,
                milliseconds
            );

        }
    );

}



// =========================
// SIGMA CARD FLASH
// =========================

async function flashSigmaCard(
    cardNumber
) {

    const card =
        sigmaCards[
            cardNumber
        ];


    card.classList.add(
        "revealed"
    );


    card.textContent =
        "◆";


    await wait(
        450
    );


    card.classList.remove(
        "revealed"
    );


    card.textContent =
        "?";


    await wait(
        180
    );

}



// =========================
// SHOW SIGMA PATTERN
// =========================

async function showSigmaPattern() {

    sigmaShowingPattern =
        true;


    sigmaCanChoose =
        false;


    sigmaChallengeMessage.textContent =
        "Watch carefully...";


    await wait(
        600
    );


    for (
        let index = 0;
        index < sigmaPattern.length;
        index++
    ) {

        await flashSigmaCard(
            sigmaPattern[
                index
            ]
        );

    }


    sigmaPlayerStep =
        0;


    sigmaShowingPattern =
        false;


    sigmaCanChoose =
        true;


    sigmaChallengeMessage.textContent =
        "Now repeat the pattern.";

}



// =========================
// START SIGMA GAME
// =========================

function startSigmaGame() {

    if (
        sigmaGameStarted
    ) {

        return;

    }


    sigmaGameStarted =
        true;


    sigmaRound =
        0;


    sigmaPattern =
        [];


    sigmaScoreText.textContent =
        "0";


    finishSigmaButton.style.display =
        "none";


    /*
        Start with two cards.
    */

    sigmaPattern.push(
        Math.floor(
            Math.random() *
            sigmaCards.length
        )
    );


    sigmaPattern.push(
        Math.floor(
            Math.random() *
            sigmaCards.length
        )
    );


    showSigmaPattern();

}



// =========================
// NEXT SIGMA ROUND
// =========================

async function nextSigmaRound() {

    sigmaRound++;


    sigmaScoreText.textContent =
        sigmaRound;


    if (
        sigmaRound >= 4
    ) {

        sigmaCanChoose =
            false;


        sigmaChallengeMessage.textContent =
            "Pattern memorized.";


        finishSigmaButton.style.display =
            "inline-block";


        return;

    }


    sigmaChallengeMessage.textContent =
        "Correct. The pattern is getting longer...";


    await wait(
        850
    );


    /*
        Add one new card to the existing pattern.
    */

    sigmaPattern.push(

        Math.floor(
            Math.random() *
            sigmaCards.length
        )

    );


    showSigmaPattern();

}



// =========================
// SIGMA PLAYER INPUT
// =========================

sigmaCards.forEach(
    function (
        card,
        index
    ) {

        card.addEventListener(
            "click",
            async function () {

                if (
                    !sigmaCanChoose ||
                    sigmaShowingPattern
                ) {

                    return;

                }


                /*
                    Visual feedback.
                */

                card.classList.add(
                    "revealed"
                );


                card.textContent =
                    "◆";


                setTimeout(
                    function () {

                        card.classList.remove(
                            "revealed"
                        );


                        card.textContent =
                            "?";

                    },
                    180
                );


                /*
                    Wrong card.
                */

                if (
                    index !==
                    sigmaPattern[
                        sigmaPlayerStep
                    ]
                ) {

                    sigmaCanChoose =
                        false;


                    sigmaChallengeMessage.textContent =
                        "Not quite. Watch the same pattern again.";


                    await wait(
                        900
                    );


                    showSigmaPattern();


                    return;

                }


                /*
                    Correct step.
                */

                sigmaPlayerStep++;


                /*
                    Entire pattern completed.
                */

                if (
                    sigmaPlayerStep ===
                    sigmaPattern.length
                ) {

                    sigmaCanChoose =
                        false;


                    nextSigmaRound();

                }

            }
        );

    }
);



// =========================
// SIGMA RESULT
// =========================

const sigmaResultScreen =
    document.getElementById(
        "sigma-result-screen"
    );


finishSigmaButton.addEventListener(
    "click",
    function () {

        showScreen(
            sigmaResultScreen
        );

    }
);


const sigmaResultText =
    document.getElementById(
        "sigma-result-text"
    );


const sigmaResultNextButton =
    document.getElementById(
        "sigma-result-next-btn"
    );


const williamScreen =
    document.getElementById(
        "william-screen"
    );


const sigmaResultDialogue = [

    "You remembered all of them.",

    "That was... more impressive than I expected.",

    "Happy birthday. I hope you find plenty of places, people, and moments this year that make you feel like you belong."

];


setupDialogue(

    sigmaResultText,

    sigmaResultNextButton,

    sigmaResultDialogue,

    "Continue",

    function () {

        showScreen(
            williamScreen
        );

    }

);



// =========================
// WILLIAM
// =========================

const williamDialogueText =
    document.getElementById(
        "william-dialogue-text"
    );


const williamNextButton =
    document.getElementById(
        "william-next-btn"
    );


const williamChallengeScreen =
    document.getElementById(
        "william-challenge-screen"
    );


const williamDialogue = [

    "You've arrived at last.",

    "A small problem remains. Nothing too difficult, I hope.",

    "Observe carefully. The obvious answer is not always the useful one."

];


setupDialogue(

    williamDialogueText,

    williamNextButton,

    williamDialogue,

    "Begin Deduction",

    function () {

        showScreen(
            williamChallengeScreen
        );


        loadWilliamQuestion();

    }

);



// =========================
// WILLIAM GAME
// =========================

const williamQuestion =
    document.getElementById(
        "william-question"
    );


const williamFeedback =
    document.getElementById(
        "william-feedback"
    );


const williamProgress =
    document.getElementById(
        "william-progress"
    );


const williamOptions =
    document.querySelectorAll(
        ".william-option"
    );


const finishWilliamButton =
    document.getElementById(
        "finish-william-btn"
    );


const williamCases = [

    {

        question:
            "Muddy footprints appear inside a room, but there are none outside the only door. What is the most likely explanation?",

        options: [

            "Someone walked in from outside",

            "The scene was staged from inside",

            "The footprints appeared by accident"

        ],

        answer: 1

    },


    {

        question:
            "A broken clock shows 8:15, but someone heard it chime at 9:00. What can you safely conclude?",

        options: [

            "The broken clock cannot reliably prove the time",

            "The event definitely happened at 8:15",

            "The witness must be lying"

        ],

        answer: 0

    },


    {

        question:
            "A witness claims they saw an event, but their position had no view of the location. What should be checked first?",

        options: [

            "Who sounds more confident",

            "Whether the witness actually had a line of sight",

            "Ignore every witness"

        ],

        answer: 1

    }

];


let williamQuestionNumber =
    0;


let williamLocked =
    false;


function loadWilliamQuestion() {

    williamLocked =
        false;


    const currentCase =
        williamCases[
            williamQuestionNumber
        ];


    williamQuestion.textContent =
        currentCase.question;


    williamFeedback.textContent =
        "Choose the most logical conclusion.";


    williamOptions.forEach(
        function (
            option,
            index
        ) {

            option.textContent =
                currentCase.options[
                    index
                ];


            option.disabled =
                false;

        }
    );

}


williamOptions.forEach(
    function (
        option,
        index
    ) {

        option.addEventListener(
            "click",
            function () {

                if (
                    williamLocked
                ) {

                    return;

                }


                const currentCase =
                    williamCases[
                        williamQuestionNumber
                    ];


                if (
                    index ===
                    currentCase.answer
                ) {

                    williamLocked =
                        true;


                    williamQuestionNumber++;


                    williamProgress.textContent =
                        williamQuestionNumber;


                    if (
                        williamQuestionNumber >=
                        williamCases.length
                    ) {

                        williamFeedback.textContent =
                            "All deductions complete.";


                        williamOptions.forEach(
                            function (button) {

                                button.disabled =
                                    true;

                            }
                        );


                        finishWilliamButton.style.display =
                            "inline-block";

                    } else {

                        williamFeedback.textContent =
                            "Correct.";


                        setTimeout(
                            loadWilliamQuestion,
                            650
                        );

                    }

                } else {

                    williamFeedback.textContent =
                        "Not quite. Read the clue again.";

                }

            }
        );

    }
);



// =========================
// WILLIAM RESULT
// =========================

const williamResultScreen =
    document.getElementById(
        "william-result-screen"
    );


finishWilliamButton.addEventListener(
    "click",
    function () {

        showScreen(
            williamResultScreen
        );

    }
);


const williamResultText =
    document.getElementById(
        "william-result-text"
    );


const williamResultNextButton =
    document.getElementById(
        "william-result-next-btn"
    );


const williamResultDialogue = [

    "So, you solved it.",

    "I suspected you might.",

    "Happy birthday. May the year ahead reward your curiosity, your judgment, and perhaps just a little calculated mischief."

];



// =========================
// KAZUHA ELEMENTS
// =========================

const kazuhaCutscene =
    document.getElementById(
        "kazuha-cutscene"
    );


const kazuhaCutsceneImage =
    document.getElementById(
        "kazuha-cutscene-image"
    );


const kazuhaCinematicText =
    document.getElementById(
        "kazuha-cinematic-text"
    );


const kazuhaDialogueBox =
    document.getElementById(
        "kazuha-dialogue-box"
    );


const kazuhaDialogueText =
    document.getElementById(
        "kazuha-dialogue-text"
    );


const kazuhaNextButton =
    document.getElementById(
        "kazuha-next-btn"
    );


const kazuhaSkipButton =
    document.getElementById(
        "kazuha-skip-btn"
    );


const kazuhaLeaves =
    document.getElementById(
        "kazuha-leaves"
    );


const kazuhaWind =
    document.getElementById(
        "kazuha-wind"
    );


const kazuhaCinematic =
    document.querySelector(
        ".kazuha-cinematic"
    );


const finalScreen =
    document.getElementById(
        "final-screen"
    );


const replayKazuhaButton =
    document.getElementById(
        "replay-kazuha-btn"
    );


const playAgainButton =
    document.getElementById(
        "play-again-btn"
    );



// =========================
// KAZUHA IMAGES
// =========================

const kazuhaImages = [

    "assets/characters/kazuha/kazuha_beneath_the_maple_twilight.png",

    "assets/characters/kazuha/autumn_windblade_kazuha_s_heroic_stand.png",

    "assets/characters/kazuha/kazuha_beneath_autumn_maple_leaves.png",

    "assets/characters/kazuha/kazuha_beneath_the_autumn_maple.png"

];



// =========================
// PRELOAD
// =========================

function preloadKazuhaImages() {

    kazuhaImages.forEach(
        function (imagePath) {

            const image =
                new Image();


            image.src =
                imagePath;

        }
    );

}


preloadKazuhaImages();



// =========================
// KAZUHA DIALOGUE
// =========================

const kazuhaDialogue = [

    "The wind carried word of a celebration.",

    "You've come a long way. I hope you remember to enjoy the journey as much as the destination.",

    "There will be difficult days, of course. But even the strongest winds eventually grow calm.",

    "Happy birthday. May the year ahead carry you toward peaceful days, good company, and memories worth keeping."

];


let kazuhaDialogueNumber =
    0;



// =========================
// TIMER SYSTEM
// =========================

let kazuhaTimers =
    [];


let kazuhaRunId =
    0;


function clearKazuhaTimers() {

    kazuhaTimers.forEach(
        function (timer) {

            clearTimeout(
                timer
            );

        }
    );


    kazuhaTimers =
        [];

}


function kazuhaSchedule(
    runId,
    delay,
    action
) {

    const timer =
        setTimeout(
            function () {

                if (
                    runId ===
                    kazuhaRunId
                ) {

                    action();

                }

            },
            delay
        );


    kazuhaTimers.push(
        timer
    );

}



// =========================
// CUTSCENE TEXT
// =========================

function showKazuhaText(
    text
) {

    kazuhaCinematicText.classList.remove(
        "visible"
    );


    setTimeout(
        function () {

            kazuhaCinematicText.textContent =
                text;


            kazuhaCinematicText.classList.add(
                "visible"
            );

        },
        120
    );

}


function hideKazuhaText() {

    kazuhaCinematicText.classList.remove(
        "visible"
    );

}



// =========================
// IMAGE SWITCHING
// =========================

function showKazuhaImage(
    imageNumber,
    animationClass
) {

    kazuhaCutsceneImage.classList.remove(
        "visible"
    );


    setTimeout(
        function () {

            kazuhaCutsceneImage.className =
                "kazuha-cutscene-image";


            kazuhaCutsceneImage.src =
                kazuhaImages[
                    imageNumber
                ];


            kazuhaCutsceneImage.classList.add(
                animationClass
            );


            requestAnimationFrame(
                function () {

                    kazuhaCutsceneImage.classList.add(
                        "visible"
                    );

                }
            );

        },
        350
    );

}



// =========================
// FALLING LEAVES
// =========================

function createKazuhaLeaves() {

    kazuhaLeaves.innerHTML =
        "";


    for (
        let leafNumber = 0;
        leafNumber < 22;
        leafNumber++
    ) {

        const leaf =
            document.createElement(
                "span"
            );


        leaf.className =
            "kazuha-leaf";


        leaf.textContent =
            "🍁";


        leaf.style.left =
            Math.random() *
            100 +
            "%";


        leaf.style.setProperty(
            "--leaf-size",
            (
                14 +
                Math.random() *
                20
            ) +
            "px"
        );


        leaf.style.setProperty(
            "--leaf-opacity",
            (
                0.35 +
                Math.random() *
                0.55
            )
        );


        leaf.style.setProperty(
            "--leaf-speed",
            (
                6 +
                Math.random() *
                7
            ) +
            "s"
        );


        leaf.style.setProperty(
            "--leaf-delay",
            (
                Math.random() *
                -9
            ) +
            "s"
        );


        kazuhaLeaves.appendChild(
            leaf
        );

    }

}



// =========================
// BEGIN DIALOGUE
// =========================

function beginKazuhaDialogue() {

    clearKazuhaTimers();


    kazuhaRunId++;


    hideKazuhaText();


    kazuhaWind.classList.add(
        "active"
    );


    showKazuhaImage(
        2,
        "kazuha-shot-close"
    );


    kazuhaDialogueNumber =
        0;


    kazuhaDialogueText.textContent =
        kazuhaDialogue[
            kazuhaDialogueNumber
        ];


    kazuhaNextButton.textContent =
        "Continue";


    setTimeout(
        function () {

            kazuhaDialogueBox.classList.add(
                "visible"
            );

        },
        850
    );

}



// =========================
// START CUTSCENE
// =========================

function startKazuhaCutscene() {

    clearKazuhaTimers();


    kazuhaRunId++;


    const currentRun =
        kazuhaRunId;


    showScreen(
        kazuhaCutscene
    );


    createKazuhaLeaves();


    kazuhaDialogueBox.classList.remove(
        "visible"
    );


    kazuhaWind.classList.remove(
        "active"
    );


    kazuhaCutsceneImage.className =
        "kazuha-cutscene-image";


    kazuhaCutsceneImage.classList.remove(
        "visible"
    );


    hideKazuhaText();


    kazuhaSchedule(
        currentRun,
        500,
        function () {

            showKazuhaText(
                "Looks like that's everyone..."
            );

        }
    );


    kazuhaSchedule(
        currentRun,
        2500,
        function () {

            hideKazuhaText();

        }
    );


    kazuhaSchedule(
        currentRun,
        3400,
        function () {

            showKazuhaText(
                "A familiar breeze passes by..."
            );


            kazuhaWind.classList.add(
                "active"
            );

        }
    );


    kazuhaSchedule(
        currentRun,
        5400,
        function () {

            hideKazuhaText();


            showKazuhaImage(
                0,
                "kazuha-shot-slow"
            );

        }
    );


    kazuhaSchedule(
        currentRun,
        7000,
        function () {

            showKazuhaText(
                "Maple leaves scatter into the wind."
            );

        }
    );


    kazuhaSchedule(
        currentRun,
        8500,
        function () {

            hideKazuhaText();

        }
    );


    kazuhaSchedule(
        currentRun,
        9200,
        function () {

            kazuhaCinematic.classList.add(
                "wind-burst"
            );


            showKazuhaImage(
                1,
                "kazuha-shot-action"
            );


            setTimeout(
                function () {

                    kazuhaCinematic.classList.remove(
                        "wind-burst"
                    );

                },
                600
            );

        }
    );


    kazuhaSchedule(
        currentRun,
        11600,
        function () {

            beginKazuhaDialogue();

        }
    );

}



// =========================
// KAZUHA NEXT BUTTON
// =========================

kazuhaNextButton.addEventListener(
    "click",
    function () {

        if (
            kazuhaDialogueNumber <
            kazuhaDialogue.length - 1
        ) {

            kazuhaDialogueNumber++;


            kazuhaDialogueText.textContent =
                kazuhaDialogue[
                    kazuhaDialogueNumber
                ];


            if (
                kazuhaDialogueNumber ===
                2
            ) {

                showKazuhaImage(
                    3,
                    "kazuha-shot-final"
                );

            }


            if (
                kazuhaDialogueNumber ===
                kazuhaDialogue.length - 1
            ) {

                kazuhaNextButton.textContent =
                    "Finish";

            }

        } else {

            finishKazuhaCutscene();

        }

    }
);



// =========================
// FINISH CUTSCENE
// =========================

function finishKazuhaCutscene() {

    clearKazuhaTimers();


    kazuhaRunId++;


    kazuhaDialogueBox.classList.remove(
        "visible"
    );


    showKazuhaImage(
        3,
        "kazuha-shot-final"
    );


    showKazuhaText(
        "May the wind carry that wish to you."
    );


    setTimeout(
        function () {

            hideKazuhaText();

        },
        2200
    );


    setTimeout(
        function () {

            showScreen(
                finalScreen
            );

        },
        3300
    );

}



// =========================
// SKIP
// =========================

kazuhaSkipButton.addEventListener(
    "click",
    function () {

        clearKazuhaTimers();


        kazuhaRunId++;


        showScreen(
            kazuhaCutscene
        );


        createKazuhaLeaves();


        kazuhaWind.classList.add(
            "active"
        );


        hideKazuhaText();


        beginKazuhaDialogue();

    }
);



// =========================
// FINAL BUTTONS
// =========================

replayKazuhaButton.addEventListener(
    "click",
    function () {

        startKazuhaCutscene();

    }
);


playAgainButton.addEventListener(
    "click",
    function () {

        window.location.reload();

    }
);



// =========================
// WILLIAM -> KAZUHA
// =========================

setupDialogue(

    williamResultText,

    williamResultNextButton,

    williamResultDialogue,

    "Finish",

    function () {

        startKazuhaCutscene();

    }

);
