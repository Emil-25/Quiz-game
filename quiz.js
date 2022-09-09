// All the questions as objects
const questionGroup = [
  {
    question: "Which one is the smallest ocean in the World?",
    a: "Indian",
    b: "Pacific",
    c: "Atlantic",
    d: "Arctic",
    correct: function () {
      return this.d;
    },
  },
  {
    question: "The absorption of ink by blotting paper involves:",
    a: "Viscosity of Ink",
    b: "Capillary Action Phenomenon",
    c: "Diffusion of Ink Through the Blotting",
    d: "Siphon Action",
    correct: function () {
      return this.b;
    },
  },
  {
    question: "Which scientist discovered the radioactive element radium?",
    a: "Isaac Newton",
    b: "Albert Einstein",
    c: "Benjamin Franklin",
    d: "Marie Curie",
    correct: function () {
      return this.d;
    },
  },
  {
    question: "Which of the following is tropical grassland?",
    a: "Taiga",
    b: "Savannah",
    c: "Pampas",
    d: "Prairies",
    correct: function () {
      return this.b;
    },
  },
  {
    question: "The shape of Earth is:",
    a: "Oblate Spheroid",
    b: "Donut",
    c: "Flat",
    d: "Cuboid",
    correct: function () {
      return this.a;
    },
  },
  {
    question: "What is the capital of Finland?",
    a: "Paris",
    b: "Istanbul",
    c: "Helsinki",
    d: "Oslo",
    correct: function () {
      return this.c;
    },
  },
  {
    question: "What's the biggest animal in the world?",
    a: "Elephant",
    b: "Giraffe",
    c: "Blue Whale",
    d: "Lion",
    correct: function () {
      return this.c;
    },
  },
  {
    question: "What does the AC button on a calculator stand for?",
    a: "Memory",
    b: "All Clear",
    c: "All Centered",
    d: "After Cut",
    correct: function () {
      return this.b;
    },
  },
  {
    question: "Which five colours make up the Olympic rings?",
    a: "Black, green, blue, yellow and red",
    b: "Blue, orange, violet, red and black",
    c: "Green, blue, red, white and yellow",
    d: "Yellow, red, black, blue and white",
    correct: function () {
      return this.a;
    },
  },
  {
    question: "Which planet is closest to the Sun?",
    a: "Venus",
    b: "Earth",
    c: "Uranus",
    d: "Mercury",
    correct: function () {
      return this.d;
    },
  },
  {
    question: "Typically, what's the strongest muscle in the human body?",
    a: "Biceps",
    b: "Tongue Muscle",
    c: "Abs",
    d: "Main Jaw Muscle",
    correct: function () {
      return this.d;
    },
  },
  {
    question: "How many elements are there in the periodic table?",
    a: "118",
    b: "117",
    c: "120",
    d: "110",
    correct: function () {
      return this.a;
    },
  },
];

let sound = new Audio(
  "C:/Users/user/Downloads/328117__greenvwbeetle__pop-8.mp3"
);

// For game stats
document.getElementById("record").innerHTML =
  localStorage.getItem("name+correct+time");

//Game will start
document.getElementById("start").onclick = () => {
  setTimeout(questions, 1000);
};

function questions() {
  //Player's name
  let name = document.getElementById("name").value;

  //After clicking start questions will appear
  document.getElementById("inner").innerHTML = "";

  let time = 0;
  function timer() {
    time++;
    document.getElementById("time").innerHTML = time;
  }

  let randomQuestions = [];
  let quiz = "";
  let c = 0; //correct
  let k = 0; //counter
  let t = setInterval(timer, 1000);
  //Placed questions randomly
  questionGroup.sort(function () {
    return 0.5 - Math.random();
  });

  //Instead of choosing questions randomly, first the list of questions 
  //was randomized and picked first 10 of them (number of questions is 10)
  randomQuestions = questionGroup.slice(0, 10);

  document.getElementById("outer").innerHTML +=
    "<div id='timer'><i class='fa-solid fa-clock fa-xl'></i>" +
    " " +
    "<span id='time'></span></div>";
  document.getElementById("outer").innerHTML +=
    "<div class='progress-bar'><div class='green-bar'></div></div>";

  //When clicked an answer every element is replaced with another
  nextQuestion();

  function nextQuestion() {
    quiz =
      "<div class='question'><h2>" +
      `${k + 1}` +
      ". " +
      randomQuestions[k].question +
      "</h2></div>";
    quiz += "<div class='answers'>";
    quiz += "<button id='color1'>" + randomQuestions[k].a + "</button>";
    quiz += "<button id='color4'>" + randomQuestions[k].b + "</button>";
    quiz += "<button id='color3'>" + randomQuestions[k].c + "</button>";
    quiz += "<button id='color2'>" + randomQuestions[k].d + "</button>";
    quiz += "</div>";
    document.getElementById("inner").innerHTML = quiz;
    document.getElementById("inner").style.animation = "null";
    document.querySelector(".green-bar").style.width =
      ((k + 1) / randomQuestions.length) * 100 + "%";
    let btns = document.querySelectorAll("button");
    //Checked if an answer is correct
    for (let btn of btns) {
      btn.addEventListener("click", function (e) {
        if (e.target.innerHTML == randomQuestions[k].correct()) {
          c++;
        }
        k++;
        sound.play(); //Choosing answer sound
        if (k != randomQuestions.length) {
          document.getElementById("inner").style.animation = "fading 520ms";
          setTimeout(nextQuestion, 500);
        } else {
          quiz =
            "<div id='result'>" +
            "You answered " +
            c +
            " questions correctly! <br>";
            
            //Depending on the number of true answers certain message
            //shows up
          if (c < 3) {
            quiz += "<p>At least You Tried)</p>";
          } else if (c == 4) {
            quiz += "<p>Not Bad!</p>";
          } else if (c < 7) {
            quiz += "<p>Good!</p>";
          } else {
            quiz += "<p>Great!</p>";
          }

          quiz += "</div>";
          quiz += "<button class='start' id='again'>Try Again</button>";
          document.getElementById("inner").innerHTML = quiz;

          //Writing stats to storage
          localStorage.setItem(
            "name+correct+time",
            `${name}: ${c} correct <br>
                    ${document.getElementById("time").innerHTML} seconds`
          );

          clearInterval(t);

          //When clicked 'Play again' the page will reload
          document.getElementById("again").addEventListener("click", () => {
            location.reload();
          });
        }
      });
    }
  }
}
