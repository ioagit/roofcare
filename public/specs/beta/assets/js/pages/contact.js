var Contact = function () {

    return {
        
        //Map
        initMap: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#map',
				lat: 48.06869,
				lng: 11.66688
			  });
			   var marker = map.addMarker({
					lat: 48.06869,
					lng: 11.66688,
		            title: 'Roofcare'
		        });
			});
        }

    };
}();