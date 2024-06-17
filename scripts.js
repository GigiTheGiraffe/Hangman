// liste des mots
const listeMots = ["pendu", "jeu", "bernacle", "poussin", "pizza"];
let motAffiche = "";
let score = 0;
let vie = 5;
let motChoisi;
// choix random du mot
let btnJouer = document.querySelector("button");
let btnChoix = document.getElementById("choix");
let zoneVie = document.querySelector("b");

function afficher(position, texte) {
    let zone = document.getElementById(`${position}`);
    zone.textContent = texte;
}

function choixMot () {
    let indexChoisi = Math.floor(Math.random() * listeMots.length);
    //transformation index en mot choisi
    motChoisi = listeMots[indexChoisi];
    return motChoisi;
    //boucle qui fait le lien entre mot choisi et la lettre choisi, boucle la lettre dans le mot. Si trouvé, affiche la lettre sur lettres devinées au bon index
};

//afficher le mot en *
function affichageMotCache() {
    motAffiche = "*".repeat(motChoisi.length);
    afficher("motDeviner", motAffiche);
    return motAffiche;
}

//change la string affiché par la nouvelle avec les lettres découvertes
function propositionLettre (lettre) {
    if(motChoisi.includes(lettre)) {
        let nouveauMot;
        for(let i = 0; i < motChoisi.length; i++) {
            if(motChoisi[i] === lettre) {
                //création nouvelle string avec injection de la lettre
                 nouveauMot= motAffiche.substring(0, i) + lettre + motAffiche.substring(i + 1); 
                afficher("motDeviner", nouveauMot);
                //remplace le mot fait d'étoiles avec le nouveau mot pour garder en mémoire les changements
                motAffiche = nouveauMot;
            }
        };
    } else {
        vie--;
    }
}

function updateVie() {
    zoneVie.innerText = vie + " vies";
}

//btn pour vérifier si la lettre est dedans et changer affichage vie
btnChoix.addEventListener("click", () => {
    let lettre = document.querySelector("input").value;
    propositionLettre(lettre);
    updateVie();
});

// générer le mot et les lettres à deviner
btnJouer.addEventListener("click", () => {
    motChoisi = choixMot();
    motAffiche = affichageMotCache();
});

