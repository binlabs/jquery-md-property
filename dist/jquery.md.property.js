/*
 *  jquery-md-property - v1.0.0
 *  An API wrapper for the Melissa Data Property Web service.
 *  https://github.com/binlabs/jquery-md-property#readme
 *
 *  Made by 
 *  Under ISC License
 */
;(function($) {

	"use strict";

	$.mdPropertyService = (function() {
		
		// Private
		var urlLookup = "https://property.melissadata.net/v3/REST/Service.svc/doLookup",
				urlVerify = "https://personator.melissadata.net/v3/WEB/ContactVerify/doContactVerify",

			prepare_options = function(options, callback) {
				// If only callback is passed
				if ($.isFunction(options)) {
					options = {
						callback: options
					};
				}

				options = $.extend({}, $.mdPropertyService.defaultOptions, options);

				// If both options and callback are passed in
				if ($.isFunction(callback)) {
					options.callback = callback;
				}

				return options;
			},

			parameters = function(options) {
				var params = {};

				if (options.UserId !== "") {
					params.userId = options.userId;
					console.error("You must provide a User ID");
				}

				return $.param(params);
			},

			verify = function(options) {

				var params = parameters(options);

				if (params.length) {
					userId = [userId, params].join("?"); // Add parameters if present
					addressLine1 = [addressLine1, params].join("?");
					addressLine2 = [addressLine2, params].join("?");
					addressCity = [addressCity, params].join("?");
					addressState = [addressState, params].join("?");
					addressPostal = [addressPostal, params].join("?");
				}

				$.get(urlVerify, {
					t: "mdPropertyService Request",
					id: userId,
					act: "Check",
					//cols: "",
					//opt: "",
					//full: "",
					//comp: "",
					a1: addressLine1,
					a2: addressLine2,
					city: addressCity,
					state: addressState,
					postal: addressPostal
					//ctry: "",
					//email: "",
					//phone: "",
					//ff: ""
				}, function(data) {
					if (!data) {
						// Exception handling for when not data is returned
						options.callback(false, $.mdPropertyService.errors.NoDataError);
						return;
					}

					try {
						return options.callback(jQuery.parseXML(data));
					} catch (e) {
						options.callback(false, new $.mdPropertyService.errors.InvalidXML(e));
					}
				}, "text");
			};

		// Public
		return {
			defaultOptions: {
				userId: "", // You must supply your Melissa Data user ID
				addressLine1: "", // Line 1 of the street address
				addressLine2: "", // Line 2 of the street address
				addressCity: "", // The city the property is in
				addressState: "", // The state the property is in
				addressPostal: "" // The five digit postal (zip) code for the property
			},

			errors: {
				NoDataError: {
					type: "NoDataError",
					message: "No data was supplied to the callback."
				},
				InvalidXML: function(data) {
					return {
						type: "InvalidXML",
						message: "Invalid XML was returned. \n" + data
					};
				}
			},

			lookup: function(options, callback) {
				options = prepare_options(options, callback);
				return verify(options);
			}
		};
	}());

}(jQuery));
