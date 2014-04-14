define([
    "../core",
    "../core/init"
], function(Guac) {

    Guac.ready = function(fn) {
        window.addEventListener("load", fn);
    };
});
