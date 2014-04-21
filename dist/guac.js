/**
 * Guac JavaScript Library v0.0.1
 *
 * @see https://github.com/radialglo/guac
 * /? /\ |) | /\ |_ (_, |_ () 
 *
 * Date: 2014-03-20
 */
(function(window, undefined) {

    "use strict";


var
    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,

    version = "0.0.1",

    // Define a local copy of Guac
    Guac = function(selector) {
        return new Guac.fn.init(selector);
    };

    // global tracker for objects
    Guac.guid = 1;

    Guac.fn = Guac.prototype = {
        constructor: Guac,
        each: function(callback) {
            return Guac.each(this.target, callback);
        },
        some: function(callback) {
            return Guac.some(this.target, callback);
        }
    };

    Guac.isArray = Array.isArray;

    Guac.type = function(o) {
        return typeof o;
    };

    Guac.isString = function(o) {
        return Guac.type(o) === "string";
    };

    Guac.isFunction = function(o) {
        return Guac.type(o) === "function";
    };

    Guac.each = function(obj, callback) {

        var i,
            isArray = Guac.isArray(obj);

        if (isArray) {
            obj.forEach(callback);
        } else {

            for (i in obj) {
                callback.call(obj[i], obj[i], i, obj);
            }
        }

        return obj;
    };

    Guac.some = function(obj, callback) {

        var i,
            isArray = Guac.isArray(obj);

        if (isArray) {
            return obj.some(callback);
        } else {

            for (i in obj) {

                if (callback.call(obj[i], obj[i], i)) {
                    return true;
                }
            }
        }

        return false;
    };


    var init = Guac.fn.init = function(selector) {

        // handle $("selector")
        if (Guac.isString(selector)) {

            this.target = Array.prototype.slice.call(document.querySelectorAll(selector));

        // handle $(function)
        } else if (Guac.isFunction(selector)) {

            Guac.ready(selector);

        // handle $(DOMElement)
        } else if (selector.nodeType) {
            this.target = [selector];
        } else {
            this.target = [selector];
        }

        return this;

    };

    // Give the init function the Guac prototype
    init.prototype = Guac.fn;



    Guac.ready = function(fn) {
        window.addEventListener("load", fn);
    };



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



    /**
     * @method ajax
     * @desc sends network request on url
     *
     * @param {String} url - the url for the request
     * @param {Object} opts - dictionary of options
     */
    Guac.ajax = function(url, opts) {

        var method = opts.method || "GET",
            xhr = new XMLHttpRequest(),
            onSuccess = opts.success,
            onError = opts.error,
            type;

        xhr.open(method, url);

        xhr.onreadystatechange = function() {

            if (xhr.readyState === 4) {

                if (xhr.status === 200) {
                    // get the type of response
                    type = xhr.getResponseHeader("Content-Type");

                    if (onSuccess) {

                        if (type.indexOf("xml") !== -1 && xhr.responseXML) {
                            // xml
                            onSuccess(xhr.responseXML);

                        } else if (type.indexOf("application/json") !== -1) {

                            // json
                            onSuccess(JSON.parse(xhr.responseText));

                        } else {

                            // string
                            onSuccess(xhr.responseText);
                        }
                    }

                } else {
                    if (onError) {
                        onError();
                    }
                }
            }

        };

        // TODO: change
        xhr.send("null");

    };

    /**
     * @method post
     * @desc sends GET request on url
     *
     * @param {String} url - the url for the request
     * @param {Object} opts - dictionary of options
     */
    Guac.get = function(url, opts) {
        opts.method = "GET";
        Guac.ajax(url, opts);
    };

    /**
     * @method post
     * @desc sends POST request on url
     *
     * @param {String} url - the url for the request
     * @param {Object} opts - dictionary of options
     */
    Guac.post = function(url, opts) {
        opts.method = "POST";
        Guac.ajax(url, opts);
    };


    Guac.fn.addClass = function(value) {
        this.each(function(el, i, arr) {
            el.classList.add(value);
        });
    };

    Guac.fn.removeClass = function(value) {

        this.each(function(el, i, arr) {
            el.classList.remove(value);
        });
    };

    Guac.fn.hasClass = function(value) {

        var ret = this.some(function(el, i, arr) {
            if (el.classList.contains(value)) {
                return true;
            }
        });

        return ret;

    };

    Guac.fn.toggleClass = function(value) {

        if (this.hasClass(value)) {
            this.removeClass(value);
        } else {
            this.addClass(value);
        }

    };


    // Expose Guac object to the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Guac = window.$ = Guac;
    }



return Guac;

})(this);
