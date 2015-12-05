# jQuery Melissa Data Property

This is a work in progress, **do not use**.

An API wrapper for the [Melissa Data Property Web service](http://wiki.melissadata.com/index.php?title=Property), used to get information about individual homes. Normally you'd need to know either the Melissa Data AddressKey for a property, or the FIPS and APN for that property. In addition to making those two methods easy to use, this plugin gives you a third method, allowing you to query the Property Web service using just the property's address.

It works by making two requests: first, the [Melissa Data Personator Web service](http://wiki.melissadata.com/index.php?title=Personator) is queried in Check mode to get the verify the address and get the AddressKey. Then, the Property Web service is queried for you automatically using the AddressKey that was just retrieved.

Melissa Data provides a basic example on their wiki that uses JavaScript to make requests to their Property Web service, but it uses ActiveX plugins for the AJAX requests, making it useless in all but the most insecure versions of Internet Explorer.

## Requirements

You must have a [Melissa Data](http://www.melissadata.com/) account with a subscription to their [Property service](http://www.melissadata.com/lookups/property.asp). You'll need to know your User ID because it is used as the API key.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include the plugin script:

	```html
	<script src="dist/jquery.md.property.min.js"></script>
	```

3. Call the plugin and provide your options:

	```javascript
	var xmlResults = $.mdPropertyService.lookup({
		userId: "123456789", // Melissa Data User ID
		addressLine1: "22382 Avenida Empresa",
		addressCity: "Rancho Santa Margarita",
		addressState: "CA",
		addressZip: "92688"
	});
	```
