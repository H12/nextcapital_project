$.support.cors = true;

var todoList = [];
var todoIndex;

function register() {
	var $email = $("#reg-email").val();
	var $password = $("#reg-password").val();

	Todo.createUser({
		email: $email,
		password: $password,
		success: function(user) {
									alert('Great! Now please login using those credentials.');
									$("#register-container").animate({top: "-100px"}, 200);
									$("#login-container").animate({top: "12px"}, 200);
								},
		error:   function(jqxhr, textStatus, errorThrown)  { alert('ERROR: ' + jqxhr.status + " - " + jqxhr.responseText);}
	});
};

$("#register-container").submit(register);

function login() {	
		$email = $("#email").val();
		$password = $("#password").val();

	Todo.startSession({
		email: $email,
		password: $password,
		success: function(user) {
									$("#login-container").animate({top: "-100px"}, 200);
									$("#todo-body").text("Press \"Create\" to make a new To-do!");
									loadList();
								},
		error: function(jqxhr, textStatus, errorThrown)  { alert('ERROR: ' + jqxhr.status + " - " + jqxhr.responseText);}
	});

};

$("#login-container").submit(login);

function loadList() {
	Todo.loadTodos({
		success: function(todos){
						            for (var i = 0; i < todos.length; i++) {
						            	todoList.push(todos[todos.length - 1 - i])
						            	if (todoList[i].is_complete) {
						            		$('.scroll-list').append('<li class="complete" class="scroll-list-item">' + todoList[i].description + '</li>');
						            	} else {
						                	$('.scroll-list').append('<li class="scroll-list-item">' + todoList[i].description + '</li>');
						                }
						            };
        						},
		error: function(jqxhr, textStatus, errorThrown)  { alert('ERROR: ' + jqxhr.status + " - " + jqxhr.responseText);}
	});
};

//JS for the To-Do interface
function main() {
	var currentTodo;
	var contentEditable;
	var currentlyCreating = false;

	$("#login-link").click(function() {
		if ($("#register-container").css("top") === "12px") {
			$("#register-container").animate({
				top: "-100px"
			}, 200);
		};

		$("#login-container").animate({
			top: "12px"
		}, 200);
	});

	$("#register-link").click(function() {
		if ($("#login-container").css("top") === "12px") {
			$("#login-container").animate({
				top: "-100px"
			}, 200);
		};

		$("#register-container").animate({
			top: "12px"
		}, 200);
	});

	$("#move-up").click(function() {
		if (todoIndex > 0) {
			// Swaps list item text
			$(currentTodo).insertBefore($(currentTodo.prev()));
			// Swaps todo objects in todoList array
			var temp = todoList[todoIndex - 1];
			todoList[todoIndex - 1] = todoList[todoIndex];
			todoList[todoIndex] = temp;
			todoIndex--;
		};
	});

	$("#move-down").click(function() {
		if (todoIndex < todoList.length) {
			// Swaps list item text
			$(currentTodo).insertAfter($(currentTodo.next()));
			// Swaps todo objects in todoList array
			var temp = todoList[todoIndex + 1];
			todoList[todoIndex + 1] = todoList[todoIndex];
			todoList[todoIndex] = temp;
			todoIndex++;
		};
	});

	$("#complete").click(function() {
    	Todo.updateTodo({
    		todoId: todoList[todoIndex].id,
    		data: { is_complete: true },
    		success: function(todo) {
										$(".scroll-list-item").removeClass("selected");
										currentTodo.addClass("complete");
										$("#todo-body").text("Good work!");

    								},
     		error:   function(jqxhr, textStatus, errorThrown)  { alert('ERROR: ' + jqxhr.status + " - " + jqxhr.responseText);}
    	});

		
	});

	$("#create").click(function() {

		if(!currentlyCreating) {
			var newText = "[New To-Do]";

			$(".scroll-list").prepend('<li class="scroll-list-item">' + newText + '</li>');
			$("#todo-body").text("[Enter To-Do Here]").attr("contentEditable", true);
			contentEditable = true;

			currentTodo = $(".scroll-list > li:first");
			$(".scroll-list-item").removeClass("selected");
			currentTodo.addClass("selected");

			currentlyCreating = true;
		} else {
			alert("Please save your currentTodo before creating a new one!");
		};
	});

	$("#save").click(function() {
		if (contentEditable) {
			var text = $("#todo-body").text();

			Todo.createTodo({
				todo: {
					description: text,
					is_complete: false
				},
				success: function(todo) { 	
											todoList.unshift(todo);
											currentTodo.text(text);
											$(".scroll-list-item").removeClass("selected");
											$("#todo-body").text("Get it done!");
											$("#todo-body").attr("contentEditable", false);
											contentEditable = false;
											currentTodo = null;
											currentlyCreating = false;
										},
				error: function(jqxhr, textStatus, errorThrown)  { alert('ERROR: ' + jqxhr.status + " - " + jqxhr.responseText);}
			});			
		} else {
			$("#todo-body").text("Please create a To-Do before pressing the save button!");
		};

	});

	$(".scroll-list").on('click', '.scroll-list-item', function() {
		currentTodo = $(this);
		todoIndex = currentTodo.index();
		$("#todo-body").text(currentTodo.text());
		$("li").removeClass("selected");
		currentTodo.addClass("selected");
	});
};

$(document).ready(main);