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
                           
			listenerArray.isDispatching = true;

                           listenerArray.dispatchQueueUpdated = false;

                           listenerArray.removedIndexes = [];

                           listenerArray.numListenersAdded = 0;

			event.target = this;

			for ( var i = 0, l = listenerArray.length; i < l; i ++ ) {

                                    if(listenerArray.dispatchQueueUpdated){
                                        
                                            l = listenerArray.length - listenerArray.numListenersAdded;

                                            var iOld = i;

                                            for(var j = 0, k = listenerArray.removedIndexes.length; j < k; j++) {

                                                    if(listenerArray.removedIndexes[ j ] < iOld){
                                                    
                                                            i--;

                                                    }

                                            }
                                            
                                            listenerArray.removedIndexes = [];

                                            listenerArray.dispatchQueueUpdated = false;

                                    }

				listenerArray[ i ].call( this, event );

			}
 
                           listenerArray.isDispatching = false;
                           
                           if(listenerArray.wasReRequested){

                                   listenerArray.wasReRequested = false;

                                   this.dispatchEvent(event);                              
                                   
                           }

		}

	};

};
