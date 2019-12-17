var startBtn = document.querySelector("#start_button")
var home = document.querySelector("#start_page")
var targetDiv = document.querySelector("#quiz_area")
var counter = document.querySelector("#counter")


var quiz1 = [
    {
      title: "The Awnser to this Question is Correct:",
      choices: ["Correct", "False", "Wrong", "Almost True"],
      answer: "Correct"
    },
    {
      title: "The Awnser to this Question is Blue:",
      choices: ["Red", "Blue", "Green", "Yellow"],
      answer: "Blue"
    },
    {
      title: "The Awnser to this Question is 5:",
      choices: ["23", "4", "-100", "5"],
      answer: "5"
    },
    {
      title: "The Awnser to this Question is Hot:",
      choices: ["Hot", "Cold", "Warm", "Emma Watson"],
      answer: "Hot"
    },
  ];

startBtn.addEventListener("click", function(e) {
    e.preventDefault();
    home.setAttribute("class", "hidden")
    var index = 0;
    var score = 0;
    var secondsLeft = 10;
    var timerInterval = setInterval(function() {
        counter.textContent = secondsLeft;
        secondsLeft--;
    
        if(secondsLeft === 0) {
            index = 100;
            nextquestion();
        }
    }, 1000);
    nextquestion();
    
    function nextquestion() {

        targetDiv.innerHTML = "";

        if (index >= quiz1.length) {
            home.setAttribute("class", "");
            clearInterval(timerInterval);
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
            if (awnser === quiz1[index].answer) {
                score++
            }
            index++
            nextquestion();
        }
    });
    

    console.log(score)
    
});
