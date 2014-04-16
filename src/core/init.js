define([
        "../core"
], function(Guac) {

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
});
