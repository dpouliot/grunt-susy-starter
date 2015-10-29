/**
 * Animation test
 */
(function(window){
	if( typeof Array.prototype.map === "undefined" ){ return; }

	var document = window.document;

	var prop = "animationName";
	var prefixProps = 'Moz O ms Webkit'.split(" ").map(function( prefix ){
		return prefix + prop.charAt( 0 ).toUpperCase() + prop.slice(1);
	});
	prefixProps.push( prop );
	var ok = prefixProps.some(function(prefix){
		var foo = document.createElement( "div" );
		return typeof foo.style[prefix] !== "undefined";
	});

	if( ok ){
		document.documentElement.className = document.documentElement.className + " animation";
	}
}(this));

/**
 * RecalcButton
 */
(function($, window){
	"use strict";

	var RecalcButton = function(element, opts){
		opts = opts || {};
		opts.recalcText = opts.recalcText || "Recalculating";
		this.$el = $( element );
		this.el = element;
		this.originalInnerHTML = element.innerHTML;
		this.recalcText = opts.recalcText;
	};

	RecalcButton.prototype.recalc = function(){
		var spinner = "<span class='spinner'></span>";
		var text = "<span class='text'>" + this.recalcText + "</span>";
		this.$el.addClass( "hidden" );
		this.el.innerHTML = spinner + text;
		this.el.setAttribute( "disabled", "true" );
	};

	RecalcButton.prototype.returnToNormal = function(){
		this.$el.removeClass( "hidden" );
		this.el.innerHTML = this.originalInnerHTML;
		this.el.removeAttribute( "disabled" );
	};

	window.RecalcButton = RecalcButton;

}(jQuery, this));

/*global jQuery:true*/
/*global RecalcButton:true*/
(function( $, RecalcButton, window ) {
	"use strict";

	var document = window.document;

	var pluginName = "recalc",
			initSelector = "." + pluginName + " .btn-action, " + "." + pluginName + " .btn-action-b";

	var buttons = [];

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var btn = new RecalcButton( this );
			btn.recalc();
			buttons.push( btn );
		});
	};


	$( document ).bind( "close.recalc", function( e ){
		buttons.forEach(function( btn ){
			btn.returnToNormal();
		});
		$( ".recalc" ).removeClass( "recalc" );
	});

	$( document ).bind( "start.recalc", function( e ){
		buttons.forEach(function( btn ){
			btn.recalc();
		});
		$( ".page" ).addClass( "recalc" );
	});

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target ).filterUnenhanced( pluginName )[ pluginName ]();
	});

}( jQuery, RecalcButton, this ));
