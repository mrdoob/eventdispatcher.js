/**
 * @author mrdoob / http://mrdoob.com/
 */

var EventDispatcher = function () {

	var listeners = {};
	var array = [];

	this.addEventListener = function ( type, listener ) {

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	};

	this.removeEventListener = function ( type, listener ) {

		var index = listeners[ type ].indexOf( listener );

		if ( index !== - 1 ) {

			listeners[ type ].splice( index, 1 );

		}

	};

	this.dispatchEvent = function ( event ) {

		var listenerArray = listeners[ event.type ];
		if ( listenerArray == undefined ) return;
		event.target = this;
		array=listenerArray.slice();
		
		for ( var i = 0, l = array.length; i < l; i ++ ) {

			array[ i ].call( this, event );

		}

	};

};
