$("document").ready(function () {
    console.log("loaded");
    // score variables
    var userQuestionsRight = 0;
    var userQuestionsWrong = 0;
    var unansweredQuestions = 0;
    // clock variables
    var countdownTimer = 20;
    // var clockIsTicking = false; --> I'd like to prevent the clock from going negative with this var. Future improvement!
    var interval; // declared, but not initialized

    var indexOfCurrentQuestion = 0;
    // square backets or curly brackets?
    var triviaQuestions = [{
            questionText: 'How much displacement does a "Small Block Chevy" engine have?',
            answerText: [
                "351 ci",
                "7.4 L",
                "5.7 L",
                "4300 mL"
            ],
            correctAnswer: 2
        },
        {
            questionText: 'Which of the following is (or was) NOT a General Motors brand?',
            answerText: [
                "Holden",
                "Škoda",
                "Vauxhall",
                "Saab"
            ],
            correctAnswer: 1
        },
        {
            questionText: 'Which automaker is the current US market leader in the full-size commercial van segment?',
            answerText: [
                "Ford",
                "Mercedes-Benz",
                "Chevrolet",
                "Ram"
            ],
            correctAnswer: 0
        },
        {
            questionText: 'Which of the following is the most closely related to the Chevrolet Astro van?',
            answerText: [
                "GMC Suburban",
                "Chevrolet Express",
                "Oldsmobile Silhouette",
                "GMC Safari"
            ],
            correctAnswer: 3
        },
        {
            questionText: 'What brand did Ford Motor Company sell to the Chinese automaker Geely?',
            answerText: [
                "Land Rover",
                "Jaguar",
                "Aston Martin",
                "Volvo"
            ],
            correctAnswer: 3
        },
        {
            questionText: 'Toyota and General Motors once had a partnership that produced cars such as the Toyota Corolla and Chevrolet Prism at this factory in Fremont, California.',
            answerText: [
                "NUMMI",
                "NADA",
                "EEPROM",
                "DTC"
            ],
            correctAnswer: 0
        },
        {
            questionText: 'Toyota and General Motors once had a partnership that jointly produced cars in a Fremont, California factory. This factory is now owned by the following company.',
            answerText: [
                "Nissan",
                "General Motors",
                "Tesla",
                "Volkswagen Group"
            ],
            correctAnswer: 2
        },
        {
            questionText: 'Which of the following is not in regular competition for the title of "worlds largest auto manufacturer by volume of cars produced"?',
            answerText: [
                "Toyota Motor Corporation",
                "Volkswagen Group",
                "General Motors",
                "Fiat Chrysler Automobiles"
            ],
            correctAnswer: 3
        },
        {
            questionText: 'For how many horsepower is a 1999 Oldsmobile Bravada rated?',
            answerText: [
                "190 hp at 4,400 rpm",
                "170 hp at 4,600 rpm",
                "270 hp at 6,000 rpm",
                "120 hp at 5,200 rpm"
            ],
            correctAnswer: 0
        },
        {
            questionText: 'At how many revolutions per minute will horsepower always equal torque?',
            answerText: [
                "3,525 rpm",
                "5,252 rpm",
                "8,055 rpm",
                "horsepower will never equal torque"
            ],
            correctAnswer: 1
        }
    ];
    // ### LOGIC ###
    $("#answerText").on("click", ".answerChoice", function (event) {
        stop();
        var userGuess = ($(this).attr("choice-value"));
        userGuess = parseInt(userGuess);
        console.log(userGuess);

        if (userGuess === triviaQuestions[indexOfCurrentQuestion - 1].correctAnswer) {
            userQuestionsRight++;
            $("#questionText").text("That's right!");
            $("#answerText").empty();
            if (indexOfCurrentQuestion >= 10) {
                displayResults();
            } else {
                setTimeout(loadNextQuestion, 1000 * 2);
            }
        } else {
            userQuestionsWrong++
            $("#questionText").text("That's incorrect. The correct answer was " + triviaQuestions[indexOfCurrentQuestion - 1].answerText[triviaQuestions[indexOfCurrentQuestion - 1].correctAnswer]);
            $("#answerText").empty();
            if (indexOfCurrentQuestion >= 10) {
                displayResults();
            } else {
                setTimeout(loadNextQuestion, 1000 * 3);
            }
        }
    });

    $("#startQuizBtn").on("click", function () {
        quizStart();

    });

    // ### FUNCTIONS ###
    function quizStart() {
        console.log("counting down");
        indexOfCurrentQuestion = 0;
        loadNextQuestion();
        $("#startQuizBtn").remove();
    }

    function run() {
        clearInterval(interval);
        interval = setInterval(decrement, 1000);
    }

    //  The stop function
    function stop() {
        countdownTimer = 20;
        clearInterval(interval);
    }

    function decrement() {
        countdownTimer--;
        $("#timerDiv").text("Time left: " + countdownTimer);

        if (countdownTimer === 0) {
            if (indexOfCurrentQuestion >= 9) {
                stop();
                displayResults();
            } else {
                stop();
                $("#answerText").empty();
                loadNextQuestion();
            }

        }
    }

    function loadNextQuestion() {
        console.log(indexOfCurrentQuestion);
        $("#questionText").text(triviaQuestions[indexOfCurrentQuestion].questionText)

        for (i = 0; i < 4; i++) {
            var newAnswerChoice = $("<li></li>");
            newAnswerChoice.addClass("answerChoice");
            newAnswerChoice.attr("choice-value", i);
            newAnswerChoice.text(triviaQuestions[indexOfCurrentQuestion].answerText[i]);
            $("#answerText").append(newAnswerChoice);
        }
        indexOfCurrentQuestion++;
        run();
    }

    function displayResults() {
        $("#question").empty();
        $("#answer").empty();
        $("#question").html("<ul><li>Questions answered correctly: " + userQuestionsRight + "</li>" + "<li>Questions answered incorrectly: " + userQuestionsWrong + "</li>" + "<li>Questions skipped: " + unansweredQuestions + "</li></ul>");
    }
});