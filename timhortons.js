$(function () {

	var $orders = $('.orders');
	var $name = $('#name');
	var $drink = $('#drink');
	var i = 0;

	function addOrder(order) {
		$orders.append('<li class="order" id="'+ i + '"><b>' + order.name + '</b> has ordered a <b>' + order.drink + '</b>! <button class="remove" data-id="' + order.id + '">DELETE</button></li></li>');
		i++;
	};

	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/Grips%20Grapple/559d7bd497ac8d0100872f99',
		success: function(orders) {
			$.each(orders, function(i, order) {
				addOrder(order);
			});
		}
	});

	$('#addorder').on('click', function() {
		var order = {
			name: $name.val(),
			drink: $drink.val(),
		};

		if($name.val() == "" || $drink.val() == "") {
			alert("Please enter a value!");
		} else {
			$.ajax({
				type: 'POST',
				url: 'http://rest.learncode.academy/api/Grips%20Grapple/559d7bd497ac8d0100872f99',
				data: order,
				success: function(newOrder) {
					addOrder(newOrder);
				}
			});
		}
	});

	$orders.delegate('.remove','click', function() {
		var $li = $(this).closest('li');

		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/Grips%20Grapple/559d7bd497ac8d0100872f99/' + $(this).attr('data-id'),
			success: function (){
				$li.remove();
			}
		});
	});

});
