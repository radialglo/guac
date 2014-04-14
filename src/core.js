define([],function() {
var
    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,

    version = "@VERSION",

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

    return Guac;
});
