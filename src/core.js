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
    };

    return Guac;
});
