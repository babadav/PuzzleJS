//Puzzle.
//How it works.
//Dynamically generate images on the page (like out fcards from Memory Game).
//Create even listeners for a dragging and dropping the images into place .
//Lock image in place when they're in the right position.
//Time how long it takes to win.
//Display a modal upon winning.
//reset the game upon button click.


var timeView= document.createElement("div");
timeView.classList.add("time-view")
document.body.appendChild(timeView);

var time = 0;


function timer(){
	timeView.innerHTML = (time);
	time++;
}


var stopWatch= setInterval(timer,1000);


var createModal=function(){

	var overLay= document.createElement("div");
	overLay.classList.add("overlay");
	document.body.appendChild(overLay);

	var modal= document.createElement("div");
	modal.classList.add("modal");
	document.body.appendChild(modal);

	var restartButton= document.createElement("button");
	restartButton.classList.add("restart-button");
	modal.appendChild(restartButton); 
	restartButton.innerHTML = "Restart";

	var closeButton= document.createElement("button");
	closeButton.classList.add("close-button");
	modal.appendChild(restartButton);
	restartButton.innerHTML = " Close "

}

var createImgObj = function(imgData){
	var imgObj = [];
	

	//Setup variables to handle keeping track of X Y positions and which column we're in 

	var positionX = 100;
	var positionY = 100;
	var columnCount = 1;

	 //make a loop
		//calculate fimal positions
		//write out the src
		//push new obj to the array.

	for (var i = 1; i <= imgData.numOfImgs; i++) {
		var currentImg = {
			src: imgData.path + i + imgData.ext,
			finalPosX: positionX,
			finalPosY: positionY
		};

		imgObj.push(currentImg);

		if (columnCount != imgData.numOfCols){
			positionX += imgData.width;

			columnCount++;

		} else{
			columnCount = 1;
			positionX = 100;
			positionY += imgData.width;

		}

	}
	
	console.log(imgObj);
	return imgObj;
}
//path to images
//extention for images
//width & height of each
//positoin of previous 
//number of pieces 
// number of columns

var startGame = function() {
	var imgDefaultData = {
	path: "assets/img/cat_",
	ext: ".jpg",
	width: 200,
	numOfImgs: 6,
	numOfCols: 3
  }

  var imgArray = createImgObj(imgDefaultData);

  placePieces(imgArray);

  window.addEventListener("mousemove", movePiece);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("keyup",  rotatePiece);

}

var placePieces = function(imgArray) {
	for (var i = imgArray.length - 1; i >= 0; i--){
		var piece = document.createElement("img");
		var rotation =  Math.round(Math.random() * 3) * 90;
		piece.setAttribute("class", "piece");
		piece.setAttribute("src", imgArray[i].src);
		piece.setAttribute("data-final-X", imgArray[i].finalPosX);
		piece.setAttribute("data-final-Y", imgArray[i].finalPosY);
		piece.setAttribute("data-rotation",rotation);
		piece.style.top = Math.random() * 500 + "px";
		piece.style.left = Math.random() * 300 + 700 + "px";
		piece.style.transform = "rotate(" + rotation + "deg)";
		document.body.appendChild(piece);

		piece.addEventListener("mousedown", startDrag);
	}
}

var startDrag = function(e) {
	console.log(e);
	e.preventDefault();
		if( !e.currentTarget.classList.contains("locked")){
			pieceBeingDragged = e.currentTarget;

		pieceBeginLeft = parseInt(pieceBeingDragged.style.left);
		pieceBeginTop = parseInt(pieceBeingDragged.style.top);
		
		mouseBeginLeft = e.clientX;
		mouseBeginTop = e.clientY;


		}
}

var movePiece = function(e) {
	
	if (pieceBeingDragged){
		var distanceLeft = e.clientX - mouseBeginLeft;
		var distanceTop = e.clientY - mouseBeginTop; 
		pieceBeingDragged.style.left = pieceBeginLeft + distanceLeft + "px";
		pieceBeingDragged.style.top = pieceBeginTop + distanceTop + "px";
	}

}


var stopDrag = function(e) {
	if (pieceBeingDragged){
	checkForFit(pieceBeingDragged);
	pieceBeingDragged = null;

} 
	

}

var checkForFit =function(lastDraggedPiece){
	console.log(lastDraggedPiece);
	var currentLeft = parseInt(lastDraggedPiece.style.left);
	var currentTop = parseInt(lastDraggedPiece.style.top);
	var finalLeft = parseInt(lastDraggedPiece.dataset.finalX);
	var finalTop = parseInt(lastDraggedPiece.dataset.finalY);
	var finalRotation = parseInt(pieceBeingDragged.getAttribute("data-rotation"));

	if (currentLeft <= finalLeft + 20 &&
		currentLeft >= finalLeft - 20 &&
		currentTop <= finalTop + 20 &&
		currentTop >= finalTop - 20 &&
		!finalRotation ){

		lastDraggedPiece.style.left = finalLeft + "px";
		lastDraggedPiece.style.top = finalTop + "px";

		lastDraggedPiece.classList.add("locked");
		
	}

}
	var rotatePiece = function(e){
		if(pieceBeingDragged){
		e.preventDefault();
		// console.log(pieceBeingDragged);

		//a=65
		//d=68


		var rotation = parseInt(pieceBeingDragged.getAttribute("data-rotation"));

		if( e.keyCode == 65) {
			//rotate left


			if( rotation > -270){
				rotation -= 90;
			
			
				console.log("left");

			} else {
				rotation= 0;
				console.log(rotation);
			}
				pieceBeingDragged.setAttribute("data-rotation",rotation);
				pieceBeingDragged.style.transform = "rotate(" + rotation + "deg)";

				
		

		} else if (e.keyCode == 68){
			//rotate right

			if (rotation < 270 ){
				rotation += 90;
				console.log(rotation);

			}else {
				rotation = 0;
				console.log(rotation);
			}

		
			pieceBeingDragged.setAttribute("data-rotation",rotation);
			pieceBeingDragged.style.transform = "rotate(" + rotation + "deg)";
			console.log("right");

		
		} else{
			console.log("damn");
		}


	}

}

var pieceBeingDragged,
	pieceBeginLeft,
	pieceBeginTop,
	mouseBeginLeft,
	mouseBeginTop;
	startGame();


















