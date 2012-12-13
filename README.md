eventdispatcher.js
========

#### JavaScript events for custom objects ####

### Usage ###

```html
<script src="EventDispatcher.js"></script>
<script>

	// Adding events to custom object

	var Car = function () {

		EventDispatcher.call( this );

		this.start = function () {

			this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );

		};

	};


	// Using events

	var car = new Car();
	car.addEventListener( 'start', function ( event ) {

		alert( event.message );

	} );
	car.start();

</script>
```
