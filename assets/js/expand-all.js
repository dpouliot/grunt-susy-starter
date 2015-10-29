(function( $ ){

	/* Help panel in masthead */
	var initExpandAll = function(){
		// simple function for expanding all collapsibles in a group
		$( "[data-expand-all]" )
			.filterUnenhanced( "expand-all" )
			.bind( "click", function( e ){
				e.preventDefault();
				var $all = $( "." + $( this ).attr( "data-expand-all" ) );
				$all.addClass( "collapsible-expand-all" );
				$( this ).remove();
			});
	};

	$( document ).bind( "enhance", initExpandAll );


}( shoestring ));