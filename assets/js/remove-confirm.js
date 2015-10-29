(function( $, window ){

	/* Edit/remove confirmation */
	var initConfirmation = function(){

		function untabbable( $container ) {
			$container.find( ".btn" ).attr( "tabindex", "-1" );
		}

		function tabbable( $container ) {
			$container.find( ".btn" ).removeAttr( "tabindex" );
		}

		$( ".resource-delete" ).filterUnenhanced( "resource-delete" ).each(function(){
			var $del = $( this );
			var $header = $del.closest( ".resource-header" );
			var $panel = $del.parent().parent().find( ".resource-edit-confirm" );

			untabbable( $panel );
				/* $panel assumes the delete btn is contained within a div, and that div is parallel in the markup to `.resource-edit-confirm`:

					<div class="[ parent ]">
						[ other elements ]
						<span class="[ parent ]">
							<a href="#" class="resource-delete"><span>Delete</span> <i class="icon icon-x"></i></a>
						</span>
						<div class="resource-edit-confirm hidden">
							<a href="#" class="btn btn-sml resource-edit-cancel">Cancel</a>
							<a href="#" class="btn btn-action-final btn-sml resource-remove">Remove</a>
						</div>
					</div>
				*/
			var $confirm = $panel.find( ".resource-remove" );
			var $cancel = $panel.find( ".resource-edit-cancel" );
			var hideResourceClass = "hidden";
			var hidePanelClass = "hidden";

			$del.bind( ( window.tappy ? "tap" : "click" ), function(){
				$panel.removeClass( hidePanelClass );
				tabbable( $panel );
			});

			$cancel.bind( ( window.tappy ? "tap" : "click" ), function(){
				$panel.addClass( hidePanelClass );
				untabbable( $panel );
			});

			$confirm.bind( ( window.tappy ? "tap" : "click" ), function(){
				var $siblingsToHide = $header.add( $header.next().filter( ".resource-form" ) );

				var $resource = $header.closest( ".resource" );
				var $children = $resource.children().filter( ".resource-header,.resource-form" );
				var noOtherSiblings = $children.length === $siblingsToHide.length;

				if( noOtherSiblings ) {
					$resource.addClass( hideResourceClass );
				} else {
					$siblingsToHide.addClass( hideResourceClass );
				}
			});
		});
		
	};

	$( document ).bind( "enhance", initConfirmation );

}( shoestring, this ));