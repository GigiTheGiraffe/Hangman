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
    lettre = lettre.toLowerCase();
    if (lettre.length > 0 && lettre.length < 2) {
        let charCode = lettre.charCodeAt(0);
        if (charCode > 96 && charCode < 123) {
            if (motChoisi.includes(lettre)) {
                let nouveauMot;
                for (let i = 0; i < motChoisi.length; i++) {
                    if (motChoisi[i] === lettre) {
                        //création nouvelle string avec injection de la lettre
                        nouveauMot = motAffiche.substring(0, i) + lettre + motAffiche.substring(i + 1);
                        afficher("motDeviner", nouveauMot);
                        //remplace le mot fait d'étoiles avec le nouveau mot pour garder en mémoire les changements
                        motAffiche = nouveauMot;
                    }
                };
            } else {
                vie--;
            }
        } else {
            alert("Veuillez rentrer une L E T T R E !");
        }
    } else {
            alert("Veuillez rentrer une seule lettre dans le champ");
        }
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
        alert("Vous avez perdu! Veuillez appuyer sur jouer pour relancer une partie");
        btnChoix.disabled = true;
    }
}

// générer le mot et les lettres à deviner
btnJouer.addEventListener("click", () => {
   lancerJeu();
});
