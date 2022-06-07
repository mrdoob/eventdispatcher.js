/**
 * ListenerEvent designates the format of data sent by EventDispatcher
 *
 * target: source of emitter, set upon dispatch
 * type: 'name' of the event
 * message: any content you want to pass
 */
interface ListenerEvent {
  target?: EventDispatcher;
  type: string;
  message: any;
}

/**
 * Callback function to process event when EventDispatcher receives one
 */
type ListenerEventLambda = ((event: ListenerEvent) => any);

export class EventDispatcher {

  /**
   * _listeners indexes a record of all callback functions
   */
  public _listeners?: {
    [index: string]: ListenerEventLambda[];
  };

  addEventListener(type: string, listener: ListenerEventLambda) : void;

  hasEventListener(type: string, listener: ListenerEventLambda) : bool;

  removeEventListener(type: string, listener: ListenerEventLambda) : void;

  dispatchEvent(event: ListenerEvent) : void;

}
