;(function() {

	brite.registerView("TodoView", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			var view = this;
			return $("#tmpl-TodoView").render({});
		}	

	});
	
	// --------- View Private Methods --------- //
	
	// --------- /View Private Methods --------- //

})();
