var app = app || {};


// --------- Entity Dao Registration --------- //
(function($){
	
	if(app.dataMode == 'Remote'){
		//register RemoteDao
		app.TodoDao = brite.registerDao(new brite.dao.RemoteDao("Todo"));

	}else{
		//register InMemoryDao
		app.TodDao = brite.registerDao(new brite.InMemoryDaoHandler("Todo"));

	}
	
	// add dao listeners
	brite.dao.onDao(function(event) {
		console.log("dao.onDao call : " + event.daoEvent.entityType + " - " + event.daoEvent.action);
	}, "namespace1"); 


})(jQuery);

