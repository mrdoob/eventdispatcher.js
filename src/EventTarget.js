/**
 * @author mr.doob / http://mrdoob.com/
 */

EventTarget = function () {};

EventTarget.prototype = {

	constructor: EventTarget,

	listeners: {},

	addEventListener: function ( type, listener ) {

		if ( this.listeners[ type ] == undefined ) {

			this.listeners[ type ] = [];

		}

		if ( this.listeners[ type ].indexOf( listener ) === -1 ) {

			this.listeners[ type ].push( listener );

		}

		return this;

	},

	dispatchEvent: function ( event ) {

		for ( var listener in this.listeners[ event.type ] ) {

			this.listeners[ event.type ][ listener ]( event );

		}

		return this;

	},

	removeEventListener: function ( type, listener ) {

		var index = this.listeners[ type ].indexOf( listener );

		if ( index !== - 1 ) {

			this.listeners[ type ].splice( index, 1 );

		}

		return this;

	}

};
