$(document).ready(function(){
	// human
	var huPlayer = "O";
	// ai
	var aiPlayer = "X";
	//board
	var board = [0,1,2,3,4,5,6,7,8];

	var round = 0;

	//human player starts game with a click
	$('td').click(function(e){
		var id = e.target.id
		move(board, huPlayer, id);
	})


	//for multiple players
	/*if(playerSet[playerSet.length - 1] == null || playerSet[playerSet.length - 1] == huPlayer){
			move(board, huPlayer2, id);
			playerSet.push(huPlayer2)
		}else if(playerSet[playerSet.length - 1] == null || playerSet[playerSet.length - 1] == huPlayer2){
			move(board, huPlayer, id);
			playerSet.push(huPlayer);
		}*/

	//keeps track of each move of the player
	function move(board, player, spotClicked){

		if(board[spotClicked] != 'O' && board[spotClicked] != 'X'){
			$('#'+spotClicked).text(player);
			board[spotClicked] = player;
			round++;

			if(winning(board, player)){
				setTimeout(function(){
					alert('Win');
					reset();
				}, 500)
			}else if(round > 8){
				setTimeout(function(){
					alert('Tie');
					reset();
				}, 500)
			}else{
				round++;
				var index = minimax(board, aiPlayer).index;
				board[index] = aiPlayer;

				$('#'+index).text(aiPlayer);
				if(winning(board, aiPlayer)){
					setTimeout(function(){
						alert('You lose');
						reset()
					}, 500)
				}
			}
		}
	}

	function reset(){
		round = 0;
		board = [0,1,2,3,4,5,6,7,8];
		$('td').text('');
	}

	// returns list of the indexes of empty spots on the board
	function emptySpot(board){
	  return  board.filter(s => s != "O" && s != "X");
	}

	// winning combinations using the board indexies
	function winning(board, player){
		 if (
		 (board[0] == player && board[1] == player && board[2] == player) ||
		 (board[3] == player && board[4] == player && board[5] == player) ||
		 (board[6] == player && board[7] == player && board[8] == player) ||
		 (board[0] == player && board[3] == player && board[6] == player) ||
		 (board[1] == player && board[4] == player && board[7] == player) ||
		 (board[2] == player && board[5] == player && board[8] == player) ||
		 (board[0] == player && board[4] == player && board[8] == player) ||
		 (board[2] == player && board[4] == player && board[6] == player)
		 ) {
		 	return true;
		 }else {
		 	return false;
		 }
	}

	//defining the minimax function, for the unbeatable ai
	function minimax(newBoard, player){


		//getting the available spot
		var availSpots = emptySpot(newBoard);

		//check for terminal states and return appropriate values
		if(winning(newBoard, huPlayer)){
			return {score: -10};
		}else if(winning(newBoard, aiPlayer)){
			return {score: 10};
		}else if(availSpots.length == 0){
			return {score: 0};
		}


		// an array to collect all the objects
		var moves = [];

		// loop through available spots
		for (var i = 0; i < availSpots.length; i++){
		    //create an object for each and store the index of that spot 
		    var move = {};
		  	move.index = newBoard[availSpots[i]];

		    // set the empty spot to the current player
		    newBoard[availSpots[i]] = player;

		    /*collect the score resulted from calling minimax 
		      on the opponent of the current player*/
		    if (player == aiPlayer){
		      var result = minimax(newBoard, huPlayer);
		      move.score = result.score;
		    }
		    else{
		      var result = minimax(newBoard, aiPlayer);
		      move.score = result.score;
		    }

		    // reset the spot to empty
		    newBoard[availSpots[i]] = move.index;

		    // push the object to the array
		    moves.push(move);
		}


		// if it is the computer's turn loop over the moves and choose the move with the highest score
		  var bestMove;
		  if(player === aiPlayer){
		    var bestScore = -10000;
		    for(var i = 0; i < moves.length; i++){
		      if(moves[i].score > bestScore){
		        bestScore = moves[i].score;
		        bestMove = i;
		      }
		    }
		  }else{

		// else loop over the moves and choose the move with the lowest score
		    var bestScore = 10000;
		    for(var i = 0; i < moves.length; i++){
		      if(moves[i].score < bestScore){
		        bestScore = moves[i].score;
		        bestMove = i;
		      }
		    }
		  }

		// return the chosen move (object) from the moves array
		  return moves[bestMove];
		}
})	


$(function(){

	//request for a players choosen style

	//set style to the players name variable

	//set the choosen click to the choosen player

	//
})