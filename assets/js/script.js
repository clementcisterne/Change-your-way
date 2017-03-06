window.onload=start;
var table = new Array(); // on cree le tableau bleu, contenant les lignes
var larg;
var haut;
var niveau;


//document.onkeydown=move;

// on parcourt les lignes...
/*for(var i=0; i<20; i++){
	table[i] = new Array();
   // ... et dans chaque ligne, on parcourt les cellules
	for(var j=0; j<20; j++){
    	table[i][j] = 0;
    }
}*/



function start() {
	//On cache le bouton "niveau suivant"
	var bouton=document.getElementById("niveau");
	bouton.style.visibility="hidden";

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
	displayTemplate(table);

/*	for(var i=0;i<=19;i++) {
		for(var j=0;j<=19;j++) {
			if(table[i][j]==1) {
				afficherMur(i,j);
			}
		}
	}*/
	/*
	var alea=Math.floor(Math.random()*20);
	table[19][alea]=2;
	document.getElementById("coffre").style.top=19*20+'px';
	document.getElementById("coffre").style.left=20*alea+'px';
	*/


	/*
	if(table[0][1]==1) {
		document.getElementById("mine").innerHTML++;
	}
	if(table[1][1]==1) {
		document.getElementById("mine").innerHTML++;
	}
	*/
}

function reset(template){
	for(var i=0;i<template.length;i++){
		for(var j=0;j<template[i].length;j++){
	    	table[i][j] = 0;
	    	enleverMur(i,j);
	    }
	}
}

// gestion des mouvements joueurs
function move(event) {
	var key=event.keyCode;

	var smile=document.getElementById("pic2");
	var x=smile.offsetLeft;
	var y=smile.offsetTop;
	table[haut][larg]=0; // On modifie la valeur de la case de départ pour pouvoir y re-passer

	if(key==65) { // 65 représente la touche "a"
		cheat();
	}

	if(key==37) { // 37 représente la touche fleche gauche
		if(x!=0) {
			if(table[haut][larg-1]==0) {
				smile.style.left=x-20+'px';
				larg--;
				document.getElementById('largeur').innerHTML = larg;
				document.getElementById("pas").innerHTML++;
			} else if(table[haut][larg-1]==3) {
				win();
			}
		}
	}

	if(key==38) { // 38 représente la touche fleche haut
		if(y!=0) {
			if(table[haut-1][larg]==0) {
				smile.style.top=y-20+'px';
				haut--;
				document.getElementById('haut').innerHTML = haut;
				document.getElementById("pas").innerHTML++;
			} else if(table[haut-1][larg]==3) {
				win();
			}
		}
	}

	if(key==39) { // 39 représente la touche fleche droite
		if(x!=(table[haut].length-1)*20) {
			if(table[haut][larg+1]==0) {
				smile.style.left=x+20+'px';
				larg++;
				document.getElementById('largeur').innerHTML = larg;
				document.getElementById("pas").innerHTML++;
			} else if(table[haut][larg+1]==3) {
				win();
			}
		}
	}

	if(key==40) { // Si on appuie sur fleche bas
		if(y!=(table.length-1)*20) {
			if(table[haut+1][larg]==0) {
				smile.style.top=y+20+'px';
				haut++;
				document.getElementById('haut').innerHTML = haut;
				document.getElementById("pas").innerHTML++;
			} else if(table[haut+1][larg]==3) {
				win();
			}
		}
	}
}

/**
 * Affiche la template
 *
 * @param template un tableau à 2 dimensions
 * */
function displayTemplate(template) {
	for(var i=0;i<template.length;i++){
		for(var j=0;j<template[i].length;j++){

			// On construit la carte en fonction des valeurs des cases
			switch (template[i][j]) {
				case 1:
					var conteneur = document.getElementById("conteneur");
					var monImg = document.createElement('img');
					monImg.setAttribute('class','mur');
					monImg.src="./assets/img/mur.png";
					monImg.style.height='20px';
					monImg.style.width='20px';
					monImg.style.position='absolute';
					monImg.style.top=i*20+'px';
					monImg.style.left=j*20+'px';
					conteneur.appendChild(monImg);
				break;

/*				case 0:
					var conteneur = document.getElementById("conteneur");
					var monImg = document.createElement('img');
					monImg.src="./assets/img/blanc.png";
					monImg.style.height='20px';
					monImg.style.width='20px';
					monImg.style.position='absolute';
					monImg.style.top=i*20+'px';
					monImg.style.left=j*20+'px';
					conteneur.appendChild(monImg);
				break;*/

				// Position de départ du joueur
				case 2:
					var conteneur = document.getElementById("conteneur");
					var monImg = document.getElementById("pic2");
					monImg.src="./assets/img/personnage.png";
					monImg.style.height='20px';
					monImg.style.width='20px';
					monImg.style.position='absolute';
					monImg.style.top=i*20+'px';
					monImg.style.left=j*20+'px';
					haut=i;
					larg=j;
					document.getElementById('haut').innerHTML = haut;
					document.getElementById('largeur').innerHTML = larg;
					conteneur.appendChild(monImg);
				break;

				// Position de la fleche
				case 3:
					var conteneur = document.getElementById("conteneur");
					var monImg = document.createElement('img');
					monImg.style.visibility = "visible";
					monImg.src="./assets/img/fleche.png";
					monImg.style.height='20px';
					monImg.style.width='20px';
					monImg.style.position='absolute';
					monImg.style.top=i*20+'px';
					monImg.style.left=j*20+'px';
					conteneur.appendChild(monImg);
				break;
			}
		}
	}
}

function win() {
	reset(table);

	table=[
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
		[0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
		[0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
		[0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
		[0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
		[0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];


/*	for(var i=0;i<=19;i++){
		for(var j=0;j<=19;j++){
			if(table[i][j]==1){
				afficherMur(i,j);
			}
		}
	}*/

	displayTemplate(table);

	// On affiche le bouton niveau suivant
	var bouton=document.getElementById("niveau");
	bouton.style.visibility="visible";
}

function niveau1() {
/*	//Création du terrain 1
	//Placement du joueur
	document.getElementById("pic2").style.top='0px';
	document.getElementById("pic2").style.left='0px';
	//Placement de la fleche de sortie
	document.getElementById("fleche").style.top=19*20+'px';
	document.getElementById("fleche").style.left=10*20+'px';
	//Initialisation du terrain (pose de mur)
	for(var i = 0 ; i <= 8 ; i++){
		table[2][i]=1;
	}
	for(var i=2;i<=19;i++){
		table[i][8]=1;
	}
	for(var i=0;i<=19;i++){
		table[i][12]=1;
	}
	table[19][10]=2;
*/

	table = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0],
		[0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

	//displayTemplate(table);
}

function niveau2() {
/*	//Création du terrain 1
	//Placement du joueur
	document.getElementById("pic2").style.top='0px';
	document.getElementById("pic2").style.left='0px';
	//Placement de la fleche de sortie
	document.getElementById("fleche").style.top=19*20+'px';
	document.getElementById("fleche").style.left=10*20+'px';
	//Initialisation du terrain (pose de mur)
*/
	table = [
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
}


function retry() {
	document.getElementById("pic2").style.top='0px';
	document.getElementById("pic2").style.left='0px';
	document.getElementById("nbDeath").innerHTML++;
	larg=0;
	haut=0;
}

function afficherMur(i,j){
	var conteneur = document.getElementById("conteneur");
	var monImg = document.createElement('img');
	monImg.setAttribute('class','mur');
	monImg.src="./assets/img/mur.png";
	monImg.style.height='20px';
	monImg.style.width='20px';
	monImg.style.position='absolute';
	monImg.style.top=i*20+'px';
	monImg.style.left=j*20+'px';
	conteneur.appendChild(monImg);
}

function enleverMur(i,j){
	var conteneur = document.getElementById("conteneur");
	var monImg = document.createElement('img');
	monImg.src="./assets/img/blanc.png";
	monImg.style.height='20px';
	monImg.style.width='20px';
	monImg.style.position='absolute';
	monImg.style.top=i*20+'px';
	monImg.style.left=j*20+'px';
	conteneur.appendChild(monImg);
}

function niveauSuivant() {
	niveau+=1;
	document.getElementById('vueNiveau').innerHTML++;
	console.log(niveau);
	reset(table);
	start();
}

function cheat() {
	var h=haut;
	var l=larg;
	haut=0;
	larg=0;
	for(var i=0;i<20;i++) {
		larg=0;
		for(var j=0;j<20;j++) {
			if(table[i][j]==1) {
				displayMine();
			}
			larg++;
			console.log(larg);
		}
		haut++;
	}
	haut=h;
	larg=l;
}

function verifMine() {
	var nb=0;
	if(haut!=0) {
		if(table[haut-1][larg]==1) {
		nb++;
		}
	}
	if(haut!=19) {
		if(table[haut+1][larg]==1) {
		nb++;
		}
	}
	if(larg!=0) {
		if(table[haut][larg-1]==1) {
		nb++;
		}
	}
	if(larg!=19) {
		if(table[haut][larg+1]==1) {
		nb++;
		}
	}
	document.getElementById("mine").innerHTML=nb;
}


