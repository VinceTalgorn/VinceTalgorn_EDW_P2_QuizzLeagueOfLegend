//Tableau regroupant les bonnes réponses
const responses = [
    "a",
    "c",
    "b",
    "d",
    "c",
    "a",
    "b",
    "c",
    "d",
    "b",
    "a",
    "a",
    "d",
    "a",
    "d",
    "b",
    "b",
    "c",
    "a",
    "b",
];
//Tableau des emojis
const emojis = ["✅", "✨", "👀", "😭", "👎"];

//On vient lire le formulaire
const form = document.querySelector(".quizz_form");
//On écoute l'event
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const results = [];
    //On va venir écouter toutes les réponses
    const radioButtons = document.querySelectorAll(
        "input[type='radio']:checked"
    );

    //Si la valeur de mon input est égale à la valeur de mon index (c-à-d une bonne réponse) alors on renvoie true
    radioButtons.forEach((radioButton, index) => {
        if (radioButton.value === responses[index]) {
            results.push(true);
        } else {
            results.push(false);
        }
    });
    //Appel de la fonction qui va montrer le résultat sur la page web
    showResults(results);
    //Appel de la fonction qui va appeler la couleur en fonction de la réponse correct ou non
    addColors(results);
}

const titleResult = document.querySelector(".results h2");
const markResult = document.querySelector(".mark");
const helpResult = document.querySelector(".help");

//Fonction qui va montrer le résultat dans le DOM
function showResults(results) {
    //Varriable qui va aller chercher le nombre d'erreur dasn un nouveau tableau avec filter
    let errorsNumber = results.filter((el) => el === false).length;

    //S'il y a 0 erreur
    if (errorsNumber == 0) {
        console.log(errorsNumber);
        titleResult.textContent = `✅ Bravo, tu as eu 0 faute GG WP ! ✅`;
        helpResult.textContent = "Quelle culture ...";
        helpResult.style.display = "block";
        //On fait 20 - errorsNumber afin d'afficher le nombre de bonnes réponses
        markResult.innerHTML = `Résultat : <span> ${
            20 - errorsNumber
        } / 20</span>`;
        markResult.style.display = "block";
        //S'il y a entre 1 et 5 erreurs
    } else if (errorsNumber >= 1 && errorsNumber <= 5) {
        titleResult.textContent = `✨ Encore un effort, stop flash dans le mur... ! 👀`;
        helpResult.textContent =
            "Retentez une autre réponse dans les cases rouges, puis re-validez !";
        helpResult.style.display = "block";
        markResult.innerHTML = `Résultat : <span> ${
            20 - errorsNumber
        } / 20</span>`;
        markResult.style.display = "block";
        //S'il y a entre 6 et 10 erreurs
    } else if (errorsNumber >= 6 && errorsNumber <= 10) {
        titleResult.textContent = `👀 Il y a encore pas mal d'erreurs ff 15 ! 😭`;
        helpResult.textContent =
            "Retentez une autre réponse dans les cases rouges, puis re-validez !";
        helpResult.style.display = "block";
        helpResult.style.display = "block";
        markResult.innerHTML = `Résultat : <span> ${
            20 - errorsNumber
        } / 20</span>`;
        markResult.style.display = "block";
        //S'il y a entre 11 et 15 erreurs
    } else if (errorsNumber >= 11 && errorsNumber <= 15) {
        titleResult.textContent = `😭 Rohhh un effort petit noob ! 😭`;
        helpResult.textContent =
            "Retentez une autre réponse dans les cases rouges, puis re-validez !";
        helpResult.style.display = "block";
        markResult.innerHTML = `Résultat : <span> ${
            20 - errorsNumber
        } / 20</span>`;
        markResult.style.display = "block";
        //S'il y a entre 16 et 20 erreurs
    } else if (errorsNumber >= 16 && errorsNumber <= 20) {
        titleResult.textContent = `👎 Hmmm tu as déjà lancé le jeu ou quoi ?! 👎`;
        helpResult.style.display = "block";
        helpResult.textContent =
            "Retentez une autre réponse dans les cases rouges, puis re-validez !";
        markResult.style.display = "block";
        markResult.innerHTML = `Score : <span>${20 - errorsNumber} / 20</span>`;
        //Valeur par défaut
    } else {
        titleResult.textContent = "Wops, cas innatendu.";
    }
}

//On va appeler le bloc qui va changer de couleur
const questions = document.querySelectorAll(".question_bloc");

function addColors(results) {
    //On est obligé d'avoir deux arguments même si on utilise que le callBack
    results.forEach((res, index) => {
        //Si la réponse est correct alors on affiche du vert
        if (results[index]) {
            //On va venir modifier le backgroundImage
            questions[index].style.backgroundImage =
                "linear-gradient(to right, #a8ff78, #78ffd6)";
        } else {
            //Si la réponse est incorrect alors on affiche du rouge
            questions[index].style.backgroundImage =
                "linear-gradient(to right, #f5567b, #fd674c)";
        }
    });
}

//On va reset le background lorsque l'utilisateur va retester le quizz
const radioInputs = document.querySelectorAll("input[type='radio']");

radioInputs.forEach((radioInput) =>
    radioInput.addEventListener("input", resetColor)
);

function resetColor(e) {
    /* On va venir prendre le name (q1) et slice pour prendre que le 1 
    et on enlève -1 pour que ça fasse comme l'index (car l'index commence à 0) */
    const index = e.target.getAttribute("name").slice(1) - 1;
    const parentQuestionBlock = questions[index];

    // On va remettre la couleur de base
    parentQuestionBlock.style.backgroundColor = "#f1f1f1";
    parentQuestionBlock.style.backgroundImage = "none";
}
