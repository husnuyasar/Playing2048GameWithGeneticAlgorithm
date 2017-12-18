var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sizeInput = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var scoreLabel = document.getElementById('score');
var score = 0;
var size = 4;
var width = canvas.width / size - 6;
var cells = [];
var fontSize;
var loss = false;
startGame();

changeSize.onclick = function () {
  if (sizeInput.value >= 2 && sizeInput.value <= 20) {
    size = sizeInput.value;
    width = canvas.width / size - 6;
    console.log(sizeInput.value);
    canvasClean();
    startGame();
  }
}

function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

function createCells() {
  var i, j;
  for(i = 0; i < size; i++) {
    cells[i] = [];
    for(j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawCell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);
  switch (cell.value){
    case 0 : ctx.fillStyle = '#fff9e2'; break;
    case 2 : ctx.fillStyle = '#f7e9b9'; break;
    case 4 : ctx.fillStyle = '#eddb9e'; break;
    case 8 : ctx.fillStyle = '#e5cf85'; break;
    case 16 : ctx.fillStyle = '#d8bf6a'; break;
    case 32 : ctx.fillStyle = '#ccb051'; break;
    case 64 : ctx.fillStyle = '#bfa039'; break;
    case 128 : ctx.fillStyle = '#ffd2b5'; break;
    case 256 : ctx.fillStyle = '#f2b791'; break;
    case 512 : ctx.fillStyle = '#e09d72'; break;
    case 1024 : ctx.fillStyle = '#d38756'; break;
    case 2048 : ctx.fillStyle = '#c46f38'; break;
    case 4096 : ctx.fillStyle = '#b5581c'; break;
    case 8192 : ctx.fillStyle = '#b5581c'; break;
    default : ctx.fillStyle = '#ff0080';
  }
  ctx.fill();
  if (cell.value) {
    fontSize = width/4;
    ctx.font = fontSize + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
  }
}

function canvasClean() {
  ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
  if (!loss) {
    if (event.keyCode === 38 || event.keyCode === 87) {
      moveUp(); 
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      moveRight();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      moveDown(); 
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      moveLeft(); 
    }
    scoreLabel.innerHTML = 'Score : ' + score;
  }
}

function startGame() {
  createCells();
  drawAllCells();
  pasteNewCell();
  pasteNewCell();
  canvas.style.opacity = '1';
}

function finishGame() {
  canvas.style.opacity = '0.65';
  loss = true;
}

function drawAllCells() {
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}

function pasteNewCell() {
  var countFree = 0;
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      if(!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if(!countFree) {
    finishGame();
    return;
  }
  while(true) {
    var row = Math.floor(Math.random() * size);
    var coll = Math.floor(Math.random() * size);
    if(!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
    }
  }
}
function randomCell(){
	var countFree = 0;
  var i, j;
  for(i = 0; i < size; i++) {
    for(j = 0; j < size; j++) {
      if(!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if(!countFree) {
    finishGame();
    return;
  }
  while(true) {
    var row = Math.floor(Math.random() * size);
    var coll = Math.floor(Math.random() * size);
    if(!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      //drawAllCells();
      return;
    }
  }
}
function moveRight () {
  var i, j;
  var coll;
  for(i = 0; i < size; i++) {
    for(j = size - 2; j >= 0; j--) {
      if(cells[i][j].value) {
        coll = j;
        while (coll + 1 < size) {
          if (!cells[i][coll + 1].value) {
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          } else if (cells[i][coll].value == cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            score +=  cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  //pasteNewCell();
  return score;
}

function moveLeft() {
  var i, j;
  var coll;
  for(i = 0; i < size; i++) {
    for(j = 1; j < size; j++) {
      if(cells[i][j].value) {
        coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          } else if (cells[i][coll].value == cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            score +=   cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  //pasteNewCell();
  return score;
}

function moveUp() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = 1; i < size; i++) {
      if(cells[i][j].value) {
        row = i;
        while (row > 0) {
          if(!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  //pasteNewCell();
  return score;
}

function moveDown() {
  var i, j, row;
  for(j = 0; j < size; j++) {
    for(i = size - 2; i >= 0; i--) {
      if(cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  //pasteNewCell();
  return score;
}
function CreateChromosome(){
	var sideArray =['L','R','U','D'];
	var randomNumber;
	var gens= new Array();
	for(var i=0; i<sideArray.length; i++){
		randomNumber = Math.floor(Math.random()*sideArray.length);
		gens.push(sideArray[randomNumber]);
	}
	
	return gens; 
}

function CalChromosomes(ch){
	var score=0;
	var temp=0;
	var scoreArray=[];
	var firstCells = cells;
	
		for(var i=0; i<ch.length; i++){
			
			switch(ch[i]){
				case 'L':
					score=moveLeft();
					//randomCell();
					break;
				case 'R':
					score=moveRight();
					//randomCell();
					break;
				case 'D':
					score=moveDown();
					//randomCell();
					break;
				case 'U':
					score=moveUp();
					//randomCell();
					break;
			}
			scoreArray.push(score);
		}
		
		
		temp= scoreArray.reduce(add, 0);

		function add(a, b) {
			return a + b;
		}

	
	return [temp,ch];
}
function moveTo(ch){
	
	for(var i=0; i<ch.length; i++){
			
			switch(ch[i]){
				case 'L':
					score=moveLeft();
					pasteNewCell();
					break;
				case 'R':
					score=moveRight();
					pasteNewCell();
					break;
				case 'D':
					score=moveDown();
					pasteNewCell();
					break;
				case 'U':
					score=moveUp();
					pasteNewCell();
					break;
			}
			
		}
	
}
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i] == nameKey) {
            return i;
        }
		
    }
}
function PlayAuto(){
	var ch1 = CreateChromosome();
	var ch2 = CreateChromosome();
	var ch3 = CreateChromosome();
	var ch4 = CreateChromosome();
	var ch5 = CreateChromosome();
	var ch6 = CreateChromosome();
	var ch7 = CreateChromosome();
	var ch8 = CreateChromosome();
	var ch9 = CreateChromosome();
	var ch10 = CreateChromosome();
	var ch11 = CreateChromosome();
	var ch12 = CreateChromosome();
	var ch13 = CreateChromosome();
	var ch14 = CreateChromosome();
	var ch15 = CreateChromosome();
	var ch16 = CreateChromosome();
	var ch17 = CreateChromosome();
	var ch18 = CreateChromosome();
	var ch19 = CreateChromosome();
	var ch20 = CreateChromosome();
	//alert(cell);
	var f1=CalChromosomes(ch1);
	var f2=CalChromosomes(ch2);
	var f3=CalChromosomes(ch3);
	var f4=CalChromosomes(ch4);
	var f5=CalChromosomes(ch5);
	var f6=CalChromosomes(ch6);
	var f7=CalChromosomes(ch7);
	var f8=CalChromosomes(ch8);
	var f9=CalChromosomes(ch9);
	var f10=CalChromosomes(ch10);
	var f11=CalChromosomes(ch11);
	var f12=CalChromosomes(ch12);
	var f13=CalChromosomes(ch13);
	var f14=CalChromosomes(ch14);
	var f15=CalChromosomes(ch15);
	var f16=CalChromosomes(ch16);
	var f17=CalChromosomes(ch17);
	var f18=CalChromosomes(ch18);
	var f19=CalChromosomes(ch19);
	var f20=CalChromosomes(ch20);
	
	var ChTab=[ch1,ch2,ch3,ch4,ch5,ch6,ch7,ch8,ch9,ch10,ch11,ch12,ch13,ch14,ch15,ch16,ch17,ch18,ch19,ch20];
	//alert("f1 score:"+f1[0]+"f2 score:"+f2[0]+"f3 score:"+f3[0]);
	var scoresTab = [f1[0],f2[0],f3[0],f4[0],f5[0],f6[0],f7[0],f8[0],f9[0],f10[0],f11[0],f12[0],f13[0],f14[0],f15[0],f16[0],f17[0],f18[0],f19[0],f20[0]];
	var maxScore =scoresTab.reduce(function(a, b) {
		return Math.max(a, b);
	});
	
	for(var i=0; i<scoresTab.length; i++){
		if(scoresTab[i]==maxScore){
			var index=i;
		}
	}
	var sortScoreArray=[];
	for(var i=0; i<scoresTab.length;i++){
		sortScoreArray.push(scoresTab[i]);
	}
	var sortScoreArray=sortScoreArray.sort(function(a, b){return b-a});
	var elite=ChTab[index];
	
		moveTo(elite);
	
	
	var pieChart = [0.095,0.185,0.260,0.340,0.416,0.487,0.553,0614,0.671,0.723,0.770,0.812,0.850,0.883,0.911,0.934,0.953,0.967,0.976,1.000];
	var choiceInPie=[];
	
	
	for(var i=0; i<pieChart.length; i++){
		var number = Math.random() * (1.00 - 0.00) + 0.00;
		number=number.toFixed(2);
		
		for(var j=0; j<pieChart.length; j++){
			if(pieChart[j]>=number){
				
				choiceInPie.push(j);
				break;
			}
		}
	}
	var controller=[];
	
	// for(var i=0; i<choiceInPie.length; i++){
		// for(var j =0; j<scoresTab.length; j++){
			// if(scoresTab[j]==sortScoreArray[choiceInPie[i]]){
				// controller.push(j);
			// }
		// }
	// }
	// alert(controller);
	for(var i=0; i<choiceInPie.length; i++){
			
			var a = sortScoreArray[choiceInPie[i]];
			var sonuc=search(a,scoresTab);
			controller.push(sonuc);
	}
	//alert(controller);
	for(var i=0; i<controller.length; i++){
			if(controller[i]==controller[i+1] && controller[i]==controller[i+2] && controller[i]==controller[i+3] && controller[i]==controller[i+4] && controller[i]==controller[i+5]  && controller[i]==controller[i+7] && controller[i]==controller[i+8] && controller[i]==controller[i+9] && controller[i]==controller[i+10] && controller[i]==controller[i+11] && controller[i]==controller[i+12] && controller[i]==controller[i+13] && controller[i]==controller[i+14] && controller[i]==controller[i+15] && controller[i]==controller[i+16] && controller[i]==controller[i+17] && controller[i]==controller[i+18] && controller[i]==controller[i+19]){
				controller[i+1]=i+1;
				controller[i+2]=i+2;
				controller[i+3]=i+3;
				controller[i+4]=i+4;
				controller[i+6]=i+6;
				controller[i+7]=i+7;
				controller[i+8]=i+8;
				controller[i+9]=i+9;
				controller[i+10]=i+10;
				controller[i+11]=i+11;
				controller[i+12]=i+12;
				controller[i+13]=i+13;
				controller[i+14]=i+14;
				controller[i+15]=i+15;
				controller[i+16]=i+16;
				controller[i+17]=i+17;
				controller[i+18]=i+18;
				controller[i+19]=i+19;
			}
		}
		//alert("ikinci:"+controller);
	var caprazlanacakKromozomlar=[];
	for(var i=0; i<controller.length; i++){
		caprazlanacakKromozomlar.push(ChTab[controller[i]]);
	}
	//alert("kromozomlar:"+caprazlanacakKromozomlar);
	// for(var i=0; i<caprazlanacakKromozomlar.length; i++){
		// alert(caprazlanacakKromozomlar[i]);
	// }
	var newCh =transverse(caprazlanacakKromozomlar);
	// alert("çaprazlandı");
	// for(var i=0; i<newCh.length; i++){
		// alert(newCh[i]);
	// }
	f1=CalChromosomes(newCh[0]);
	f2=CalChromosomes(newCh[1]);
	f3=CalChromosomes(newCh[2]);
	f4=CalChromosomes(newCh[3]);
	f5=CalChromosomes(newCh[4]);
	f6=CalChromosomes(newCh[5]);
	f7=CalChromosomes(newCh[6]);
	f8=CalChromosomes(newCh[7]);
	f9=CalChromosomes(newCh[8]);
	f10=CalChromosomes(newCh[9]);
	f11=CalChromosomes(newCh[10]);
	f12=CalChromosomes(newCh[11]);
	f13=CalChromosomes(newCh[12]);
	f14=CalChromosomes(newCh[13]);
	f15=CalChromosomes(newCh[14]);
	f16=CalChromosomes(newCh[15]);
	f17=CalChromosomes(newCh[16]);
	f18=CalChromosomes(newCh[17]);
	f19=CalChromosomes(newCh[18]);
	f20=CalChromosomes(newCh[19]);
	scoresTab = [f1[0],f2[0],f3[0],f4[0],f5[0],f6[0],f7[0],f8[0],f9[0],f10[0],f11[0],f12[0],f13[0],f14[0],f15[0],f16[0],f17[0],f18[0],f19[0],f20[0]];
	//alert("ikinci scoreTablosu:"+scoresTab);
	
	var minScore = scoresTab.reduce(function(a, b) {
			return Math.min(a, b);
		});
	//alert(minScore);
	var min;
	for(var i=0; i<scoresTab.length; i++){
			if(scoresTab[i]==minScore){
				min=i;
				break;
			}
	}
	//alert("min:"+newCh[min]);
	newCh[min]=elite;
	// alert("scoreTablosu elit eklendi:"+newCh[min]);
	maxScore = scoresTab.reduce(function(a, b) {
		return Math.max(a, b);
	});
	
	for(var i=0; i<scoresTab.length; i++){
		if(scoresTab[i]==maxScore){
			var index=i;
		}
	}
	elite =newCh[index];
	
		moveTo(elite);
	
}
function transverse(chrom){
	var newChrom=[];
	var ilkUc=[];
	var ilkUcSon=[];
	var ilkUcTam=[];
	var j=0;
	for(var i=0; i<3; i++){
		ilkUc[i]=chrom[i][0]+","+chrom[i][1];
	}
	
	for(var i=3; i<6; i++){
		ilkUcSon[j]=chrom[i][2]+","+chrom[i][3];
		j++;
	}
	
	for(var i=0; i<3; i++){
		newChrom.push(ilkUc[i]+","+ilkUcSon[i]);
	}
	
	var ikinciUc=[];
	var ikinciUcSon=[];
	var ikinciUcTam=[];
	var s=0;
	for(var i=3; i<6; i++){
		ikinciUc[s]=chrom[i][0]+","+chrom[i][1];
		s++;
	}
	for(var i=0; i<3; i++){
		ikinciUcSon[i]=chrom[i][2]+","+chrom[i][3];
	}
	for(var i=0; i<3; i++){
		newChrom.push(ikinciUc[i]+","+ikinciUcSon[i]);
	}
	
	
	return newChrom;
}

function StartGame(){
	var button= document.getElementById('auto-play');
	var intervalID=setInterval(function(){
		button.click();
	},0);
	
	
}

