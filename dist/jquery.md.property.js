/*
 *  jquery-md-property - v1.0.0
 *  An API wrapper for the Melissa Data Property Web service.
 *  https://github.com/binlabs/jquery-md-property#readme
 *
 *  Made by 
 *  Under ISC License
 */
;(function ( $, window, document, undefined ) {

	"use strict";

		var pluginName = "mdProperty",
				defaults = {
				title: "Property Lookup"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {

				},
				lookup: function () {
						
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
