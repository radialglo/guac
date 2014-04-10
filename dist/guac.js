/**
 * Guac JavaScript Library v0.0.1
 *
 * @see https://github.com/radialglo/guac
 * /? /\ |) | /\ |_ (_, |_ () 
 *
 * Date: 2014-03-10
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


    var init = Guac.fn.init = function(selector) {
       this.target = document.querySelectorAll(selector);
    };



    /**
     * @method ajax
     * @desc sends network request on url
     *
     * @param {String} url - the url for the request
     * @param {Object} opts - dictionary of options
     */
    Guac.ajax = function(url, opts) {

        var method = opts.method || "GET",
            xhr = new XMLHttpRequest(),
            onSuccess = opts.success,
            onFail = opts.fail,
            type;

        xhr.open(method, url);

        xhr.onreadystatechange = function() {

            if (xhr.readyState === 4) {

                if (xhr.status === 200) {
                    // get the type of response
                    type = xhr.getResponseHeader("Content-Type");

                    if (onSuccess) {

                        if (type.indexOf("xml") !== -1 && xhr.responseXML) {
                            // xml
                            onSuccess(xhr.repsonseXML);

                        } else if (type.indexOf("application/json" !== -1)) {

                            // json
                            onSuccess(JSON.parse(xhr.responseText));

                        } else {

                            // string
                            onSuccess(xhr.responseText);
                        }
                    }

                } else {
                    if (onFail) {
                        onFail();
                    }
                }
            }

        };

    };

    /**
     * @method post
     * @desc sends GET request on url
     *
     * @param {String} url - the url for the request
     * @param {Object} opts - dictionary of options
     */
    Guac.get = function(url, opts) {
        opts.method = "GET";
        Guac.ajax(url, opts);
    };

    /**
     * @method post
     * @desc sends POST request on url
     *
     * @param {String} url - the url for the request
     * @param {Object} opts - dictionary of options
     */
    Guac.post = function(url, opts) {
        opts.method = "POST";
        Guac.ajax(url, opts);
    };

    // Expose Guac object to the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Guac = window.$ = Guac;
    }



return Guac;

})(this);
