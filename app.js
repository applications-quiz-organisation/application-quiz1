let screenwelcome = document.getElementById('welcomescreenId');
let screenquestion = document.getElementById('questionscreenId');
let screenResult = document.getElementById('resultscreen');
let prenom = document.getElementById('nom__input');
let email = document.getElementById('welcomeemail');

function Quiz() {
    this.questions = [];
    this.nbcorrects = 0;
    // this.indexCurrentQuestion = 0; 

    this.addQuestion = function (question) {
        this.questions.push(question);
    }

    this.showCurrentQuestion = function () {

        this.questions[0].getElement();


        /*  if(this.indexCurrentQuestion < this.questions.length) {

         this.questions[ this.indexCurrentQuestion].getElement( this.indexCurrentQuestion+1, this.questions.length);

       }
        else {
           screenquestion.classList.add("hidden");

          let elNbCorrects = document.getElementById("affiche__score");
           elNbCorrects.textContent = quiz.nbcorrects;  

           screenResult.style.display = "block";
        } */
    }
}




function Question(title, answers, answerCorrect) {
    this.title = title;
    this.answers = answers;
    this.answerCorrect = answerCorrect;


    this.getElement = function () {

        let questionTitle = document.createElement("div");
        questionTitle.classList.add('question__title');
        questionTitle.textContent = this.title;
        let questionEvolution = document.createElement('div');
        questionEvolution.textContent = "Question 1/15";


        let divAnswer = document.createElement("div");
        divAnswer.classList.add('div__paragraph');

        const id = "id" + Math.random().toString(16).slice(2);

        this.answers.forEach((answer, index) => {

            let divImput = document.createElement('div');
            divImput.classList.add('reponse')
            let radioInput = document.createElement('input');
            radioInput.setAttribute('type', 'radio');
            radioInput.setAttribute('name', id)
            let label = document.createElement('label');
            label.textContent = answer;

            radioInput.addEventListener("change", function (event) {
                if (document.querySelector('.br-green')) {
                    document.querySelector('.br-green').classList.remove('br-green');
                }
                divImput.classList.add('br-green');
            });

            divImput.append(radioInput);
            divImput.append(label);
            divImput.id = index + 1;
            divImput.addEventListener("click", this.checkAnswer)

            divAnswer.append(divImput);
        })

        let divbutton = document.createElement('div');
        divbutton.classList.add('div__button');
        let buttonQuitter = document.createElement('button');
        buttonQuitter.classList.add('quitter__btn');
        buttonQuitter.textContent = "Quitter";
        let buttonSuivant = document.createElement('button');
        buttonSuivant.classList.add('suivant__btn');
        buttonSuivant.textContent = "Suivant";



        divbutton.append(buttonQuitter);
        divbutton.append(buttonSuivant);



        screenquestion.append(questionTitle);
        screenquestion.append(questionEvolution);
        screenquestion.append(divAnswer);
        screenquestion.append(divbutton);

    }

    this.addAnswer = function (answer) {
        this.answers.push(answer);
    },

        this.checkAnswer = (event) => {

            let answerSelected = event.target;

            if (this.isCorrectAnswer(answerSelected.id)) {

                answerSelected.classList.add('correct__answer input:checked');
            }
        }

    this.isCorrectAnswer = function (answerUser) {
        if (answerUser == this.answerCorrect) {
            return true;
        }
        else {
            return false;
        }
    }

    /* this.getElement = function(indexQuestion, nbQuestion){
      
        let questionNumber = document.createElement('p');
        questionNumber.classList.add("reponse1");
        questionNumber.textContent = "question "+ indexQuestion+"/"+nbQuestion;

        screenquestion.append(questionNumber);

        let questionTitle = document.createElement("p");
        questionTitle.textContent = this.title;

        screenquestion.append(questionTitle);

        let questionAnswers = document.createElement('div');
        questionAnswers.classList.add("div__paragraph");
        let questionInput = document.createElement('p');
        questionInput.classList.add('reponse');

        this.answers.forEach((answer, index) =>{
            let elAnswer = document.createElement("input");
            elAnswer.setAttribute("type", "radio");
            elAnswer.textContent = answer;


            questionInput.append(elAnswer);
            questionAnswers.append(questionInput);
           
        })
        screenquestion.append(questionAnswers);

        let quitterbtn = document.createElement('button');
        quitterbtn.classList.add("quitter__btn");
        let suivantbtn = document.createElement("button");
        suivantbtn.classList.add("suivant__btn");
        let divButton = document.createElement('div');
        divButton.classList.add('div__button');

        quitterbtn.value = "Quitter";
       
        suivantbtn.value = "Suivant";

        divButton.append(suivantbtn);
        divButton.append(quitterbtn);

        screenquestion.append(divButton);
    } */

}

let quiz = new Quiz();
let question1 = new Question("quel est le type d'un fichier JavaScript?", [".ts", ".jsX", ".js", ".j"], 3);
quiz.addQuestion(question1);



let elNbCorrects = document.getElementById('nbcorrects');
elNbCorrects.textContent = quiz.nbcorrects;

let elNbquestion = document.getElementById('nbquestions');
elNbquestion.textContent = quiz.questions.length;

function seeFirstQuestion() {
    let divNom = document.createElement('div')
    let divEmail = document.createElement('div');

    screenwelcome.classList.add('hidden');

    screenquestion.style.display = "block";

    divNom.textContent = prenom.value
    divEmail.textContent = email.value


    quiz.showCurrentQuestion();
}

let welcomebtn = document.getElementById('commencer__btn');
welcomebtn.addEventListener("click", seeFirstQuestion);
