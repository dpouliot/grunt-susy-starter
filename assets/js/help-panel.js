(function( $ ){

	/* Help panel in masthead */
	var initHelp = function(){
		var $helpPanel = $( "#help-center" );
		var panelClass = "panel-open";

		function openPanel( e ){
			e.preventDefault();
			$helpPanel.addClass( panelClass )
				.css("min-height",pageHeight()+"px");

		}
		function closePanel( e ){
			var $target = $( e.target );
			if( !$target.closest( '.panel-content' ).length ||
				$target.closest( '.help-center-delete' ).length ) {

				e.preventDefault();
				$helpPanel.removeClass( panelClass )
					.css("min-height","0px");
			}
		}

		$( '.icon-help-center' )
			.filterUnenhanced( "help-center" )
			.bind( "tap", openPanel );

		$helpPanel
			.filterUnenhanced( "help-center" )
			.bind( "click", closePanel )
			.find( '.help-center-delete' ).bind( "tap", closePanel );
	};

	$( document ).bind( "enhance", initHelp );


}( shoestring ));