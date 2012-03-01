/**
 * Event target is used as a mixin so that the classes can support dispatch events and add events commands
 *
 * @class EventTarget
 * @author Mr.Doob
 * @author Thodoris Tsiridis
 * @version 1.1
 */
var EventTarget = function () {
    /**
     * The object that will hold all the event listeners
     *
     * @private
     * @type Object
     */
    var listeners = {};

    /**
     * Registers an event
     *
     * @param {String} type The event type
     * @param {Function} listener The callback function
     * @param {Object} ctx The context that will be used for the calling the callback
     * @author Mr.Doob
     * @author Thodoris Tsiridis
     */
    this.bind = function ( type, listener, ctx ) {
        var obj = {callback: listener, context: ctx};
        var exists = false;
        var events;

        if ( listeners[ type ] === undefined ) {
            listeners[ type ] = [];
        }

        events = listeners[ type ];

        for (var i = 0; i < events.length; i++) {

            if (events[i].callback === listener && events[i].context === ctx) {
                exists = true;
                break;
            }

        }

        if ( exists === false ) {
            listeners[ type ].push(obj);
        }

    };

    /**
     * Dispatches an event
     *
     * @param {Object} event The event
     * @param {String} event.type The event type
     * @author Mr.Doob
     * @author Thodoris Tsiridis
     */
    this.trigger = function ( event ) {
        var events = listeners[ event.type ];

        if (typeof events !== 'undefined') {
            for ( var i = 0; i < events.length; i++ ) {
                events[i].callback.call( events[i].context, event );
            }
        }

    };

    /**
     * Removes an event
     *
     * @param {String} type The event type
     * @param {Function} listener The callback function
     * @param {Object} ctx The context that will be used for the calling the callback
     * @author Mr.Doob
     * @author Thodoris Tsiridis
     */
    this.unbind = function ( type, listener, ctx) {
        var index;
        var events = listeners[type];

        if (typeof events !== 'undefined') {
            for (var i = 0; i < events.length; i++) {
                if (events[i].callback === listener && events[i].context === ctx) {
                   index = i;
                   break;
                }
            }

            if ( index !== - 1 ) {
                listeners[ type ].splice( index, 1 );
            }
        }

    };

};