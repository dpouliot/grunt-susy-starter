(function( $, window ){

	/* Form interactions */
	var initForm = function(){

		// simple function for showing "other" option when its paired input is checked
		$( ".opt-other" ).filterUnenhanced( "opt-other" ).each( function(){
			var $other = $( this );
			var $radio = $other.parent().find( "input[type=radio]" );
			var $form = $other.closest( "form" );

			$form.bind( "change", function(){
				$other[ $radio[0].checked ? "removeClass" : "addClass" ]( "hidden" );
			});			
		});

		// edit/change masked inputs
		$( ".mask-edit" ).filterUnenhanced( "mask-edit" ).each( function(){
			var $btn = $( this );
			var $parent = $btn.closest( ".textinput" );
			var $mask = $parent.find( ".mask-value" );
			var $input = $parent.find( ".mask-input" );
			var hideClass = "hidden";

			$btn.bind( ( window.tappy ? "tap" : "click" ), function( e ){
				$mask.addClass( hideClass );
				$input.removeClass( hideClass );
				e.preventDefault();
			});

		});

		// progressive disclosure -- works with checkboxes and radios
		$( "[data-disclosure]" ).filterUnenhanced( "disclosure" ).each(function(){
			var $t = $( this );
			var id = $t.attr( "data-disclosure" );
			var $content = $( "#" + id );

			if( $t.is( "input" ) ) {
				$t.closest( "form" ).bind( "change", function(){
					var checked = false;
					$( this ).find( "[data-disclosure='" + id + "']" ).each(function() {
						checked = checked || this.checked;
					});
					$content[ checked ? "removeClass" : "addClass" ]( "hidden" );
				});
			}
		});

		// auto-expand textarea height
		$( "textarea" ).bind( "input", function(){
			if( this.scrollHeight > this.clientHeight ){
				$( this ).height( this.scrollHeight + "px" );
			}
		});

	};

	$( document ).bind( "enhance", initForm );

}( shoestring, window ));