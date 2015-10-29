/*global shoestring*/
(function( $, window ){
	"use strict";

	var document = window.document;

	/* Prototype code: Show related coverages affected when another coverage is edited. */
	var initEditCoverage = function(){
		$( ".impact-coverage" )
			.filterUnenhanced( "impact-coverage" )
			.each(function() {

			var $relInput = $( this );
			var $form = $relInput.closest( "form" );
			var $related = $form.find( ".related-coverage" );
			var $origChkInput = $form.find( "input:checked" );
			var $textInput = $form.find( "input[type=text]", "input[type=number]" );

			var showSubmitBtns = function(checked){
				var values = checked[0].value.split( "-" ),
					perPerson = values[0],
					perAccident = values[1],
					link = $( ".edit-qps-btn" ),
					linkElement, href;

				if( link.length === 0 ){ return; }

				linkElement = link[0];

				href = linkElement.pathname + "?recalc" + "&" +
					"perPerson=" + perPerson + "&" +
					"perAccident=" + perAccident;

				$( ".edit-qps-cancel" ).html( "Cancel" );
				$( ".edit-qps-btn.hidden" ).removeClass( "hidden" ).addClass( "hidden-placeholder" );
				link.attr( "href", href );
			};

			var hideSubmitBtns = function(){
				$( ".edit-qps-cancel" ).html( "<i class='icon icon-arrow-left'></i>Back" );
				$( ".hidden-placeholder" ).addClass( "hidden" );
			};

			$form.bind( "change", function(){
				// When the form is changed, "Back" becomes "Cancel", and the Update and Continue buttons appear
				var checked = $( this ).find( "input:checked" );
				if ( !$origChkInput[0].checked ) {
					showSubmitBtns(checked);
				} else {
					hideSubmitBtns();
				}

				// No longer needed, using disclosure instead:
				// If input with impacted coverages is selected, show impacted (related) coverages
				/*if ( $related ) {
					$related[ $relInput[0].checked ? "removeClass" : "addClass" ]( "related-hidden" );
				}*/
			});
		});
	};

	$( document ).bind( "enhance", initEditCoverage );

}( shoestring, this ));