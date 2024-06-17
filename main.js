function lancerJeu() {
    vie = 5;
    motChoisi = choixMot();
    motAffiche = affichageMotCache();
    updateVie();
    btnChoix.disabled = false;
    lettreDonnee = [];
    zoneInput.value = "";
}