/**
 * @author mrdoob / http://mrdoob.com/
 */

var EventDispatcher = function () {}

EventDispatcher.prototype = {

	constructor: EventDispatcher,

	apply: function ( object ) {

		object.addEventListener = EventDispatcher.prototype.addEventListener;
		object.hasEventListener = EventDispatcher.prototype.hasEventListener;
		object.removeEventListener = EventDispatcher.prototype.removeEventListener;
		object.dispatchEvent = EventDispatcher.prototype.dispatchEvent;
		object.removeAllEventListeners = EventDispatcher.prototype.removeAllEventListeners;

	},

	addEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) {
			this._listeners = {};
			// denotes number of distict events dispatched at the moment. Used in remove all events.
			this._eventDispatcherLock = 0;
			// per-event lock.
			this._eventDispatcherLocks = {};
		}

		var listeners = this._listeners;

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	},

	hasEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return false;

		var listeners = this._listeners;

		if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {

			return true;

		}

		return false;

	},

	removeEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			var index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray[index] = null;

			}

		}

	},

	dispatchEvent: function ( event ) {
		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;

		if ( !listeners[ event.type ] || !listeners[ event.type ].length )
			return;

		var listenerArray = listeners[ event.type ];

		event.target = this;

		if(this._eventDispatcherLocks[event.type]++ === 0)
			++this._eventDispatcherLock;

		var currentIndex = 0;

		for(var i = 0, l = listenerArray.length; i < l; i++) {
			if(listenerArray[i]) {
				listenerArray[i].call(this, event);
				if(currentIndex !== i) {
					listenerArray[currentIndex] = listenerArray[i];
					listenerArray[i] = null;
				}
				++currentIndex;
			}
		}

		if(--this._eventDispatcherLocks[event.type] === 0) {
			if(currentIndex !== i) {
				var numObjects = listenerArray.length;
				while(i < numObjects)
					listenerArray[currentIndex++] = listenerArray[i++];
				listenerArray.length = currentIndex;
			}
		}
	},

	removeAllEventListeners: function(type) {
		var a, i, l;
		if(undefined === this._listeners) return;
		var listeners = this._listeners;
		var locks = this._eventDispatcherLocks;
		if(type) {
			a = listeners[type];
			if(a) {
				if(locks[type] === 0) a.length = 0;
				else for(i = 0, l = a.length; i < l; i++) a[i] = null; // we cannot just truncate if there are emits
			}
		} else {
			if(this._eventDispatcherLock === 0) {
				this._listeners = {};
				this._eventDispatcherLocks = {};
			} else { // if there are any events dispatching in the moment - this action becomes more expensive...
				for(var typeName in listeners) {
					if(!listeners.hasOwnProperty(typeName)) continue;
					a = listeners[typeName];
					if(locks[typeName] === 0) a.length = 0;
					else for(i = 0, l = a.length; i < l; i++) a[i] = null;
				}
			}
		}
	}
};
