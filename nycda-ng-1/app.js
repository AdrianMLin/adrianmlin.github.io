var app = angular.module('myApp', []);

app.controller('myController', function($scope) {
	$scope.mainUse = "To Do List";
	
	$scope.listOfStuffYouCanDo = ['to do list', 'misc'];

	$scope.deleteMe = function(item){
		// QUESTION: why can't i have a function like this on itself, i need the setDeleteMe() function to bind.
		console.log("removing:");
		console.log(item);
		item.remove();
		$('#input-section > input').select();
	}

	// i must bind with this instead of just relying on the addToList() function that creates a view. why?
	var setDeleteMe = function(){
		var newItemButton = $('#to-do-ul li').first().children(0);
		newItemButton.click( function() {
			$scope.deleteMe( this.parentNode );
		});
	}

	$scope.addToList = function(){

		//create new view
		var newItem = "";
		newItem += "<li>" 
							//why doesn't this button work?
		newItem +=		"<button class='delete-me' ng-click='deleteMe()'>X</button> ";
		newItem += 		$scope.toDoItem;
		newItem += "</li>"

		//find attachment-location, and attach.
		var toDoList = $('#to-do-ul');
		toDoList.prepend(newItem);

		//empty $scope.toDoItem from both model and view
		$scope.toDoItem = "";
		setDeleteMe(newItem);

		$('#input-section > input').select();

	}

	$scope.key = function($event){
		if ($event.keyCode == 13) {
			$scope.addToList();
		}
	}

});