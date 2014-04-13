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

