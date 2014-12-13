
var currentPlayer = "X"


//make button create rows
$('#generate-board-button').on('click', function(){

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


		//change this to make it multiplayer later
		if (currentPlayer == 'X'){
			currentPlayer = 'O';
		} else if (currentPlayer == 'O') {
			currentPlayer = 'X';
		}


		this.$el.append(marker);
	},

	render: function(){
		return this;
	}
});







