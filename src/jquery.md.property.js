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

				if (options.userId !== "") {
					params.userId = options.userId;
				}

				if (options.addressLine1 !== "") {
					params.addressLine1 = options.addressLine1;
				}

				if (options.addressLine2 !== "") {
					params.addressLine2 = options.addressLine2;
				}

				if (options.addressCity !== "") {
					params.addressCity = options.addressCity;
				}


				if (options.addressState !== "") {
					params.addressState = options.addressState;
				}


				if (options.addressPostal !== "") {
					params.addressPostal = options.addressPostal;
				}

				return params;
			},

			verifyProperty = function(options) {
				var params = parameters(options);

				$.get(urlVerify, {
					t: "mdPropertyService Verify Request",
					id: params.userId,
					act: "Check",
					//cols: "",
					//opt: "",
					//full: "",
					//comp: "",
					a1: params.addressLine1,
					a2: params.addressLine2,
					city: params.addressCity,
					state: params.addressState,
					postal: params.addressPostal
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

			lookupProperty = function(options) {
				var params = parameters(options);

				$.get(urlLookup, {
					t: "mdPropertyService Lookup Request",
					id: params.userId,
					AddressKey: params.addressKey,
					FIPS: params.apn,
					APN: params.fips
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
				// General Options - used by both the verify and lookup methods
				callback: $.noop(), // Optional function for handling data
				userId: "", // You must supply your Melissa Data user ID

				// Personator API Options - used by the verify method
				addressLine1: "", // Line 1 of the street address
				addressLine2: "", // Line 2 of the street address
				addressCity: "", // The city the property is in
				addressState: "", // The state the property is in
				addressPostal: "", // The five digit postal (zip) code for the property

				// Property API Options - used by the lookup method
				addressKey: "",
				apn: "",
				fips: ""
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
				verifyProperty(options);
			}
		};
	}());

}(jQuery));
