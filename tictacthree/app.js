

//make button create rows
$('#generate-board-button').on('click', function(){

	// clears board
	$('#board').empty();

	//checks for dimensions input
	var dimensions = $('#generate-board-input').val();
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
	render: function(){
		return this;
	}
});







