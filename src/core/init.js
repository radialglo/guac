define([
        "../core"
], function(Guac) {

    var init = Guac.fn.init = function(selector) {
       this.target = document.querySelectorAll(selector);
    };
});
