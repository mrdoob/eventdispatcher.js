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

			listeners[ type ].unshift( listener );

		}

	};

	this.removeEventListener = function ( type, listener ) {

		var index = listeners[ type ].indexOf( listener );

		if ( index !== - 1 ) {

			listeners[ type ].splice( index, 1 );

		}

	};
	
	this.removeAllEventListeners=function()
	{

		listeners ={};

	};

	this.dispatchEvent = function ( event ) {

		var listenerArray = listeners[ event.type ];
		if ( listenerArray == undefined ) return;
    		event.target = this;
   		var i = listenerArray.length;
  		 while (i-- > 0)
   		{
     			listenerArray[i].call(this, event);
     		}

	};

};
