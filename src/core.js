define([],function() {
var
    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,

    version = "@VERSION",

    // Define a local copy of Guac
    Guac = function(selector) {
        return new Guac.fn.init(selector);
    };

    Guac.fn = Guac.prototype = {
        constructor: Guac,
        each: function(callback) {
            Guac.each(this.target, callback);
        }
    };

    Guac.isArray = Array.isArray;

    Guac.each = function(obj, callback) {

        var i,
            isArray = Guac.isArray(obj);

        if (isArray) {
            obj.forEach(callback);
        } else {

            for (i in obj) {
                callback.call(obj[i], i, obj[i]);
            }
        }

        return obj;
    };

    return Guac;
});
