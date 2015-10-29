/*global shoestring*/
(function( $, window ){
	"use strict";

	var document = window.document;

	/* Prototype code: Demonstrate how page animation flow should appear */
	var initPageAnim = function(){
		var $loader = $( "#ajax-loader" );

		$( "[data-ajax-example]" ).filterUnenhanced( "ajax-example" ).each(function() {
			var $trigger = $( this );
			var nextUrl = $trigger.attr( "href" );
			var target = $trigger.attr( "data-ajax-example-target" );
			var $content = target ? $trigger.closest( target ) : $trigger.parent();
			var $target;
			var isAfter = $trigger.is( "[data-ajax-example-after]" );
			var isBefore = $trigger.is( "[data-ajax-example-before]" );
			var txOut = "anim-fade-out";
			var txIn = "anim-fade-in";

			var loadContent = function(){
				$.get( nextUrl, function( data ){
					if( isBefore ) {
						$content.prev().replaceWith( data );
						$target = $content.prev();
					} else if( isAfter ) {
						$content.next().replaceWith( data );
						$target = $content.next();
					} else {
						$target = $content.html( data );
					}

					$target.removeClass( txOut )
						.addClass( txIn )
						.trigger( "enhance" );
				});
			};

			$trigger.bind( ( window.tappy ? "tap" : "click" ), function( e ){
				
				var $placeholder = $( "<div></div>" )
					.css( "position", "relative" )
					.html( $loader.html() );

				$placeholder
					.find( ".loading-container" )
					.css( "top", "2px" );

				if( isAfter ) {
					$content.after( $placeholder );
				} else if( isBefore ) {
					$content.before( $placeholder );
				} else {
					// scroll up to make sure content appears at the top of the page
					window.scrollTo(0,0);

					// fade out content
					$content.addClass( txOut );
				}

				setTimeout( loadContent, 2000 );
			});
		});
	};

	$( document ).bind( "enhance", initPageAnim );

}( shoestring, this ));