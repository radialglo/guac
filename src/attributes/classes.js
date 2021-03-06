define([
    "../core"
], function(Guac) {

    /**
     * @method addClass
     * @param {String} className(s)
     * @desc adds one or more classes to element
     *
     */
    Guac.fn.addClass = function() {
        var args =  arguments;
        this.each(function(el, i, arr) {
            el.classList.add.apply(el.classList, args);
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

    return Guac;
});
