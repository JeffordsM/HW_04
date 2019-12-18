var startBtn = document.querySelector("#start_button")
var home = document.querySelector("#start_page")
var targetDiv = document.querySelector("#quiz_area")
var counter = document.querySelector("#counter")
var endScreen = document.querySelector("#score_screen")
var endScore = document.querySelector("#final_score")
var nameInput = document.querySelector("#inInput")
var submitBtn = document.querySelector("#submit_button")
var leaderBoard = document.querySelector("#leader_board")
var leaderBoardBtn = document.querySelector("#leaderboard_button")
var closeBtn = document.querySelector("#close")

var quiz1 = [
    {
        title: "The Awnser to this Question is Correct",
        choices: ["Correct", "False", "Wrong", "Almost True"],
        answer: "Correct"
    },
    {
        title: "The Awnser to this Question is Blue",
        choices: ["Red", "Blue", "Green", "Yellow"],
        answer: "Blue"
    },
    {
        title: "The Awnser to this Question is 5",
        choices: ["23", "4", "-100", "5"],
        answer: "5"
    },
    {
        title: "Which of these is the Hottest?",
        choices: ["Lava", "The Sun", "Sand on the Beach", "Emma Watson"],
        answer: "Emma Watson"
    },
    {
        title: "The Awnser to this Question is number 3",
        choices: ["nope", "warmer", "This one", "colder"],
        answer: "This one"
    },
    {
        title: "Which of these is Heavier?",
        choices: ["A pound of Feathers", "A pound of steel", "A British pound", "That Pound cake that Grandma always brings to Thanksgiving"],
        answer: "That Pound cake that Grandma always brings to Thanksgiving"
    },
];

var highScores = [];

startBtn.addEventListener("click", function (e) {

    e.preventDefault();
    home.setAttribute("class", "hidden")
    var index = 0;
    var finalScore = ""
    var secondsLeft = 50.0;
    var timerInterval = setInterval(function () {
        counter.textContent = secondsLeft.toFixed(1);
        secondsLeft -= 0.1;

        if (secondsLeft <= 0) {
            index = 100;
            nextquestion();
        }
    }, 100);
    nextquestion();

    function nextquestion() {

        targetDiv.innerHTML = "";

        if (index >= quiz1.length) {
            clearInterval(timerInterval);
            counter.textContent = secondsLeft.toFixed(1);
            scoreScreen();
            return;
        }

        // console.log(`Question Number ${index + 1}`)
        var title = quiz1[index].title;
        var questHead = document.createElement("h1");
        questHead.textContent = title;
        targetDiv.appendChild(questHead);

        quiz1[index].choices.forEach(function (choice) {
            var prompt = choice;
            var choiceBtn = document.createElement("button");
            choiceBtn.textContent = prompt;
            choiceBtn.setAttribute("type", "button");
            choiceBtn.setAttribute("class", "btn btn-success prompt");
            choiceBtn.setAttribute("data-index", choice);
            var badgeNum = document.createElement("span");
            badgeNum.textContent = (quiz1[index].choices.indexOf(choice) + 1) + ": ";
            choiceBtn.prepend(badgeNum);
            targetDiv.appendChild(choiceBtn);
        });

    }

    targetDiv.addEventListener("click", function (event) {
        event.preventDefault();

        if (event.target.matches("button")) {
            var awnser = event.target.getAttribute("data-index");
            // console.log(`You guessed ${awnser}! The Correct response was ${quiz1[index].answer}!`);
            if (awnser !== quiz1[index].answer) {
                secondsLeft -= 5;
            }
            index++
            nextquestion();
        }
    });

    function scoreScreen() {

        finalScore = secondsLeft.toFixed(1);

        endScore.textContent = (`Your Final Score: ${finalScore}`);

        endScreen.setAttribute("class", "");

        var Score = ""

        submitBtn.addEventListener("click", function (event) {
            event.preventDefault;

            function score(playerIN, playerScore) {
                this.playerIN = playerIN;
                this.playerScore = playerScore;
            }
            
            Score = new score(nameInput.value.trim(), finalScore);

            if (Score.playerIN === "") {
                return;
            }
            if (Score.playerScore === "") {
                return;
            }

            save();
        });

        function save() {

            highScores.push(Score);

            store();
            
            home.setAttribute("class", "");
            endScreen.setAttribute("class", "hidden");
            
        }
        
        
        function store() {

            console.log(highScores);
            
            localStorage.setItem("highscore", JSON.stringify(highScores));
            // sortScores();
        }

    }


});

var player1 = document.querySelector("#player1")
var player2 = document.querySelector("#player2")
var player3 = document.querySelector("#player3")
var score1 = document.querySelector("#score1")
var score2 = document.querySelector("#score2")
var score3 = document.querySelector("#score3")

var mode = "hidden"

// function sortScores() {
//     highScores.sort(function (a, b) {
//         return a.playerScore - b.playerScore;
//     });
//     console.log(highScores)
// }


leaderBoardBtn.addEventListener("click", function (e) {
    e.preventDefault;
    console.log("yay!");
    if (mode === "hidden") {
        mode = "shown"
        leaderBoard.setAttribute("class", "");
    }
    else {
        mode = "hidden"
        leaderBoard.setAttribute("class", "hidden");
    }
});

closeBtn.addEventListener("click", function (e) {
    e.preventDefault;
    console.log("Boo!");
    leaderBoard.setAttribute("class", "hidden");
    if (mode === "hidden") {
        mode = "shown"
        leaderBoard.setAttribute("class", "");
    }
    else {
        mode = "hidden"
        leaderBoard.setAttribute("class", "hidden");
    }
});