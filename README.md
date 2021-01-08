eventdispatcher.js
========

#### JavaScript events for custom objects ####

### Usage ###

```javascript
import { EventDispatcher } from 'EventDispatcher.js';

// Adding events to custom object

class Car extends EventDispatcher {

	start() {

		this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );

	}

}

// Using events

const car = new Car();

car.addEventListener( 'start', function ( event ) {

	alert( event.message );

} );

car.start();
```
