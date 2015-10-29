/*global jQuery:true*/
/*global RadioButton:true*/
/*
 * Create a numeric input that actually works
 *
 * Copyright (c) 2015 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, RadioButton, window ) {
	"use strict";

	var document = window.document;

	var pluginName = "radio-button",
			initSelector = ".check-radio-set.button";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var input = new RadioButton( this );
			input.init();
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target ).filterUnenhanced( pluginName )[ pluginName ]();
	});

}( jQuery, RadioButton, this ));
