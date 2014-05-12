define([
    "./core"
], function(Guac) {
    /**
     * Guac can serve as a global mediator object
     * independent of the DOM
     */

    /**
     * @property subscribers
     * @private
     */
    Guac._subscribers = {};
    /**
     * @method subscribe
     * @public
     * @param {String} type - the name of the event to subscribe
     * @param {Function} fn - the function to subscribe
     * @param {Object} ctx - the context of the fn to subscribe
     */
    Guac.subscribe = function(type, fn, ctx) {

        var subscribers = this._subscribers;

        if (typeof subscribers[type] === "undefined") {
            subscribers[type] = [];
        }

        subscribers[type].push({fn: fn, ctx: ctx || this});
    };

    /**
     * @method unsubscribe
     * @public
     * @param {String} type - the name of the event to unsubscribe
     * @param {Function} fn - the function to unsubscribe
     * @param {Object} ctx - the context of the fn to unsubscribe
     */
    Guac.unsubscribe = function(type, fn, ctx) {

        var subscribers = this._subscribers[type];
            ctx = ctx || this;

        Guac.each(subscribers, function(subscriber, i) {
            if (subscriber.fn === fn && subscriber.ctx === ctx) {
                subscribers.splice(i, 1);
            }
        });
    };

    /**
     * @method publish
     * @public
     * @param {String} type - the name of the event to publish
     * @param {Array} args - an array of arguments to be passed to subscribed functions
     */
    Guac.publish = function(type, args) {
        var subscribers = this._subscribers[type];

        Guac.each(subscribers, function(subscriber, i) {
            subscriber.fn.apply(subscriber.ctx, args);
        });
    };

});
