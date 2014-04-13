define([
    "../core"
], function(Guac) {

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

    };

    Guac.fn.toggleClass = function(value) {

    };

    return Guac;
});
