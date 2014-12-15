



var markers = [];
var lastPlayer = "";
var currentPlayer = "";

// -* Board *-

var boardArray = [];



// -* Player *-
var Player = Backbone.Model.extend({
	initialize: function(){
		console.log('new player created!');
		markers.push( this.get('marker') );
		whoGoesFirst();
	}
});

// -* PlayerCollection *-
var PlayerCollection = Backbone.Collection.extend({
	model: Player
});



// -* PlayerView *-
var PlayerView = Backbone.View.extend({
	initialize: function(){
		console.log('playerview initialized');
		this.listenTo(this.model, "remove", this.remove);
	},
	tagName: 'li',
	className: 'player-view',
	render: function(){
		var entrails = "";
		entrails += "<h4>";
		entrails +=		this.model.get('marker');
		entrails += "</h4>";

		this.$el.append(entrails);
	}
});


// -* PlayerListView
var PlayerListView = Backbone.View.extend({
	initialize: function(){
		console.log('playerListView initialized');
		this.listenTo(this.collection, 'add', this.addOne);
	},
	addOne: function(player){
		var playerView = new PlayerView({ model: player });
		playerView.render()
		this.$el.append(playerView.el );
	}

});




//BUTTON generate player button
$('#generate-player-button').on('click', function(){
	if ( $('#player-marker-input').val() != "" ) {
		var playerMarker = $('#player-marker-input').val();

		$('#player-marker-input').val("");

		var player = new Player({marker: playerMarker});
		players.add(player);
	} else {
		alert('give your player a marker!');
	}

});




//BUTTON make board Rows
$('#generate-board-button').on('click', function(){
	if ( confirm('This will clear the current board. Proceed?') ) {
		sv_reset1();
	}

});


//restart game, reset board
function sv_reset1(){
	// clears board
	$('#board').empty();
	boardArray = [];
	

	//limit board size
	var dimensions = $('#generate-board-input').val();
	if (dimensions > 13) {
		dimensions = 13;
		$('#generate-board-input').val(13);
	}

	console.log("dimensions: " + dimensions);

	//create rows (which creates the square);
	createRows(dimensions);
}




function createRows(num){
	for(var i=0; i<num; i++){
		var row = new RowView({dimensions: num});
		row.render();
		row.el.className += " " + i //give class for later use

		$('#board').append(row.el);
	}
}

// who goes first?
function whoGoesFirst(){
	currentPlayer = markers[ Math.floor(Math.random() * markers.length ) ];
	$('#current-player').html(currentPlayer);
}





// -* ROWS *-

var RowView = Backbone.View.extend({
	initialize: function(){
		console.log('row view initialised!');
	},
	tagName: 'div',
	className: 'row',



	render: function(){
		var dimensions = $('#generate-board-input').val();
		self = this;

		//boardArray
		var boardArrayRow = [];
		

		for(var i=0; i<dimensions; i++){
			
			//boardArray
			var boardArrayRowSquare = "";
			boardArrayRow.push(boardArrayRowSquare);



			var square = new SquareView({});
			square.render();
			square.el.className += " " + i // give classes to target later
			self.$el.append(square.el);
		}

		//boardArray
		boardArray.push(boardArrayRow);

		return this;
	}
});



// -* Squares *-
var SquareView = Backbone.View.extend({
	initialize: function(){
		console.log('square view initialised!');
	},
	tagName: 'div',
	className: 'square',

	events: {
		'click':'mark'
	},


	mark: function(){
		//the marker that appears on board
		var marker = '<h1>' + currentPlayer + '</h1>';

		// make sure it's an empty square you're clicking on
		if ( this.$el.html() == "" ){

			//setting currentPlayer to lastPlayer
			lastPlayer = currentPlayer;


			var currentPlayerIndex = markers.indexOf(currentPlayer);

			//make sure we don't go beyond the array
			currentPlayer = markers[currentPlayerIndex + 1]
			if (currentPlayer == undefined) {
				currentPlayer = markers[0]
			}

			// make sure current player information on HTML is updated
			$('#current-player').html(currentPlayer);


			this.$el.append(marker);

			//change it onscrene
			var rowIndex = this.el.parentNode.classList[1]; //1
			var squareIndex = this.el.classList[1]; // 0

			var squareMarker = this.el.firstChild.innerHTML; // "X"

			//add to boardarray
			boardArray[rowIndex][squareIndex] = squareMarker;



			//////////////////////////////////
			//check if you've won row-wise
			checkWinRowArray = _.without(boardArray[rowIndex], squareMarker); //if you remove all elements that are same as marker and its empty, then it means they were all the same and you win
			if (checkWinRowArray.length == 0){
				alert(squareMarker + ' wins!');

				sv_reset1();
				return this;
			}


			//////////////////////////////////
			//check if column-wise WIN
			var columnCheck = [];
			for (var i=0; i<boardArray.length; i++){
				columnCheck.push( boardArray[i][squareIndex] );
			}
			checkWinColumnArray = _.without(columnCheck, squareMarker);
			if (checkWinColumnArray.length == 0){
				alert(squareMarker + ' wins!');

				sv_reset1();
				return this;
			}

			/////////////////////////////////
			//check if diagonal WIN
			var diagonalCheck = [];
			for (var i=0; i<boardArray.length; i++){
				diagonalCheck.push( boardArray[i][i] );
			}
			checkWinDiagonalArray = _.without(diagonalCheck, squareMarker);
			if (checkWinDiagonalArray.length == 0){
				alert(squareMarker + ' wins!');

				sv_reset1();
				return this;
			}


		}
		
	},


	render: function(){
		return this;
	}
});










//SET UP ALL THE STUFF




	// SET UP THE INITIAL 2 PLAYERS!
var players = new PlayerCollection({});

	//get rid of weird first thing in 
players.first().destroy();
markers.shift();

playersListView = new PlayerListView({ collection: players, el: $('#players-list') });


var player1 = new Player({
	marker: "X"
});

var player2 = new Player({
	marker: "O"
})

players.add(player1);
players.add(player2);

createRows( $('#generate-board-input').val() );




	






