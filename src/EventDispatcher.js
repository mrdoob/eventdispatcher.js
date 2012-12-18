/**
 * @author mrdoob / http://mrdoob.com/
 */

var EventDispatcher = function () {

	var listeners = {};

	this.addEventListener = function ( type, listener ) {

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	};

    this.hasEventListener = function ( type, listener ) {
        
        var listener = listener || false;
        
        if ( listeners[ type ] === undefined ) {
            
            return false;
            
        } else {
            
            if ( ( listener && listeners[ type ].indexOf( listener ) !== - 1 ) || !listener ) {
                
                return true;
                
            } else return false;
            
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

		if ( listenerArray !== undefined ) {
			
			event.target = this;

			for ( var i = 0, l = listenerArray.length; i < l; i ++ ) {

				listenerArray[ i ].call( this, event );

			}

		}

	};

};
