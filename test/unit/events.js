describe("events", function() {


    var doc = document,
        body = doc.body,
        div = null,
        divId = "awesome",
        $div = null,
        guid;

    beforeEach(function() {
        div = document.createElement("div");
        div.id = divId;
        body.appendChild(div);

        $div = $('#' + divId);
    });

    afterEach(function() {
        body.removeChild(div);
    });

    describe("#event.add()", function() {

        it("should add event", function() {
            var handler = function(){ console.log("hello"); };
            guid = Guac.guid;
            Guac.event.add(div, "click", handler);
            // $div.on("click", handler);

            expect(handler.guid).to.equal(guid);
            expect(div.events["click"].length).to.equal(1);
        });

        it("should add multiple events", function() {
            var handler = function(){ };
            var handler2 = function(){ };
                guid = Guac.guid;

            Guac.event.add(div, "click", handler);
            expect(handler.guid).to.equal(guid);

            Guac.event.add(div, "click", handler2);
            expect(handler2.guid).to.equal(guid + 1);

            expect(div.events["click"].length).to.equal(2);
        });
    });

    describe("#event.dispatch()", function() {


        // note that this is dependent on handler being implemented correctly
        it("should dispatch event", function(done) {
            var handler = function(){ 
                done();
            };
            Guac.event.add(div, "click", handler);

            Guac.event.dispatch.call(div, {
                // phantomjs not supporting new Event
                // so we  use faux event
                type: "click"
            });
        });

        // note that this is dependent on handler being implemented correctly
        it("should fire multiple handlers for dispatched event", function(done) {

            var count = 0;
            var handler = function(){ 
                count += 1;
                if (count === 2) {
                    done();
                }
            };
            var handler2 = function(){ 
                count += 1;
                if (count === 2) {
                    done();
                }
            };
            Guac.event.add(div, "click", handler);
            Guac.event.add(div, "click", handler2);

            Guac.event.dispatch.call(div, {
                // phantomjs not supporting new Event
                // so we  use faux event
                type: "click"
            });
        });
    });

    describe("#event.remove()", function() {

        it("should remove event", function() {
            var handler = function(){ console.log("hello"); };
            guid = Guac.guid;
            Guac.event.add(div, "click", handler);

            expect(handler.guid).to.equal(guid);
            expect(div.events["click"].length).to.equal(1);

            Guac.event.remove(div, "click", handler);
            expect(div.events["click"].length).to.equal(0);
        });

        it("should remove all  events", function() {
            var handler = function(){ };
            var handler2 = function(){ };
                guid = Guac.guid;

            Guac.event.add(div, "click", handler);
            expect(handler.guid).to.equal(guid);

            Guac.event.add(div, "click", handler2);
            expect(handler2.guid).to.equal(guid + 1);

            expect(div.events["click"].length).to.equal(2);

            Guac.event.remove(div, "click", handler);
            expect(div.events["click"].length).to.equal(1);

            Guac.event.remove(div, "click", handler2);
            expect(div.events["click"].length).to.equal(0);
        });
    });

    describe("#on()", function() {

        it("should add event", function() {
            var handler = function(){ console.log("hello"); };
            guid = Guac.guid;
            $div.on("click", handler);

            expect(handler.guid).to.equal(guid);
            expect(div.events["click"].length).to.equal(1);
        });

        it("should add multiple events", function() {
            var handler = function(){};
            var handler2 = function(){};

            guid = Guac.guid;

            $div.on("click", handler);
            expect(handler.guid).to.equal(guid);

            $div.on("click", handler2);
            expect(handler2.guid).to.equal(guid + 1);

            expect(div.events["click"].length).to.equal(2);

        });
    });

    describe("#off()", function() {

        it("should remove event", function() {
            var handler = function(){ console.log("hello"); };
            guid = Guac.guid;

            $div.on("click", handler);
            expect(handler.guid).to.equal(guid);
            expect(div.events["click"].length).to.equal(1);

            $div.off("click", handler);
            expect(div.events["click"].length).to.equal(0);
        });

        it("should remove all  events", function() {
            var handler = function(){ };
            var handler2 = function(){ };
                guid = Guac.guid;

            $div.on("click", handler);
            expect(handler.guid).to.equal(guid);

            $div.on("click", handler2);
            expect(handler2.guid).to.equal(guid + 1);

            expect(div.events["click"].length).to.equal(2);

            $div.off("click", handler);
            expect(div.events["click"].length).to.equal(1);

            $div.off("click", handler2);
            expect(div.events["click"].length).to.equal(0);
        });
    });

});

