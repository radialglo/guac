describe("core", function() {

   describe("#Guac", function() {

        var div = $("#mocha"),
            target = null;

        it("should query DOM Element", function() {

            target = Array.prototype.slice.call(div.target)[0];;
            expect(target.tagName).to.be.equal("DIV");
            expect(target.id).to.be.equal("mocha");

        });
   });
    
});
