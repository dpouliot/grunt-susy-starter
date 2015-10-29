/*! auto-complete - v0.2.1 - 2015-06-23
* https://github.com/filamentgroup/auto-complete
* Copyright (c) 2015 John Bender  The Filament Group;  Licensed MIT */
(function( w, $ ){
  "use strict";

  var name = "autocomplete";

  w.componentNamespace = w.componentNamespace || {};

  $.proxy = $.proxy || function(fn, context) {
    return function() {
      return fn.apply(context, arguments);
    };
  };

  var AutoComplete = function( element, menu ){
    // assign element for method events
    this.$element = this.$input = $( element );

    if( this.$input.data("autocomplete-component") ){
      return;
    }

    this.menu = menu;
    this.ignoreKeycodes = [];

    // TODO it might be better to push this into the constructor of the menu to
    //      reduce dependency on the structure of the menu's keybinding reresentation
    for( var key in menu.keycodes ) {
      this.ignoreKeycodes.push( parseInt( key, 10 ) );
    }

    this.url = this.$element.attr( "data-autocomplete" );

    this.$input.data( "autocomplete-component", this );
    this.$input.attr( "autocomplete", "off" );

    // TODO move to options object
    this.isFiltered = !this.$input.is( "[data-unfiltered]" );
    this.isCaseSensitive = this.$input.is( "[data-case-sensitive]" );
    this.isBestMatch = this.$input.is( "[data-best-match]" );
    this.isEmptyNoMatch = this.$input.is( "[data-empty-no-match]" );

    this.$form = this.$input.parents( "form" );

    this._requestId = 0;

    this.matches = [];
  };

  w.componentNamespace.AutoComplete = AutoComplete;

  AutoComplete.preventSubmitTimeout = 200;

  AutoComplete.prototype.blur = function() {
    // use the best match when there is one
    if( this.isBestMatch && this.matches[0] ){
      this.$input.val( this.matches[0] );
    }

    // empty the field when there are no matches
    if( this.isEmptyNoMatch && !this.matches[0] ){
      this.$input.val("");
    }
  };

  // TODO tightly coupled to the notion of keypresses
  AutoComplete.prototype.navigate = function( event ){
    var value;

    if( this.menu.isOpen() ){
      // Prevent the submit after a keydown for 200ms to avoid submission after hitting
      // enter to select a autocomplete menu item
      this.preventSubmit();
      value = this.menu.keyDown(event);

      if( value ){
        this.val( this.strip(value) );
      }
    }
  };

  AutoComplete.prototype.select = function() {
    this.val( this.strip(this.menu.selectActive() || "") );
  };

  AutoComplete.prototype.filterData = function(data){
    if( !data.length ) {
      return;
    }
    var val = this.val();
    var compare;
    if( !this.isCaseSensitive ) {
      val = val.toLowerCase();
    }
    var filtered = [];
    for( var j = 0, k = data.length; j < k; j++ ) {
      compare = !this.isCaseSensitive ? data[ j ].toLowerCase() : data[ j ];
      if( compare.indexOf( val ) === 0 ) {
        filtered.push( data[ j ] );
      }
    }
    return filtered;
  };

  AutoComplete.prototype.suggest = function( e ){
    if( e && e.keyCode && this.ignoreKeycodes.indexOf(e.keyCode) !== -1 ){
      return;
    }

    // if at any point the suggest is requested with an empty input val
    // stop everything and hide the suggestions.
    if( !this.$input.val() ){
      this.abortFetch();
      this.hideSuggest();
      return;
    }

    this.abortFetch();

    var request = this._requestId += 1;

    this.fetch($.proxy(function( data ) {
      // we have made another request, ignore this one
      if( request !== this._requestId ) {
        return;
      }

      this.render(typeof data === "string" ? JSON.parse(data): data);
    }, this));
  };

  AutoComplete.prototype.abortFetch = function() {
    // invalidate the current request value by incrementing the counter
    this._requestId += 1;

    this.$input.trigger( name + ":aborted" );
  };

  AutoComplete.prototype.fetch = function( success ) {
    $.ajax(this.url, {
      dataType: "json",

      data: {
        q: this.val().toLowerCase()
      },

      success: success
    });
  };

  // TODO this whole method is project specific due to returned json
  //      set this up so that render can be replaced or at least
  //      the data manip can be parameterized
  AutoComplete.prototype.render = function( data ) {
    data = data.location || data;

    this.matches = data;

    if( data.length ) {
      this.menu.fill(this.filterData(data), this.menu.getSelectedElement().text());
      this.showSuggest();
    } else {
      this.hideSuggest();
    }

    this.$input.trigger( name + ":suggested" );
  };

  AutoComplete.prototype.showSuggest = function() {
    this._isSuggestShown = true;
    this.menu.open();
    this.$input.trigger( name + ":shown" );
  };

  AutoComplete.prototype.hideSuggest = function() {
    this._isSuggestShown = false;
    this.menu.close();
    this.$input.trigger( name + ":hidden" );
  };

  // TODO remove
  AutoComplete.prototype.strip = function( string ) {
    return string.replace(/^\s+|\s+$/g, '');
  };

  AutoComplete.prototype.val = function( str ) {
    var value;
    if( str ) {
      value = this.strip(str);
      this.$input.trigger( name + ":set", { value: value } );
      this.$input.val( value );
    } else {
      return this.$input.val();
    }
  };

  AutoComplete.prototype.preventSubmit = function(){
    this.$form.one( "submit.autocomplete", function( event ){
      event.preventDefault();
    });

    clearTimeout(this.preventedSubmitTimeout);

    this.preventedSubmitTimout = setTimeout($.proxy(function() {
      this.$form.off( "submit.autocomplete" );
    }, this), AutoComplete.submitPreventTimeout);
  };
})( this, this.jQuery );

(function( w, $ ){
  "use strict";

  var AutoCompleteDom = function( element, menu ){
    w.componentNamespace.AutoComplete.call( this, element, menu );
    this.$domSource = $( this.$input.attr("data-autocomplete-dom") );
  };

  w.componentNamespace.AutoCompleteDom = AutoCompleteDom;
  $.extend(AutoCompleteDom.prototype, w.componentNamespace.AutoComplete.prototype);

  AutoCompleteDom.prototype.fetch = function( callback ){
    var value = this.$input.val().toLowerCase(), keep = [];

    this.$domSource.children().each($.proxy(function( i, elem ){
      var text = $(elem).text();

      // simple substring match
      if( text.toLowerCase().indexOf( value ) !== -1 ){
        keep.push(this.strip(text));
      }
    }, this));

    callback( keep );
  };
})(this, this.jQuery);

(function( w, $ ){
  "use strict";

  $.fn.autocomplete = function(){
    return this.each(function(){
      var $this, autocomplete, menu, $menu;

      $this = $(this);

      if( $this.data( "autocomplete-component" ) ){
        return;
      }

      $menu = $this.parent().find( "[data-menu]" ).eq( 0 );

      menu = $menu.data( 'Menu' );

      if( !menu ) {
        menu = new w.componentNamespace.Menu( $menu[0] );
      }

      if( $this.is("[data-autocomplete]") ){
        autocomplete = new w.componentNamespace.AutoComplete( this, menu );
      } else {
        autocomplete = new w.componentNamespace.AutoCompleteDom( this, menu );

        autocomplete.$domSource.on( "change", function() {
          var $this, text;

          $this = $(this);
          text = $this.find( "[value='" + $this.val() + "']" ).text();
          autocomplete.val( text );
        });
      }

      $this.on( "keyup", $.proxy(autocomplete.suggest, autocomplete) );
      $this.on( "keydown", $.proxy(autocomplete.navigate, autocomplete) );
      $this.on( "blur", $.proxy(autocomplete.blur, autocomplete) );
      menu.$element.on( "mouseup", $.proxy(autocomplete.select, autocomplete) );
      menu.init();
    });
  };

  $( w.document ).on( "enhance", function(){
    $( "[data-autocomplete], [data-autocomplete-dom]" ).autocomplete();
  });
})( this, this.jQuery);
