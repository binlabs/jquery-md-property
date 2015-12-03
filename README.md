# jQuery Melissa Data Property

This is a work in progress, do not use.

An API wrapper for the [Melissa Data Property Web service](http://wiki.melissadata.com/index.php?title=Property), used to get information about individual homes. Normally you'd need to know either Melissa Data AddressKey for a property, or the FIPS and APN for that property. With this plugin, you can simply provide just the property's address to query the Property Web service.

It works by making two requests: first, the [Melissa Data Personator Web service]() is queried in Verify mode to get the AddressKey. Then, the Property Web service is queried for you automatically using the address key that was just retrieved.

Melissa Data provides a basic example on their wiki that uses JavaScript to make requests to their Property Web service, but it uses ActiveX plugins for the AJAX requests, making it useless in all but the most insecure versions of Internet Explorer.

## Requirements

1. [Melissa Data](http://www.melissadata.com/) account with a subscription to their Property service. You'll need to know your user ID, as it is used as the API key
2. jQuery

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.md.property.min.js"></script>
	```

3. Call the plugin:

	```javascript
	var xmlResults = $.mdProperty({
		userId: "123456789",
		addressStreet: "22382 Avenida Empresa",
		addressCity: "Rancho Santa Margarita",
		addressState: "CA",
		addressZip: "92688"
	});
	```
	