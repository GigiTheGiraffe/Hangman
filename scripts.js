// liste des mots
const listeMots = ["pendu", "jeu", "bernacle", "poussin", "pizza"];
let motAffiche = "";
let score = 0;
let motChoisi;
let vie;
// choix random du mot
let btnJouer = document.querySelector("button");
let btnChoix = document.getElementById("choix");
let zoneVie = document.querySelector("b");
let zoneInput = document.querySelector("input");
let lettreDonnee = [];

function afficher(position, texte) {
    let zone = document.getElementById(`${position}`);
    zone.textContent = texte;
}

function choixMot() {
    let indexChoisi = Math.floor(Math.random() * listeMots.length);
    //transformation index en mot choisi
    motChoisi = listeMots[indexChoisi];
    return motChoisi;
};

//afficher le mot en *
function affichageMotCache() {
    motAffiche = "*".repeat(motChoisi.length);
    afficher("motDeviner", motAffiche);
    return motAffiche;
}

//change la string affiché par la nouvelle avec les lettres découvertes
function propositionLettre(lettre) {
    if (lettre.length === 1 && lettre.match(/[a-z]/i)) {
        if (motChoisi.includes(lettre)) {
            for (let i = 0; i < motChoisi.length; i++) {
                if (motChoisi[i] === lettre) {
                    motAffiche = motAffiche.substring(0, i) + lettre + motAffiche.substring(i + 1);
                }
            }
            afficher("motDeviner", motAffiche);
            lettreDonnee.push(" " + lettre);
            console.log(lettreDonnee);
            afficher("lettreDejaEntree", lettreDonnee);
        } else {
            vie--;
            lettreDonnee.push(" " + lettre);
            afficher("lettreDejaEntree", lettreDonnee);
        }
    } else {
        alert("Veuillez entrer une seule lettre valide !");
    }
    zoneInput.value = "";
}

function updateVie() {
    zoneVie.innerText = vie + " vies";
}

//btn pour vérifier si la lettre est dedans et changer affichage vie
btnChoix.addEventListener("click", () => {
    let lettre = zoneInput.value;
    propositionLettre(lettre);
    updateVie();
    finPartie();
});

//check fin de partie
function finPartie() {
    if (vie === 0) {
        zoneVie.innerText = vie + " vies";
        alert("Vous avez perdu! Le mot à deviner était " + motChoisi + " Veuillez appuyer sur jouer pour relancer une partie");
        btnChoix.disabled = true;
    }
}

// générer le mot et les lettres à deviner
btnJouer.addEventListener("click", () => {
   lancerJeu();
});
