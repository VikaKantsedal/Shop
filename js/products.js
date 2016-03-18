var Products = new function() {
	var productsTemplate = new Template("templates/products.html");

	var data = null;

	function init(callback) {
		$.ajax("data/init.json").done(function(response) {
			data = response.products;

			if (typeof callback == "function") {
				callback.call(null, data);
			}
		});
	}

	function renderHtml(items) {
		productsTemplate.render(".features_items", items);
	}

	this.render = function() {
		if (!data) {
			init(renderHtml);
		} else {
			renderHtml(data);
		}
	};

	var productFilters = [
		function(data, params) {
			if (params.category === null) {
				return true;
			}
			return data.categories.indexOf(params.category) != -1;
		},
		function(data, params) {
			if (params.brand === null) {
				return true;
			}
			return data.brand == params.brand;
		},
		function(data, params) {
			if (params.price.min === null &&  params.price.max === null) {
				return true;
			}
			return (data.price >= params.price.min && data.price <= params.price.max);
		}
	];

	this.filterProducts = function(data, params) {
		var result = [];

		for (var index = 0; index < data.length; index++) {
			var check = true;

			for (var filterIndex = 0; filterIndex < productFilters.length; filterIndex++) {
				check = check && productFilters[filterIndex].call(null, data[index], params);

				if (!check) {
					break;
				}
			}

			if (check) {
				result.push(data[index]);
			}
		}

		return result;
	};

	this.refresh = function(params) {

		var result = this.filterProducts(data, params);

		renderHtml(result);


	};
};
