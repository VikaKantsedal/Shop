var params = {
	category: 1,
	brand: 1,
	price: {
		min: 250,
		max: 500
	}
};

var productFilters = [
	function(data, params) {
		return data.categories.indexOf(params.category) != -1;
	},
	function(data, params) {
		return data.brand == params.brand;
	},
	function() {
		return (data.products.price >= params.min && data.products.price >= params.max);
	}
];

function filterProducts(data, params) {
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
}

/*
 $(".category-products h4.panel-title a").on("click", function(e) {
 e.preventDefault();
 var categoryId = +$(this).closest("[data-id]").attr("data-id");
 var productsData = {
 products: []
 };

 $.each(data.products, function(id, product) {
 if (product.categories.indexOf(categoryId) != -1) {
 productsData.products.push(product);
 }
 });

 productsTemplate.render(".features_items", productsData);
 });
 */

$(document).ready(function(){
	$(function () {
		//var productsTemplate = new Template("templates/products.html");
		SideBar.render();
		Products.render();

		/*
		$.ajax("data/init.json").done(function(data) {
			categoryTemplate.render(".category-products", data, function() {

			});

			var priceData = {
				min: 0,
				max: 1000,
				from: 600,
				to: 800
			};
			priceTemplate.render(".price-range", priceData, function() {
				$('#sl2').slider();
			});

			productsTemplate.render(".features_items", data);
		});*/

		var RGBChange = function() {
			$('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
		};

		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
});
