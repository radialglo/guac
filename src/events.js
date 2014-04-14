define([
    "./core"
], function(Guac) {

    /**
     * @submodule event
     * @see http://dean.edwards.name/weblog/2005/10/add-event/
     */
    Guac.event = {
        add: function(el, type, handler) {

                // internal delegated handler for all events of element
                var eventHandle,
                    handlers,
                    events;

                // give handler unique ID, so that we can find/remove it later
                if (!handler.guid) {
                    handler.guid = Guac.guid++;
                }

                if (!(events = el.events)) {
                    events = el.events =  {};
                }

                if (!(eventHandle = el.handle)) {
                    eventHandle = function(e) {
                        Guac.event.dispatch.apply( el, arguments);
                    };
                }

                if (!(handlers = events[type])) {

                    handlers = events[type] = [];
                    el.addEventListener(type, eventHandle, false);
                }

                handlers.push(handler);

        },

        remove: function(el, type, handler) {

            var handlers;

            if (!el.events) {
                return;
            }

                handlers = el.events[type] || [];
                handlers.forEach(function(h, i) {
                    if (h.guid === handler.guid) {
                        handlers.splice(i, 1);
                    }
                });
        },

        dispatch: function (e) {

            var handlers;

            if (!this.events) {
                return;
            }

                handlers = this.events[e.type] || [];
                handlers.forEach(function(handler) {
                    handler(e);
                });
        }
    };

    /**
     * @method on
     *
     */
    Guac.prototype.on = function(type, fn) {

        return this.each(function(el) {
            Guac.event.add(el, type, fn);
        });

    };

    /**
     * @method off
     *
     */
    Guac.prototype.off = function(type, fn) {

        return this.each(function(el) {
            Guac.event.remove(el, type, fn);
        });
    };
});
