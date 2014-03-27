define([
    "./core"
], function(Guac) {

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

    return Guac;

});
