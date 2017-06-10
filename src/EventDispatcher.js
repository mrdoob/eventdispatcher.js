/**
 * @author mrdoob / http://mrdoob.com/
 */

function EventDispatcher() {}

Object.assign( EventDispatcher.prototype, {

	addEventListener: function ( type, listener, priority ) {

		if ( this._listeners === undefined ) this._listeners = {};

		if ( this._propagationAllawed === undefined){

			this._propagationAllawed = true;

			this._stopPropagation = function () {

				this._propagationAllawed = false;

			};

		}

		var listeners = this._listeners;

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

			listeners[ type ].sortByPriority = function() {

				var byPriority = function( a, b ) {

					return b.priority - a.priority;

				};

				this.sort( byPriority );

			};

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listener.priority = priority ? priority : 0;

			listeners[ type ].push( listener );

			listeners[ type ].sortByPriority();

		}

	},

	hasEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return false;

		var listeners = this._listeners;

		return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

	},

	removeEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			var index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );

			}

		}

	},

	dispatchEvent: function ( event ) {

		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ event.type ];

		if ( listenerArray !== undefined ) {

			event.target = this;
			event.stopPropagation = this._stopPropagation.bind(this);

			var array = listenerArray.slice( 0 );

			for ( var i = 0, l = array.length; i < l; i ++ ) {

				if(this._propagationAllawed) {

					array[ i ].call( this, event );

				} else {

					this._propagationAllawed = true;

					break;

				}
			}

		}

	}

} );
