eventdispatcher.js
========

#### JavaScript events for custom objects ####

### Usage ###

```html
<script src="EventDispatcher.js"></script>
<script>

	// Adding events to custom object

	var Car = function () {

		this.start = function () {

			this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );

		};

	};

	EventDispatcher.prototype.apply( Car.prototype );


	// Using events

	var car = new Car();

	car.addEventListener( 'start', function ( event ) {

		alert( event.message );

	} );

	car.start();
	
	// Optional way to simply remove the event using the reference to the handler.
	starter();

</script>
```
