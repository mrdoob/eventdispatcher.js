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
                           
                           if(listeners[ type ].isDispatching) {

                                   listeners[ type ].numListenersAdded++;

                           }

		}

	};

	this.removeEventListener = function ( type, listener ) {

		var index = listeners[ type ].indexOf( listener );

		if ( index !== - 1 ) {

                           if( listeners[ type ].isDispatching ) {

                                   listeners[ type ].dispatchQueueUpdated = true;
                                   
                                   listeners[ type ].removedIndexes = listeners[ type ].removedIndexes || [];

                                   listeners[ type ].removedIndexes.push(index);

                           }

			listeners[ type ].splice( index, 1 );

		}

	};

	this.dispatchEvent = function ( event ) {

		var listenerArray = listeners[ event.type ];

		if ( listenerArray !== undefined ) {

                           if(listenerArray.isDispatching){

                                   listenerArray.wasReRequested = true;

                                    return;

                           }
                           
			listenerArray.isDispatching = true

			event.target = this;

                           listenerArray.numListenersAdded = 0;

			for ( var i = 0, l = listenerArray.length; i < l; i ++ ) {

                                    if(listenerArray.dispatchQueueUpdated){
                                        
                                            l = listenerArray.length - listenerArray.numListenersAdded;

                                            for(var j = 0, k = listenerArray.removedIndexes.length; j < k; j++){

                                                    if(listenerArray.removedIndexes[ j ] < i){
                                                    
                                                            i--;

                                                    }

                                            }

                                            listenerArray.dispatchQueueUpdated = false;

                                            delete listenerArray.removedIndexes;

                                    }

				listenerArray[ i ].call( this, event );

			}
 
                           listenerArray.isDispatching = false;

                           listenerArray.numListenersAdded = 0;
                           
                           if(listenerArray.wasReRequested){

                                   this.dispatchEvent(event);
                                   
                           }

		}

	};

};
