define([
        "../core"
], function(Guac) {

    var init = Guac.fn.init = function(selector) {

       this.target = Array.prototype.slice.call(document.querySelectorAll(selector));
       return this;

    };

    // Give the init function the Guac prototype
    init.prototype = Guac.fn;
});
