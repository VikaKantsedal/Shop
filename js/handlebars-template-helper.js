var Template = function(source) {

	/**
	 * Path to the template source
	 */
	this.source = source;

	/**
	 * Handlebars compile object. Will be used to return text from template with given data
     */
	var handlebarsObj = null;

	/**
	 * Insert html into element with given selector.
	 * Text for HTML will come from handlebarsObj var
	 *
	 * @param $element jQuery object
	 * @param data Data object. Will be used as a data for template
	 * @param callback Callback function. This function will be called after template render
     */
	var htmlInsert = function($element, data, callback) {
		$element.html(handlebarsObj(data));

		if (typeof callback == "function") {
			callback.call(null);
		}
	};

	/**
	 *
	 * @param selector
	 * @param data
	 * @param callback
	 * @return
     */
	this.render = function(selector, data, callback) {

		var $element = $(selector);
		if (!$element.length) return;

		if (handlebarsObj) {
			htmlInsert($element, data, callback);
		} else {
			$.ajax(this.source).done(function (templateSource) {
				handlebarsObj = Handlebars.compile(templateSource);
				htmlInsert($element, data, callback);
			});
		}
	}
};