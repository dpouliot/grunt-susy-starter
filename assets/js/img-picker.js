(function( $ ){

	var initImgPicker = function(){
		// simple functions for toggling img descriptions and adding counts

		$( ".img-picker-set" )
			.filterUnenhanced( "img-picker-set" )
			.each( function( e ){

			var $set = $( this );
			var $toggle = $set.find( ".img-picker-toggle" );
			var $tallies = $set.find( ".picker-count" );
			var $totals = $set.find( ".picker-total" );
			var $form = $set.closest( "form" );
			var hideClass = "hide-desc";
			var hideText = "Hide descriptions";
			var showText = "Show descriptions";

			$toggle.bind( ( window.tappy ? "tap" : "click" ), function( e ){
				if ( $set.is( "." + hideClass ) ) {
					$set.removeClass( hideClass );
					$toggle.html( hideText );
				}
				else {
					$set.addClass( hideClass );
					$toggle.html( showText );
				}
				e.preventDefault();
			});

			$form.bind( "change", function(){
				var $inputs = $set.find( "input[type=checkbox], input[type=radio]");
				var checks = 0;

				$inputs.each( function(){
					if ( $( this )[0].checked ) { checks++; }
				});

				$tallies.html( checks.toString() );
				$totals.html( $inputs.length.toString() );
			});

			
			
		});
	};

	$( document ).bind( "enhance", initImgPicker );


}( shoestring ));