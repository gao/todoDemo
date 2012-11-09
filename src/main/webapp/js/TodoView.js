;(function() {

	brite.registerView("TodoView", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			var view = this;
			return $.when(app.TodoDao.list()).pipe(function(todoList){
				var remaining = countRemailing(todoList);
				return $("#tmpl-TodoView").render({todos:todoList, remaining:remaining});
			});	
		},
		
		postDisplay: function(){
			var view = this;
		 	var $e = view.$el;
		 	view.$remaining = $e.find("section.heading .remaining");
		 	view.$total = $e.find("section.heading .total");
		 	view.$sectionContent = $e.find("section.content"); 	
		},
		
		events: {
			//event for click checkbox
			"change; input[data-prop='done']" : clickDoneCheckbox,
			
			//event for click archive
			"click; a.archive" : clickArchive,
			
			// event for create new Todo
			"focus; .newTodo input[data-prop='title']": startTodoCreate,
			"blur; .newTodo input[data-prop='title']": endTodoCreate
		},
		
		daoEvents: {
			"dataChange; Todo" : refreshPage
		}	

	});
	
	// --------- Event Methods --------- //
	function clickDoneCheckbox(event){
		var $check = $(event.currentTarget);
		var todoId = $check.bEntity("Todo").id;
		var done = $check.prop("checked");
		app.TodoDao.update({id:todoId,done:done});
	}
	
	function clickArchive(event) {
		var view = this;
        var toDel = [];
        view.$el.find("td.check input").each(function () {
        	var $target = $(this);
            if ($target.prop("checked")) {
            	var todoId = $target.bEntity("Todo").id;
                toDel.push(todoId);
            }     
        });
        app.TodoDao.removeMany(toDel);
	}
	
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
	// --------- /Event Methods --------- //
	
	// --------- Private Methods --------- //
	function countRemailing(todoList){
		var remaining = 0;
		for(var i=0; i<todoList.length; i++){
			var todoObj = todoList[i];
			if(!todoObj.done){
				remaining = remaining + 1;
			}
		}
		return remaining;
	}
	
	function refreshPage(){
		var view = this;
		
		return app.TodoDao.list().done(function(todoList){
			view.$remaining.html(countRemailing(todoList));
			view.$total.html(todoList.length);
				
			var todoHtml = $("#tmpl-TodoView-todoList").render({todos:todoList});
			view.$sectionContent.html(todoHtml);			
		});
	}
	// --------- /Private Methods --------- //
	
	var createHelperHtml = '<small class="helper">Press [ENTER] to create, or [ESC] to cancel.</small>';
	var updateHelperHtml = '<small class="helper">Press [ENTER] to update, or [ESC] to cancel.</small>';

})();
