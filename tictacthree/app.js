



var markers = [];
var lastPlayer = "";
var currentPlayer = "";







// -* Player *-
var Player = Backbone.Model.extend({
	initialize: function(){
		console.log('new player created!');
		markers.push( this.get('marker') );
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




//generate player
$('#generate-player-button').on('click', function(){
	if ( $('#player-marker-input').val() != "" ) {
		var playerMarker = $('#player-marker-input').val();

		var player = new Player({marker: playerMarker});
		players.add(player);
	} else {
		alert('give your player a marker!');
	}

});


//make button create rows
$('#generate-board-button').on('click', function(){
	if ( confirm('This will clear the current board. Proceed?') == true) {
		// clears board
		$('#board').empty();

		//checks for dimensions input
		var dimensions = $('#generate-board-input').val();
		if (dimensions > 13) {
			dimensions = 13;
			$('#generate-board-input').val(13);
		}

		console.log("dimensions: " + dimensions);

		//create rows (which creates the square);
		createRows(dimensions);
	}


});


function createRows(num){
	for(var i=0; i<num; i++){
		var row = new RowView({dimensions: num});
		row.render();

		$('#board').append(row.el);
	}
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

		for(var i=0; i<dimensions; i++){
			var square = new SquareView({});
			square.render();
			self.$el.append(square.el);
		}
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
		'click ':'mark'
	},

	mark: function(){
		console.log(this.el)
		var marker = '';
		marker += '<h1>';
		marker += 	currentPlayer;
		marker += '</h1>';

		lastPlayer = currentPlayer;

		// making players take turns
		if (lastPlayer == currentPlayer){
			console.log("fuck");

			var currentPlayerIndex = markers.indexOf(currentPlayer);

			//make sure we don't go beyond the array
			currentPlayer = markers[currentPlayerIndex + 1]
			if (currentPlayer == undefined) {
				currentPlayer = markers[0]
			}
			// make sure current player information on HTML is updated
			$('#current-player').html(currentPlayer);
		}


		this.$el.append(marker);
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


// who goes first?
currentPlayer = markers[ Math.floor(Math.random() * markers.length ) ];
$('#current-player').html(currentPlayer);

	






