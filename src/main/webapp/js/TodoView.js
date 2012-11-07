;(function() {

	brite.registerView("TodoView", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			var view = this;
			return $.when(app.TodoDao.list()).pipe(function(todoList){
				return $("#tmpl-TodoView").render({todos:todoList});
			});	
		},
		
		postDisplay: function(){
			var view = this;
		 		
		 	view.$sectionContent = view.$el.find("section.content"); 	
		},
		
		events: {
			"change; input[data-prop='done']" : function(event){
				var $check = $(event.currentTarget);
				var todoId = $check.bEntity("Todo").id;
				var done = $check.prop("checked");
				app.TodoDao.update({id:todoId,done:done});
			},
			
			// Handle the create new task
			"focus; .newTodo input[data-prop='title']": startTodoCreate,
			"blur; .newTodo input[data-prop='title']": endTodoCreate
		},
		
		daoEvents: {
			"dataChange; Todo" : refreshPage
		}	

	});
	
	// --------- Event Methods --------- //
	function startTodoCreate(event){
		var view = this;
		var $input = $(event.currentTarget);
		$input.off();
		
		$input.after(createHelperHtml);
		
		$input.on("keyup",function(event){
			// press ENTER
			if (event.which === 13){
				var newTodo ={
					name: $input.val()
				}
				app.TodoDao.create(newTodo).done(function(){
					view.$el.find(".newTodo input").focus();
				});
			}
			// press ESC
			else if (event.which === 27) {
				$input.trigger("blur");
			}
		});		
	}
	
	function endTodoCreate(event){
		var $input = $(event.currentTarget);
		$input.val("");
		$input.parent().find(".helper").remove();
	}
	
	function refreshPage(){
		var view = this;
		
		return app.TodoDao.list().done(function(todoList){
			var todoHtml = $("#tmpl-TodoView-todoList").render({todos:todoList});
			view.$sectionContent.html(todoHtml);			
		});
	}
	// --------- /Event Methods --------- //
	
	var createHelperHtml = '<small class="helper">Press [ENTER] to create, or [ESC] to cancel.</small>';
	var updateHelperHtml = '<small class="helper">Press [ENTER] to update, or [ESC] to cancel.</small>';

})();
