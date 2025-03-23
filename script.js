// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE
// ===============

//Variables globales
let operation_en_cours=0 // Permet de savoir si le clic précédent était une touche opération ou non
let stockage_nombre=0 // Permet de stocker un nombre pour les calculs
let stockage_decimale_nombre=0 // Permet de stocker le nombre de décimales dudit nombre
let derniere_operation=0 // Permet de savoir quelle est la dernière opération sur laquelle on a cliqué
let decimale=0 // Permet de connaitre le nombre de décimales du nombre actuel 
// Petite subtilité : 10->decimale=0 ; 10.->decimale=1 ; 10.4->decimale=2 ; 10.45275->decimale=6 (donc parfois on utilise max(0,decimale-1) pour avoir le nombre réel de décimales)
// Même fonctionnement pour stockage_decimale_nombre

function f(x) { //Fonction appelée quand on clique sur un chiffre, avec x le chiffre cliqué
    let nombres=document.getElementsByClassName("calculator__display")
    let nombre=nombres[0]
    if (operation_en_cours==0 && decimale==0){ // On rajoute un chiffre au nombre (pas de virgule présente)
        if (nombre.textContent==0){
            nombre.textContent=x
        } 
        else {
            nombre.textContent=10*nombre.textContent+x
        }
    }
    else if (operation_en_cours==0){ // On rajoute un chiffre après la virgule
        let nombre1=parseFloat(nombre.textContent)+parseFloat(x)*Math.pow(10,-1*decimale)
        nombre.textContent=nombre1.toFixed([decimale])
        decimale=decimale+1
    }
    else if (operation_en_cours==1) { //On vient de cliquer sur une opération (x,+,-,%)
        stockage_nombre=nombre.textContent
        stockage_decimale_nombre=decimale
        nombre.textContent=x
        operation_en_cours=0
        decimale=0
    }
    
}

function okay(x){ // Vérifie si un nombre est bien entier lorsqu'on clique sur la virgule (sinon il ne se passe rien)
    return Number.isInteger(parseFloat(x))
}

function AC() { // Tout est dans le nom de la fonction -> réinitialisation de toutes les variables
    let nombres=document.getElementsByClassName("calculator__display")
    let nombre=nombres[0]
    nombre.textContent=0
    operation_en_cours=0
    stockage_nombre=0
    stockage_decimale_nombre=0
    derniere_operation=0
    decimale=0
}

function Virgule(){ // Appelé lorsqu'on clique sur la virgule
    let nombres=document.getElementsByClassName("calculator__display")
    let nombre=nombres[0]
    if (okay(nombre.textContent)){
        decimale=1
    }
}


function nouveau_nombre(y){ //Produit un nouveau nombre à partir de stockage_nombre (global), y (local) et derniere_operation (global)
    let x=parseFloat(y)
    let stockage_nombre_bis=parseFloat(stockage_nombre)
    if (derniere_operation==0) {
        return x
    }
    else if (derniere_operation==1) {
        return stockage_nombre_bis+x
    }
    else if (derniere_operation==2) {
        return stockage_nombre_bis-x
    }
    else if (derniere_operation==3) {
        return stockage_nombre_bis*x
    }
    else if (derniere_operation==4) {
        return stockage_nombre_bis/x
    }
}

function arrondir(x,y){ // Permet d'avoir un résultat agréable à lire malgré les erreurs de calcul (ex : afficher 1 au lieu de 0.9999999999999999999 si le résultat est en réalité 1)
    // x correspond à l'opération réalisée, y correspond au nombre à arrondir
    if (x<=2) { //opération addition ou soustraction
        let n=Math.max(decimale,stockage_decimale_nombre)
        decimale=Math.max(0,n)
        return y.toFixed([Math.max(0,n-1)])
    }
    else if (x==3) { //opération multiplication
        let n=Math.max(0,decimale-1)+Math.max(0,stockage_decimale_nombre-1)
        decimale=n+1
        return y.toFixed([n])
    }
    else { //opération division
        if (Number.isInteger(parseFloat(y))) {
            decimale=0
        }
        else {
            decimale=1
            let nb=y
            let i=0
            while (Number.isInteger(parseFloat(nb))==false && i<15){ // Condition i<15 pour éviter boucle infinie (ou presque) dans le cas d'un résultat non décimal
                decimale=decimale+1
                nb=10*nb
                i=i+1
            }
        }
        return y}
}

function operation(x) { //Appelée quand on clique sur (x,+,-,%,=), fait le calcul du nombre affiché et modifie les variables globales
    let nombres=document.getElementsByClassName("calculator__display")
    let nombre=nombres[0]
    if (operation_en_cours!=1){ // Vérifie qu'on ne vient pas déjà d'appuyer sur une autre opération
        nombre.textContent=arrondir(derniere_operation,nouveau_nombre(nombre.textContent)) // Les calculs se font ici
        }
    operation_en_cours=1
    derniere_operation=x
    
}
