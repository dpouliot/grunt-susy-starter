(function( $ ){

	$( "html" ).addClass( "enhanced" );

	function getEnhancedAttribute( key ) {
		return "data-enhanced" + ( key ? "-" + key : "" );
	}

	$.fn.filterUnenhanced = function( key ) {
		return this.filter( function() {
				return !$( this ). is( "[" + getEnhancedAttribute( key ) + "]" );
			})
			// mark enhanced
			.attr( getEnhancedAttribute( key ), "" );
	};

	$(function(){
		$(document).trigger( "enhance" );
	});

}( jQuery ) );