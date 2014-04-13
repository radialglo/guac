/**
 * Guac JavaScript Library v0.0.1
 *
 * @see https://github.com/radialglo/guac
 * /? /\ |) | /\ |_ (_, |_ () 
 *
 * Date: 2014-03-13
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
        constructor: Guac,
        each: function(callback) {
            Guac.each(this.target, callback);
        },
        some: function(callback) {
            Guac.some(this.target, callback);
        }
    };

    Guac.isArray = Array.isArray;

    Guac.each = function(obj, callback) {

        var i,
            isArray = Guac.isArray(obj);

        if (isArray) {
            obj.forEach(callback);
        } else {

            for (i in obj) {
                callback.call(obj[i], obj[i], i, obj);
            }
        }

        return obj;
    };

    Guac.some = function(obj, callback) {

        var i,
            isArray = Guac.isArray(obj);

        if (isArray) {
            return obj.some(callback);
        } else {

            for (i in obj) {

                if (callback.call(obj[i], obj[i], i)) {
                    return true;
                }
            }
        }

        return false;
    };


    var init = Guac.fn.init = function(selector) {

       this.target = Array.prototype.slice.call(document.querySelectorAll(selector));
       return this;

    };

    // Give the init function the Guac prototype
    init.prototype = Guac.fn;



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
            onError = opts.error,
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
                            onSuccess(xhr.responseXML);

                        } else if (type.indexOf("application/json" !== -1)) {

                            // json
                            onSuccess(JSON.parse(xhr.responseText));

                        } else {

                            // string
                            onSuccess(xhr.responseText);
                        }
                    }

                } else {
                    if (onError) {
                        onError();
                    }
                }
            }

        };

        // change
        xhr.send("null");

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


    // Expose Guac object to the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Guac = window.$ = Guac;
    }



return Guac;

})(this);
