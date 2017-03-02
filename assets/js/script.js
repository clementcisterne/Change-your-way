window.onload=start;
//document.onkeydown=move;
// on cree le tableau bleu, contenant les lignes
var table = new Array();
// on parcourt les lignes...
for(var i=0; i<20; i++){
	table[i] = new Array();
   // ... et dans chaque ligne, on parcourt les cellules
	for(var j=0; j<20; j++){
    	table[i][j] = 0;
    }
}

var larg;
var haut;
var niveau;

function start() {
	niveau=1;
	niveau1();
	/*
	var alea=Math.floor(Math.random()*20);
	table[19][alea]=2;
	document.getElementById("coffre").style.top=19*20+'px';
	document.getElementById("coffre").style.left=20*alea+'px';
	*/
	document.getElementById("pic2").style.top='0px';
	document.getElementById("pic2").style.left='0px';
	larg=0;
	haut=0;
	/*
	if(table[0][1]==1) {
		document.getElementById("mine").innerHTML++;
	}
	if(table[1][1]==1) {
		document.getElementById("mine").innerHTML++;
	}
	*/
}

function niveau1() {
	//Création du terrain 1
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

}

function retry() {
	document.getElementById("pic2").style.top='0px';
	document.getElementById("pic2").style.left='0px';
	document.getElementById("nbDeath").innerHTML++;
	larg=0;
	haut=0;
}
/*
function displayMine() {
	var conteneur = document.getElementById("conteneur");
	var monImg = document.createElement('img');
	monImg.src="./croix.png";
	monImg.style.height='18px';
	monImg.style.width='18px';
	monImg.style.position='absolute';
	monImg.style.top=haut*20+'px';
	monImg.style.left=larg*20+'px';
	conteneur.appendChild(monImg);
}
*/
/*
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
*/
/*
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
*/

// gestion des mouvements joueurs
function move(event) {
	var key=event.keyCode;

	var smile=document.getElementById("pic2");
	var x=smile.offsetLeft;
	var y=smile.offsetTop;

	if(key==65) { // 65 représente la touche "a"
		cheat();
	}

	if(key==37) { // 37 représente la touche fleche gauche
		if(x!=0) {
			if(table[haut][larg-1]!=1) {
				smile.style.left=x-20+'px';
				larg--;
				document.getElementById("pas").innerHTML++;
				//verifMine();
				if(table[haut][larg]==2) {
					alert('win');
					start();
				}
			}/* else {
				larg--;
				document.getElementById("pas").innerHTML-=10;
				displayMine();
				alert('die');
				retry();
			}*/
		}
	}

	if(key==38) { // 38 représente la touche fleche haut
		if(y!=0) {
			if(table[haut-1][larg]!=1) {
				smile.style.top=y-20+'px';
				haut--;
				document.getElementById("pas").innerHTML++;
				//verifMine();
				if(table[haut][larg]==2) {
					alert('win');
					start();
				}
			} /*else {
				haut--;
				document.getElementById("pas").innerHTML-=10;
				displayMine();
				alert('die');
				retry();
			}*/
		}
	}
	if(key==39) { // 39 représente la touche fleche droite
		if(x!=380) {
			if(table[haut][larg+1]!=1) {
				smile.style.left=x+20+'px';
				larg++;
				document.getElementById("pas").innerHTML++;
				//verifMine();
				if(table[haut][larg]==2) {
					alert('win');
					start();
				}
			}/* else {
				larg++;
				document.getElementById("pas").innerHTML-=10;
				displayMine();
				alert('die');
				retry();
			}*/
		}
	}
	if(key==40) { // Si on appuie sur fleche bas
		if(y!=380) {
			if(table[haut+1][larg]!=1) {
				smile.style.top=y+20+'px';
				haut++;
				document.getElementById("pas").innerHTML++;
				//verifMine();
				if(table[haut][larg]==2) {
					alert('win');
					start();
				}
			}/* else {
				haut++;
				document.getElementById("pas").innerHTML-=10;
				displayMine();
				alert('die');
				retry();
			}*/
		}
	}
}