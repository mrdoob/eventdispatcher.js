eventtarget.js
========

#### JavaScript events for custom objects ####

### Usage ###

```html
<script src="EventTarget.js"></script>
<script>

	// Applying EventTarget to custom object
	var Car = function () {

		EventTarget.call( this );

		this.start = function () {
			this.dispatchEvent( { type: 'started', foo: 'bar' } );
		};

	};

	// Callback function for when the started event is triggered.
	var carStarted = function ( event ) {
		alert( 'vroom vroom!' );	
	};

	// Using events
	var car = new Car();
	// Bind
	car.addEventListener( 'started', carStarted, car );
	// Dispatch the event
	car.start();
	// Unbind
	car.removeEventListener('started', carStarted, car);
</script>
```
