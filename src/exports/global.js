define([
    "../core",
], function(Guac) {
    // Expose Guac object to the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Guac = window.$ = Guac;
    }
});
