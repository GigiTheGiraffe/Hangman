// liste des mots
const listeMots = ["pendu", "jeu", "bernacle", "poussin", "pizza", "chat", "montagne", "eclair", "synchronisation", "vert", "balai", "effervescent", "nuage", "abracadabra", "zephyr", "brioche", "galaxie", "xylophone", "lampadaire", "feuille", "ordinateur", "magicien", "vol", "metamorphose", "python", "javascript"];
let motAffiche = "";
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
    lettre.toLowerCase();
    if (lettre.length === 1 && lettre.match(/[a-z]/) && !lettreDonnee.includes(" " + lettre)) {
        lettreDonnee.push(" " + lettre);
        afficher("lettreDejaEntree", lettreDonnee);
        if (motChoisi.includes(lettre)) {
            for (let i = 0; i < motChoisi.length; i++) {
                if (motChoisi[i] === lettre) {
                    motAffiche = motAffiche.substring(0, i) + lettre + motAffiche.substring(i + 1);
                }
            }
            afficher("motDeviner", motAffiche);
        } else {
            vie--;
        }
    } else {
        alert("Veuillez entrer une seule lettre valide qui n'a pas déjà été donnée !");
    }
    zoneInput.value = "";
}

function updateVie() {
    zoneVie.innerText = vie + " vies";
    document.getElementById("imagePendu").src = `images/${vie}.png`;
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
        setTimeout(function () {
            alert("Vous avez perdu! Le mot à deviner était " + motChoisi + "\nVeuillez appuyer sur jouer pour relancer une partie");
        }, 1000);
        btnChoix.disabled = true;
    } else if (motChoisi === motAffiche) {
        setTimeout(function () {
            alert("Félicitations, vous avez gagné! Le mot à deviner était bien " + motChoisi + "\nVeuillez appuyer sur jouer pour relancer une partie");
        }, 1000);
        btnChoix.disabled = true;
    }
}

// générer le mot et les lettres à deviner
btnJouer.addEventListener("click", () => {
    lancerJeu();
});
