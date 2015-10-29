/*global jQuery:true*/
(function($, window){
	"use strict";

	var btnChecked = "btn-action";

	var RadioButton = function( el ){
		this.el = el;
		this.$el = $( el );
	};

	RadioButton.prototype.updateState = function(){
		$( "input[type=radio]", $( this ) ).each(function(){
			if( this.checked ){
				$( this ).parent().addClass( btnChecked );
			}
			else {
				$( this ).parent().removeClass( btnChecked );
			}
		});
	};

	RadioButton.prototype.bindEvents = function(){
		this.$el.on( "click", this.updateState );
	};

	RadioButton.prototype.init = function(){
		this.bindEvents();
	};

	window.RadioButton = RadioButton;
}(jQuery, this));
