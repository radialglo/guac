describe("core", function() {

   describe("#Guac", function() {

        var div = $("#mocha"),
            target = null;

        it("should query DOM Element", function() {

            target = Array.prototype.slice.call(div.target)[0];
            expect(target.tagName).to.be.equal("DIV");
            expect(target.id).to.be.equal("mocha");

        });
   });

   describe("#type()", function() {

        it("it should be a function", function() {

            expect(Guac.type(function(){})).to.be.equal("function");

        });
   });

   describe("#isFunction()", function() {

        it("it should be a function", function() {

            expect(Guac.isFunction(function(){})).to.be.equal(true);

        });
   });

   describe("#isString()", function() {

        it("it should be string", function() {

            expect(Guac.isString("string")).to.be.equal(true);

        });
   });

   describe("#each()", function() {

        var div = $("#mocha"),
            target = null;

        it("should return same object", function() {

            var testArr = [6, 8, 4, 3],
                ret = Guac.each(testArr, function() {
                });

            expect(ret).to.equal(testArr);
        });

        it("should update all elements in array", function() {

            var testArr = [6, 8, 4, 3],
                ret = Guac.each(testArr, function(el, i, arr) {
                    arr[i] *= 2;
                });

            // should return same object
            expect(ret).to.equal(testArr);

            expect(testArr[0]).to.equal(12);
            expect(testArr[1]).to.equal(16);
            expect(testArr[2]).to.equal(8);
            expect(testArr[3]).to.equal(6);

        });


        it("should update all elements in obj", function() {

            var testObj = {
                "one": 1,
                "two": 2,
                "three": 3
            };

            Guac.each(testObj, function(el, k, obj) {
               obj[k] = 4;
            });

            expect(testObj["one"]).to.equal(4);
            expect(testObj["two"]).to.equal(4);
            expect(testObj["three"]).to.equal(4);

        });

   });

   describe("#some()", function() {

        var div = $("#mocha"),
            target = null;

        it("should locate element in array", function() {

            var ret = Guac.some([6, 8, 4, 3], function(el, i, arr) {
                return el === 3;
            });

            expect(ret).to.equal(true);

        });

        it("should not locate element in array", function() {

            var ret = Guac.some([6, 8, 4, 3], function(el, i, array) {
                return el === 10;
            });

            expect(ret).to.equal(false);

        });

        it("should locate element in obj", function() {

            var ret = Guac.some({
                "one": 1,
                "two": 2,
                "three": 3
            }, function(el, k, obj) {
                return el === 3;
            });

            expect(ret).to.equal(true);

        });

        it("should not locate element in obj", function() {

            var ret = Guac.some({
                "one": 1,
            }, function(el, k, obj) {
                return el === 3;
            });

            expect(ret).to.equal(false);

        });
   });
   describe("#ready", function() {

        it("should load when ready", function(done) {

            var event;

            $(function() {
                done();
            });

            event = document.createEvent('Event');
                            // bubbles, cancelable
            event.initEvent('load', true, true);

            window.dispatchEvent(event);

        });
   });

});
