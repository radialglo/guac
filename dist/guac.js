/**
 * Guac JavaScript Library v0.0.1
 *
 * @see https://github.com/radialglo/guac
 * /? /\ |) | /\ |_ (_, |_ () 
 *
 * Date: 2014-02-25
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

    Guac.fn = Guac.prototype = {
    };



    // Expose Guac object to the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Guac = window.$ = Guac;
    }



return Guac;

})(this);
