describe("attributes", function() {

    describe("classes", function() {

        var doc = document,
            body = doc.body,
            divOne = null,
            divTwo = null,
            divClass = "awesome",
            divClassTwo = "woot";

        beforeEach(function(done) {
            var frag = document.createDocumentFragment();

            divOne = document.createElement("div");
            divTwo = document.createElement("div");

            frag.appendChild(divOne);
            frag.appendChild(divTwo);

            body.appendChild(frag);
            done();
        });

        afterEach(function() {
           body.removeChild(divOne);
           body.removeChild(divTwo);
        });

        describe("#addClass()", function() {

            it("should addClass", function() {
                expect(divOne.className).to.equal("");
                expect(divTwo.className).to.equal("");

                $("div").addClass(divClass);
                expect(divOne.className).to.equal(divClass);
                expect(divTwo.className).to.equal(divClass);
            });

            it("should add multiple classes", function() {

                // this invocation doesn't work for phantomjs but is okay in browser
                // $("div").addClass(divClass, divClassTwo);
                $("div").addClass(divClass);
                $("div").addClass(divClassTwo);
                expect(divOne.classList.length).to.equal(2);
                expect(divOne.classList.contains(divClass)).to.equal(true);
                expect(divOne.classList.contains(divClassTwo)).to.equal(true);
            });

        });

        describe("#removeClass()", function() {

                it("should remove class", function() {

                    expect(divOne.className).to.equal("");
                    expect(divTwo.className).to.equal("");

                    $("div").addClass(divClass);
                    expect(divOne.className).to.equal(divClass);
                    expect(divTwo.className).to.equal(divClass);

                    $("div").removeClass(divClass);
                    expect(divOne.className).to.equal("");
                    expect(divTwo.className).to.equal("");
                });

        });

        describe("#hasClass()", function() {

                it("should indicate class was added", function() {
                    expect(divOne.className).to.equal("");

                    expect(divTwo.className).to.equal("");

                    $("div").addClass(divClass);
                    expect($("div").hasClass(divClass)).to.equal(true);
                    expect(divOne.className).to.equal(divClass);
                    expect(divTwo.className).to.equal(divClass);

                    $("div").removeClass(divClass);
                    expect($("div").hasClass(divClass)).to.equal(false);
                });

                it("should return true if at least one element in set hasClass", function() {

                    expect(divOne.className).to.equal("");
                    expect(divTwo.className).to.equal("");

                    divOne.className = divClass;

                    // test that at least one elemnt has class 
                    expect($("div").hasClass(divClass)).to.equal(true);
                    expect(divOne.className).to.equal(divClass);

                    expect(divTwo.className).to.equal("");

                    $("div").removeClass(divClass);
                    expect($("div").hasClass(divClass)).to.equal(false);
                });

        });

        describe("#toggleClass()", function() {

                it("should toggle class", function() {

                    expect(divOne.className).to.equal("");
                    expect(divTwo.className).to.equal("");

                    $("div").addClass(divClass);
                    expect(divOne.className).to.equal(divClass);
                    expect(divTwo.className).to.equal(divClass);

                    $("div").removeClass(divClass);
                    expect(divOne.className).to.equal("");
                    expect(divTwo.className).to.equal("");
                });
        });
    });

});
