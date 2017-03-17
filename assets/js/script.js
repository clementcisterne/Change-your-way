/**
 * Un tableau qui va contenir la template de la map
 *
 * @type {Array}
 */
var table = new Array(); //Map de base
var grandeMap= new Array();//Map pour mini_jeux
var ligneGM;//Indice de la ligne de table la plus haute pour deplacer la Map

//Un int strictement positif qui représente l'axe des y
var larg;

//Un int strictement positif qui représente l'axe des x
var haut;

//Le personnage 
var smile=document.getElementById("pic2");	

//Le niveau actuel 
var niveau;

//Le niveau precedent
var niveauPrecedent;

//Booleen qui dis si on doit passer au niveau suivant ou à un mini-jeu
var suivant;

//booleen pour le deplacement de la map
var active=false;

//Le conteneur de la map
var conteneur = document.getElementById("conteneur");

//Portes rouges
var portesRouge = document.getElementsByClassName('porteRouge');

//Portes bleues
var portesBleue = document.getElementsByClassName('porteBleue');

//Portes Noires
var portesNoire = document.getElementsByClassName('porteNoire');

//@type {boolean}
var portesRougeIsOpen = false;

//@type {boolean}
var portesNoireIsOpen = false;

//@type {boolean}
var portesBleueIsOpen = false;


window.onload=start; // On démmarre la map  

/**
 * 		- Génère la template en fonction du niveau
 * 		- C'est ici qu'on va construire nos niveaux à l'aide de tableau
 */
function start() {
	if(niveau==undefined){
		niveau=1;
		niveau1();
	}
	if(niveau==1){
		niveau1();
	}
	if(niveau==2){
		niveau2();
	}
	if(niveau==3){
		niveau3();
	}
	if(niveau==4){
		niveau4();
	}
	if(niveau==5){
		mini_jeux();
	}
	
	displayTemplate(table);
	var boutonNiveauSuivant=document.getElementById("niveau");	//On va devoir cacher le bouton "niveau suivant"
	boutonNiveauSuivant.style.visibility="hidden";
}

/**
 * Affiche la template
 *
 * @param template un tableau à 2 dimensions
 * */
function displayTemplate(template) {

	for(var i=0;i<template.length;i++){
		for(var j=0;j<template[i].length;j++){
			var monImg = document.createElement('img');

			// On construit la carte en fonction des valeurs des cases
			switch (template[i][j]) {

				// Case de mur infranchissable
				case 1:
					monImg.setAttribute('class','mur');
					monImg.src="./assets/img/mur.png";
					break;

				// Case de passage
				case 0:
					monImg.src="./assets/img/blanc.png";
					break;

				// Position de départ du joueur
				case 2:
					haut=i; // On initialise les valeurs pour la case de départ
					larg=j;
					table[haut][larg]=0; // On modifie dans table la valeur de la case de départ	
					var monImg = document.getElementById("pic2");
					monImg.src="./assets/img/personnage.png";
					document.getElementById('haut').innerHTML = haut;
					document.getElementById('largeur').innerHTML = larg;
					break;

				// Position de la fleche
				case 3:
					monImg.src="./assets/img/fleche.png";
					monImg.setAttribute('class', 'fleche');
					break;

			// Ouverture des portes rouges
				case 4:
					monImg.src="./assets/img/openRouge.png";
					monImg.setAttribute('class', 'openRouge');
					break;

			// Position des portes rouges
				case 5:
					monImg.src="./assets/img/porteRouge.png";
					monImg.setAttribute('class', 'porteRouge');
					monImg.setAttribute('value','rouge');
					break;

			// Ouverture des portes bleus
				case 6:
					monImg.src="./assets/img/openBleue.png";
					monImg.setAttribute('class', 'openBleue');
					monImg.setAttribute('value','bleu');
					break;

			// Position des portes bleus
				case 7:
					monImg.src="./assets/img/porteBleue.png";
					monImg.setAttribute('class', 'porteBleue');
					monImg.setAttribute('value','bleu');
					break;
				case 8: 
					monImg.src="./assets/img/openNoire.png";
					monImg.setAttribute('class', 'openNoire');
					monImg.setAttribute('value','noire');
					break;
				case 9:
					monImg.src="./assets/img/porteNoire.png";
					monImg.setAttribute('class', 'porteNoire');
					monImg.setAttribute('value','noire');
					break;
				//Affiche lesmissiles du mini_jeux
				case 10:
					monImg.src="./assets/img/missile.png";
					monImg.setAttribute('class', 'missile');

			}
			monImg.style.height='20px';
			monImg.style.width='20px';
			monImg.style.position='absolute';
			monImg.style.top=i*20+'px';
			monImg.style.left=j*20+'px';
			conteneur.appendChild(monImg);
		}
	}
}

/**
 * Gestion des mouvements joueurs
 *
 * @param event
 */
function move(event) {
	var key=event.keyCode;

	var x=smile.offsetLeft;
	var y=smile.offsetTop;
    var boutonNiveauSuivant=document.getElementById("niveau");	//On va devoir cacher le bouton "niveau suivant"
	//Bouton entrée pour passer au niveau suivant
	if(boutonNiveauSuivant.style.visibility=="visible"){
		if(key==13){
			niveauSuivant();
		}
	}
	if(niveau!=5){

    	// On récupère la touche du clavier
    	if(key==37) { // 37 représente la touche fleche gauche
    		if(x!=0) {  // si on est en dehors de la limite de la map
    			case_suivante = table[haut][larg-1];
    			direction = "gauche";
    			switchCaseSuivante(case_suivante,x,y,direction);
    		} else {
    			case_suivante = null;
    		}
    	}
    	if(key==38) { // 38 représente la touche fleche haut
    		if(y!=0) {
    			case_suivante = table[haut-1][larg];
    			direction = "haut";
    			switchCaseSuivante(case_suivante,x,y,direction);
    		} else {
    			case_suivante = null;
    		}
    	}
    	if(key==39) { // 39 représente la touche fleche droite
    		if(x!=(table[haut].length-1)*20) {
    			case_suivante = table[haut][larg+1];
    			direction = "droite";
    			switchCaseSuivante(case_suivante,x,y,direction);
    		} else {
    			case_suivante = null;
    		}
    	}
    	if(key==40) { // Si on appuie sur fleche bas
    		if(y!=(table.length-1)*20) {
    			case_suivante = table[haut+1][larg];
    			direction = "bas";
    			switchCaseSuivante(case_suivante,x,y,direction);
    		} else {
    			case_suivante = null;
    		}
    	}
	}
	if(niveau==5){
		// On récupère la touche du clavier
		if(key==37) { // 37 représente la touche fleche gauche
			if(x!=0) {  // si on est en dehors de la limite de la map
				smile.style.left=x-20+'px';
				larg--;
				document.getElementById('largeur').innerHTML = larg;
				document.getElementById("pas").innerHTML++;
				
			} else {
				case_suivante = null;
			}
		}
		if(key==38) { // 38 représente la touche fleche haut
			if(y!=0) {
				case_suivante = table[haut-1][larg];
				if(case_suivante!=1){
					if(active==false){
						montimer=window.setInterval("monterMap()",500);
						active=true;
					}
					document.getElementById('haut').innerHTML = haut;
					document.getElementById("pas").innerHTML++;
				}
			} else {
				case_suivante = null;
			}
		}
		if(key==39) { // 39 représente la touche fleche droite
			if(x!=(table[haut].length-1)*20) {
				smile.style.left=x+20+'px';
				larg++;
				document.getElementById('largeur').innerHTML = larg;
				document.getElementById("pas").innerHTML++;
			} else {
				case_suivante = null;
			}
		}
	}
}

/**
 * Gestion des déplacements en fonctions de la case suivante, des x et y et de la direction
 */
function switchCaseSuivante(case_suivante,x,y,direction) {
	console.log(case_suivante);
	console.log(direction);	
	switch (case_suivante) {

	// Passage		
		case 0:
			switch (direction) {
				case 'droite':
					smile.style.left=x+20+'px';
					larg++;
					document.getElementById('largeur').innerHTML = larg;
					document.getElementById("pas").innerHTML++;
					break;

				case 'gauche':
					smile.style.left=x-20+'px';
					larg--;
					document.getElementById('largeur').innerHTML = larg;
					document.getElementById("pas").innerHTML++;
					break;

				case 'haut':
					smile.style.top=y-20+'px';
					haut--;
					document.getElementById('haut').innerHTML = haut;
					document.getElementById("pas").innerHTML++;
					break;

				case 'bas':
					smile.style.top=y+20+'px';
					haut++;
					document.getElementById('haut').innerHTML = haut;
					document.getElementById("pas").innerHTML++;
					break;

				default:
					break;
			}
			break;

	// Fleche
		case 3:
			win();
			break;

	// openRouge
		case 4:
		//On cache chaque porte lorsqu'on est sur le bouton rouge
			for(i=0;i<portesRouge.length;i++) {
				if(portesRouge[i].style.visibility != "hidden") {
					portesRouge[i].style.visibility = "hidden";
					portesRougeIsOpen = true;
				} else {
					portesRouge[i].style.visibility = "visible";
					portesRougeIsOpen = false;
				}
			}

			switch (direction) {
				case 'droite':
					smile.style.left=x+20+'px';
					larg++;
					document.getElementById('largeur').innerHTML = larg;
					document.getElementById("pas").innerHTML++;
					break;

				case 'gauche':
					smile.style.left=x-20+'px';
					larg--;
					document.getElementById('largeur').innerHTML = larg;
					document.getElementById("pas").innerHTML++;
					break;

				case 'haut':
					smile.style.top=y-20+'px';
					haut--;
					document.getElementById('haut').innerHTML = haut;
					document.getElementById("pas").innerHTML++;
					break;

				case 'bas':
					smile.style.top=y+20+'px';
					haut++;
					document.getElementById('haut').innerHTML = haut;
					document.getElementById("pas").innerHTML++;
					break;

				case undefined:

					break;

				default:
					break;
			}
			break;

	// portes rouges
		case 5:
			if(portesRougeIsOpen == true){
				switch (direction) {
					case 'droite':
						smile.style.left=x+20+'px';
						larg++;
						document.getElementById('largeur').innerHTML = larg;
						document.getElementById("pas").innerHTML++;
						break;

					case 'gauche':
						smile.style.left=x-20+'px';
						larg--;
						document.getElementById('largeur').innerHTML = larg;
						document.getElementById("pas").innerHTML++;
						break;

					case 'haut':
						smile.style.top=y-20+'px';
						haut--;
						document.getElementById('haut').innerHTML = haut;
						document.getElementById("pas").innerHTML++;
						break;

					case 'bas':
						smile.style.top=y+20+'px';
						haut++;
						document.getElementById('haut').innerHTML = haut;
						document.getElementById("pas").innerHTML++;
						break;

					default:
						break;
				}
			}
			break;

	// openBleue
		case 6:
		// On cache la cle on cache la porte et emmetre un son
			for(i=0;i<portesBleue.length;i++) {
				if(portesBleue[i].style.visibility != "hidden") {
					portesBleue[i].style.visibility = "hidden";
					portesBleueIsOpen = true;
				} else {
					portesBleue[i].style.visibility = "visible";
					portesBleueIsOpen = false;
				}
			}

			switch (direction) {
				case 'droite':
					smile.style.left=x+20+'px';
					larg++;
					document.getElementById('largeur').innerHTML = larg;
					document.getElementById("pas").innerHTML++;
					break;

				case 'gauche':
					smile.style.left=x-20+'px';
					larg--;
					document.getElementById('largeur').innerHTML = larg;
					document.getElementById("pas").innerHTML++;
					break;

				case 'haut':
					smile.style.top=y-20+'px';
					haut--;
					document.getElementById('haut').innerHTML = haut;
					document.getElementById("pas").innerHTML++;
					break;

				case 'bas':
					smile.style.top=y+20+'px';
					haut++;
					document.getElementById('haut').innerHTML = haut;
					document.getElementById("pas").innerHTML++;
					break;

				default:
					break;
			}
			break;

	// portes bleues
		case 7:
			if(portesBleueIsOpen == true){
				switch (direction) {
					case 'droite':
						smile.style.left=x+20+'px';
						larg++;
						document.getElementById('largeur').innerHTML = larg;
						document.getElementById("pas").innerHTML++;
						break;

					case 'gauche':
						smile.style.left=x-20+'px';
						larg--;
						document.getElementById('largeur').innerHTML = larg;
						document.getElementById("pas").innerHTML++;
						break;

					case 'haut':
						smile.style.top=y-20+'px';
						haut--;
						document.getElementById('haut').innerHTML = haut;
						document.getElementById("pas").innerHTML++;
						break;

					case 'bas':
						smile.style.top=y+20+'px';
						haut++;
						document.getElementById('haut').innerHTML = haut;
						document.getElementById("pas").innerHTML++;
						break;

					default:
						break;
				}
				
			}
			break;
	
	// openNoires
		case 8:
		// On cache la cle on cache la porte et emmetre un son
			for(i=0;i<portesNoire.length;i++) {
				if(portesNoire[i].style.visibility != "hidden") {
					portesNoire[i].style.visibility = "hidden";
					portesNoireIsOpen = true;
				} else {
					portesNoire[i].style.visibility = "visible";
					portesNoireIsOpen = false;
				}
			}
				switch (direction) {
				case 'droite':
					smile.style.left=x+20+'px';
					larg++;
					document.getElementById('largeur').innerHTML = larg;
					document.getElementById("pas").innerHTML++;
					break;

				case 'gauche':
					smile.style.left=x-20+'px';
					larg--;
					document.getElementById('largeur').innerHTML = larg;
					document.getElementById("pas").innerHTML++;
					break;

				case 'haut':
					smile.style.top=y-20+'px';
					haut--;
					document.getElementById('haut').innerHTML = haut;
					document.getElementById("pas").innerHTML++;
					break;

				case 'bas':
					smile.style.top=y+20+'px';
					haut++;
					document.getElementById('haut').innerHTML = haut;
					document.getElementById("pas").innerHTML++;
					break;

				default:
					break;
			}
			break;
	
	// portes noires
		case 9:
			if(portesNoireIsOpen == true){
				switch (direction) {
					case 'droite':
						smile.style.left=x+20+'px';
						larg++;
						document.getElementById('largeur').innerHTML = larg;
						document.getElementById("pas").innerHTML++;
						break;

					case 'gauche':
						smile.style.left=x-20+'px';
						larg--;
						document.getElementById('largeur').innerHTML = larg;
						document.getElementById("pas").innerHTML++;
						break;

					case 'haut':
						smile.style.top=y-20+'px';
						haut--;
						document.getElementById('haut').innerHTML = haut;
						document.getElementById("pas").innerHTML++;
						break;

					case 'bas':
						smile.style.top=y+20+'px';
						haut++;
						document.getElementById('haut').innerHTML = haut;
						document.getElementById("pas").innerHTML++;
						break;

					default:
						break;
			    }
			}
			break;

		default:
			break;
	}
}

function win() {
	reset(table);
	table=[
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
		[0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
		[0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
		[0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
		[0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
		[0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	displayTemplate(table);
	var boutonNiveauSuivant=document.getElementById("niveau");	//On va devoir cacher le bouton "niveau suivant"
	boutonNiveauSuivant.style.visibility="visible"; // On affiche le bouton niveau suivant
}

function enleverMur(i,j){
	var conteneur = document.getElementById("conteneur");
	allCase.forEach(function(element) {
		element.remove();
	});
}

function monterMap(){
	var y=smile.offsetTop;
	if(y!=0) {
		case_suivante = table[haut-1][larg];
		if(case_suivante!=1 && case_suivante!=10){
			if(!(ligneGM-1<0)){
				reset(table);
				var x=0;
				var y=0;
				for(i=ligneGM;i<ligneGM+20;i++){
					x=x+1;
					y=0;
					for(j=0;j<20;j++){
						table[x][y]= grandeMap[i][j];
						
						y=y+1;
					}
				}
				ligneGM=ligneGM-1;
				displayTemplate(table);
			}
			else{
				window.clearInterval(montimer);
				niveau=1;
			}
		}
		if(case_suivante==10){
			window.clearInterval(montimer);
			active=false;
			niveau="mini_jeux";
			reset(table);
			start();
		}
	}
}

function niveauSuivant() {
	if(niveau<2 || niveau==undefined){
		niveau=2;
		
	}
	else{
		niveau+=1;
	}


	document.getElementById('vueNiveau').innerHTML=niveau;
	console.log(niveau);
	reset(table);
	start();
}

function reset(template){
	portesRougeIsOpen = false;
	portesBleueIsOpen = false;

	var allMur = document.querySelectorAll('.mur');
	var allPorte = document.querySelectorAll('.porte');
	var allPassage = document.querySelectorAll('.passage');
	var allFleche = document.querySelectorAll('.fleche');
	var allMissile = document.querySelectorAll('.missile');
	

	for(var i = 0; i < allMur.length; i ++){
		allMur[i].remove();
	}
	for(var i = 0; i < allPorte.length; i ++){
		allPorte[i].remove();
	}
	for(var i = 0; i < allPassage.length; i ++){
		allPassage[i].remove();
	}
	for(var i = 0; i < allFleche.length; i ++){
		allFleche[i].remove();
	}
	for(var i = 0; i < allMissile.length; i ++){
		allMissile[i].remove();
	}
}


// Fonction contient les templates des map

function niveau1() {
	table = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
}

function niveau2() {
	table=[
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 0, 0, 0, 0, 6, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
	[1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
	[1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0],
	[1, 0, 0, 0, 0, 1, 0, 1, 1, 7, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0],
	[1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 3, 1, 0, 1, 0, 1, 0, 0, 0],
	[0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0],
	[0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
	[0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
	[0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
	[0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
	];
}

function niveau3() {
	table=[
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 1, 1, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 1, 1, 5, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 0, 0, 0, 6, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 5, 7, 5, 3, 5, 7, 5, 0, 2, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];
}

function niveau4() {
  table=[
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 2, 0, 0, 0, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
		[1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 1, 1],
		[1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 1, 0, 0, 6, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 3, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];
    
}
function mini_jeux() {
	grandeMap=[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 10, 0, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	table=[
		[0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	ligneGM=grandeMap.length-20;
}
