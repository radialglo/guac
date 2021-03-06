describe("ajax", function() {

   describe("#ajax()", function() {

        it("should fetch json", function(done) {

            $.ajax("files/test.json",{
                    success: function(data) {
                        // check type is object
                        expect(data).to.be.an("object"); 
                        // the value of response key should be "true"
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    }
            });
        });

        it("should fetch xml", function(done) {

            // check that documentElement does not equal html
            $.ajax("files/test.xml",{
                    success: function(doc) {
                        expect(doc.documentElement.nodeName).to.not.equal("HTML", "should be xml document, so root element should not be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    }
            });

        });

        it("should fetch html", function(done) {

            // check that documentElement is equal html
            $.ajax("files/test.html",{
                    success: function(data) {
                        var parser = new DOMParser();
                        // parser does not support text/html, so let's parse html using xml type
                        var doc = parser.parseFromString(data, "text/xml");
                        expect(doc.documentElement.nodeName).to.equal("html", "should be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    }
            });

        });

        it("should send error", function(done) {

            $.ajax("files/does-not-exist.xml",{
                    success: function() {
                        expect(true).to.equal(false);
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(true);
                        done();
                    }
            });

        });
   });

   describe("#get()", function() {

        it("should use GET to fetch json", function(done) {

            $.get("files/test.json",{
                    success: function(data) {
                        // check type is object
                        expect(data).to.be.an("object"); 
                        // the value of response key should be "true"
                        expect(data.response).to.be.equal("true"); 
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    }
            });
        });

        it("should use GET to fetch json via parameters in request body", function(done) {

            $.get("read",{
                    success: function(data) {
                        // check type is object
                        expect(data).to.be.an("object"); 
                        // the value of response key should be "true"
                        expect(data.response).to.be.equal("true"); 
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    },
                    data: {
                        filename: '/test/files/test.json'
                    }
            });
        });

        it("should use GET to fetch xml", function(done) {

            // check that documentElement does not equal html
            $.get("files/test.xml",{
                    success: function(doc) {
                        expect(doc.documentElement.nodeName).to.not.equal("HTML", "should be xml document, so root element should not be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    }
            });

        });

        it("should use GET to fetch xml via parameters in request body", function(done) {

            $.get("read",{
                    success: function(doc) {
                        expect(doc.documentElement.nodeName).to.not.equal("HTML", "should be xml document, so root element should not be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    },
                    data: {
                        filename: '/test/files/test.xml'
                    }
            });
        });

        it("should use GET to fetch html", function(done) {

            // check that documentElement is equal html
            $.get("files/test.html",{
                    success: function(data) {
                        var parser = new DOMParser();
                        // parser does not support text/html, so let's parse html using xml type
                        var doc = parser.parseFromString(data, "text/xml");
                        expect(doc.documentElement.nodeName).to.equal("html", "should be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    }
            });

        });

        it("should use GET to fetch html via parameters in request body", function(done) {

            // check that documentElement is equal html
            $.get("read",{
                    success: function(data) {
                        var parser = new DOMParser();
                        // parser does not support text/html, so let's parse html using xml type
                        var doc = parser.parseFromString(data, "text/xml");
                        expect(doc.documentElement.nodeName).to.equal("html", "should be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    },
                    data: {
                        filename: '/test/files/test.html'
                    }
            });

        });


        it("should send error", function(done) {

            $.get("files/does-not-exist.xml",{
                    success: function() {
                        expect(true).to.equal(false);
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(true);
                        done();
                    }
            });

        });
   });

   describe("#post()", function() {

        it("should use POST to fetch json", function(done) {

            $.post("files/test.json",{
                    success: function(data) {
                        // check type is object
                        expect(data).to.be.an("object"); 
                        // the value of response key should be "true"
                        expect(data.response).to.be.equal("true"); 
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    }
            });
        });

        it("should use POST to fetch json via parameters in request body", function(done) {

            $.post("read",{
                    success: function(data) {
                        // check type is object
                        expect(data).to.be.an("object"); 
                        // the value of response key should be "true"
                        expect(data.response).to.be.equal("true"); 
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    },
                    data: {
                        filename: '/test/files/test.json'
                    }
            });
        });


        it("should use POST to fetch xml", function(done) {

            // check that documentElement does not equal html
            $.post("files/test.xml",{
                    success: function(doc) {
                        expect(doc.documentElement.nodeName).to.not.equal("HTML", "should be xml document, so root element should not be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    }
            });

        });

        it("should use POST to fetch xml via parameters in request body", function(done) {

            $.post("read",{
                    success: function(doc) {
                        expect(doc.documentElement.nodeName).to.not.equal("HTML", "should be xml document, so root element should not be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    },
                    data: {
                        filename: '/test/files/test.xml'
                    }
            });
        });

        it("should use POST to fetch html", function(done) {

            // check that documentElement is equal html
            $.post("files/test.html",{
                    success: function(data) {
                        var parser = new DOMParser();
                        // parser does not support text/html, so let's parse html using xml type
                        var doc = parser.parseFromString(data, "text/xml");
                        expect(doc.documentElement.nodeName).to.equal("html", "should be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    }
            });

        });

        it("should use POST to fetch html via parameters in request body", function(done) {

            // check that documentElement is equal html
            $.post("read",{
                    success: function(data) {
                        var parser = new DOMParser();
                        // parser does not support text/html, so let's parse html using xml type
                        var doc = parser.parseFromString(data, "text/xml");
                        expect(doc.documentElement.nodeName).to.equal("html", "should be html");
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(false);
                        done();
                    },
                    data: {
                        filename: '/test/files/test.html'
                    }
            });

        });


        it("should send error", function(done) {

            $.post("files/does-not-exist.xml",{
                    success: function() {
                        expect(true).to.equal(false);
                        done(); 
                    },
                    error: function(){
                        expect(true).to.equal(true);
                        done();
                    }
            });

        });
   });

});

