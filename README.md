eventdispatcher.js
========

#### JavaScript events for custom objects ####

### Usage ###

```html
<script src="EventDispatcher.js"></script>
<script>

	// Adding events to custom object

	function Car() {

		this.start = function () {

			this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );

		};

	}

	Object.assign( Car.prototype, EventDispatcher.prototype );

	// Using events

	var car = new Car();

	car.addEventListener( 'start', function ( event ) {

		alert( event.message );

	} );

	car.start();

</script>
```
