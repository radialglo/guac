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
            onError = opts.error,
            data = opts.data,
            body = null,
            key,
            type,
            hasContent = method !== "GET";

        if (data) {
            body = [];
            for (key in data) {
                body.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
            }
            body.join("&");

            if (!hasContent) {
                url += "?" + body;
                body = null;
            }

        }

        xhr.open(method, url);

        // set content type header for requests that have body i.e POST 
        if (hasContent) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        }

        xhr.onreadystatechange = function() {

            if (xhr.readyState === 4) {

                if (xhr.status === 200) {
                    // get the type of response
                    type = xhr.getResponseHeader("Content-Type");

                    if (onSuccess) {

                        if (type.indexOf("xml") !== -1 && xhr.responseXML) {
                            // xml
                            onSuccess(xhr.responseXML);

                        } else if (type.indexOf("application/json") !== -1) {

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

        xhr.send(body);

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
