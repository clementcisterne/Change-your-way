window.onload=start;
//document.onkeydown=move;
var table;
var larg;
var haut;

function start(){
	table=[];
	for(var i=0;i<20;i++){
		table[i]=[];
		for(var j=0;j<20;j++){
			if(Math.random()>0.8 && (i!=0 && j!=0)){
				table[i][j]=1;
			}
			else{
				table[i][j]=0;
			}
		}
	}
	var alea=Math.floor(Math.random()*20);
	table[19][alea]=2;
	document.getElementById("coffre").style.top=19*20+'px';
	document.getElementById("coffre").style.left=20*alea+'px';
	document.getElementById("pic2").style.top='0px';
	document.getElementById("pic2").style.left='0px';
	larg=0;
	haut=0;
	if(table[0][1]==1){
		document.getElementById("mine").innerHTML++;
	}
	if(table[1][1]==1){
		document.getElementById("mine").innerHTML++;
	}
}
function retry(){
	document.getElementById("pic2").style.top='0px';
	document.getElementById("pic2").style.left='0px';
	document.getElementById("nbDeath").innerHTML++;
	larg=0;
	haut=0;
}

function displayMine(){
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

function cheat(){
	var h=haut;
	var l=larg;
	haut=0;
	larg=0;
	for(var i=0;i<20;i++){
		larg=0;
		for(var j=0;j<20;j++){
			if(table[i][j]==1){
				displayMine()
			}
			larg++;
			console.log(larg);
		}
		haut++;
	}
	haut=h;
	larg=l;
}
function verifMine(){
	var nb=0;
	if(haut!=0){
		if(table[haut-1][larg]==1){
		nb++;
		}
	}
	if(haut!=19){
		if(table[haut+1][larg]==1){
		nb++;
		}
	}
	if(larg!=0){
		if(table[haut][larg-1]==1){
		nb++;
		}
	}
	if(larg!=19){
		if(table[haut][larg+1]==1){
		nb++;
		}
	}
	document.getElementById("mine").innerHTML=nb;
}

function move(event){
	var key=event.keyCode;

	var smile=document.getElementById("pic2");
	var x=smile.offsetLeft;
	var y=smile.offsetTop;
	if(key==65){
		cheat();
	}
	if(key==37){
		if(x!=0){
			if(table[haut][larg-1]!=1){
				smile.style.left=x-20+'px';
				larg--;
				document.getElementById("pas").innerHTML++;
				verifMine();
				if(table[haut][larg]==2){
					alert('win');
					start();
				}
			}
			else{
				larg--;
				document.getElementById("pas").innerHTML-=10;
				displayMine();
				alert('die');
				retry();
			}
		}
	}
	if(key==38){
		if(y!=0){
			if(table[haut-1][larg]!=1){
				smile.style.top=y-20+'px';
				haut--;
				document.getElementById("pas").innerHTML++;
				verifMine();
				if(table[haut][larg]==2){
					alert('win');
					start();
				}
			}
			else{
				haut--;
				document.getElementById("pas").innerHTML-=10;
				displayMine();
				alert('die');
				retry();
			}
		}
	}
	if(key==39){
		if(x!=380){
			if(table[haut][larg+1]!=1){
				smile.style.left=x+20+'px';
				larg++;
				document.getElementById("pas").innerHTML++;
				verifMine();
				if(table[haut][larg]==2){
					alert('win');
					start();
				}
			}
			else{
				larg++;
				document.getElementById("pas").innerHTML-=10;
				displayMine();
				alert('die');
				retry();
			}
		}
	}
	if(key==40){
		if(y!=380){
			if(table[haut+1][larg]!=1){
				smile.style.top=y+20+'px';
				haut++;
				document.getElementById("pas").innerHTML++;
				verifMine();
				if(table[haut][larg]==2){
					alert('win');
					start();
				}
			}
			else{
				haut++;
				document.getElementById("pas").innerHTML-=10;
				displayMine();
				alert('die');
				retry();
			}
		}
	}
}