var startBtn = document.querySelector("#start_button")
var home = document.querySelector("#start_page")
var targetDiv = document.querySelector("#quiz_area")
var counter = document.querySelector("#counter")
var endScreen = document.querySelector("#score_screen")
var endScore = document.querySelector("#final_score")
var nameInput = document.querySelector("#inInput")
var submitBtn = document.querySelector("#submit_button")


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

startBtn.addEventListener("click", function(e) {
    e.preventDefault();
    home.setAttribute("class", "hidden")
    var index = 0;
    var secondsLeft = 50;
    var timerInterval = setInterval(function() {
        counter.textContent = secondsLeft;
        secondsLeft--;
    
        if(secondsLeft <= 0) {
            index = 100;
            nextquestion();
        }
    }, 1000);
    nextquestion();
    
    function nextquestion() {

        targetDiv.innerHTML = "";

        if (index >= quiz1.length) {
            clearInterval(timerInterval);
            counter.textContent = secondsLeft;
            scoreScreen();
            return;
        }

        console.log(`Question Number ${index + 1}`)
        var title = quiz1[index].title;
        var questHead = document.createElement("h1");
        questHead.textContent = title;
        targetDiv.appendChild(questHead);
    
        quiz1[index].choices.forEach(function(choice) {
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

    targetDiv.addEventListener("click", function(event) {
        event.preventDefault();
      
        if (event.target.matches("button")) {
            var awnser = event.target.getAttribute("data-index");
            console.log(`You guessed ${awnser}! The Correct response was ${quiz1[index].answer}!`);
            if (awnser !== quiz1[index].answer) {
                secondsLeft-=5;
            }
            index++
            nextquestion();
        }
    });

    function scoreScreen() {

        endScore.textContent = (`Your Final Score: ${secondsLeft}`);

        endScreen.setAttribute("class", "");
        
        submitBtn.addEventListener("click", function(event) {
            event.preventDefault;
            console.log("Yay!");
            home.setAttribute("class", "");
            endScreen.setAttribute("class", "hidden");
            
        })

    }

});
