let screenwelcome = document.getElementById('welcomescreenId');
let screenquestion = document.getElementById('questionscreenId');
let screenResult = document.getElementById('resultscreen');
let prenom = document.getElementById('nom__input');
let email = document.getElementById('welcomeemail');
let nomAffiche = document.createElement('h2');
nomAffiche.classList.add('affiche__prenom');
nomAffiche.classList.add('#affiche__prenom');
let emailAffiche = document.createElement('h2');
emailAffiche.classList.add('affiche__prenom');
emailAffiche.classList.add('#affiche__email');
let imageReussite = document.createElement('img');
let imageEchec = document.createElement('img');
let counter = document.createElement('div');
counter.classList.add('time');
let divProgress = document.createElement('div');
divProgress.classList.add('progress');
let divprogressInner = document.createElement('div');
divprogressInner.classList.add('progress-inner');



function Quiz() {
    this.questions = [];
    this.nbcorrects = 0;
    this.indexCurrentQuestion = 0;

    this.addQuestion = function (question) {
        this.questions.push(question);
    }

    this.showCurrentQuestion = function () {

        if (this.indexCurrentQuestion < this.questions.length) {

            this.questions[this.indexCurrentQuestion].getElement(this.indexCurrentQuestion + 1, this.questions.length);
        }
        else {
            screenquestion.classList.add("hidden");

            let elNbCorrects = document.getElementById("nbcorrects");
            elNbCorrects.textContent = quiz.nbcorrects;

            screenResult.style.display = "block";
        }



     
    }
}




function Question(title, answers, answerCorrect) {
    this.title = title;
    this.answers = answers;
    this.answerCorrect = answerCorrect;


    this.getElement = function (indexQuestion, nbQuestions) {

        let questionTitle = document.createElement("div");
        questionTitle.classList.add('question__title');
        questionTitle.textContent = this.title;
        let divCounter = document.createElement('div');
        divCounter.classList.add('counterClass');
        let questionEvolution = document.createElement('div');
        questionEvolution.textContent = "Question" + indexQuestion + "/" + nbQuestions;
        


        let divAnswer = document.createElement("div");
        divAnswer.classList.add('div__paragraph');
        counter.textContent = 60;

        let buttonSuivant = document.createElement('button');
        buttonSuivant.classList.add('suivant__btn');
        buttonSuivant.textContent = "Suivant";
        buttonSuivant.disabled = true;

        const id = "id" + Math.random().toString(16).slice(2);

        this.answers.forEach((answer, index) => {

            let divImput = document.createElement('div');
            divImput.classList.add('reponse')
            let radioInput = document.createElement('input');
            radioInput.setAttribute('type', 'radio');
            radioInput.setAttribute('name', id)
            radioInput.id = index + 1;
            radioInput.classList.add('radioInputClass')
            let label = document.createElement('label');
            
            label.textContent = answer;

            radioInput.addEventListener("change", function (event) {
                buttonSuivant.disabled = false;
                if (document.querySelector('.br-green')) {
                    document.querySelector('.br-green').classList.remove('br-green');
                }
                divImput.classList.add('br-green');
            });

            /*  radioInput.addEventListener('click', function() {
  
              })*/

            divImput.append(radioInput);
            divImput.append(label);
            divImput.addEventListener("click", this.checkAnswer)
 
            divAnswer.append(divImput);
            console.log(divAnswer)
        })

        let divbutton = document.createElement('div');
        divbutton.classList.add('div__button');
        let buttonQuitter = document.createElement('button');
        buttonQuitter.classList.add('quitter__btn');
        buttonQuitter.textContent = "Quitter";
        buttonQuitter.addEventListener('click', function () {
            close();
        })




        buttonSuivant.addEventListener("click", questionSuivante);

         
        divCounter.append( questionEvolution);
        divCounter.append(counter);
        divProgress.append(divprogressInner);

        divbutton.append(buttonQuitter);
        divbutton.append(buttonSuivant);



        screenquestion.append(questionTitle);
        screenquestion.append(divCounter);
        screenquestion.append(divProgress);
        screenquestion.append(divAnswer);
        screenquestion.append(divbutton);

    }

    this.addAnswer = function (answer) {
        this.answers.push(answer);
    },

        this.checkAnswer = (event) => {

            let answerSelected = event.target;


            if (this.isCorrectAnswer(answerSelected.id)) {
                quiz.nbcorrects++;
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





}

let quiz = new Quiz();
let question1 = new Question("quel est le type d'un fichier JavaScript?", [".ts", ".jsX", ".js", ".j"], 3);
quiz.addQuestion(question1);
let question2 = new Question("comment je m'appelle", [".isaac", "jean", "heritier", "jeremie"], 1);
quiz.addQuestion(question2);
let question3 = new Question('quel est le type de fichier', ["1", "3", "4", "6"], 2);
quiz.addQuestion(question3);
let question4 = new Question('quel est ton age', ["20ans", "30ans", "40ans", "55ans"], 4);
quiz.addQuestion(question4);
let currentSetInterval = null;


let elNbquestion = document.getElementById('nbquestions');
elNbquestion.textContent = quiz.questions.length;

function seeFirstQuestion() {
    let nom = document.getElementById('nom__input');
    let email = document.getElementById('welcomeemail');

    screenwelcome.classList.add('hidden');

    screenquestion.style.display = "block";

  

        
        quiz.showCurrentQuestion();
}

function seeAcceuil() {
    location.reload();
    screenResult.textContent = '';
    screenResult.classList.add('hidden');
    screenwelcome.style.display = "block";
}


let welcomebtn = document.getElementById('commencer__btn');
welcomebtn.addEventListener("click", validation);
let buttonAcceuil = document.getElementById('acceuil__btnId');
buttonAcceuil.addEventListener("click", seeAcceuil );


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');


    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}


const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('sucess');
    inputControl.classList.remove('error');
}






function progressBar () {

    let interval = 10;
    if (currentSetInterval) {
        clearInterval(currentSetInterval);
    }
    currentSetInterval = setInterval(() => {
        interval--;
        
        let progressWidth = interval/10*100;

        if(interval > 0) {

            divprogressInner.style.width = progressWidth + "%";
            counter.innerHTML = interval+"s"
            
        } else {
            clearInterval(currentSetInterval)
            divprogressInner.style.width = "0%";
            questionSuivante ();
            
        }
    }, 1000);

}

function questionSuivante () {

    screenquestion.textContent = '';
    quiz.indexCurrentQuestion++;
    validation();
   
  
   
   
    
    nomAffiche.textContent = prenom.value;
    emailAffiche.textContent = email.value;

    if (quiz.indexCurrentQuestion == quiz.questions.length) {
        ("Cheking...");
        if (quiz.nbcorrects / quiz.questions.length >= 0.5) {
            console.log("Success");
            imageReussite.src = "crochet.png";
            screenResult.prepend(imageReussite);
        }
        else {
            console.log("Fail");
            imageEchec.src = "echec.png";
            screenResult.prepend(imageEchec);
        }
    }
    console.log



    screenResult.prepend(emailAffiche);
    screenResult.prepend(nomAffiche);
}




function validation () {
    
    let forgetNom = document.querySelector(".prenomClass");
    let forgetEmail = document.querySelector(".emailClass");
    let masque = /\s/g; 
    let masqueEmail = /@gmail.com$/;

    if (masque.test(prenom.value) || !(masqueEmail.test(email.value)) || email.value=="" || prenom.value=="") {

        if (masque.test(prenom.value) || prenom.value=="") {
            forgetNom.style.display="block";
           // forgetNom.textContent="Pas de caractères blancs";  
        }
    
        if (!(masqueEmail.test(email.value)) || email.value=="") {
            forgetEmail.style.display="block";
            
        }          
    }
    else {
     seeFirstQuestion();

     
     progressBar ();
    } 
    
}



